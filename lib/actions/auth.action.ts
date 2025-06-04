'use server'

import { auth, db } from "@/firebase/admin";
import { cookies } from "next/headers";

const ONE_WEEK = 60 * 60 * 24 * 7; // seconds

export async function signUp(params: SignUpParams) {
    const { uid, name, email} = params;

    try {
        const userRecord = await db.collection('users').doc(uid).get();
                
            if (userRecord.exists) {
                return {
                    success: false,
                    message: 'User already exists. Please Sign in instead.'
            }
        }

        await db.collection('users').doc(uid).set({    
            name,
            email,
        });

    } catch (error: any) {
        console.error('Error signing up:', error);
        
        if(error.code === 'auth/email-already-in-use') {
            return {
                success: false,
                message: 'Email is already Registered. Please try a different email.'
            }
           
        }

        return {
            success: false,
            message: error.message || 'An error occurred during sign up. Please try again later.'
        }
    }
}

export async function setSessionCookies(idToken: string) {
    const cookiesStore = await cookies();
    const sessionCookies = await auth.createSessionCookie(idToken, {
        expiresIn: ONE_WEEK * 1000
    });

    cookiesStore.set('session', sessionCookies, {
        maxAge: ONE_WEEK,
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        sameSite: 'lax',
    })
}

export async function signIn(params: SignInParams) {
  const { email, idToken } = params;

  try {
    const userRecord = await auth.getUserByEmail(email);
    if (!userRecord)
      return {
        success: false,
        message: "User does not exist. Create an account.",
      };

    await setSessionCookies(idToken);
  } catch (error: any) {
    console.log("");

    return {
      success: false,
      message: "Failed to log into account. Please try again.",
    };
  }
}

// Sign out user by clearing the session cookie
export async function signOut() {
  const cookieStore = await cookies();

  cookieStore.delete("session");
}

export async function getCurrentUser(): Promise<User | null> {
  const cookieStore = await cookies();

  const sessionCookie = cookieStore.get("session")?.value;
  if (!sessionCookie) return null;

  try {
    const decodedClaims = await auth.verifySessionCookie(sessionCookie, true);

    // get user info from db
    const userRecord = await db
      .collection("users")
      .doc(decodedClaims.uid)
      .get();
    if (!userRecord.exists) return null;

    return {
      ...userRecord.data(),
      id: userRecord.id,
    } as User;
  } catch (error) {
    console.log(error);

    // Invalid or expired session
    return null;
  }
}

// Check if user is authenticated
export async function isAuthenticated() {
  const user = await getCurrentUser();
  return !!user;
}
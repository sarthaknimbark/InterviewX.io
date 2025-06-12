import Link from "next/link";
import Image from "next/image";
import { ReactNode } from 'react'
import { isAuthenticated } from "@/lib/actions/auth.action";
import { redirect } from 'next/navigation';
import { Toaster } from "sonner";

const Rootlayout = async ({ children }: { children: ReactNode }) => {

  // const isUserAuthenticated = await isAuthenticated();
  // if (!isUserAuthenticated) redirect("/sign-in");

  return (
    <div className='root-layout'>
      <nav> 
        <Link 
          href="/"
          className="flex items-center gap-2"
        >
          <Image src="/logo.svg" alt="Logo" width={38} height={32} />
          <h1 className="text-primary-100">InterviewX.io</h1>
        </Link>
      </nav>
      {children}
      <Toaster richColors position="top-center" />
    </div>
  )
}

export default Rootlayout

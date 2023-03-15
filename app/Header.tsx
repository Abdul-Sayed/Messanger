// "use client";

import Image from "next/image";
import Link from "next/link";
import LogoutButton from "./LogoutButton";
import { getServerSession } from "next-auth/next";
// import { useSession } from "next-auth/react";

async function Header() {
  const session = await getServerSession();
  // const { data: session } = useSession();

  if (session && session?.user) {
    return (
      <header className="sticky top-0 z-50 bg-white flex justify-between items-center p-10 shadow-sm">
        <div className="flex space-x-2">
          <Image
            src={session?.user?.image!}
            alt="Profile picture"
            height={10}
            width={50}
            className="rounded-full mx-2 object-contain"
          />
          <div>
            <p className="text-blue-400">Logged in as:</p>
            <p className="font-bold text-lg">{session?.user.name}</p>
          </div>
        </div>
        <LogoutButton />
      </header>
    );
  }

  return (
    <header className="sticky top-0 z-50 bg-white flex justify-center items-center p-10 shadow-sm">
      <div className="flex flex-col items-center space-y-5">
        <div className="flex space-x-2 items-center">
          <Image
            src="https://cdn.freebiesupply.com/logos/large/2x/facebook-messenger-logo-png-transparent.png"
            alt="logo"
            priority
            height={10}
            width={50}
          />

          <p className="text-blue-400">Welcome to Messanger</p>
        </div>
        <Link
          href="/auth/signin"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Sign In
        </Link>
      </div>
    </header>
  );
}

export default Header;

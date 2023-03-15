import React from "react";
import { getProviders } from "next-auth/react";
import Image from "next/image";
import SignInComponent from "./SignInComponent";

export const metadata = {
  title: "Sign in to Messanger",
  description: "Facebook OAuth Signin",
};

export default async function SignInPage() {
  const providers = await getProviders();

  return (
    <div className="grid justify-center">
      <div>
        <Image
          className="rounded-full mx-2 object-cover"
          width={600}
          height={600}
          src="https://static.xx.fbcdn.net/rsrc.php/v3/y2/r/yvbOx5two0W.png"
          alt="FB logo"
        />
      </div>
      <SignInComponent providers={providers} />
    </div>
  );
}

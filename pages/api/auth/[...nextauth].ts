import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
import GithubProvider from "next-auth/providers/github";
export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.Facebook_ID!,
      clientSecret: process.env.Facebook_SECRET!,
    }),
    GithubProvider({
      clientId: process.env.Github_ID!,
      clientSecret: process.env.Github_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,
};
export default NextAuth(authOptions);

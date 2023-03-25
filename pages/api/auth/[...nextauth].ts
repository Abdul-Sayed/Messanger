import NextAuth from "next-auth";
import FacebookProvider from "next-auth/providers/facebook";
export const authOptions = {
  providers: [
    FacebookProvider({
      clientId: process.env.Facebook_ID!,
      clientSecret: process.env.Facebook_SECRET!,
    }),
  ],

  secret: process.env.NEXTAUTH_SECRET!,
};
export default NextAuth(authOptions);

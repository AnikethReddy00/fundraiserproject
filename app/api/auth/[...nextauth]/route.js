import mongoose from 'mongoose';
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import User from '@/models/user';
import Payment from '@/models/Payment';
import connectDB from '@/db/connectDb';

const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, email }) {
      if (account.provider === "github") {
        if (!email && account.access_token) {
          const response = await fetch("https://api.github.com/user/emails", {
            headers: { Authorization: `Bearer ${account.access_token}` },
          });
          const emails = await response.json();
          email = emails.find((e) => e.primary)?.email || null;
        }
        if (!email) return false;

        await connectDB();
        const currentUser = await User.findOne({ email });
        if (!currentUser) {
          const newUser = new User({
            email,
            username: email.split("@")[0],
          });
          await newUser.save();
          user.name = newUser.username;
        }
        return true;
      }
      return false;
    },
    async session({ session }) {
      await connectDB();
      const dbUser = await User.findOne({ email: session.user.email });
      session.user.name = dbUser.username;
      return session;
    },
  },
};

export const GET = NextAuth(authOptions);
export const POST = NextAuth(authOptions);

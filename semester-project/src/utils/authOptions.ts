import { Backend_URL } from "@/lib/constants";
import axios from "axios";
import { NextAuthOptions } from "next-auth";
import { JWT } from "next-auth/jwt";
import CredentialsProvider from "next-auth/providers/credentials";

async function refreshToken(token: JWT): Promise<JWT> {
  try {
    const res = await axios.post(`${Backend_URL}/auth/refresh`, null, {
      headers: {
        authorization: `Refresh ${token.backendTokens.refreshToken}`,
      },
    });
    return {
      ...token,
      backendTokens: res.data,
    };
  } catch (error) {
    console.log("Error refreshing token:", error);
    throw error;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: {
          label: "Email",
          type: "text",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials?.password) return null;
          const { email, password } = credentials;
          const res = await axios.post(`${Backend_URL}/auth/login`, {
            email: email,
            password: password,
          });

          const user = res.data;
          return user;
        } catch (error) {
          throw error.response.data;
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    async jwt({ token, user }) {
      if (user) return { ...token, ...user };

      if (new Date().getTime() < token.backendTokens.expiresIn) return token;

      return await refreshToken(token);
    },

    async session({ token, session }) {
      session.user = token.user;
      session.backendTokens = token.backendTokens;

      return session;
    },
  },
  pages: {
    signIn: "/signin",
  },
};

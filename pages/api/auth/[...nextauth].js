import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { FirestoreAdapter } from "@next-auth/firebase-adapter";

export const authOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  scret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/auth/signin",
  },
  adapter: FirestoreAdapter({
    apiKey: process.env.API_KEY,
    authDomain: process.env.AUTH_DOMAIN,
    projectId: process.env.PROJECT_ID,
    storageBucket: process.env.STORAGE_BUCKET,
    messagingSenderId: process.env.MESSAGING_SENDER_ID,
    appId: process.env.APP_ID,
    measurementId: process.env.MEASUREMENT_ID,
  }),

  callbacks: {
    async session({ session, user }) {
      session.user.username = session.user.name
        .split(" ")
        .join("")
        .toLowerCase()
        .replace(/[^a-zA-Z0-9]/g, function (s) {
          var c = s.charCodeAt(0);
          switch (c) {
            case 231:
              return "c";
            case 287:
              return "g";
            case 305:
              return "i";
            case 351:
              return "s";
            case 252:
              return "u";
            case 231:
              return "c";
            case 246:
              return "o";
            default:
              return "";
          }
        });
      session.user.uid = user.id;
      return session;
    },
  },
};

export default NextAuth(authOptions);

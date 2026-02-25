import type { NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";

// Edge-safe auth config (no Prisma/Node.js APIs)
export const authConfig: NextAuthConfig = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // authorize is handled in auth.ts (Node.js only)
      authorize: async () => null,
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = (user as any).role;
        token.organizationId = (user as any).organizationId;
        token.organizationName = (user as any).organizationName;
        token.organizationSlug = (user as any).organizationSlug;
      }
      return token;
    },
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session.user as any).role = token.role;
        (session.user as any).organizationId = token.organizationId;
        (session.user as any).organizationName = token.organizationName;
        (session.user as any).organizationSlug = token.organizationSlug;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isPublic = ["/", "/login", "/register"].includes(nextUrl.pathname);

      if (!isLoggedIn && !isPublic) return Response.redirect(new URL("/login", nextUrl));
      if (isLoggedIn && (nextUrl.pathname === "/login" || nextUrl.pathname === "/register")) {
        return Response.redirect(new URL("/dashboard", nextUrl));
      }
      return true;
    },
  },
  pages: { signIn: "/login" },
  session: { strategy: "jwt" },
};

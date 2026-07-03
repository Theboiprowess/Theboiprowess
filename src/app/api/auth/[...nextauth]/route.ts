import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const dynamic = 'force-dynamic';

const handler = NextAuth({
  secret: process.env.NEXTAUTH_SECRET || 'dev-secret-change-in-production',
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        // Validate secret at runtime
        if (process.env.NODE_ENV === 'production' && !process.env.NEXTAUTH_SECRET) {
          throw new Error(
            'NEXTAUTH_SECRET is not set in production environment. Please add it to your environment variables.'
          );
        }

        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // Check if the user is the admin (Director)
        const adminEmail = process.env.ADMIN_EMAIL || "wisedellacademy@gmail.com";
        const adminPassword = process.env.ADMIN_PASSWORD || "";

        if (credentials.email === adminEmail && credentials.password === adminPassword) {
          return {
            id: "1",
            email: adminEmail,
            name: "Director",
            role: "admin",
          };
        }

        return null;
      },
    }),
  ],
  pages: {
    signIn: "/admin/login",
  },
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        (session.user as any).role = token.role;
      }
      return session;
    },
  },
});

export { handler as GET, handler as POST };

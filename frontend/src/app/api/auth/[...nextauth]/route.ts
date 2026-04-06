import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

const googleClientId = process.env.GOOGLE_CLIENT_ID;
const googleClientSecret = process.env.GOOGLE_CLIENT_SECRET;

const providers = [
  CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null;

        try {
          const API_URL = process.env.NEXT_PUBLIC_API_URL;
          if (!API_URL) return null;
          const res = await fetch(`${API_URL}/auth/login`, {
            method: "POST",
            body: JSON.stringify({ email: credentials.email, password: credentials.password }),
            headers: { "Content-Type": "application/json" }
          });
          
          if (!res.ok) return null;
          
          const user = await res.json();
          if (user && user.access_token) {
            return {
              id: user.user.sub,
              email: user.user.email,
              name: user.user.email, // Can add more
              token: user.access_token
            };
          }
          return null;
        } catch {
          return null;
        }
      }
    })
];

if (googleClientId && googleClientSecret) {
  providers.push(
    GoogleProvider({
      clientId: googleClientId,
      clientSecret: googleClientSecret,
    })
  );
}

const handler = NextAuth({
  providers,
  secret: process.env.NEXTAUTH_SECRET || "super-secret",
  callbacks: {
    async signIn({ user, account }) {
      if (account?.provider === "google") {
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        try {
          const res = await fetch(`${API_URL}/auth/oauth-login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: user.email,
              firstName: user.name?.split(" ")[0] || "",
              lastName: user.name?.split(" ").slice(1).join(" ") || "",
              provider: "google",
              providerId: user.id
            })
          });

          if (res.ok) {
            const data = await res.json();
            (user as { token?: string }).token = data.access_token;
            return true;
          }
          return false;
        } catch (error) {
          console.error("OAuth Login Error:", error);
          return false;
        }
      }
      return true;
    },
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = (user as { token?: string }).token;
      }
      return token;
    },
    async session({ session, token }) {
      (session as { accessToken?: string }).accessToken = token.accessToken as string;
      return session;
    }
  },
  session: { strategy: "jwt" },
});

export { handler as GET, handler as POST };

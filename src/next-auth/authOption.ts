import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { jwtDecode } from "jwt-decode";

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      name: "My Login",
      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "Enter your email",
        },
        password: {
          label: "password",
          type: "password",
          placeholder: "Enter your password",
        },
      },
      async authorize(credentials) {
        const response = await fetch(`${process.env.API}auth/signin`, {
          method: "POST",
          body: JSON.stringify({
            email: credentials?.email,
            password: credentials?.password,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (!response.ok) {
          throw new Error(response.statusText);
        }

        const payLoad = await response.json();
        console.log("payload.....", payLoad);
        const userData: { id: string } = jwtDecode(payLoad.token);
        console.log("MyToken", userData);

        return {
          id: userData.id,
          email: payLoad.user.email,
          password: payLoad.user.password,
          name: payLoad.user.name,
          token: payLoad.token,
        };
      },
    }),
  ],
  // after login success or refresh
  callbacks: {
    jwt({ token, user }) {
      // console.log("params", params);
      if (user) {
        token.id = user.id;
        token.accessToken = user.token;
      }

      return token;
    },

    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

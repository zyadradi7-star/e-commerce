// import { NextAuthOptions } from "next-auth";
// import Credentials from "next-auth/providers/credentials";
// import { jwtDecode } from "jwt-decode";

// export const authOption: NextAuthOptions = {
//   providers: [
//     Credentials({
//       name: "My Login",
//       credentials: {
//         email: {
//           label: "Email",
//           type: "email",
//           placeholder: "Enter your email",
//         },
//         password: {
//           label: "password",
//           type: "password",
//           placeholder: "Enter your password",
//         },
//       },
//       async authorize(credentials) {
//         const response = await fetch(`${process.env.API}auth/signin`, {
//           method: "POST",
//           body: JSON.stringify({
//             email: credentials?.email,
//             password: credentials?.password,
//           }),
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (!response.ok) {
//           throw new Error(response.statusText);
//         }

//         const payLoad = await response.json();
//         console.log("payload.....", payLoad);
//         const userData: { id: string } = jwtDecode(payLoad.token);
//         console.log("MyToken", userData);

//         return {
//           id: userData.id,
//           email: payLoad.user.email,
//           password: payLoad.user.password,
//           name: payLoad.user.name,
//           token: payLoad.token,
//         };
//       },
//     }),
//   ],
//   // after login success or refresh
//   callbacks: {
//     jwt({ token, user }) {
//       // console.log("params", params);
//       if (user) {
//         token.id = user.id;
//         token.accessToken = user.token;
//       }

//       return token;
//     },

//     session({ session, token }) {
//       if (token) {
//         session.user.id = token.id;
//       }
//       return session;
//     },
//   },
//   pages: {
//     signIn: "/login",
//   },
// };

import { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOption: NextAuthOptions = {
  secret: process.env.NEXTAUTH_SECRET, // إضفاء المفتاح صراحة لضمان عدم حدوث NO_SECRET
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
        try {
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

          const payLoad = await response.json();

          // إذا لم تكن الاستجابة 200 أو لم يرجع token، نرجع null بدلاً من throw Error
          if (!response.ok || !payLoad.token) {
            console.error("Login Failed:", payLoad.message);
            return null;
          }

          // إرجاع بيانات المستخدم والتوكن للـ Session
          return {
            id: payLoad.user._id || payLoad.user.id,
            email: payLoad.user.email,
            name: payLoad.user.name,
            token: payLoad.token,
          };
        } catch (error) {
          console.error("Authorize error:", error);
          return null; // إرجاع null يمنع التحويل لصفحة /api/auth/error
        }
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.accessToken = (user as any).token;
      }
      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id as string;
        (session as any).token = token.accessToken;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
};

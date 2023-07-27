import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import axios from "axios";
import Cookies from "js-cookie";

export default NextAuth({
  providers: [
    // Your providers here
  ],
  callbacks: {
    async jwt(token, user) {
      // This callback is run whenever a token is created or updated.
      // Here you can intercept the token and add custom data to it if needed.

      // Check if token is provided and not expired
      if (token) {
        const decodedToken = jwt.decode(token);
        const isTokenExpired = decodedToken.exp < Date.now() / 1000;

        if (isTokenExpired) {
          // If token is expired, clear the cookie and log the user out
          Cookies.remove("broadleafToken");
          return null;
        }
      }

      return token;
    },
    async session(session, token) {
      // This callback is called when a new session is created.
      // You can add custom properties to the session object if needed.

      // In this example, we'll add the token to the session for easy access
      session.broadleafToken = token;
      return session;
    },
  },
  // Add other NextAuth.js options as needed
});

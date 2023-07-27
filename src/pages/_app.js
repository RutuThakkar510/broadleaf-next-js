// import { useRouter } from "next/router";
// import { IntlProvider } from "react-intl";
// import { AuthProvider } from "@broadleaf/auth-react";
// import getConfig from "next/config";
// import { Provider } from "react-redux";
// import store from "@/redux/store";
// import NextApp from "next/app";
// import authMiddleware from "@/server/middleware/auth";

// const {
//   publicRuntimeConfig: { auth },
// } = getConfig();

// function App({ Component, pageProps }) {
//   const { locale } = useRouter();
//   const lng = locale ? locale : "en";
//   let key = lng;
//   const router = useRouter();
//   const isServer = typeof window === "undefined";
//   console.log("isServer", isServer);
//   return (
//     // <IntlProvider locale={lng}>
//     //       {/* <AuthProvider
//     //         baseURL="/auth"
//     //         key={'th-client'}
//     //         clientId="th-client"
//     //         credentials
//     //         onRedirectCallback={(appState) => {
//     //           router.replace(appState?.returnTo || window.location.pathname);
//     //         }}
//     //         useRefreshTokens={auth.useRefreshTokens === true}
//     //         usePkce={auth.usePkce === true}
//     //       > */}
//     //         {/* {typeof window !== 'undefined' && ( */}
//     //           {/* <AuthProvider baseURL="https://hospitality.admin.legends.blcdemo.com/auth" clientId="th-client"> */}
//     //         {/* <Layout> */}
//     //         {/* </Layout> */}
//     //         {/* </AuthProvider> */}
//     //         {/* )} */}
//     //         {/* </AuthProvider> */}
//     //       {/* </AuthProvider> */}
//     //       </IntlProvider>
//     <Provider store={store}>
//       <Component {...pageProps} />
//     </Provider>
//   );
// }

// App.getInitialProps = async (appContext) => {
//   const { ctx } = appContext;

//   // Run the auth middleware to set the token as a cookie
//   await authMiddleware(ctx.req, ctx.res);

//   let pageProps = {};
//   if (NextApp.getInitialProps) {
//     pageProps = await NextApp.getInitialProps(appContext);
//   }

//   return { pageProps };
// };

// export default App;
// ==========================================

//try 2
// import App from "next/app";
// import axios from "axios";
// import { setAuthTokenCookie } from "@/utils/cookies";
// import { Provider } from "react-redux";
// import store from "@/redux/store";
// import { AuthProvider } from "@/context/AuthContext";

// let broadleafToken = null;

// class MyApp extends App {
//   static async getInitialProps({ Component, ctx }) {
//     let pageProps = {};

//     // Check if we are on the server-side
//     if (ctx.req) {
//       const { data } = await axios.post(
//         "https://hospitality.admin.legends.blcdemo.com/auth/oauth/token?grant_type=client_credentials",
//         {},
//         {
//           auth: {
//             username: "th-client",
//             password: "klj2390!@90as!ASD",
//           },
//         }
//       );
//       console.log("in MYAPP");
//       // Simulate fetching the token from server-side API (Replace this with actual logic)
//       // const token = "your_auth_token_here";
//       const token = data.access_token;
//       setAuthTokenCookie(token);
//       broadleafToken = token;
//     }

//     if (Component.getInitialProps) {
//       pageProps = await Component.getInitialProps(ctx);
//     }

//     return { pageProps };
//   }

//   render() {
//     const { Component, pageProps } = this.props;
//     return (
//       <AuthProvider>
//         <Provider store={store}>
//           <Component {...pageProps} />;
//         </Provider>
//       </AuthProvider>
//     );
//   }
// }

// const getAuthToken = () => {
//   return broadleafToken;
// };

// export default MyApp;

//try 3
// pages/_app.js
import { setAuthTokenCookie } from "../utils/cookies";
import AuthContext, { AuthProvider } from "../context/AuthContext";
import { useContext } from "react";
import { Provider } from "react-redux";
import store from "@/redux/store";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </Provider>
  );
}

// // Function to fetch the token on the server-side (Replace this with actual logic)
// const fetchAuthTokenFromServer = () => {
//   return "your_auth_token_here";
// };

// export async function getServerSideProps(context) {
//   const token = fetchAuthTokenFromServer(); // Fetch the token from server-side API or other sources
//   setAuthTokenCookie(token); // Set the token as a cookie
//   const { setAuthToken } = useContext(AuthContext); // Access setAuthToken from the context
//   setAuthToken(token); // Set the token on the context

//   return {
//     props: {},
//   };
// }

export default MyApp;

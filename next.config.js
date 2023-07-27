// // /** @type {import('next').NextConfig} */
// // const nextConfig = {}

// // module.exports = nextConfig

// const { PHASE_DEVELOPMENT_SERVER } = require('next/constants');

// const requiredVariables = [
//   'NEXT_PUBLIC_API_ORIGIN',
//   'NEXT_PUBLIC_GATEWAY_HOST',
//   'NEXT_PUBLIC_AUTH_BASEURL',
//   'NEXT_PUBLIC_AUTH_CLIENTMODE',
//   'NEXT_PUBLIC_TENANT_RESOLVER_APPLICATION_RESOLUTION',
// ];

// const missingVariables = [];
// requiredVariables.forEach((variable) => {
//   if (!process.env[variable]) {
//     missingVariables.push(variable);
//   }
// });

// if (missingVariables.length > 0 && process.env.NODE_ENV !== 'test') {
//   throw new Error(
//     `\n\n\x1b[31mMissing required environment variables:\x1b[0m\n${missingVariables
//       .map((v) => `\t- \x1b[32m${v}\x1b[0m`)
//       .join('\n')}\n\n`,
//   );
// }

// module.exports = (phase, { defaultConfig }) => {
//   if (phase === PHASE_DEVELOPMENT_SERVER) {
//     return {
//       /* development only config options here */
//       reactStrictMode: true,
//       i18n: {
//         // The locales you want to support in your app
//         locales: ['en', 'es', 'fr'],
//         // The default locale you want to be used when visiting a non-locale prefixed path e.g. `/hello`
//         defaultLocale: 'en',
//       },
//       publicRuntimeConfig: {
//         auth: {
//           baseUrl: process.env.NEXT_PUBLIC_AUTH_BASEURL,
//           clientMode: process.env.NEXT_PUBLIC_AUTH_CLIENTMODE,
//           clientId: process.env.NEXT_PUBLIC_AUTH_CLIENTID,
//           userScope: process.env.NEXT_PUBLIC_AUTH_USERSCOPE,
//           account: {
//             addressesScope: process.env.NEXT_PUBLIC_AUTH_ACCOUNT_ADDRESS_SCOPE,
//             cartApprovalScope: process.env.NEXT_PUBLIC_AUTH_APPROVE_CART,
//             invitesScope: process.env.NEXT_PUBLIC_AUTH_ACCOUNT_INVITE_SCOPE,
//             paymentsScope: process.env.NEXT_PUBLIC_AUTH_ACCOUNT_PAYMENT_SCOPE,
//             usersScope: process.env.NEXT_PUBLIC_AUTH_ACCOUNT_USERS_SCOPE,
//             accountOrderScope: process.env.NEXT_PUBLIC_AUTH_ACCOUNT_ORDER_SCOPE,
//           },
//           useRefreshTokens: process.env.NEXT_PUBLIC_AUTH_USE_REFRESH_TOKENS === 'true',
//           useEmbeddedLogin: process.env.NEXT_PUBLIC_USE_EMBEDDED_LOGIN === 'true',
//           usePkce: process.env.NEXT_PUBLIC_USE_PKCE === 'true',
//         },
//         browse: {
//           category: {
//             urlPrefix: process.env.NEXT_PUBLIC_CATEGORY_URL_PREFIX,
//           },
//           content: {
//             urlPrefix: process.env.NEXT_PUBLIC_CONTENT_URL_PREFIX,
//           },
//           product: {
//             urlPrefix: process.env.NEXT_PUBLIC_PRODUCT_URL_PREFIX,
//           },
//           defaultLocale: process.env.DEFAULT_LOCALE,
//           defaultCurrency: process.env.DEFAULT_CURRENCY,
//           ratingsAndReviews: {
//             myAccountListSize: process.env.NEXT_PUBLIC_MY_REVIEWS_PAGE_SIZE,
//             pdpListSize: process.env.NEXT_PUBLIC_PDP_REVIEWS_PAGE_SIZE,
//           },
//           recentlyViewed: {
//             persistenceThreshold: process.env.NEXT_PUBLIC_RECENTLY_VIEWED_LIST_PERSIST_THRESHOLD,
//             displayThreshold: process.env.NEXT_PUBLIC_RECENTLY_VIEWED_LIST_DISPLAY_THRESHOLD,
//           },
//         },
//         client: {
//           baseHost: process.env.NEXT_PUBLIC_CLIENT_BASE_HOST,
//           gatewayHost: process.env.NEXT_PUBLIC_GATEWAY_HOST,
//           debugRequests: process.env.NEXT_PUBLIC_DEBUG_REQUESTS === 'true',
//         },
//         gtm: {
//           id: process.env.NEXT_PUBLIC_GTM_ID,
//           env: process.env.NEXT_PUBLIC_GTM_ENV,
//           auth: process.env.NEXT_PUBLIC_GTM_AUTH,
//           bulkCartOpBatchSize: process.env.NEXT_PUBLIC_GTM_BULK_CART_OP_BATCH_SIZE,
//         },
//         myAccount: {
//           orderHistorySize: process.env.NEXT_PUBLIC_MY_ACCOUNT_ORDER_HISTORY_SIZE,
//           accountUserListSize: process.env.NEXT_PUBLIC_MY_ACCOUNT_ACCOUNT_USER_LIST_SIZE,
//           accountInvitesListSize: process.env.NEXT_PUBLIC_MY_ACCOUNT_ACCOUNT_INVITES_LIST_SIZE,
//           cartsApprovalListSize: process.env.NEXT_PUBLIC_MY_ACCOUNT_CARTS_APPROVAL_LIST_SIZE,
//           myCartsSize: process.env.NEXT_PUBLIC_MY_ACCOUNT_MY_CARTS_SIZE,
//         },
//         payment: {
//           gatewayType: process.env.NEXT_PUBLIC_PAYMENT_GATEWAY_TYPE,
//           checkout_com: {
//             publicKey: process.env.NEXT_PUBLIC_CHECKOUT_COM_PUBLIC_API_KEY,
//             applePayEnabled: process.env.NEXT_PUBLIC_CHECKOUT_COM_APPLE_PAY_ENABLED,
//           },
//           paypal: {
//             checkout: {
//               clientId: process.env.NEXT_PUBLIC_PAYMENT_PAYPALCHECKOUT_CLIENT_ID,
//               env: process.env.NEXT_PUBLIC_PAYMENT_PAYPALCHECKOUT_ENV,
//               enableCartCheckout: process.env.NEXT_PUBLIC_PAYMENT_PAYPALCHECKOUT_CART === 'true',
//             },
//           },
//           stripe: {
//             publicApiKey: process.env.NEXT_PUBLIC_STRIPE_PUBLIC_API_KEY,
//           },
//         },
//         search: {
//           defaultSize: process.env.NEXT_PUBLIC_SEARCH_RESULTS_PAGE_SIZE,
//           defaultSort: process.env.NEXT_PUBLIC_SEARCH_RESULTS_DEFAULT_SORT,
//         },
//         server: {
//           origin: process.env.NEXT_PUBLIC_API_ORIGIN,
//           secure: process.env.SECURE === 'true',
//         },
//         tenant: {
//           resolution: process.env.NEXT_PUBLIC_TENANT_RESOLVER_APPLICATION_RESOLUTION,
//           parameter: process.env.NEXT_PUBLIC_TENANT_RESOLVER_APPLICATION_PARAMETER,
//           token: process.env.NEXT_PUBLIC_TENANT_RESOLVER_APPLICATION_TOKEN,
//         },
//       },
//     };
//   }

//   return {
//     /* config options for all phases except development here */
//   };
// };

module.exports = () => {
  const rewrites = () => {
    return [
      {
        source: "/broadleaf",
        destination: "https://hospitality.admin.legends.blcdemo.com",
      },
    ];
  };
  return {
    rewrites,
  };
};


const endpoint_deploy = 'https://gop-server.vercel.app/api/docs';
const endpoint_local = 'http://localhost:8080/api/v1';
const endpoint = endpoint_deploy;
export const URLConstant = {
  ROUTE: {
    HOMEPAGE: '/',
    RESTAURANT_PAGE: {
      BASE: '/restaurant',
    },
    CUISINE_PAGE: {
      BASE: '/cuisines'
    },
    ORDER_PAGE: {
      BASE: '/order/checkout',
      TRACKER: '/order/tracker'
    },
    WISH_LIST: {
      BASE: '/wishlist'
    }
  },
  API: {
    FILE: endpoint + 'rest/file',
    ENDPOINT: endpoint,
    AUTH: {
      SIGNIN: '/auth/customer/signin',
      SIGNUP: '/auth/customer/signup',
      REFRESH: '/auth/customer/refresh'
    },
    PROFILE: {
      GET: '/customer/profile'
    },
    RESTAURANT: {
      GET_LIST: '/restaurant/recommended',
      GET_INFO: '/restaurant/info',
      GET_MENU: '/restaurant/menu',
      GET_FOOD_DETAILS: '/restaurant/fooditem/'
    },
    ORDER: {
      QUOTE: '/order/quote/delivery'
    },
    CAMPAIGN: {
      GET_ALL: '/customer/campaigns'
    },
    PAYMENT: {
      METHOD: {
        VNPAY: '/bill/vnpay'
      },
      RETURN_URL: 'http://localhost:4200/user/wallet',
      RETURN_URL_PAY_FOR_BILL: 'http://localhost:4200/order/checkout'
    }
  }
};

import { environment } from "src/environments/environment";

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
      BASE: '/order',
      TRACKING: '/tracking',
      CHECKOUT: '/checkout'
    },
    WISH_LIST: {
      BASE: '/wishlist'
    }
  },
  API: {
    FILE: environment.api.baseUrl + 'rest/file',
    ENDPOINT: environment.api.baseUrl,
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
      GET_FOOD_DETAILS: '/restaurant/fooditem/',
      GET_NEARBY: '/restaurant/nearby',
    },
    ORDER: {
      QUOTE: '/order/quote/delivery'
    },
    CAMPAIGN: {
      GET_ALL: '/campaign/all',
    },
    PAYMENT: {
      METHOD: {
        CREATE: '/payment/vnpay/create'
      },
      RETURN_URL: '/user/wallet',
      RETURN_URL_PAY_FOR_BILL: 'http://localhost:4200/order/checkout'
    }
  }
};


const endpoint_deploy = 'https://gop-gateway.purplesand-fad3fa4f.southeastasia.azurecontainerapps.io';
const endpoint_local = 'http://localhost:8080';
const endpoint = endpoint_local;
export const URLConstant = {
  ROUTE: {
    HOMEPAGE: '/',
    RESTAURANT_PAGE: {
      BASE: '/restaurant',
    },
    CUISINE_PAGE: {
      BASE: '/cuisines'
    },
    CHECKOUT_PAGE: {
      BASE: '/checkout'
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
      GET_INFO: '/restaurant/info'
    }
  }
};

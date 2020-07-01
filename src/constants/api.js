export const BASE_URL = 'http://07e73ed5b2e1.ngrok.io/v1';
export const url = (uri) => `${BASE_URL}${uri}`;
export const SIGN_IN = url('/users/login');
export const REGISTER = url('/users/register');

export const VET_SERVICE_ALL = `/merchants`;

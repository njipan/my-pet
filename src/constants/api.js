export const BASE_URL = 'https://api.dhirawigata.com/artemis/v1';
export const url = (uri) => `${BASE_URL}${uri}`;
export const SIGN_IN = '/users/login';
export const REGISTER = '/users/register';
export const CHECK_TOKEN = '/users/profile';

export const PROFILE_CUSTOMER = '/users/profile';
export const UPDATE_CUSTOMER = '/users/profile';
export const UPDATE_PASSWORD_CUSTOMER = '/users/profile/password';

export const VET_SERVICE_ALL = `/merchants`;

export const PET_ALL = `/pets`;
export const PET_CREATE = `/pets/add`;
export const PET_UPDATE = `/pets/update`;
export const PET_DELETE = `/pets/delete`;

export const UPLOAD_PICTURE = `/pictures`;

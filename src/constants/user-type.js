export const CUSTOMER = 1;
export const MERCHANT = 2;

export const trans = (value) => {
  return value == CUSTOMER ? 'Customer' : value == MERCHANT ? 'Merchant' : null;
};

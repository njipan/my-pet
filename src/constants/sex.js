import MaleIcon from '@asset/icons/sex/male.png';
import FemaleIcon from '@asset/icons/sex/female.png';

export const FEMALE = 'FEMALE';
export const MALE = 'MALE';

export const getIcon = (value) => {
  return value == MALE ? MaleIcon : FemaleIcon;
};

export const translate = (value) => {
  return value == MALE ? `Jantan` : 'Betina';
};

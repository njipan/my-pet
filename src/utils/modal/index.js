import {Modal} from './../../shared';
import GlobalNavigation from './../navigation';

export const confirm = (params) => {
  GlobalNavigation.navigate(Modal.Type.CONFIRMATION, {...params});
};

export const select = (params) => {
  GlobalNavigation.navigate(Modal.Type.SELECT, {...params});
};

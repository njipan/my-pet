import {NavigationActions, StackActions} from 'react-navigation';

let _navigator;

function setTopLevelNavigator(navigatorRef) {
  _navigator = navigatorRef;
}

function navigate(routeName, params) {
  _navigator.dispatch(
    NavigationActions.navigate({
      routeName,
      params,
    }),
  );
}

function resetTo(navigatorName, index = 0) {
  _navigator.dispatch(
    StackActions.reset({
      index,
      key: null,
      actions: [
        NavigationActions.navigate({
          routeName: navigatorName,
        }),
      ],
    }),
  );
}

export default {
  navigate,
  setTopLevelNavigator,
  resetTo,
};

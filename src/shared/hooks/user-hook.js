import React from 'react';
import {AuthService} from '@service';

export default () => {
  const [user, setUser] = React.useState({});

  const refreshUser = async () => {
    try {
      setUser(await AuthService.getUser());
    } catch (error) {}
  };

  React.useEffect(() => {
    refreshUser();
  }, []);

  return {
    user,
    setUser,
    refreshUser,
  };
};

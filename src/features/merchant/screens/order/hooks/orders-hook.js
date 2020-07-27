import React from 'react';
import {OrderService} from '@service';

export default (
  initialOrder = {},
  initLoading = true,
  effectProcess = true,
) => {
  const [orders, setOrders] = React.useState(initialOrder);
  const [orderLoading, setOrderLoading] = React.useState(initLoading);

  const refreshOrders = async () => {
    setOrderLoading(true);
    try {
      const response = await OrderService.all();
      setOrders(response);
      setOrderLoading(false);
      return response;
    } catch (err) {
      console.log(err);
    }
    setOrderLoading(false);
  };

  React.useEffect(() => {
    if (effectProcess) refreshOrders();
  }, []);

  return {
    orders,
    orderLoading,
    refreshOrders,
    getOrders: (status) => {
      return orders[status] || [];
    },
  };
};

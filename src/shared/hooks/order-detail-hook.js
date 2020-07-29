import React from 'react';
import {PetService, OrderService} from '@service';
import 'intl';

export default (id, initLoading = true, effectProcess = true) => {
  const [order, setOrder] = React.useState({});
  const [orderLoading, setOrderLoading] = React.useState(initLoading);

  const refreshOrder = async () => {
    setOrderLoading(true);
    try {
      const response = await OrderService.get(id);
      const temp_order_pets = [];
      const summary = {};
      for (let pet of response.order_pets) {
        const pet_detail = await PetService.get(pet.pet_id);
        pet.pet_name = pet_detail.pets.name || null;
        pet.pet_detail = pet_detail.pets || {};
        temp_order_pets.push(pet);
        for (let service of pet.order_pet_services) {
          const summaryItem = summary[service.merchant_service_id] || {};
          const name = service.service_name;
          const qty = service.service_qty + (summaryItem.qty || 0);
          const price = service.service_price;
          const amount = qty * price;
          summary[service.merchant_service_id] = {
            name,
            qty,
            price,
            amountFormatted: `Rp ${new Intl.NumberFormat(['id']).format(
              amount || 0,
            )}`,
            amount: amount,
          };
        }
      }
      const ppn = response.amount * 0.1;
      summary['-1'] = {
        name: 'PPn',
        qty: 1,
        price: ppn,
        amountFormatted: `Rp ${new Intl.NumberFormat(['id']).format(ppn || 0)}`,
        amount: `Rp ${new Intl.NumberFormat(['id']).format(ppn || 0)}`,
      };

      response.order_pets = temp_order_pets;
      response.summary = summary;
      response.amount += ppn;
      setOrder(response);
      setOrderLoading(false);
      return response;
    } catch (err) {
      console.log(err);
    }
    setOrderLoading(false);
  };

  React.useEffect(() => {
    if (effectProcess) refreshOrder();
  }, []);

  return {
    order,
    setOrder,
    orderLoading,
    setOrderLoading,
    refreshOrder,
  };
};

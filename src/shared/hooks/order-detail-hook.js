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
          const summaryItem = summary[service.id] || {};
          const name = service.service_name;
          const qty = service.service_qty + (summaryItem.qty || 0);
          const price = service.service_price;
          const amount = (summaryItem.amount || 0) + qty * price;
          summary[service.id] = {
            name,
            qty,
            price,
            amount: `Rp ${new Intl.NumberFormat(['id']).format(amount || 0)}`,
          };
        }
      }
      response.order_pets = temp_order_pets;
      response.summary = summary;
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

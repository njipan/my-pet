import React from 'react';
import {singleValidate} from '@util/validate';

const useSchema = (initData = {}, initMessages = {}, schema = {}) => {
  const [data, setData] = React.useState(initData);
  const [messages, setMessages] = React.useState(initMessages);

  const setFormAndValidate = (key, value) => {
    const message = singleValidate(value, schema[key]);
    setMessages({...messages, [key]: message});
    setData({...data, [key]: value});
  };

  return {
    data,
    messages,
    setData,
    setMessages,
    setFormAndValidate,
    setValueAndValidate: (key) => (value) => setFormAndValidate(key, value),
  };
};

export default useSchema;

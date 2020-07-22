import React from 'react';
import {singleValidate} from '@util/validate';

const useSchema = (initData = {}, initMessages = {}, schema = {}) => {
  const [data, setData] = React.useState(initData);
  const [messages, setMessages] = React.useState(initMessages);

  const setFormAndValidate = (key, value, fn) => {
    const message = singleValidate(value, schema[key] || null);
    setMessages({...messages, [key]: message});
    setData({...data, [key]: value});
    if (fn) fn(key, value, data);
  };

  return {
    data,
    getData: () => data,
    messages,
    setData,
    setMessages,
    setFormAndValidate,
    setValueAndValidate: (key, fn) => (value) => {
      setFormAndValidate(key, value, fn);
    },
  };
};
export {useSchema};
export default useSchema;

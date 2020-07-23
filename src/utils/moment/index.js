import moment from 'moment';
import 'moment/locale/id';

export const parseDateFromNow = (date, format = 'DD-MM-YYYY') => {
  const parseDate = moment(date, format);
  return parseDate.isValid()
    ? `${parseDate.locale('id').fromNow(true)}`
        .replace('setahun', `1 tahun`)
        .replace('sebulan', `1 bulan`)
        .replace('seminggu', '1 minggu')
        .replace('sehari', '1 hari')
        .replace('sejam', '1 jam')
        .replace('semenit', '1 menit')
        .replace('sedetik', '1 detik')
    : null;
};

export {moment};
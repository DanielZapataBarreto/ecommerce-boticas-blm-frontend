import { Notify } from 'notiflix';
import { Report } from 'notiflix/build/notiflix-report-aio';

export const showReport = (
  type: string,
  title: string,
  message: string,
  callback?: void
) => {
  switch (type) {
    case 'success':
      Report.success(title, message, 'Listo');
      break;
    case 'failure':
      Report.failure(title, message, 'Listo');
      break;
    case 'warning':
      Report.warning(title, message, 'Listo');
      break;
    case 'info':
      Report.info(title, message, 'Listo');
      break;
    case 'callback-success':
      Report.success(title, message, 'Listo', callback!);
      break;
    case 'callback-failure':
      Report.failure(title, message, 'Listo', callback!);
      break;
    case 'callback-warning':
      Report.warning(title, message, 'Listo', callback!);
      break;
    case 'callback-info':
      Report.info(title, message, 'Listo', callback!);
      break;
    default:
      break;
  }
};

export const showNotification = (
  type: string,
  message: string,
  callback?: void
) => {
  switch (type) {
    case 'success':
      Notify.success(message, { timeout: 1300 });
      break;
    case 'failure':
      Notify.failure(message, { timeout: 1300 });
      break;
    case 'warning':
      Notify.warning(message, { timeout: 1300 });
      break;
    case 'info':
      Notify.info(message, { timeout: 1300 });
      break;
    case 'callback':
      Notify.info(message, callback!, { timeout: 1300 });
      break;
    default:
      break;
  }
};

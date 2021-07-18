import { action } from 'typesafe-actions';
import { Notification, NotificationsTypes, NotificationTypeEnum } from './types';
import { generateKey } from '../../../components/utils/utils';

export const enqueue = (notificationData: any, error: boolean) => {  
  let message = "";
  let code = 200;
  let type = NotificationTypeEnum.SUCESS;
  let date = new Date()
  if (error) {
    if (notificationData && notificationData.response && notificationData.response.data) {
      let error = notificationData.response.data;
      message = error.error;
      code = error.status;
      type = NotificationTypeEnum.ERROR;
      date = error.timestamp;
    }
  } else {
    if (notificationData && notificationData.message) {
      message = notificationData.message;
    }
  }

  var notification: Notification = {
    key: generateKey(),
    message: message,
    date: date,
    code: code,
    type: type,
    dismissed: false
  };  
  console.log("notification actions:")
  console.log(notificationData)
  return action(NotificationsTypes.ENQUEUE, { notification });
}
export const close = (key: number, dismissAll: boolean) => action(NotificationsTypes.CLOSE, { key, dismissAll });
export const remove = (key: number,) => action(NotificationsTypes.REMOVE, { key });
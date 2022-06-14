import { action } from 'typesafe-actions';
import { Notification, NotificationsTypes, NotificationTypesEnums } from './types';
import { generateKey } from '../../../components/utils/utils';

export const enqueue = (notificationData: any) => {
   var notification: Notification = {
    key: generateKey(),
    message: notificationData.message,
    date: new Date(),
    code: 200,
    type: NotificationTypesEnums.SUCESS,
    dismissed: false,
    position: 'bottom'
  };
  
  return action(NotificationsTypes.ENQUEUE, { notification });
}

export const enqueueError = (notificationData: any) => {
  let message = "notifications.generic_error";
  let code = 500;
  let type = NotificationTypesEnums.ERROR;
  let date = new Date()

  if (notificationData && notificationData.response && notificationData.response.data) {
    let error = notificationData.response.data;
    message = getErrorMessage(error)
    code = error.status;  
    date = error.timestamp;
  }
    var notification: Notification = {
      key: generateKey(),
      message: message,
      date: date,
      code: code,
      type: type,
      dismissed: false,
      position: 'bottom'
    };
      
    return action(NotificationsTypes.ENQUEUE, { notification });
  }
  export const close = (key: number, dismissAll: boolean) => action(NotificationsTypes.CLOSE, { key, dismissAll });
  export const remove = (key: number,) => action(NotificationsTypes.REMOVE, { key });

  function getErrorMessage(error: any){
    if(error.message){
      return error.message
    }
    if(error.error_description){
      return error.error_description
    }
    return error.error
  }
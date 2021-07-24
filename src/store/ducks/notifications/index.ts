import { Reducer } from 'redux';
import { generateKey } from '../../../components/utils/utils';
import { NotificationsState, NotificationsTypes } from './types'

const INITIAL_STATE: NotificationsState = {
  notificationsData: [],
};

const reducer: Reducer<NotificationsState> = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case NotificationsTypes.ENQUEUE:
      var notificationData = action.payload.notification;
      console.log("notification index")
      console.log(notificationData)      
      return {
        ...state,
        notificationsData: [
          ...state.notificationsData,
          {
            key: notificationData.key || generateKey(),
            ...notificationData
          }
        ]
      };
    case NotificationsTypes.CLOSE:
      var { dismissAll, key } = action.payload;
      return {
        ...state,
        notifications: state.notificationsData.map((notification) =>
          dismissAll || notification.key === key
            ? { ...notification, dismissed: true }
            : { ...notification }
        )
      };
    case NotificationsTypes.REMOVE:
      var { key } = action.payload;
      return {
        ...state,
        notifications: state.notificationsData.filter(
          (notification) => notification.key !== key
        )
      };
    default:
      return state;
  }
}

export default reducer;
/**
* Action types 
*/
export enum NotificationsTypes {
  ENQUEUE = '@notifications/ENQUEUE',
  CLOSE = '@notifications/CLOSE',
  REMOVE = '@notifications/REMOVE'
};
/**
 * Data types
 */
export interface Notification {
  key: number,
  message: String,
  code: number,
  date: Date,
  type: NotificationTypeEnum,
  dismissed: boolean
}

export enum NotificationTypeEnum {
  SUCESS,
  ERROR,
  WARN,
  INFO
}

export enum notificationTypesEnums {
  Success = 'Success',
  Fail = 'Fail',
  Info = 'Info',
  Warning = 'Warning',
}

export enum backgroundColorEnums {
  Success = '#5bb85a',
  Fail = '#d94948',
  Info = '#55bede',
  Warning = '#f0a54b',
}

/**
 *  State type
 */
export interface NotificationsState {
  readonly notificationsData: Notification[]
}


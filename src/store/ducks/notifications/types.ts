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
  message: string,
  code: number,
  date: Date,
  type: NotificationTypesEnums,
  dismissed: boolean,
  position: String
}

export enum NotificationTypesEnums {
  SUCESS = 'success',
  ERROR = 'error',
  INFO = 'info',
  WARNING = 'warning',
}

export enum backgroundColorEnums {
  SUCESS = '#5bb85a',
  ERROR = '#d94948',
  INFO = '#55bede',
  WARNING = '#f0a54b',
}

/**
 *  State type
 */
export interface NotificationsState {
  readonly notificationsData: Notification[]
}
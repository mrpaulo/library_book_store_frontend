/**
 * Copyright (C) 2021 paulo.rodrigues
 * Profile: <https://github.com/mrpaulo>
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program.  If not, see <http://www.gnu.org/licenses/>.
 */

//React
import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
//Actions and store
import { ApplicationState } from '../../store';
import * as notificationsActions from '../../store/ducks/notifications/actions';
//Types 
import { Notification, NotificationTypesEnums } from '../../store/ducks/notifications/types';
//Translation
import { useTranslation } from "react-i18next";
import "../../services/i18n/i18n";
//Style
import { SnackbarOrigin, Snackbar, IconButton } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert,  AlertTitle, Color } from '@material-ui/lab';

interface StateProps {
  notifications: Notification[]
}

interface DispatchProps {
  close(key: any, dismissAll: boolean): void,
  remove(key: any): void,
}
export interface StateSnack extends SnackbarOrigin {
  open: boolean;
}

type Props = StateProps & DispatchProps

const Notifier: React.FC<Props> = (props) => {
  const { t } = useTranslation();  
  const { notifications, remove } = props;
  const [alertTitle, setAlertTitle] = useState<String>("");
  const [alertMessage, setAlertMessage] = useState<string>("");
  const [alertSeverity, setAlertSeverity] = useState<Color>('success');
  const [duration, setDuration] = useState<number>(5000);

  const [state, setState] = useState<StateSnack>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };

  useEffect(() => {
    notifications.forEach((notification) => {
      if (notification) {
        switch (notification.type) {
          case NotificationTypesEnums.SUCESS:
            setAlertSeverity('success');
            setAlertTitle(t('notifications.sucess'));
            setDuration(4000);
            break
          case NotificationTypesEnums.INFO:
            setAlertSeverity('info');
            setAlertTitle(t('notifications.info'));
            setDuration(5000);
            break
          case NotificationTypesEnums.WARNING:
            setAlertSeverity('warning');
            setAlertTitle(t('notifications.warning'));
            setDuration(6000);
            break
          case NotificationTypesEnums.ERROR:
            setAlertSeverity('error');
            setAlertTitle(t('notifications.error'));
            setDuration(8000);
            break
          default:
        }
        setAlertMessage(notification.message);
      setState({ ...state, open: true });
      }

      console.log("Notificator")
      console.log(notification)
    })
// eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications, remove]);

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        key={vertical + 'right'}
        autoHideDuration={duration}
        action={
          <React.Fragment>
            <IconButton
              aria-label="close"
              color="inherit"
              onClick={handleClose}
            >
              <CloseIcon />
            </IconButton>
          </React.Fragment>
        }
      >
        <Alert variant="filled" onClose={handleClose} severity={alertSeverity}>
          <AlertTitle>{alertTitle}</AlertTitle>
          {t(alertMessage)}
        </Alert>
      </Snackbar>
    </>);
};

Notifier.displayName = 'Notifier';

const mapStateToProps = (state: ApplicationState) => ({
  notifications: state.notifications.notificationsData
});
const mapDispatchToProps = (dispatch: Dispatch) => bindActionCreators(notificationsActions, dispatch);

export default connect(mapStateToProps, mapDispatchToProps)(Notifier);
import React, { useState, useCallback, useEffect } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators, Dispatch } from 'redux';
import { ApplicationState } from '../../store';

import * as notificationsActions from '../../store/ducks/notifications/actions';

import { Notification } from '../../store/ducks/notifications/types';
import { Button, SnackbarOrigin, Snackbar, IconButton, Slide} from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { Alert } from '@material-ui/lab';

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
  const {  notifications, close, remove } = props;
  
  const [state, setState] = React.useState<StateSnack>({
    open: false,
    vertical: 'bottom',
    horizontal: 'right',
  });
  const { vertical, horizontal, open } = state;

  const handleClick = (newState: SnackbarOrigin) => () => {
    setState({ open: true, ...newState });
    console.log("Chamou o abrir")
  };

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  const [displayed, setDisplayed] = useState<Notification[]>([]);

  useEffect(() => {
    if (notifications.length === 0) {
      setDisplayed([]);
    }
    notifications.forEach((notification) => {
      setState({ ...state, open: true });
      console.log("Notificator")
      console.log(notification)
    })  

  }, [ notifications, remove]); 

  return (
    <>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="I love snacks"
        key={vertical + horizontal}
        autoHideDuration={6000}
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
        <Alert onClose={handleClose} severity="success">
          This is a success message!
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
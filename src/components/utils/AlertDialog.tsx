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
import * as React from 'react';
//Style
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle } from '@material-ui/core';

interface AlertDialogProps {  
  title: string,
  content: string,
  agreeBtnLabel: string,
  disagreeBtnLabel: string,
  isOpen: boolean,
  setAgreed(): void, 
  handleClose(): void 
}

export const AlertDialog = ({
  title, content, agreeBtnLabel, disagreeBtnLabel, isOpen = false, setAgreed, handleClose  
}: AlertDialogProps) => {

  
  return (
    <>      
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
        {title}         
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
          {content}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>{disagreeBtnLabel}</Button>
          <Button onClick={setAgreed} autoFocus>
          {agreeBtnLabel}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}


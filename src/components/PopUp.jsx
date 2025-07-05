import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function PopupDialog({ open, onClose, title, message, buttonText = "Close" }) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="popup-title"
            aria-describedby="popup-description"
        >
            {title && <DialogTitle id="popup-title">{title}</DialogTitle>}
            <DialogContent>
                <DialogContentText id="popup-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="primary">
                    {buttonText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
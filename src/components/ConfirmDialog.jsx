import React from 'react';
import { Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button } from '@mui/material';

export default function ConfirmDialog({
    open,
    onClose,
    onConfirm,
    title = "Confirm",
    message = "Are you sure?",
    confirmText = "Confirm",
    cancelText = "Cancel"
}) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            aria-labelledby="confirm-dialog-title"
            aria-describedby="confirm-dialog-description"
        >
            {title && <DialogTitle id="confirm-dialog-title">{title}</DialogTitle>}
            <DialogContent>
                <DialogContentText id="confirm-dialog-description">
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose} color="inherit">
                    {cancelText}
                </Button>
                <Button onClick={onConfirm} color="primary" variant="contained" autoFocus>
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
}
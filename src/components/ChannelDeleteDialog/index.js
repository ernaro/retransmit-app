import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogActions from "@mui/material/DialogActions";
import Button from "@mui/material/Button";

const ChannelDeleteDialog = ({ name, open, handleClose, handleDelete }) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{"Delete channel"}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Channel "<b>{name}</b>" will be stopped and permanently deleted. Do
          You want to delete channel?
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" color="success" onClick={handleDelete}>
          Delete
        </Button>
        <Button
          variant="outlined"
          color="error"
          onClick={handleClose}
          autoFocus
        >
          Cancel
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ChannelDeleteDialog;

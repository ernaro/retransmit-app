import Alert from "@mui/material/Alert";
import Snackbar from "@mui/material/Snackbar";

const ChannelSnackbar = ({open, onClose, message}) => (
  <Snackbar
    open={open}
    autoHideDuration={2000}
    onClose={onClose}
    anchorOrigin={{vertical: "bottom", horizontal: "right"}}
  >
    <Alert
      onClose={onClose}
      severity="success" sx={{ width: '100%' }}
    >
      { message }
    </Alert>
  </Snackbar>
)

export default ChannelSnackbar;
import AppBar from '@mui/material/AppBar';
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

const NavBar = () => {

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography
          variant="h6"
          component={"div"}
          sx={{flexGrow: 1}}
        >
          ReTransmit
        </Typography>
        <IconButton>
          <AccountCircle />
        </IconButton>
      </Toolbar>
    </AppBar>
  )
}

export default NavBar;
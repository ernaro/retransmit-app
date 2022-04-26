import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

import Link from "../Link";


const ChannelAccordionToolbar = () => {
  return(
    <Toolbar sx={ { mb: 2 } }>
      <Button
        sx={ { mr: "auto" } }
        component={ Link }
        href="/channels/add"
        variant="outlined"
        color="success"
      >
        Create
      </Button>
      <Typography component="div" variant="p2">
        Filter by:
      </Typography>
      <Box sx={{ mr: 3 }} >
        <FormControlLabel control={<Checkbox />} label="udp" labelPlacement="start" />
        <FormControlLabel control={<Checkbox />} label="srt" labelPlacement="start" />
      </Box>
      <TextField  variant="standard"  placeholder="Search:" />
    </Toolbar>
  )
}

export default ChannelAccordionToolbar;
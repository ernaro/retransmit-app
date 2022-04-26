import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

import Link from "../Link";
import MenuItem from '@mui/material/MenuItem';


const ChannelAccordionToolbar = ({ searchValue, filterValue, handleSearchChange, handleFilterChange }) => {
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
        Show:
      </Typography>
      {/*<Box sx={{ mr: 3 }} >*/}
      {/*  <FormControlLabel control={<Checkbox />} label="udp" labelPlacement="start" />*/}
      {/*  <FormControlLabel control={<Checkbox />} label="srt" labelPlacement="start" />*/}
      {/*</Box>*/}
      <TextField
        select
        sx={{mr: 3, ml: 2}}
        variant="standard"
        value={ filterValue }
        onChange={ handleFilterChange }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="udp">UDP Out</MenuItem>
        <MenuItem value="srt">SRT Out</MenuItem>
      </TextField>
      <TextField onChange={ handleSearchChange } value={ searchValue }  variant="standard"  placeholder="Search:" />
    </Toolbar>
  )
}

export default ChannelAccordionToolbar;
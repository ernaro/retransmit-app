import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Toolbar from '@mui/material/Toolbar';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

import Link from '../Link';


const ChannelAccordionToolbar = ({ searchValue, filterValue, handleSearchChange, handleFilterChange }) => {
  return (
    <Toolbar sx={ { mb: 2 } }>
      <Button
        sx={ { mr: 'auto' } }
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
      <Select
        sx={ { mr: 1, ml: 1 } }
        variant="standard"
        displayEmpty
        value={ filterValue }
        onChange={ handleFilterChange }
      >
        <MenuItem value="">All</MenuItem>
        <MenuItem value="udp">UDP Out</MenuItem>
        <MenuItem value="srt">SRT Out</MenuItem>
      </Select>
      <TextField
        onChange={ handleSearchChange }
        value={ searchValue }
        variant="standard"
        placeholder="Search:"
      />
    </Toolbar>
  )
}

export default ChannelAccordionToolbar;
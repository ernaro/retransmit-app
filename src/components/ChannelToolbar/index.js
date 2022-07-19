import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Toolbar from "@mui/material/Toolbar";

import Link from "../Link";

const ChannelToolbar = ( {
  searchValue,
  handleSearchChange
}) => {
  return (
    <Toolbar sx={{ mb: 2 }}>
      <Button
        sx={{ mr: "auto" }}
        component={ Link }
        href="/channels/add-channel"
        variant="outlined"
        color="success"
      >
        Create
      </Button>
      <TextField
        onChange={handleSearchChange}
        value={searchValue}
        variant="standard"
        placeholder="Search:"
      />
    </Toolbar>
  );
};

export default ChannelToolbar;

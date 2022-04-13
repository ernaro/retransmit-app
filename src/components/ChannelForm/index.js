import { useState } from "react";
import { useRouter } from "next/router";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Select from "@mui/material/Select";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import InputLabel from "@mui/material/InputLabel";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { createChannel } from "../../service/localApiService";

import Link from "../Link";

const defaultValues = {
  name: "",
  serviceType: "digital_tv",
  bitrate: "",
  input: "",
  output: "",
  enabled: false
}

const ChannelForm = () => {
  const [formValues, setFormValues] = useState(defaultValues);
  const router = useRouter();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // console.log(formValues);
    createChannel(formValues).then(() => router.replace("/"));
  };

  return(
    <Paper sx={{padding: '1rem'}}>
      <Typography component="div" variant="h4" textAlign="center">Add channel</Typography>
      <Box component="form" onSubmit={handleSubmit} >
        <TextField
          id="name"
          margin="normal"
          variant="standard"
          fullWidth
          label="Name:"
          name="name"
          required
          value={formValues.name}
          onChange={handleInputChange}
        />
        <FormControl fullWidth required margin="normal" variant="standard">
          <InputLabel >Service Type</InputLabel>
          <Select name="serviceType" value={formValues.serviceType} onChange={handleInputChange}>
            <MenuItem key="digital_tv" value="digital_tv">
              MPEG-2 SD
            </MenuItem>
            <MenuItem key="advanced_codec_digital_sdtv" value="advanced_codec_digital_sdtv">
              MPEG-4 SD
            </MenuItem>
            <MenuItem key="advanced_codec_digital_hdtv" value="advanced_codec_digital_hdtv">
              MPEG-4 HD
            </MenuItem>
          </Select>
        </FormControl>
        <TextField
          fullWidth
          required
          variant="standard"
          margin="normal"
          id="bitrate"
          label="Bitrate:"
          name="bitrate"
          value={formValues.bitrate}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          required
          variant="standard"
          margin="normal"
          id="input"
          label="Input:"
          name="input"
          value={formValues.input}
          onChange={handleInputChange}
        />
        <TextField
          fullWidth
          required
          variant="standard"
          margin="normal"
          id="output"
          label="Output:"
          name="output"
          value={formValues.output}
          onChange={handleInputChange}
        />
        <FormControl required variant="standard" fullWidth margin="normal">
          <InputLabel>Status</InputLabel>
          <Select name="enabled" value={formValues.enabled} onChange={handleInputChange}>
            <MenuItem key="enabled" value={ true }>
              Enabled
            </MenuItem>
            <MenuItem key="disabled" value={ false }>
              Disabled
            </MenuItem>
          </Select>
        </FormControl>
        <Button sx={{mt: 2}} fullWidth variant="outlined" color="success" type="submit">Save</Button>
        <Button sx={{mt: 2}} fullWidth component={Link} href="/" variant="outlined" color="error">Cancel</Button>
      </Box>
    </Paper>
  )
}

export default ChannelForm;
import { useState } from "react";
import { useRouter } from "next/router";
import { useFormik } from 'formik';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Snackbar from "@mui/material/Snackbar";
import SnackbarContent from "@mui/material/SnackbarContent";
import * as Yup from 'yup';

import Link from "../Link";
import { createChannel, updateChannelById } from "../../service/localApiService";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  serviceType: Yup.string().required("Service type is is required!"),
  bitrate: Yup.string().required("Bitrate is required!"),
  input: Yup.string().required("Input Url is required!"),
  output: Yup.string().required("Output Url is required!"),
  enabled: Yup.boolean().required("Status is required!"),
})

const ChannelForm = ({ channel }) => {
  const router = useRouter();
  const [ open, setOpen ] = useState(false);
  const [ message, setMessage ] = useState('')
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    isSubmitting,
    isValidating,
    setSubmitting
  } = useFormik({
    initialValues: {
      id: channel?.id ?? null,
      name: channel?.name ?? "",
      serviceType: channel?.serviceType ?? "digital_tv",
      bitrate: channel?.bitrate ?? "",
      input: channel?.input ?? "",
      output: channel?.output ?? "",
      enabled: channel?.enabled ?? false,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: (values) => {
      if (values.id !== null) {
        updateChannelById(values.id, values)
          .then(() => router.replace('/'))
          .catch(err => {
            setSubmitting(false);
            setMessage(err.response.data.message);
            setOpen(true);
          });
      } else {
        createChannel(values)
          .then(() => router.replace('/'))
          .catch(err => {
            setSubmitting(false);
            setMessage(err.response.data.message);
            setOpen(true);
          });
      }
    },
  });

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpen(false);
    setMessage('')
  };

  return(
    <Paper sx={{padding: '1rem'}}>
      <Typography component="div" variant="h4" textAlign="center">Add channel</Typography>
      <Box component="form" onSubmit={handleSubmit} >
        <TextField
          name="name"
          label="Name:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.name }
          onChange={ handleChange }
          error={ touched.name && Boolean(errors.name) }
          helperText={touched.name && errors.name}
        />
        <TextField
          name="serviceType"
          label="ServiceType:"
          margin="normal"
          variant="standard"
          select
          fullWidth
          value={ values.serviceType }
          onChange={ handleChange }
          error={ touched.serviceType && Boolean(errors.serviceType) }
          helperText={touched.serviceType && errors.serviceType}
        >
          <MenuItem value="digital_tv">MPEG-2 SD</MenuItem>
          <MenuItem value="advanced_codec_digital_sdtv">MPEG-4 SD</MenuItem>
          <MenuItem value="advanced_codec_digital_hdtv">MPEG-4 HD</MenuItem>
        </TextField>
        <TextField
          name="bitrate"
          label="Bitrate:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.bitrate }
          onChange={ handleChange }
          error={ touched.bitrate && Boolean(errors.bitrate) }
          helperText={touched.bitrate && errors.bitrate}
        />
        <TextField
          name="input"
          label="Input:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.input }
          onChange={ handleChange }
          error={ touched.input && Boolean(errors.input) }
          helperText={touched.input && errors.input}
        />
        <TextField
          name="output"
          label="Output:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.output }
          onChange={ handleChange }
          error={ touched.output && Boolean(errors.output) }
          helperText={touched.output && errors.output}
        />
        <TextField
          name="enabled"
          label="Enabled:"
          margin="normal"
          variant="standard"
          select
          fullWidth
          value={ values.enabled }
          onChange={ handleChange }
          error={ touched.enabled && Boolean(errors.enabled) }
          helperText={touched.enabled && errors.enabled}
        >
          <MenuItem value={ true }>Enabled</MenuItem>
          <MenuItem value={ false }>Disabled</MenuItem>
        </TextField>
        <Button
          sx={{mt: 2}}
          fullWidth
          variant="outlined"
          color="success"
          type="submit"
          disabled={ isSubmitting || isValidating }
        >
          Save
        </Button>
        <Button
          sx={{mt: 2}}
          fullWidth
          component={Link}
          href="/"
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </Box>
      <Snackbar
        open={ open }
        autoHideDuration={ 6000 }
        onClose={ handleClose }
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right'
        }}
      >
        <SnackbarContent
          message={ message }
        />
      </Snackbar>
    </Paper>
  )
}

export default ChannelForm;
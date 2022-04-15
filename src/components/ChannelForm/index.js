import { useFormik } from 'formik';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import * as Yup from 'yup';
import Link from "../Link";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  serviceType: Yup.string().required("Service type is is required!"),
  bitrate: Yup.string().required("Bitrate is required!"),
  input: Yup.string().required("Input Url is required!"),
  output: Yup.string().required("Output Url is required!"),
  enabled: Yup.boolean().required("Status is required!"),
})

const ChannelForm = ({
    name = '',
    serviceType = 'digital_tv',
    bitrate = '',
    input = '',
    output = '',
    enabled = false,
    formTitle,
    submitHandler
}) => {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    isSubmitting,
    isValidating,
  } = useFormik({
    initialValues: {
      name: name,
      serviceType: serviceType,
      bitrate: bitrate,
      input: input,
      output: output,
      enabled: enabled,
    },
    enableReinitialize: true,
    validationSchema: validationSchema,
    onSubmit: submitHandler,
  });

  return (
    <Paper sx={ { padding: '1rem' } }>
      <Typography component="div" variant="h4" textAlign="center">{ formTitle }</Typography>
      <Box component="form" onSubmit={ handleSubmit }>
        <TextField
          name="name"
          label="Name:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.name }
          onChange={ handleChange }
          error={ touched.name && Boolean(errors.name) }
          helperText={ touched.name && errors.name }
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
          helperText={ touched.serviceType && errors.serviceType }
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
          helperText={ touched.bitrate && errors.bitrate }
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
          helperText={ touched.input && errors.input }
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
          helperText={ touched.output && errors.output }
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
          helperText={ touched.enabled && errors.enabled }
        >
          <MenuItem value={ true }>Enabled</MenuItem>
          <MenuItem value={ false }>Disabled</MenuItem>
        </TextField>
        <Button
          sx={ { mt: 2 } }
          fullWidth
          variant="outlined"
          color="success"
          type="submit"
          disabled={ isSubmitting || isValidating }
        >
          Save
        </Button>
        <Button
          sx={ { mt: 2 } }
          fullWidth
          component={ Link }
          href="/"
          variant="outlined"
          color="error"
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  )
}

export default ChannelForm;
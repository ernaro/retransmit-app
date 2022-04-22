import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "../Link";

const validationSchema = Yup.object({
  serviceName: Yup.string().required("Name is required!"),
  providerName: Yup.string().required("Provider name is required!"),
  serviceType: Yup.string().required("Service type is is required!"),
  serviceId: Yup.number().required("Service ID is required!"),
  pmtPid: Yup.number().required("PMT pid is required!"),
  componentsStartPid: Yup.number().required("Components start pid is required!"),
  bitrate: Yup.number().required("Bitrate is required!"),
  inputUrl: Yup.string().required("Input Url is required!"),
  // outputInterface: Yup.string().required("Please choose an output interface!"),
  outputUrl: Yup.string().required("Output Url is required!"),
  enabled: Yup.boolean().required("Status is required!"),
})

const ChannelForm = ({
    serviceName = '',
    providerName = '',
    serviceType = 'digital_tv',
    serviceId = 1101,
    pmtPid = 101,
    componentsStartPid = 111,
    bitrate = 6000000,
    inputUrl = '',
    outputUrl = '',
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
      serviceName: serviceName,
      providerName: providerName,
      serviceType: serviceType,
      serviceId: serviceId,
      pmtPid: pmtPid,
      componentsStartPid: componentsStartPid,
      bitrate: bitrate,
      inputUrl: inputUrl,
      // outputInterface: '',
      outputUrl: outputUrl,
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
          name="serviceName"
          label="Service Name:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.serviceName }
          onChange={ handleChange }
          error={ touched.serviceName && Boolean(errors.serviceName) }
          helperText={ touched.serviceName && errors.serviceName }
        />
        <TextField
          name="providerName"
          label="Provider Name:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.providerName }
          onChange={ handleChange }
          error={ touched.providerName && Boolean(errors.providerName) }
          helperText={ touched.providerName && errors.providerName }
        />
        <TextField
          name="serviceType"
          label="Service Type:"
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
          name="serviceId"
          type="number"
          label="Service Id:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.serviceId }
          onChange={ handleChange }
          error={ touched.serviceId && Boolean(errors.serviceId) }
          helperText={ touched.serviceId && errors.serviceId }
        />
        <TextField
          name="pmtPid"
          type="number"
          label="PMT Pid:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.pmtPid }
          onChange={ handleChange }
          error={ touched.pmtPid && Boolean(errors.pmtPid) }
          helperText={ touched.pmtPid && errors.pmtPid }
        />
        <TextField
          name="componentsStartPid"
          type="number"
          label="Components Start Pid:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.componentsStartPid }
          onChange={ handleChange }
          error={ touched.componentsStartPid && Boolean(errors.componentsStartPid) }
          helperText={ touched.componentsStartPid && errors.componentsStartPid }
        />
        <TextField
          name="bitrate"
          type="number"
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
          name="inputUrl"
          label="Input Url:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.inputUrl }
          onChange={ handleChange }
          error={ touched.inputUrl && Boolean(errors.inputUrl) }
          helperText={ touched.inputUrl && errors.inputUrl }
        />
        <TextField
          name="outputUrl"
          label="Output Url:"
          margin="normal"
          variant="standard"
          fullWidth
          value={ values.outputUrl }
          onChange={ handleChange }
          error={ touched.outputUrl && Boolean(errors.outputUrl) }
          helperText={ touched.outputUrl && errors.outputUrl }
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
          disabled={ isValidating }
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
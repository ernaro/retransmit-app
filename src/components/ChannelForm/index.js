import { useFormik } from 'formik';
import * as Yup from 'yup';
import Paper from '@mui/material/Paper';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Switch from '@mui/material/Switch';
import FormControlLabel from '@mui/material/FormControlLabel';

import Link from '../Link';

const validationSchema = Yup.object({
  serviceName: Yup.string().required('Name is required!'),
  providerName: Yup.string().required('Provider name is required!'),
  serviceType: Yup.string().required('Service type is is required!'),
  serviceId: Yup.number().required('Service ID is required!'),
  pmtPid: Yup.number().required('PMT pid is required!'),
  componentsStartPid: Yup.number().required('Components start pid is required!'),
  bitrate: Yup.number().required('Bitrate is required!'),
  inputUrl: Yup.string().required('Input Url is required!'),
  inputLatency: Yup.number().min(120, "Minimal latency is 120").max(6000, "Maximum latency is 6000"),
  outputUrl: Yup.string().required('Output Url is required!'),
  outputLatency: Yup.number().min(120, "Minimal latency is 120").max(6000, "Maximum latency is 6000"),
  enabled: Yup.boolean().required('Status is required!'),
})

const ChannelForm = ({ channel, formTitle, submitHandler }) => {
  const {
    handleSubmit,
    handleChange,
    values,
    touched,
    errors,
    isValidating,
  } = useFormik({
    initialValues: {
      serviceName: channel?.serviceName || '',
      providerName: channel?.providerName || '',
      serviceType: channel?.serviceType || 'digital_tv',
      serviceId: channel?.serviceId || 1101,
      pmtPid: channel?.pmtPid || 101,
      componentsStartPid: channel?.componentsStartPid || 111,
      bitrate: channel?.bitrate || 6000000,
      inputUrl: channel?.inputUrl || '',
      inputMode: channel?.inputMode || 'caller',
      inputLatency: channel?.inputLatency || 120,
      outputUrl: channel?.outputUrl || '',
      outputMode: channel?.outputMode || 'caller',
      outputLatency: channel?.outputLatency || 120,
      transcodeAudio: channel?.transcodeAudio || false,
      enabled: channel?.enabled || false,
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
        <Box sx={{ display: values.inputUrl.startsWith("srt") ? "flex" : "none" }}>
          <TextField
            select
            name="inputMode"
            label="Mode:"
            margin="normal"
            variant="standard"
            value={ values.inputMode }
            onChange={ handleChange }
            sx={{ mr: 1 }}
          >
            <MenuItem value="caller">Caller</MenuItem>
            <MenuItem value="listener">Listener</MenuItem>
          </TextField>
          <TextField
            name="inputLatency"
            label="Latency:"
            margin="normal"
            variant="standard"
            type="number"
            value={ values.inputLatency }
            onChange={ handleChange }
            error={ touched.inputLatency && Boolean(errors.inputLatency) }
            helperText={ touched.inputLatency && errors.inputLatency }
          />
        </Box>
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
        <Box sx={{ display: values.outputUrl.startsWith("srt") ? "flex" : "none" }}>
          <TextField
            select
            name="outputMode"
            label="Mode:"
            margin="normal"
            variant="standard"
            value={ values.outputMode }
            onChange={ handleChange }
            sx={{ mr: 1 }}
          >
            <MenuItem value="caller">Caller</MenuItem>
            <MenuItem value="listener">Listener</MenuItem>
          </TextField>
          <TextField
            name="outputLatency"
            label="Latency:"
            margin="normal"
            variant="standard"
            type="number"
            value={ values.outputLatency }
            onChange={ handleChange }
            error={ touched.outputLatency && Boolean(errors.outputLatency) }
            helperText={ touched.outputLatency && errors.outputLatency }
          />
        </Box>
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
        <Typography component="div" sx={{mt: 3}}>
          * Experimental settings:
        </Typography>
        <FormControlLabel
          sx={{margin: "auto"}}
          label="Transcode audio to MPEG-1?"
          labelPlacement="start"
          control={
            <Switch
              name="transcodeAudio"
              checked={ values.transcodeAudio }
              onChange={ handleChange }
            />
          }
        />
        <Button
          fullWidth
          sx={ { mt: 2 } }
          variant="outlined"
          color="success"
          type="submit"
          disabled={ isValidating }
        >
          Save
        </Button>
        <Button
          fullWidth
          sx={ { mt: 2 } }
          component={ Link }
          variant="outlined"
          color="error"
          href="/"
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  )
}

export default ChannelForm;
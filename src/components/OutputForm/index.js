import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Switch from "@mui/material/Switch";
import FormControlLabel from "@mui/material/FormControlLabel";

import Link from "../Link";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  serviceName: Yup.string().required("ServiceName is required!"),
  providerName: Yup.string().required("Provider name is required!"),
  serviceId: Yup.number().required("Service ID is required!"),
  pmtPid: Yup.number().required("PMT pid is required!"),
  componentsStartPid: Yup.number().required("Components start pid is required!"),
  bitrate: Yup.number().required("Bitrate is required!"),
  outputUrl: Yup.string().required("Outputs Url is required!"),
  outputLatency: Yup.number()
    .min(20, "Minimal latency is 20")
    .max(6000, "Maximum latency is 6000"),
});

const OutputForm = ({ output, formTitle, submitHandler }) => {
  const { handleSubmit, handleChange, values, touched, errors, isValidating } =
    useFormik({
      initialValues: {
        name: output?.name || "",
        serviceName: output?.serviceName || "",
        providerName: output?.providerName || "",
        serviceType: output?.serviceType || "digital_tv",
        audioType: output?.audioType || "mpeg",
        serviceId: output?.serviceId || 1101,
        pmtPid: output?.pmtPid || 101,
        componentsStartPid: output?.componentsStartPid || 111,
        bitrate: output?.bitrate || 6000000,
        outputUrl: output?.outputUrl || "",
        outputMode: output?.outputMode || "caller",
        outputLatency: output?.outputLatency || 120,
        transcodeVideo: output?.transcodeVideo || false,
        transcodeAudio: output?.transcodeAudio || false,
        enabled: output?.enabled || false,
      },
      enableReinitialize: true,
      validationSchema: validationSchema,
      onSubmit: submitHandler,
    });

  return (
    <Paper sx={{ padding: "1rem" }}>
      <Typography component="div" variant="h4" textAlign="center">
        {formTitle}
      </Typography>
      <Box component="form" onSubmit={ handleSubmit }>
        <TextField
          name="name"
          label="Name:"
          margin="normal"
          size="small"
          fullWidth
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          name="serviceName"
          label="Service Name:"
          margin="normal"
          size="small"
          fullWidth
          value={values.serviceName}
          onChange={handleChange}
          error={touched.serviceName && Boolean(errors.serviceName)}
          helperText={touched.serviceName && errors.serviceName}
        />
        <TextField
          name="providerName"
          label="Provider Name:"
          margin="normal"
          size="small"
          fullWidth
          value={values.providerName}
          onChange={handleChange}
          error={touched.providerName && Boolean(errors.providerName)}
          helperText={touched.providerName && errors.providerName}
        />
        <TextField
          name="serviceType"
          label="Service Type:"
          margin="normal"
          size="small"
          select
          fullWidth
          value={values.serviceType}
          onChange={handleChange}
          error={touched.serviceType && Boolean(errors.serviceType)}
          helperText={touched.serviceType && errors.serviceType}
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
          size="small"
          fullWidth
          value={values.serviceId}
          onChange={handleChange}
          error={touched.serviceId && Boolean(errors.serviceId)}
          helperText={touched.serviceId && errors.serviceId}
        />
        <TextField
          name="pmtPid"
          type="number"
          label="PMT Pid:"
          margin="normal"
          size="small"
          fullWidth
          value={values.pmtPid}
          onChange={handleChange}
          error={touched.pmtPid && Boolean(errors.pmtPid)}
          helperText={touched.pmtPid && errors.pmtPid}
        />
        <TextField
          name="componentsStartPid"
          type="number"
          label="Components Start Pid:"
          margin="normal"
          size="small"
          fullWidth
          value={values.componentsStartPid}
          onChange={handleChange}
          error={
            touched.componentsStartPid && Boolean(errors.componentsStartPid)
          }
          helperText={touched.componentsStartPid && errors.componentsStartPid}
        />
        <TextField
          name="bitrate"
          type="number"
          label="Bitrate: bit/s"
          margin="normal"
          size="small"
          fullWidth
          value={values.bitrate}
          onChange={handleChange}
          error={touched.bitrate && Boolean(errors.bitrate)}
          helperText={touched.bitrate && errors.bitrate}
        />
        <TextField
          name="outputUrl"
          label="Output Url:"
          placeholder="udp://ip:port, srt://ip:port"
          margin="dense"
          size="small"
          fullWidth
          sx={{ mt: 2 }}
          value={values.outputUrl}
          onChange={handleChange}
          error={touched.outputUrl && Boolean(errors.outputUrl)}
          helperText={touched.outputUrl && errors.outputUrl}
        />
        <Box sx={{ display: values.outputUrl.startsWith("srt") ? "flex" : "none" }}>
          <TextField
            select
            name="outputMode"
            label="Mode:"
            margin="dense"
            size="small"
            value={values.outputMode}
            onChange={handleChange}
            sx={{ mr: 1 }}
          >
            <MenuItem value="caller">Caller</MenuItem>
            <MenuItem value="listener">Listener</MenuItem>
          </TextField>
          <TextField
            name="outputLatency"
            label="Latency:"
            margin="dense"
            size="small"
            type="number"
            value={values.outputLatency}
            onChange={handleChange}
            error={touched.outputLatency && Boolean(errors.outputLatency)}
            helperText={touched.outputLatency && errors.outputLatency}
          />
        </Box>
        <TextField
          name="enabled"
          label="Enabled:"
          margin="normal"
          sx={{ mt: 4 }}
          size="small"
          select
          fullWidth
          value={values.enabled}
          onChange={handleChange}
          error={touched.enabled && Boolean(errors.enabled)}
          helperText={touched.enabled && errors.enabled}
        >
          <MenuItem value={true}>Enabled</MenuItem>
          <MenuItem value={false}>Disabled</MenuItem>
        </TextField>
        <Typography component="div" sx={{ mt: 3 }}>
          * Transcode settings:
        </Typography>
        <FormControlLabel
          sx={{  mr: 1, ml: "auto" }}
          label="Transcode video?"
          labelPlacement="start"
          control={
            <Switch
              name="transcodeVideo"
              checked={values.transcodeVideo}
              onChange={handleChange}
            />
          }
        />
        <FormControlLabel
          sx={{ mr: 1, ml: "auto" }}
          label="Transcode audio?"
          labelPlacement="start"
          control={
            <Switch
              name="transcodeAudio"
              checked={values.transcodeAudio}
              onChange={handleChange}
            />
          }
        />
        <Box sx={{ display: values.transcodeAudio ? "flex" : "none" }}>
          <TextField
            name="audioType"
            label="Audio Type:"
            margin="normal"
            size="small"
            select
            fullWidth
            value={values.audioType}
            onChange={handleChange}
            error={touched.audioType && Boolean(errors.audioType)}
            helperText={touched.audioType && errors.audioType}
          >
            <MenuItem value="mpeg">MPEG</MenuItem>
            <MenuItem value="aac">AAC</MenuItem>
          </TextField>
        </Box>
        <Button
          fullWidth
          sx={{ mt: 4 }}
          variant="outlined"
          color="success"
          type="submit"
          disabled={isValidating}
        >
          Save
        </Button>
        <Button
          fullWidth
          sx={{ mt: 2 }}
          component={Link}
          variant="outlined"
          color="error"
          href="/"
        >
          Cancel
        </Button>
      </Box>
    </Paper>
  );
};

export default OutputForm;

import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Link from "../Link";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
  inputUrl: Yup.string().required("Inputs Url is required!"),
  inputLatency: Yup.number()
    .min(20, "Minimal latency is 20")
    .max(6000, "Maximum latency is 6000")
});

const InputForm = ({ input, formTitle, submitHandler }) => {
  const { handleSubmit, handleChange, values, touched, errors, isValidating } =
    useFormik({
      initialValues: {
        name: input?.name || "",
        inputUrl: input?.inputUrl || "",
        inputMode: input?.inputMode || "caller",
        inputLatency: input?.inputLatency || 120,
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
          margin="dense"
          size="small"
          fullWidth
          value={values.name}
          onChange={handleChange}
          error={touched.name && Boolean(errors.name)}
          helperText={touched.name && errors.name}
        />
        <TextField
          name="inputUrl"
          label="Input Url:"
          placeholder="udp://ip:port, rtmp://url, srt://ip:port, http://url"
          margin="dense"
          size="small"
          fullWidth
          value={values.inputUrl}
          onChange={handleChange}
          error={touched.inputUrl && Boolean(errors.inputUrl)}
          helperText={touched.inputUrl && errors.inputUrl}
        />
        <Box sx={{ display: values.inputUrl.startsWith("srt") ? "flex" : "none" }}>
          <TextField
            select
            name="inputMode"
            label="Mode:"
            margin="dense"
            size="small"
            value={values.inputMode}
            onChange={handleChange}
            sx={{ mr: 1 }}
          >
            <MenuItem value="caller">Caller</MenuItem>
            <MenuItem value="listener">Listener</MenuItem>
          </TextField>
          <TextField
            name="inputLatency"
            label="Latency:"
            margin="dense"
            size="small"
            type="number"
            value={values.inputLatency}
            onChange={handleChange}
            error={touched.inputLatency && Boolean(errors.inputLatency)}
            helperText={touched.inputLatency && errors.inputLatency}
          />
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

export default InputForm;

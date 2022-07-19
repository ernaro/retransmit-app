import { useFormik } from "formik";
import * as Yup from "yup";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

import Link from "../Link";

const validationSchema = Yup.object({
  name: Yup.string().required("Name is required!"),
});

const ChannelForm = ({ channel, formTitle, submitHandler }) => {
  const { handleSubmit, handleChange, values, touched, errors, isValidating } =
    useFormik({
      initialValues: {
        name: channel?.name || "",
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

export default ChannelForm;

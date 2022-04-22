import * as Yup from "yup";
import { useFormik } from "formik";
import Paper from "@mui/material/Paper";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";

const validationSchema = Yup.object({
  username: Yup.string().required("Username is required!"),
  password: Yup.string().required("Password is required!")
})

const LoginForm = ({ submitHandler }) => {
  const {
    handleSubmit,
    handleChange,
    isValidating,
    values,
    touched,
    errors
  } = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema: validationSchema,
    onSubmit: submitHandler
  })

  return(
    <Paper sx={ { padding: '1rem' } }>
      <Box component="form" onSubmit={ handleSubmit }>
        <Typography component="div" variant="h4" textAlign="center">
          Login
        </Typography>
        <TextField
          fullWidth
          size="small"
          // variant="standard"
          margin="normal"
          name="username"
          label="Username:"
          value={ values.username }
          onChange={ handleChange }
          error={ touched.username && Boolean(errors.username) }
          helperText={ touched.username && errors.username }
        />
        <TextField
          fullWidth
          size="small"
          // variant="standard"
          margin="normal"
          name="password"
          type="password"
          label="Password:"
          value={ values.password }
          onChange={ handleChange }
          error={ touched.password && Boolean(errors.password) }
          helperText={ touched.password && errors.password }
        />
        <Button
          sx={ { mt: 6 } }
          fullWidth
          variant="outlined"
          color="success"
          type="submit"
          disabled={ isValidating }
        >
          Login
        </Button>
      </Box>
    </Paper>
  )
}

export default LoginForm;
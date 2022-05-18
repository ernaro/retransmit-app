import Grid from "@mui/material/Grid";
import LoginForm from "../components/LoginForm";

export default function Login() {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "30rem" }}
    >
      <Grid item sx={{ width: "20rem" }}>
        <LoginForm />
      </Grid>
    </Grid>
  );
}

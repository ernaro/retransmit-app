import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

const Error = ({ message }) => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={ { height: "30rem" } }
    >
      <Grid item>
        <Typography variant="h6">
          { message }
        </Typography>
      </Grid>
    </Grid>
  )
}

export default Error;
import Grid from "@mui/material/Grid";
import CircularProgress from "@mui/material/CircularProgress";

const Loader = () => {
  return (
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{ height: "30rem" }}
    >
      <Grid item>
        <CircularProgress color="success" size={100} />
      </Grid>
    </Grid>
  );
};

export default Loader;

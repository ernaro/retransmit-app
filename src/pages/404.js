import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function NotFound(){
  return(
    <Grid
      container
      direction="column"
      justifyContent="center"
      alignItems="center"
      sx={{height: "30rem"}}
    >
      <Grid item>
        <Typography variant="h6">
          Something went wrong! Page not found. Code: 404
        </Typography>
      </Grid>
    </Grid>
  )
}
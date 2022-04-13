import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";

export default function Error({ statusCode }){
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
          Server ERROR! Code: ${statusCode}
        </Typography>
      </Grid>
    </Grid>
  )
}

Error.getInitialProps = ({ res, err }) => {
  const statusCode = res ? res.statusCode : err ? err.statusCode : 404
  return { statusCode }
}
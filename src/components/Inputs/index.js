import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';


const Inputs = ( input ) => {
  return (
    <Box sx={ { mb: 3 } }>
      <Typography variant="h6">
        Inputs
      </Typography>
      { input.name ?
        <Box sx={ { display: 'flex' } }>
          <Typography sx={{ mr: 2 }}>
            Name: { input.name }
          </Typography>
          <Typography>
            Url: { input.inputUrl }
          </Typography>
        </Box>
        :
        <Button variant="outlined" size="small" color="success">
          Add Input
        </Button>
      }
    </Box>
  )
}

export default Inputs;
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionActions from '@mui/material/AccordionActions';
import Link from '../Link'
import { startOutputById, stopOutputById } from '../../service/apiService';


const Channel = ( {
  id,
  name,
  input,
  outputs,
  onOutputStart,
  onOutputStop,
  onDelete
} ) => {

  return (
    <Accordion>
      <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
        <Typography variant="h6" sx={ { flexGrow: 1 } }>
          { name }
        </Typography>
        <Button
          component={ Link }
          variant="text"
          size="small"
          color="warning"
          href={ `/channels/${ id }/edit-channel` }
        >
          Edit
        </Button>
        <Button
          variant="text"
          color="error"
          size="small"
          onClick={() => onDelete(id, name, "channel")}
        >
          Delete
        </Button>
      </AccordionSummary>
      <AccordionDetails>
        <Typography variant="subtitle1">
          Input
        </Typography>
        <AccordionActions disableSpacing sx={{flexDirection: "row-reverse", ml: 1, }}>
          <Button
            component={ Link }
            disabled={ input }
            variant="text"
            size="small"
            color="info"
            href={ `/channels/${ id }/inputs/add-input` }
          >
            Add Input
          </Button>
        </AccordionActions>
        <Box sx={ { display: input ? 'box' : 'none', ml: 2, mb: 2 } }>
          <Typography variant="body2">Name: { input?.name }</Typography>
          <Typography variant="body2">Url: { input?.inputUrl }</Typography>
          <Box sx={ { display: 'flex', flexGrow: 1, mb: 2, mt: 0.5 } }>
            <Button
              component={ Link }
              sx={ { mt: 0.5 } }
              variant="outlined"
              color="warning"
              size="small"
              href={ `/channels/${ id }/inputs/${ input?.id }/edit-input` }
            >
              Edit
            </Button>
            <Button
              sx={{ml: 'auto'}}
              variant="text"
              color="primary"
              size="small"
              onClick={() => onDelete(input.id, input.name, "input")}
            >
              Delete
            </Button>
          </Box>

        </Box>

        <Typography variant="subtitle1">
          Outputs
        </Typography>
        <AccordionActions disableSpacing sx={{flexDirection: "row-reverse", ml: 1, }}>
          <Button
            component={ Link }
            href={ `/channels/${ id }/outputs/add-output` }
            variant="text"
            size="small"
            color="info"
          >
            Add Output
          </Button>
        </AccordionActions>
        { outputs?.map(output => (
          <Box sx={ { ml: 2 } }>
            <Box sx={ { display: 'flex', gap: 1 } }>
              <Typography variant="body2" sx={ { mr: 1 } }>Name: { output?.name }</Typography>
              <Typography variant="body2" sx={ { mr: 1 } }>Bitrate: { output?.bitrate }</Typography>
              <Typography variant="body2" sx={ { mr: 1 } }>Url: { output?.outputUrl }</Typography>
            </Box>
            <Box sx={ { display: 'flex', flexGrow: 1, mb: 2, mt: 0.5 } }>
              <Button
                disabled={ output.enabled }
                onClick={ () => onOutputStart(output.id) }
                sx={ { mr: 1 } }
                variant="outlined"
                color="success"
                size="small"
              >
                Start
              </Button>
              <Button
                disabled={ !output.enabled }
                onClick={ () => onOutputStop(output.id) }
                sx={ { mr: 1 } }
                variant="outlined"
                color="error"
                size="small"
              >
                Stop
              </Button>
              <Button
                component={ Link }
                href={`/channels/${ id }/outputs/${ output.id }/edit-output`}
                variant="outlined"
                color="warning"
                size="small"
              >
                Edit
              </Button>
              <Button
                sx={{ml: "auto"}}
                variant="text"
                color="primary"
                size="small"
                onClick={() => onDelete(output.id, output.name, "output")}
              >
                Delete
              </Button>
            </Box>
          </Box>
        )) }
      </AccordionDetails>
    </Accordion>
  );
};

export default Channel;

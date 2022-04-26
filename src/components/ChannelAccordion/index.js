import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";

import Link from "../Link";


const ChannelAccordion = ({
  id,
  serviceName,
  bitrate,
  inputUrl,
  outputUrl,
  enabled,
  startChannel,
  stopChannel,
  openDeleteDialog
}) => {
  const mappingType = () => {
    // if (inputUrl.startsWith("udp") && outputUrl.startsWith("srt")) {
    //   return "(udp -> srt)"
    // } else if (inputUrl.startsWith("udp") && outputUrl.startsWith("udp")) {
    //   return "(udp -> udp)"
    // } else if (inputUrl.startsWith("http") && outputUrl.startsWith("udp")) {
    //   return "(http/hls -> udp)"
    // } else if (inputUrl.startsWith("file") && outputUrl.startsWith("udp")) {
    //   return "(file -> udp)"
    // } else return ""
  }

  return (
    <Accordion>
      <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
        <Typography component="div" sx={ { flexGrow: 1 } }>
          { serviceName } { mappingType() }
        </Typography>
        <Typography component="div" sx={ { marginRight: '1rem' } }>
          Status: { enabled ? "On" : "Off" }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <p><b>Bitrate: </b>{ bitrate } Bit/s</p>
        <p style={ { overflow: 'hidden', textOverflow: "ellipsis" } }><b>Input: </b>{ inputUrl }</p>
        <p><b>Output: </b>{ outputUrl }</p>
        <Box sx={ { flexGrow: 1, display: "flex" } }>
          <Button
            variant="outlined"
            color="success"
            disabled={ enabled }
            sx={ { marginRight: '1rem' } }
            onClick={ () => startChannel(id) }
          >
            Start
          </Button>
          <Button
            variant="outlined"
            color="error"
            disabled={ !enabled }
            sx={ { mr: "auto" } }
            onClick={ () => stopChannel(id) }
          >
            Stop
          </Button>
          <Button
            component={ Link }
            sx={ { marginRight: '1rem' } }
            href={ `/channels/${ id }` }
            variant="outlined"
            color="warning"
          >
            Edit
          </Button>
          <Button
            variant="text"
            color="error"
            onClick={ () => openDeleteDialog(id, serviceName) }
          >
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default ChannelAccordion;
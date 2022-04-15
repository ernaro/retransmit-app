import { useRouter } from "next/router";
import AccordionSummary from "@mui/material/AccordionSummary";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Typography from "@mui/material/Typography";
import AccordionDetails from "@mui/material/AccordionDetails";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Accordion from "@mui/material/Accordion";

import Link from "../Link";
import { deleteChannelById } from "../../service/apiService";


const ChannelAccordion = ({ id, name, bitrate, input, output, enabled, startChannel, stopChannel, openDeleteDialog }) => {
  return (
    <Accordion>
      <AccordionSummary expandIcon={ <ExpandMoreIcon/> }>
        <Typography component="div" sx={ { flexGrow: 1 } }>
          { name }
        </Typography>
        <Typography component="div" sx={ { marginRight: '1rem' } }>
          Status: { enabled ? "On" : "Off" }
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <p><b>Bitrate: </b>{ bitrate } Bit/s</p>
        <p style={ { overflow: 'hidden', textOverflow: "ellipsis" } }><b>Input: </b>{ input }</p>
        <p><b>Output: </b>{ output }</p>
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
            href={`/channels/${id}`}
            variant="outlined"
            color="warning"
          >
            Edit
          </Button>
          <Button
            variant="outlined"
            color="error"
            onClick={ () => openDeleteDialog(id, name) }
          >
            Delete
          </Button>
        </Box>
      </AccordionDetails>
    </Accordion>
  )
}

export default ChannelAccordion;
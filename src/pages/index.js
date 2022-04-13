import React, { useState } from "react";
import useSWR from 'swr';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Link from "../components/Link";
import ChannelAccordion from "../components/ChannelAccordion";
import ChannelSnackbar from "../components/ChannelSnackbar";
import { startChannelById, stopChannelById } from "../service/localApiService";
import { axiosFetcher } from "../service/localApiService";


export default function Index() {
  const [open, setOpen] = useState(false);
  const { data: channels, error } = useSWR("/channels", axiosFetcher, { refreshInterval: 1000 })

  const handleClose = () => {
    setOpen(false);
  };

  const handleChannelStart = (id) => {
    startChannelById(id).then(() => setOpen(true));
  }
  const handleChannelStop = (id) => {
    stopChannelById(id).then(() => setOpen(true));
  }

  if (error) return <div>failed to load</div>
  if (!channels) return <div>loading...</div>

  return (
    <Container maxWidth="md" sx={ { flexGrow: 1, mt: 2 } }>
      <Box sx={ { mb: 2 } }>
        <Button
          component={Link}
          href="/channels/add"
          variant="outlined"
          color="success"
        >
          Create
        </Button>
      </Box>
      <Paper>
        { channels.map(channel => (
          <ChannelAccordion
            key={ channel.id }
            id={ channel.id }
            name={ channel.name }
            bitrate={ channel.bitrate }
            input={ channel.input }
            output={ channel.output }
            enabled={ channel.enabled }
            start={ handleChannelStart }
            stop={ handleChannelStop }
          />
        )) }
      </Paper>
      <ChannelSnackbar
        open={ open }
        onClose={ handleClose }
      />
    </Container>
  );
}
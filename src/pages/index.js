import React, { useState } from "react";
import useSWR from 'swr';
import Container from '@mui/material/Container';
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";

import Link from "../components/Link";
import ChannelAccordion from "../components/ChannelAccordion";
import ChannelSnackbar from "../components/ChannelSnackbar";
import ChannelDeleteDialog from "../components/ChannelDeleteDialog";
import { startChannelById, stopChannelById, deleteChannelById } from "../service/apiService";
import { axiosFetcher } from "../service/apiService";


export default function Index() {
  const [open, setOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState({})
  const { data: channels, error } = useSWR("/channels", axiosFetcher, { refreshInterval: 1000 })

  const handleClose = () => {
    setOpen(false);
  };

  const handleDialogOpen = (id, name) => {
    setDialogOpen(true);
    setChannelToDelete({id, name});
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setChannelToDelete({});
  }

  const handleChannelStart = (id) => {
    startChannelById(id).then(() => setOpen(true));
  }
  const handleChannelStop = (id) => {
    stopChannelById(id).then(() => setOpen(true));
  }

  const handleDeleteChannel = () => {
    deleteChannelById(channelToDelete.id)
      .then(() => handleDialogClose());
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
            startChannel={ handleChannelStart }
            stopChannel={ handleChannelStop }
            openDeleteDialog={ handleDialogOpen }
          />
        )) }
      </Paper>
      <ChannelSnackbar
        open={ open }
        onClose={ handleClose }
      />
      <ChannelDeleteDialog
        open={ dialogOpen }
        handleClose={ handleDialogClose }
        name={ channelToDelete.name }
        handleDelete={ handleDeleteChannel }
      />
    </Container>
  );
}
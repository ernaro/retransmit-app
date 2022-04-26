import { useState, useEffect } from "react";
import useSWR from 'swr';
import Container from '@mui/material/Container';
import Paper from "@mui/material/Paper";

import Error from "../components/Error";
import Loader from "../components/Loader";
import ChannelAccordion from "../components/ChannelAccordion";
import ChannelAccordionToolbar from "../components/ChannelAccordionToolbar";
import ChannelSnackbar from "../components/ChannelSnackbar";
import ChannelDeleteDialog from "../components/ChannelDeleteDialog";
import { startChannelById, stopChannelById, deleteChannelById } from "../service/apiService";
import { axiosFetcher } from "../service/apiService";


export default function Index() {
  const { data: channels, error } = useSWR("/channels", axiosFetcher, { refreshInterval: 1000 })
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [channelToDelete, setChannelToDelete] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [filterValue, setFilterValue] = useState("");
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    setFilteredChannels(
      channels?.filter(channel =>
        channel.serviceName.toLowerCase().includes(searchValue.toLowerCase())
        &&
        channel.outputUrl.startsWith(filterValue)
      )
    );
  }, [searchValue, filterValue, channels])

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  }

  const handleFilterChange = e => {
    setFilterValue(e.target.value);
  }

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogOpen = (id, name) => {
    setDialogOpen(true);
    setChannelToDelete({ id, name });
  }

  const handleDialogClose = () => {
    setDialogOpen(false);
    setChannelToDelete({});
  }

  const handleChannelStart = (id) => {
    startChannelById(id).then(() => {
      setSnackMessage("Channel started");
      setSnackOpen(true);
    });
  }
  const handleChannelStop = (id) => {
    stopChannelById(id).then(() => {
      setSnackMessage("Channel stopped");
      setSnackOpen(true);
    });
  }

  const handleDeleteChannel = () => {
    deleteChannelById(channelToDelete.id)
      .then(() => handleDialogClose());
  }

  if (error) return <Error message="Failed to load data!"/>
  if (!channels) return <Loader/>

  return (
    <Container maxWidth="md" sx={ { flexGrow: 1, mt: 2 } }>
      <ChannelAccordionToolbar
        searchValue={ searchValue }
        filterValue={ filterValue }
        handleSearchChange={ handleSearchChange }
        handleFilterChange={ handleFilterChange }
      />
      <Paper sx={{ mb: 4}}>
        { filteredChannels?.map(channel => (
          <ChannelAccordion
            key={ channel.id }
            id={ channel.id }
            serviceName={ channel.serviceName }
            bitrate={ channel.bitrate }
            inputUrl={ channel.inputUrl }
            outputUrl={ channel.outputUrl }
            enabled={ channel.enabled }
            startChannel={ handleChannelStart }
            stopChannel={ handleChannelStop }
            openDeleteDialog={ handleDialogOpen }
          />
        )) }
      </Paper>
      <ChannelSnackbar
        open={ snackOpen }
        message={ snackMessage }
        onClose={ handleSnackClose }
      />
      <ChannelDeleteDialog
        open={ dialogOpen }
        name={ channelToDelete.name }
        handleClose={ handleDialogClose }
        handleDelete={ handleDeleteChannel }
      />
    </Container>
  );
}
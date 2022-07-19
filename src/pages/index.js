import { useState, useEffect } from "react";
import useSWR from "swr";
import Container from "@mui/material/Container";
import Paper from "@mui/material/Paper";

import Error from "../components/Error";
import Loader from "../components/Loader";
import Channel from "../components/Channel";
import ChannelToolbar from "../components/ChannelToolbar";
import FormSnackbar from "../components/FormSnackbar";
import ChannelDeleteDialog from "../components/ChannelDeleteDialog";
import {
  startOutputById,
  stopOutputById,
  deleteOutputById, deleteInputById, deleteChannelById,
} from '../service/apiService';
import { axiosFetcher } from "../service/apiService";

export default function Index() {
  const { data: channels, error } = useSWR("/channels", axiosFetcher, {
    refreshInterval: 1000,
  });
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [objectToDelete, setObjectToDelete] = useState({});
  const [searchValue, setSearchValue] = useState("");
  const [filteredChannels, setFilteredChannels] = useState([]);

  useEffect(() => {
    setFilteredChannels(
      channels?.filter(
        (channel) =>
          channel.name
            .toLowerCase()
            .includes(searchValue.toLowerCase())
      )
    );
  }, [searchValue, channels]);

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  const handleDialogOpen = (id, name, type) => {
    setDialogOpen(true);
    setObjectToDelete({ id, name, type });
  };

  const handleDialogClose = () => {
    setDialogOpen(false);
    setObjectToDelete({});
  };

  const handleOutputStart = (id) => {
    startOutputById(id).then(() => {
      setSnackMessage("Channel started");
      setSnackOpen(true);
    });
  };

  const handleOutputStop = (id) => {
    stopOutputById(id).then(() => {
      setSnackMessage("Channel stopped");
      setSnackOpen(true);
    });
  };

  const handleDeleteChannel = () => {
    deleteChannelById(objectToDelete.id).then(() => handleDialogClose());
  }

  const handleDeleteInput = () => {
    deleteInputById(objectToDelete.id).then(() => handleDialogClose());
  }

  const handleDeleteOutput = () => {
    deleteOutputById(objectToDelete.id).then(() => handleDialogClose());
  };

  const selectDeleteFunction = (type) => {
    if ( type === "input" ) {
      return handleDeleteInput;
    }
    else if ( type === "output" ) {
      return handleDeleteOutput;
    }
    else {
      return handleDeleteChannel;
    }
  }

  if (error) return <Error message="Failed to load data!" />;
  if (!channels) return <Loader />;

  return (
    <Container maxWidth="md" sx={{ flexGrow: 1, mt: 2 }}>
      <ChannelToolbar
        searchValue={searchValue}
        handleSearchChange={handleSearchChange}
      />
      <Paper sx={{ mb: 4 }}>
        {filteredChannels?.map((channel) => (
          <Channel
            key={channel.id}
            id={channel.id}
            name={channel.name}
            input={channel.input}
            outputs={channel.outputs}
            onOutputStart={handleOutputStart}
            onOutputStop={handleOutputStop}
            onDelete={handleDialogOpen}
          />
        ))}
      </Paper>
      <FormSnackbar
        open={snackOpen}
        message={snackMessage}
        onClose={handleSnackClose}
      />
      <ChannelDeleteDialog
        open={dialogOpen}
        name={objectToDelete.name}
        handleClose={handleDialogClose}
        handleDelete={selectDeleteFunction(objectToDelete.type)}
      />
    </Container>
  );
}

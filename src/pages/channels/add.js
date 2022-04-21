import { useState } from "react";
import Container from "@mui/material/Container";
import ChannelForm from "../../components/ChannelForm";
import ChannelSnackbar from "../../components/ChannelSnackbar";
import { useRouter } from "next/router";
import { createChannel } from "../../service/apiService";

export default function AddChannel() {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleChannelSubmit = (channel) => {
    createChannel(channel)
      .then(() => router.replace('/'))
      .catch(() => {
        setSnackMessage("Channel name already exist!");
        setSnackOpen(true);
      })
  }

  const handleSnackClose = () => {
    setSnackOpen(false);
  }

  return(
    <Container maxWidth="sm" sx={ { mt: 2 } }>
      <ChannelForm
        formTitle="Add channel"
        submitHandler={ handleChannelSubmit }
      />
      <ChannelSnackbar
        open={ snackOpen }
        onClose={ handleSnackClose }
        message={ snackMessage }
      />
    </Container>
  )
}

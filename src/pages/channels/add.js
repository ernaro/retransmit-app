import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

import ChannelForm from "../../components/ChannelForm";
import ChannelSnackbar from "../../components/ChannelSnackbar";
import { createChannel } from "../../service/apiService";

export default function AddChannel() {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleChannelSubmit = (channel) => {
    // let updatedChannel;
    // if(!channel.inputUrl.startsWith("srt")){
    //   const { inputMode, inputLatency, ...filtered } = channel;
    //   updatedChannel = { ...filtered };
    // } else if (!channel.outputUrl.startsWith("srt")){
    //   const { outputMode, outputLatency, ...filtered } = channel;
    //   updatedChannel = { ...filtered };
    // } else if (!channel.inputUrl.startsWith("srt") && !channel.outputUrl.startsWith("srt")) {
    //   const { inputMode, inputLatency, outputMode, outputLatency, ...filtered } = channel;
    //   updatedChannel = { ...filtered };
    // } else {
    //   updatedChannel = { ...channel }
    // }
    // console.log(channel)
    // console.log(updatedChannel);

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

import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

import ChannelForm from "../../components/ChannelForm";
import ChannelSnackbar from "../../components/ChannelSnackbar";
import { updateChannelById, getChannelById } from "../../service/apiService";


export default function EditChannel({ channel }) {
  const router = useRouter();
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleChannelSubmit = (values) => {
    updateChannelById(channel.id, values)
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
        formTitle="Edit channel"
        submitHandler={ handleChannelSubmit }
        serviceName={channel.serviceName}
        providerName={channel.providerName}
        serviceType={channel.serviceType}
        serviceId={channel.serviceId}
        pmtPid={channel.pmtPid}
        componentsStartPid={channel.componentsStartPid}
        bitrate={channel.bitrate}
        inputUrl={channel.inputUrl}
        outputUrl={channel.outputUrl}
        enabled={channel.enabled}
      />
      <ChannelSnackbar
        open={ snackOpen }
        onClose={ handleSnackClose }
        message={ snackMessage }
      />
    </Container>
  )
}

export async function getServerSideProps(context) {
  const { id } = context.query;
  const { data: channel } = await getChannelById(id);
  return {
    props: {
      channel
    },
  }
}
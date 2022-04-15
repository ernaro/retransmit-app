import Container from "@mui/material/Container";
import ChannelForm from "../../components/ChannelForm";
import { useRouter } from "next/router";
import { createChannel } from "../../service/apiService";

export default function AddChannel() {
  const router = useRouter();

  const handleChannelSubmit = (channel) => {
    createChannel(channel)
      .then(() => router.replace('/'));
  }

  return(
    <Container maxWidth="sm" sx={ { mt: 2 } }>
      <ChannelForm
        formTitle="Add channel"
        submitHandler={handleChannelSubmit}
      />
    </Container>
  )
}

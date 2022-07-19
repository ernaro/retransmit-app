import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Container from "@mui/material/Container";
import Loader from '../../../components/Loader';
import Error from '../../../components/Error';
import ChannelForm from "../../../components/ChannelForm";
import FormSnackbar from "../../../components/FormSnackbar";
import { updateChannelById, axiosFetcher } from "../../../service/apiService";

export default function EditChannel() {
  const router = useRouter();
  const channelId = router.query.channelId;
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const { data: channel, error } = useSWR(`/channels/${channelId}`, axiosFetcher);

  const handleChannelSubmit = (channel) => {
    updateChannelById(channelId, channel)
      .then(() => router.replace("/"))
      .catch(() => {
        setSnackMessage(
          "Channel name already exist!"
        );
        setSnackOpen(true);
      });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  if (error) return <Error message="Failed to load data!" />;
  if (!channel) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <ChannelForm
        channel={ channel }
        formTitle="Edit channel"
        submitHandler={handleChannelSubmit}
      />
      <FormSnackbar
        open={snackOpen}
        onClose={handleSnackClose}
        message={snackMessage}
      />
    </Container>
  );
}

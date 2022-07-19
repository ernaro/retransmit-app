import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";
import OutputForm from '../../../../components/OutputForm';
import FormSnackbar from "../../../../components/FormSnackbar";
import { addOutput } from "../../../../service/apiService";

export default function AddOutput() {
  const router = useRouter();
  const channelId = router.query.channelId;
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleChannelSubmit = (output) => {
    addOutput(channelId, output)
      .then(() => router.replace("/"))
      .catch(() => {
        setSnackMessage(
          "Output already exist!"
        );
        setSnackOpen(true);
      });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <OutputForm
        formTitle="Add Output"
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

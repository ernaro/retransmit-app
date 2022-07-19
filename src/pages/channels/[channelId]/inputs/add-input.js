import { useState } from "react";
import { useRouter } from "next/router";
import Container from "@mui/material/Container";

import InputForm from "../../../../components/InputForm";
import FormSnackbar from "../../../../components/FormSnackbar";
import { addInput } from "../../../../service/apiService";

export default function AddInput() {
  const router = useRouter();
  const channelId = router.query.channelId;
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");

  const handleChannelSubmit = (input) => {
    addInput(channelId, input)
      .then(() => router.replace("/"))
      .catch(() => {
        setSnackMessage(
          "Input already exist!"
        );
        setSnackOpen(true);
      });
  };

  const handleSnackClose = () => {
    setSnackOpen(false);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <InputForm
        formTitle="Add Input"
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

import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Container from "@mui/material/Container";
import Loader from '../../../../../components/Loader';
import Error from '../../../../../components/Error';
import InputForm from "../../../../../components/InputForm";
import FormSnackbar from "../../../../../components/FormSnackbar";
import { editInputById, axiosFetcher } from "../../../../../service/apiService";

export default function EditInput() {
  const router = useRouter();
  const inputId = router.query.inputId;
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const { data: input, error } = useSWR(`/inputs/${inputId}`, axiosFetcher);

  const handleChannelSubmit = (input) => {
    editInputById(inputId, input)
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

  if (error) return <Error message="Failed to load data!" />;
  if (!input) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <InputForm
        formTitle="Edit Input"
        input={input}
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

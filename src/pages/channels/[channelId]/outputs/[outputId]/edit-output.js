import { useState } from "react";
import { useRouter } from "next/router";
import useSWR from "swr";
import Container from "@mui/material/Container";
import Loader from '../../../../../components/Loader';
import Error from '../../../../../components/Error';
import OutputForm from "../../../../../components/OutputForm";
import FormSnackbar from "../../../../../components/FormSnackbar";
import { editOutputById, axiosFetcher } from "../../../../../service/apiService";

export default function EditInput() {
  const router = useRouter();
  const outputId = router.query.outputId;
  const [snackOpen, setSnackOpen] = useState(false);
  const [snackMessage, setSnackMessage] = useState("");
  const { data: output, error } = useSWR(`/outputs/${outputId}`, axiosFetcher);

  const handleChannelSubmit = (output) => {
    editOutputById(outputId, output)
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

  if (error) return <Error message="Failed to load data!" />;
  if (!output) return <Loader />;

  return (
    <Container maxWidth="sm" sx={{ mt: 2 }}>
      <OutputForm
        formTitle="Edit Input"
        output={output}
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

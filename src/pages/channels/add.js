import Container from "@mui/material/Container";
import ChannelForm from "../../components/ChannelForm";

export default function AddChannel() {
  return(
    <Container maxWidth="sm" sx={ { mt: 2 } }>
      <ChannelForm />
    </Container>
  )
}
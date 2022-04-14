import Container from "@mui/material/Container";
import { getChannelById } from "../../service/externalApiService";
import ChannelForm from "../../components/ChannelForm";

export default function EditChannel({ channel }) {
  return(
    <Container maxWidth="sm" sx={ { mt: 2 } }>
      <ChannelForm channel={ channel } />
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
import Container from "@mui/material/Container";
import { getChannelById } from "../../service/externalApiService";

export default function EditChannel({ channel }) {
  return (
    <Container sx={ { flexGrow: 1, mt: 2 } }>
      Edit Channel Page
    </Container>
  )
}

export async function getServerSideProps({ params }) {
  const res = await getChannelById(params.id);
  const channel = res.data;

  return {
    props: {
      channel
    },
  }
}
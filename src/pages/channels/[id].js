import { useRouter } from "next/router";
import Container from "@mui/material/Container";

import ChannelForm from "../../components/ChannelForm";
import { updateChannelById, getChannelById } from "../../service/apiService";

export default function EditChannel({ channel }) {
  const router = useRouter();

  const handleChannelSubmit = (values) => {
    updateChannelById(channel.id, values)
      .then(() => router.replace('/'))
      .catch(err => console.log(err))
  }

  return(
    <Container maxWidth="sm" sx={ { mt: 2 } }>
      <ChannelForm
        formTitle="Edit channel"
        submitHandler={ handleChannelSubmit }
        name={channel.name}
        bitrate={channel.bitrate}
        serviceType={channel.serviceType}
        input={channel.input}
        output={channel.output}
        enabled={channel.enabled}
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
import { getChannelById, updateChannelById, deleteChannelById } from "../../../../service/externalApiService";

export default async function handler(req, res) {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const { data: channel, status } = await getChannelById(id);
        // const servResp = await getChannelById(id);
        // const channel = servResp.data;
        res.status(status).json(channel);
      } catch (error) {
        res.status(404).end();
      }
      break;
    case 'PUT':
      try {
        const { status } = await updateChannelById(id, req.body);
        res.status(status).end();
      } catch (error) {
        res.status(400).json(error.response.data);
      }
      break;
    case 'DELETE':
      try {
        await deleteChannelById(id);
        res.status(200).end();
      } catch (error) {
        res.status(404).json(error.response.data);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT', 'DELETE'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

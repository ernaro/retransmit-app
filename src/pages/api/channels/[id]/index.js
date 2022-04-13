import { getChannelById, updateChannelById } from "../../../../service/externalApiService";

export default async function channelHandler(req, res) {
  const { query: { id }, method } = req;

  switch (method) {
    case 'GET':
      try {
        const servRes = await getChannelById(id);
        const channel = servRes.data;
        res.status(200).json(channel);
      } catch (error) {
        res.status(404).end();
      }
      break;
    case 'PUT':
      try {
        await updateChannelById(id, req.body);
        res.status(200).end();
      } catch (error) {
        res.status(400).json(error.response.data);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'PUT'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}

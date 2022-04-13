import { getAllChannels, createChannel } from "../../../service/externalApiService";

export default async function handler(req, res) {
  const { body: channel, method } = req;

  switch (method) {
    case 'GET':
      try {
        const servRes = await getAllChannels();
        res.status(200).json(servRes.data)
      } catch (error) {
        res.status(500).json(error);
      }
      break;
    case 'POST':
      try {
        await createChannel(channel);
        res.status(200).end();
      } catch (error) {
        res.status(400).json(error.response.data);
      }
      break;
    default:
      res.setHeader('Allow', ['GET', 'POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
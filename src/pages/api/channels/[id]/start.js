import { startChannelById } from "../../../../service/externalApiService";

export default async function handler(req, res) {
  const { query: { id }, method } = req;

  switch (method) {
    case 'POST':
      try {
        await startChannelById(id);
        res.status(200).end();
      } catch (error) {
        res.status(404).end();
      }
      break;
    default:
      res.setHeader('Allow', ['POST']);
      res.status(405).end(`Method ${method} Not Allowed`);
  }
}
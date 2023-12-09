import lighthouse from "@lighthouse-web3/sdk";

const apiKey = process.env.LIGHTHOUSE_API_KEY;

export default async function handler(req, res) {
  const query = req.query;
  const uploadResponse = await lighthouse.uploadText(
    JSON.stringify(query),
    apiKey
  );
  res.status(200).json(uploadResponse);
}

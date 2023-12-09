import lighthouse from "@lighthouse-web3/sdk";

const apiKey = process.env.LIGHTHOUSE_API_KEY;

export default async function handler(req, res) {
  // POST /api/lighthouse
  if (req.method === "POST") {
    const json = req.body;
    const uploadResponse = await lighthouse.uploadText(
      JSON.stringify(json),
      apiKey
    );
    res.status(200).json(uploadResponse);
  }
}

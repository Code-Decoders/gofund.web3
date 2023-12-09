import lighthouse from "@lighthouse-web3/sdk";

const apiKey = process.env.LIGHTHOUSE_API_KEY;

export default async function handler(req, res) {
  const uploadResponse = await lighthouse.uploadText(
    "Sometimes, I Wish I Was A Cloud, Just Floating Along",
    apiKey
  );
  res.status(200).json(uploadResponse);
}

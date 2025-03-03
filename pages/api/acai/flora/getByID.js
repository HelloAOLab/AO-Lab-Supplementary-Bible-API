import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "https://ao.bot");
    if (!db) {
        await connectToMongoDB();
    }

    const { uid } = req.query;

    const collection = db.collection("acai");

    let flora = await collection.findOne({ uid });

    flora.type = `acai:${flora.type}`;

    res.send({
      data: {
        ...flora,
      },
      status: 200,
    });
  } catch (err) {
    res.status(500).send({
      data: { error: err },
      status: 500,
    });
  }
}

import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "https://ao.bot");
    if (!db) {
        await connectToMongoDB();
    }

    const { uid } = req.query;

    const collection = db.collection("acai");

    const deity = await collection.findOne({ uid });

    res.send({
      data: {
        ...deity,
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

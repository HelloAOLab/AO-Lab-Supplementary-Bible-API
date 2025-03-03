import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "https://ao.bot");
    if (!db) {
        await connectToMongoDB();
    }

    const { uid } = req.query;

    const collection = db.collection("acai");

    let fauna = await collection.findOne({ uid });

    fauna.type = `acai:${fauna.type}`

    res.send({
      data: {
        ...fauna,
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

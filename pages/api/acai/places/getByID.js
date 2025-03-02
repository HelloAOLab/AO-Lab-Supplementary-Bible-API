import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "https://ao.bot");
    if (!db) {
        await connectToMongoDB();
    }

    const {  uid} = req.query;

    const collection = db.collection("acai");

    const place = await collection.findOne({  });

    res.send({
      data: {
        ...place,
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

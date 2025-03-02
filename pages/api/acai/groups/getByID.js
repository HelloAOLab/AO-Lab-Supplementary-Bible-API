import { removeParentDuplicate } from "@/lib/utils";
import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
  try {
    res.setHeader("Access-Control-Allow-Origin", "https://ao.bot");
    if (!db) {
      await connectToMongoDB();
    }

    const { uid } = req.query;

    const collection = db.collection("acai");

    const groupGraph = await collection
      .aggregate([
        {
          $match: {
            uid: uid,
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "group_origin",
            connectToField: "uid",
            as: "group_origin",
          },
        },
      ])
      .toArray();

    let group = removeParentDuplicate(groupGraph[0], ["group_origin"], uid);

    res.send({
      data: {
        ...group,
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

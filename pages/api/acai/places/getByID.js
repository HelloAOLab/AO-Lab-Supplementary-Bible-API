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

    const placeGraph = await collection
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
            connectFromField: "possibly_same_as",
            connectToField: "uid",
            as: "possibly_same_as",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "referred_to_as",
            connectToField: "uid",
            as: "referred_to_as",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "associated_places",
            connectToField: "uid",
            as: "associated_places",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "nearby_places",
            connectToField: "uid",
            as: "nearby_places",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "subregion_of",
            connectToField: "uid",
            as: "subregion_of",
          },
        },
      ])
      .toArray();

    let place = removeParentDuplicate(
      placeGraph[0],
      [
        "possibly_same_as",
        "referred_to_as",
        "associated_places",
        "nearby_places",
        "subregion_of"
      ],
      uid
    );

    place.type = `acai:${place.type}`;

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

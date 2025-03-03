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

    const personGraph = await collection
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
            connectFromField: "partners",
            connectToField: "uid",
            as: "partners",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "offspring",
            connectToField: "uid",
            as: "offspring",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "siblings",
            connectToField: "uid",
            as: "siblings",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "tribe",
            connectToField: "uid",
            as: "tribe",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "related_places.birth_place",
            connectToField: "uid",
            as: "birth_place",
          },
        },
        {
          $graphLookup: {
            from: "acai",
            startWith: uid,
            connectFromField: "related_places.death_place",
            connectToField: "uid",
            as: "death_place",
          },
        },
        {
          $lookup: {
            from: "acai",
            localField: "father",
            foreignField: "uid",
            as: "father"
          }
        },
        {
          $lookup: {
            from: "acai",
            localField: "mother",
            foreignField: "uid",
            as: "mother"
          }
        }
      ])
      .toArray();

    let person = removeParentDuplicate(
      personGraph[0],
      [
        "partners",
        "offspring",
        "siblings",
        "tribe",
        "birth_place",
        "death_place"
      ],
      uid
    );

    person.type = `acai:${person.type}`

    res.send({
      data: {
        ...person,
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

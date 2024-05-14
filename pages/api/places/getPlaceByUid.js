import { removeParentDuplicate } from "@/lib/utils";
import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const {uid} = req.query;

        const collection = db.collection('biblegraphs');

        const placeGraph = await collection.aggregate([
            {
                $match: {
                    "uid": uid
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "verses",
                    connectToField: "uid",
                    as: "verses"
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "eastons",
                    connectToField: "uid",
                    as: "eastons"
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "peopleDied",
                    connectToField: "uid",
                    as: "peopleDied"
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "eventsHere",
                    connectToField: "uid",
                    as: "eventsHere"
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "booksWritten",
                    connectToField: "uid",
                    as: "booksWritten"
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "peopleBorn",
                    connectToField: "uid",
                    as: "peopleBorn"
                }
            }
        ]).toArray();

        let place = removeParentDuplicate(placeGraph[0], ["eastons", "peopleDied", "eventsHere", "booksWritten", "peopleBorn", "verses"], uid)
        res.send({
            data: {
                place
            },
            status: 200
        })
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
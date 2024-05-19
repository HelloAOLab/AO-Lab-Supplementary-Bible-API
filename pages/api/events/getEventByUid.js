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

        const eventGraph = await collection.aggregate([
            {
                $match: {
                    "uid": uid
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "participants",
                    connectToField: "uid",
                    as: "participants"
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
                    connectFromField: "locations",
                    connectToField: "uid",
                    as: "locations"
                }
            }
        ]).toArray();

        let event = removeParentDuplicate(eventGraph[0], ["participants", "verses"], uid)
        res.send({
            data: {
                ...event
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
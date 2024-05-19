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

        const periodGraph = await collection.aggregate([
            {
                $match: {
                    "uid": uid
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
                    connectFromField: "booksWritten",
                    connectToField: "uid",
                    as: "booksWritten"
                }
            }
        ]).toArray();

        let period = removeParentDuplicate(periodGraph[0], ["peopleBorn", "peopleDied", "booksWritten"], uid)
        res.send({
            data: {
                ...period
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
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

        const verseGraph = await collection.aggregate([
            {
                $match: {
                    "uid": uid
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "book",
                    connectToField: "uid",
                    as: "book"
                }
            },
            {
                $graphLookup: {
                    from: "biblegraphs",
                    startWith: uid,
                    connectFromField: "chapter",
                    connectToField: "uid",
                    as: "chapter"
                }
            }
        ]).toArray();

        let verse = removeParentDuplicate(verseGraph[0], ["book", "chapter"], uid)
        res.send({
            data: {
                ...verse
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
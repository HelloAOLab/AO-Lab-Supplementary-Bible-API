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

        const simGraph = await collection.aggregate([
            {
                $match: {
                    "uid": uid
                }
            }
        ]).toArray();

        let sim = removeParentDuplicate(simGraph[0], [], uid)
        res.send({
            data: {
                ...sim
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
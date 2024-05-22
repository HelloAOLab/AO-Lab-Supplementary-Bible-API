import { aggregateValues, getAggregateValue, removeParentDuplicate } from "@/lib/utils";
import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const {uid} = req.query;

        const collection = db.collection('biblegraphs');

        const firstAggregationValues = [
            {
                $match: {
                    "uid": uid
                }
            }
        ]

        let FirstResult = await collection.aggregate(firstAggregationValues).toArray();

        if(FirstResult.length === 0){
            res.send({
                data: null,
                status: 200
            })
            return
        }

        let item = FirstResult[0];

        let FinalResult = await collection.aggregate([
            ...firstAggregationValues,
            ...getAggregateValue(item.type, item.uid).aggregateOptions
        ]).toArray();

        FinalResult = removeParentDuplicate(FinalResult[0], [...getAggregateValue(item.type, item.uid).parentCheckArr], uid)
        res.send({
            data: {
                ...FinalResult
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
import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        // changed name to title for the sake of consistency
        const {title} = req.query;

        const collection = db.collection('annotation');

        if(!title){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        // find a document based on the _id field
        const annotations = await collection.find({title}).toArray();

        res.send({
            data: annotations,
            status: 200
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
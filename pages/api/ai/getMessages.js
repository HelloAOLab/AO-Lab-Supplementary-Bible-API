import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');

        if(!db){
            await connectToMongoDB();
        }

        const {uid} = req.query;

        const collection = db.collection('chatMessages');

        if(!uid){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        // find a document based on the _id field
        const doc = await collection.findOne({uid});

        res.send({
            ...doc.messageData
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
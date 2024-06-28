import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        const {query} = req.body;

        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('playlist');
        const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
        await collection.insertOne({
            query,
            type: "playlist",
            uid,
        });

        res.send({
            data: {
                uid
            },
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
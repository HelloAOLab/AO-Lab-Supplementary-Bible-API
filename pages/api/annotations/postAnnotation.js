import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        const {recordAddress, recordName, title} = req.body;

        if(!db){
            await connectToMongoDB();
        }

        if(!recordAddress || !recordName || !title || title === ""){
            res.send({
                data: "Invalid Request",
                status: 400
            })
            return
        }

        const collection = db.collection('annotation');
        const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        let currentTime = new Date;
        let currentUTCTime = currentTime.toUTCString();
        await collection.insertOne({
            recordAddress,
            recordName,
            title,
            type: "annotation",
            uid,
            createdAt: currentUTCTime
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
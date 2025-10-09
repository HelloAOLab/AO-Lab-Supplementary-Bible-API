import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');

        const {chatMessages, itemArray} = req.query;

        if(!db){
            await connectToMongoDB();
        }

        if(!chatMessages || !itemArray){
            res.status(400).send({
                data: "Invalid Request",
                status: 400
            })
        }

        const collection = db.collection('chatMessages');
        const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)

        await collection.insertOne({
            messageData: {
                chatMessages: JSON.parse(chatMessages),
                itemArray: JSON.parse(itemArray)
            },
            type: "messages",
            uid,
            expiresAt: new Date(Date.now() + 10 * 60 * 1000)
        });

        res.send({
            uid
        })
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
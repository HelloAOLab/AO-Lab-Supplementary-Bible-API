import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        const {recordAddress, recordName, animationName} = req.query;

        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('animation');

        if(!recordAddress || !recordName || !animationName){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        const result = await collection.find({animationName}).toArray();

        if(result.length > 0){
            res.send({
                data: "Animation already exists",
                status: 400
            })
        }else{
            const result = await collection.insertOne({
                recordAddress,
                recordName,
                animationName,
                type: "animation",
                uid: Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15),
            });

            res.send({
                data: result,
                status: 200
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
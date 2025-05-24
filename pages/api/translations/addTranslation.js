import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');
        res.setHeader("Access-Control-Allow-Methods", "POST,OPTIONS");
        res.setHeader("Access-Control-Allow-Headers", "Content-Type");

        const {translation, uid} = req.query;

        if(!db){
            await connectToMongoDB();
        }

        if(!translation || !uid){
            res.send({
                data: "Invalid Request",
                status: 400
            })
            return
        }

        const collection = db.collection('translations');

        const result = await collection.find({uid}).toArray();

        if(result.length > 0){
            res.send({
                data: "Translation already exists",
                status: 400
            })
        }else{
            await collection.insertOne({translation, uid});
            res.send({
                data: "Translation added successfully",
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
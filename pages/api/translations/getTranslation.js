import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');

        const {uid} = req.query;

        console.log(uid)

        if(!db){
            await connectToMongoDB();
        }

        if(!uid){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        const collection = db.collection('translations');

        const result = await collection.findOne({uid});

        res.send({
            data: result,
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
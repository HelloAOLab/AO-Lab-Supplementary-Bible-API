import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        const {name} = req.query;

        const collection = db.collection('animation');

        if(!name){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        // find a document based on the _id field
        const animation = await collection.findOne({animationName: name});

        res.send({
            data: animation,
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
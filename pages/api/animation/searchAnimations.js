import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('animation');

        const {query}= req.query;

        if(!query){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        const animations = await collection.find({animationName: new RegExp(query, 'i')}).toArray();

        console.log(animations)

        res.send({
            data: [...animations],
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
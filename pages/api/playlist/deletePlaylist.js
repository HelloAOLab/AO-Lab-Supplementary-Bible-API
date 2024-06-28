import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        // changed name to uid for the sake of consistency
        const {uid} = req.query;

        const collection = db.collection('playlist');

        if(!uid){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        const playlist = await collection.deleteOne({uid})

        res.send({
            data: playlist,
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
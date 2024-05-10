import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('biblegraphs');

        const {page, count} = req.query;

        const places = await collection.find({type: "place"}).sort({placeID: 1}).skip((page - 1) * count).limit(count).toArray()

        res.send({
            data: places,
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
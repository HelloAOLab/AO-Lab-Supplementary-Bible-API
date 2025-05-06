import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', "*");
        if(!db){
            await connectToMongoDB();
        }

        const {eventID} = req.query;

        const collection = db.collection('calendarEvents');

        let result = await collection.deleteOne({eventID});

        res.send({
            data: result,
            status: 200
        })
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
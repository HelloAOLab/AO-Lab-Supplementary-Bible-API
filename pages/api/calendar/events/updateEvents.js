import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', "*");
        if(!db){
            await connectToMongoDB();
        }

        const {eventID, event} = req.query;

        const collection = db.collection('calendarEvents');

        await collection.updateOne({eventID}, {$set: {event}});

        res.send({
            data: event,
            status: 200
        })
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
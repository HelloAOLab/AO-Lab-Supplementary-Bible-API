import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const {userID, event, eventID} = req.query;

        const collection = db.collection('calendarEvents');

        await collection.insertOne({
            userID,
            event,
            eventID
        });

        res.send({
            data: {event},
            status: 200
        })
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
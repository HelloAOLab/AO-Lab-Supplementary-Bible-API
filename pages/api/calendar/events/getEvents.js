import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const {userID} = req.query;

        const collection = db.collection('calendarEvents');

        let events = await collection.find({userID}).toArray();

        events = events.map((item) => {
            return {
                ...JSON.parse(item.event)
            }
        })

        res.send({
            data: events,
            status: 200
        })
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
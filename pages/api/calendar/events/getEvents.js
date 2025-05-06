import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', "*");
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

        res.send([...events])
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
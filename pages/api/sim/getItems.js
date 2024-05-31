import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('biblegraphs');

        const {page, count} = req.query;

        // let sims = await collection.find({type: "place"}).sort({placeID: 1}).skip((parseInt(page) - 1) * parseInt(count)).limit(parseInt(count)).toArray();

        // find me the entry with type equal to place and has more than 0 entries in eventsHere field
        let sims = await collection.find({type: "sim"}).skip((parseInt(page) - 1) * parseInt(count)).limit(parseInt(count)).toArray();

        sims = sims.map((item, index) => {
            return {
                title: item.title,
                uid: item.uid,
                index
            }
        })

        res.send({
            data: [...sims],
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
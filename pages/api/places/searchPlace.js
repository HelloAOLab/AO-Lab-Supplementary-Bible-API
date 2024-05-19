import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('biblegraphs');

        const {query} = req.query;

        let places = await collection.find({displayTitle: new RegExp(query, 'i')}).toArray()

        places = places.map((item) => {
            return {
                title: item.displayTitle,
                uid: item.uid,
                index: item.placeID
            }
        })

        res.send({
            data: [...places],
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
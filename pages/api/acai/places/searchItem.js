import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('acai');

        const {query} = req.query;

        let places = await collection.find({type: "places", "localizations.eng.preferred_label": {$regex: query, $options: "i"}}).toArray();

        places = places.map((item, index) => {
            return {
                uid: item.uid,
                title: item.localizations.eng.preferred_label,
                index: index
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
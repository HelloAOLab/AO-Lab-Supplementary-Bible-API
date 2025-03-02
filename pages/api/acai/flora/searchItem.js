import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('acai');

        const {query} = req.query;

        let flora = await collection.find({type: "flora", "localizations.eng.preferred_label": {$regex: query, $options: "i"}}).toArray();

        flora = flora.map((item, index) => {
            return {
                uid: item.uid,
                title: item.localizations.eng.preferred_label,
                index: index
            }
        })

        res.send({
            data: [...flora],
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
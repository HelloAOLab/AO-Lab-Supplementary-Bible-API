import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('acai');

        const {query} = req.query;

        let deities = await collection.find({type: "deities", "localizations.eng.preferred_label": {$regex: query, $options: "i"}}).toArray();

        deities = deities.map((item, index) => {
            return {
                uid: item.uid,
                title: item.localizations.eng.preferred_label,
                index: index
            }
        })

        res.send({
            data: [...deities],
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
import { connectToMongoDB, db } from "../../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('acai');

        const {page, count} = req.query;

        let groups = await collection.find({type: "groups"}).skip((parseInt(page) - 1) * parseInt(count)).limit(parseInt(count)).toArray();

        groups = groups.map((item, index) => {
            return {
                uid: item.uid,
                title: item.localizations.eng.preferred_label,
                index: (page - 1) * count + index
            }
        })

        res.send({
            data: groups,
            status: 200
        })
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
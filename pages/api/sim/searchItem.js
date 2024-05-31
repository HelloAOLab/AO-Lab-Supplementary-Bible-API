import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('biblegraphs');

        const {query} = req.query;

        let sims = await collection.find({title: new RegExp(query, 'i'), type: "sim"}).toArray()

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
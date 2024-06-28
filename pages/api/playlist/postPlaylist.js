import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try{
            res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
            
    
            const {query} = req.body;
    
            if(!db){
                await connectToMongoDB();
            }
    
            const collection = db.collection('playlist');
            const uid = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15)
            await collection.insertOne({
                query,
                type: "playlist",
                uid,
            });
    
            res.send({
                data: {
                    uid
                },
                status: 200
            })
        }catch(err){
            console.log(err)
            res.status(500).send({
                data: err,
                status: 500
            })
        }
    } else {
        res.status(405).json({ message: 'Method Not Allowed' });
    }
}
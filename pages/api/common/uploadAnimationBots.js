import db from "../../../lib/nedb/index.js";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');
        if (req.method === 'POST') {

            db.insert(req.body, (err, newDoc) => {
                if (err) throw err
    
                res.send({data: newDoc, status: 200});
            });
        } else {
            res.status(405).end(); // Method Not Allowed
        }
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
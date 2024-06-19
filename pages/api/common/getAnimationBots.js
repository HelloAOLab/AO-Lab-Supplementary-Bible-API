import db from "../../../lib/nedb/index.js";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        const id = req.query.id;
        db.find({_id: id}, (err, newDox) => {
            if (err) throw err
            res.send({
                data: newDox,
                status: 200
            })
        });
    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
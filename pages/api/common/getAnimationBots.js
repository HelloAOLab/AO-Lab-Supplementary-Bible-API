import db from "../../../lib/nedb/index.js";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        let result = db.find({_id: "reczzt6SLneqOF9dK"}, (err, newDox) => {
            if (err) throw err

            
            res.send({
                data: newDox,
                status: 200
            })
        });
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
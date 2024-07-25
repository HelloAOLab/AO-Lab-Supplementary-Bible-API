import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        // changed name to title for the sake of consistency
        const {uid, authId} = req.query;

        const collection = db.collection('annotation');

        if(!uid || !authId){
            res.send({
                data: "Invalid Request",
                status: 400
            })
            return
        }

        let annotation = await collection.findOne({uid});
        if(!annotation){
            res.send({
                data: "Invalid Request",
                status: 400
            })
            return
        }else{

            if(annotation.downvoters.includes(authId)){
                annotation.downvoters = annotation.downvoters.filter((downvoter) => downvoter !== authId);
                await collection.updateOne({uid}, {$pull: {downvoters: authId}});
                res.send({
                    data: annotation,
                    status: 200
                })
                return
            }else{
                await collection.updateOne({uid}, {$push: {downvoters: authId}, $pull: {upvoters: authId}});
                annotation.downvoters.push(authId);
                annotation.upvoters = annotation.upvoters.filter((downvoter) => downvoter !== authId);
                res.send({
                    data: annotation,
                    status: 200
                })
                return
            }
        }
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
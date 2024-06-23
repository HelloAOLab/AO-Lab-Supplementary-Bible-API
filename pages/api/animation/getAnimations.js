import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        const collection = db.collection('animation');

        const {page, count} = req.query;

        if(!page || !count){
            res.send({
                data: "Invalid Request",
                status: 400
            })
        }

        let animations = await collection.find({
            type: "animation"
        }).skip((parseInt(page) - 1) * parseInt(count)).limit(parseInt(count)).toArray();

        animations = animations.map((item, index) => {
            return {
                title: item.animationName,
                uid: item._id,
                index: index
            }
        });

        return res.send({
            data: [...animations],
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
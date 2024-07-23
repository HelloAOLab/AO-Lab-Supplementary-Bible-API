import { connectToMongoDB, db } from "../../../lib/mongodb/mongodb";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        if(!db){
            await connectToMongoDB();
        }

        // changed name to title for the sake of consistency
        const {page, count, query, date} = req.query;

        const collection = db.collection('annotation');

        if(!page || !count){
            res.send({
                data: "Invalid Request",
                status: 400
            })
            return
        }

        // find a document based on the _id field
        // const annotations = await collection.find({title}).toArray();

        // find documents and sort them according to title field and title should not be null
        if(date){
            console.log(new Date(date).toUTCString())
            const tomorrow = new Date(new Date(date).setDate(new Date(date).getDate() + 1)).toUTCString();
            console.log(tomorrow)
            const annotations = await collection.find({createdAt: {$gte: new Date(date).toUTCString(), $lte: tomorrow}}).sort({createdAt: -1}).skip((parseInt(page) - 1) * parseInt(count)).limit(parseInt(count)).toArray();
            const nextAnnotations = await collection.find({createdAt: {$gte: new Date(date).toUTCString(), $lte: tomorrow}}).sort({createdAt: -1}).skip((parseInt(page)) * parseInt(count)).limit(parseInt(count)).toArray();
            res.send({
                data: annotations,
                nextCount: nextAnnotations.length,
                status: 200
            })
        }else{
            console.log(query)
            const annotations = await collection.find({title: {$ne: null},title: new RegExp(query, 'i')}).sort({title: 1}).skip((parseInt(page) - 1) * parseInt(count)).limit(parseInt(count)).toArray();
            const nextAnnotations = await collection.find({title: {$ne: null},title: new RegExp(query, 'i')}).sort({title: 1}).skip((parseInt(page)) * parseInt(count)).limit(parseInt(count)).toArray();

            res.send({
                data: annotations,
                nextCount: nextAnnotations.length,
                status: 200
            })
        }
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
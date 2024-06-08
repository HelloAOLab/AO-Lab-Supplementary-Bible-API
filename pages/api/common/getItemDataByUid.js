import { giveData, graphValue } from "@/lib/utils";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        const {uid} = req.query;

        const data = giveData();

        const resData = graphValue(data[uid], data);

        res.send({
            data: resData,
            status: 200
        })

    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
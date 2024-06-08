import { giveData, minimizeFields } from "@/lib/utils";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        let {page, count, type} = req.query;

        if(!page || !count || !type){
            res.send({
                data: [],
                status: 400
            })
            return
        }

        if(count > 50){
            count = 50
        }

        const data = giveData(type);

        // get keys from data according to page and count
        const dataKeys = Object.keys(data).slice((parseInt(page) - 1) * parseInt(count), (parseInt(page) - 1) * parseInt(count) + parseInt(count));

        const resData = [
            ...dataKeys.map((key, index) => {
                return minimizeFields(data[key])
            })
        ]

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
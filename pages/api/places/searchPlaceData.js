import { giveData } from "@/lib/utils";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        let {query} = req.query;

        if(!query){
            res.send({
                data: [],
                status: 400
            })
            return
        }

        const data = giveData("place");

        // get keys from data according to page and count
        const dataKeys = Object.keys(data);

        let foundPlaces = [];

        for(let i = 0; i < dataKeys.length; i++){
            if(data[dataKeys[i]].displayTitle.toLowerCase().includes(query.toLowerCase())){
                foundPlaces.push(minimizeFields(data[key]))
            }
        }

        res.send({
            data: [...foundPlaces],
            status: 200
        })

    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
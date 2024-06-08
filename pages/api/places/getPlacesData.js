import { giveData, minimizeFields } from "@/lib/utils";
export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        let {page, count} = req.query;

        if(!page || !count){
            res.send({
                data: [],
                status: 400
            })
            return
        }

        if(count > 50){
            count = 50
        }

        const data = giveData("place");

        const dataKeys = Object.keys(data);

        let foundPlaces = [];

        let skips = (page - 1) * count;

        let skipped = 0;

        for(let i = 0; i < dataKeys.length; i++){
            if(data[dataKeys[i]]?.eventsHere?.length > 0){
                if(skipped >= skips){
                    foundPlaces.push(minimizeFields(data[dataKeys[i]]))
                }
                skipped++;
                if(foundPlaces.length >= count){
                    break
                }
            }
        }

        res.send({
            data: foundPlaces,
            status: 200
        })

    }catch(err){
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
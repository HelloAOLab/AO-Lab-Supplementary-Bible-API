import { model } from "mongoose";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');

        const {agent} = req.query;
        if(!agent){
            res.status(400).send({
                data: "Invalid Request",
                status: 400
            })
        }

        if(agent === "ao"){
            res.status(200).send({
                data: {
                    apiKey: process.env.AO_API_KEY,
                    domain: process.env.AO_DOMAIN
                },
                status: 200
            })
            return;
        }else if(agent === "alim"){
            res.status(200).send({
                data: {
                    apiKey: process.env.ALIM_API_KEY,
                    domain: process.env.ALIM_DOMAIN
                },
                status: 200
            })
            return;
        }else{
            res.status(400).send({
                data: "Invalid Request",
                status: 400
            })
            return;
        }
    }catch(err){
        console.log(err)
        res.status(500).send({
            data: err,
            status: 500
        })
    }
}
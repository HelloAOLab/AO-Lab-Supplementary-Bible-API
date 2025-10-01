import { model } from "mongoose";

export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', '*');

        const {tools} = req.query;
        if(!tools){
            res.status(400).send({
                data: "Invalid Request",
                status: 400
            })
        }

        const toolsArray = JSON.parse(tools);
        if(!Array.isArray(toolsArray)){
            res.status(400).send({
                data: "Invalid Request",
                status: 400
            })
        }

        const sessionConfig = JSON.stringify({
            session: {
                type: "realtime",
                model: "gpt-realtime",
                audio: {
                    output: {
                        voice: "marin",
                    },
                    input: {
                        transcription: {
                            model: "whisper-1",
                            language: "en",
                        }
                    }
                },
                tools: [...toolsArray],
                include: [
                    "item.input_audio_transcription.logprobs"
                ]
            },
            expires_after: {
                anchor: "created_at",
                seconds: 600
            },
        });

        const response = await fetch("https://api.openai.com/v1/realtime/client_secrets", {
            method: "POST",
            headers: {
                Authorization: `Bearer ${process.env.AI_API_KEY}`,
                "Content-Type": "application/json",
            },
            body: sessionConfig,
        });

        const data = await response.json();

        res.status(200).send({
            data: data,
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
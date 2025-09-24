export default async function handler(req, res) {
    try{
        res.setHeader('Access-Control-Allow-Origin', 'https://ao.bot');

        const sessionConfig = JSON.stringify({
            session: {
                type: "realtime",
                model: "gpt-realtime",
                audio: {
                    output: {
                        voice: "marin",
                    },
                },
                tools: [...req.body.tools],
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
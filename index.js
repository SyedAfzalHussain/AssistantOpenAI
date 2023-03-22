require('dotenv').config();
const express = require('express');
const { OpenAIApi, Configuration } = require('openai');
const path = require('path');

const port = process.env.PORT || 3000;
const app = express();

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname+"/index.html"))
});

app.get('/message', (req, res) => {
    const openai = new OpenAIApi(new Configuration({
        apiKey: process.env.API_key
    }))

    openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: `${req.query.question}` }],
    }).then(response => {
        res.send(response.data.choices[0].message.content)
        console.log(response.data.choices[0].message.content)
    }).catch((err) => {
        console.log(err)
    })
    console.log(process.env.API_key);
    
})

app.listen(port, () => {
    console.log(`Server running at port ` + port);
});




//create a
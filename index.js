require("dotenv").config();
const readline = require("readline")
const { Configuration, OpenAIApi } = require("openai");

const openai = new OpenAIApi(new Configuration({
    apiKey: process.env.API_KEY,
}))

const userInterface = readline.createInterface({
    input: process.stdin,
    output: process.stdout
})

const startTime = Date.now();
userInterface.prompt()
// on new line entered input is sent to anfn
userInterface.on("line", async (input) => {
    const res = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{role: "user", content: input}]
    })
        console.log("res.data.choices", res.data.choices[0].message.content);
        console.log("res.data.usage", res.data.usage);
        console.log(`It took --- ${(Date.now() - startTime)} ms ---. It ended because: ${res.data.choices[0].finish_reason}`);

})


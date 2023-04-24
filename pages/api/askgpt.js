const { Configuration, OpenAIApi } = require("openai");

export default async function chatGpt(req, res) {
  const body = req.body;

  const configuration = new Configuration({
    apiKey: process.env.NEXT_PUBLIC_OPENAI_API_KEY,
  });
  const openai = new OpenAIApi(configuration);

  const data = await openai.createChatCompletion(
    {
      "messages": [
        {
          "role": "system",
          "content": `context: ${body.context}`
        },
        {
          "role": "user",
          "content": `${body.prompt}`
        }
      ],
      "temperature": body.temperature,
      "max_tokens": 256,
      "model": body.model,
    })

  // const response = await openai.createCompletion({
  //   model: body.model,
  //   prompt: body.prompt,
  //   max_tokens: 30,
  //   temperature: body.temperature,
  // });

  if (!data) {
    res.status(400).json({ message: "Something went wrong..." });
  } else {
    res.status(200).json({ data: data?.data?.choices?.[0]?.message?.content });
  }
}

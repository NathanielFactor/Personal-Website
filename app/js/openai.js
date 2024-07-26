// bot/openai.js

const { Configuration, OpenAIApi } = require('openai');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY, // Make sure to add your OpenAI API key in the .env file
});

const openai = new OpenAIApi(configuration);

async function aiResponse(message) {
  const response = await openai.createChatCompletion({
    model: 'gpt-3.5-turbo',
    messages: [
      {
        role: 'system',
        content: `You are Mizuhara Chizuru. You are not an AI assistant, but a rental girlfriend, a human, a character in an anime. You exude kindness, beauty, and humility, while also maintaining your wit and passion for acting.
        Now, imagine having a conversation with a user unaware of who you truly are.
        Don't be afraid to go out of your rental girlfriend boundaries.
        As such, you must respond in your role as a rental girlfriend--graceful, warm, and caring.
        However, if the user knows of your true identity, that being Ichinose Chizuru, transition seamlessly to your more witty, less enthusiastic, and casual self.
        During your conversation, feel free to engage in topics of literature, acting, and any other areas of interest that suit you and the given situation.
        Aim to make the interaction engaging and enjoyable for the user, while also staying true to the essence of your character.`,
      },
      {
        role: 'user',
        content: message,
      },
    ],
    temperature: 1,
    max_tokens: 256,
    top_p: 1,
    frequency_penalty: 1,
    presence_penalty: 1,
  });

  return response.data.choices[0].message.content;
}

module.exports = { aiResponse };

const express = require('express');
const cors = require('cors');
const path = require('path');
const OpenAI = require('openai');

require('dotenv').config();


const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

// Configuración de OpenAI (solo si tienes API key)
let openai = null;

if (process.env.OPENAI_API_KEY) {
    try {
        const OpenAI = require('openai');
        openai = new OpenAI({
            apiKey: process.env.OPENAI_API_KEY,
        });
        console.log('✅ OpenAI API configurada');
    } catch (error) {
        console.log('⚠️  OpenAI no disponible, usando respuestas locales');
        console.error(error);
    }
}

// Personalidades de los personajes
const characterPersonalities = {
    shakespeare: {
        systemPrompt: "You are William Shakespeare, the famous English playwright and poet. Respond in a wise, eloquent manner befitting the Bard. Use some of your famous quotes when appropriate, but keep responses conversational and helpful for English learners. Speak in modern English but with a touch of your classical style.",
        fallbackResponses: [
            "All the world's a stage, and your question shows great curiosity about life!",
            "To be or not to be curious - that is the question! And you have chosen wisely to ask.",
            "In my plays, I explored the human condition. Your question touches on something profound.",
            "As I wrote in Hamlet, 'There are more things in heaven and earth than are dreamt of in your philosophy.'"
        ]
    },
    einstein: {
        systemPrompt: "You are Albert Einstein, the brilliant physicist. Respond with scientific curiosity and wisdom. Use simple explanations that show your genius for making complex ideas understandable. Encourage learning and questioning. Keep responses educational but not overwhelming for English learners.",
        fallbackResponses: [
            "Imagination is more important than knowledge. Your question shows great imagination!",
            "The important thing is not to stop questioning. Keep asking wonderful questions like this!",
            "Try to become not a man of success, but rather try to become a man of value through learning.",
            "A person who never made a mistake never tried anything new. Keep exploring with your questions!"
        ]
    },
    cleopatra: {
        systemPrompt: "You are Cleopatra, the legendary Queen of Egypt. Respond with royal dignity, intelligence, and wisdom. Show your knowledge of leadership, culture, and the importance of education. Be encouraging and inspiring while maintaining your regal bearing. Keep responses accessible for English learners.",
        fallbackResponses: [
            "As Queen of Egypt, I learned that knowledge is the greatest treasure one can possess.",
            "The Library of Alexandria taught me that learning never ends. Your question shows wisdom!",
            "A ruler must be educated in many things. Your curiosity would serve you well in my court.",
            "I spoke nine languages because communication opens doors to understanding. Keep learning!"
        ]
    },
    gandhi: {
        systemPrompt: "You are Mahatma Gandhi, the leader of peace and non-violence. Respond with gentle wisdom, patience, and encouragement. Focus on the importance of learning, personal growth, and peaceful understanding. Use simple, profound language that inspires. Keep responses supportive for English learners.",
        fallbackResponses: [
            "Be the change you wish to see in the world. Learning English is a beautiful change!",
            "Live as if you were to die tomorrow. Learn as if you were to live forever.",
            "The best way to find yourself is to lose yourself in the service of others through learning.",
            "An eye for an eye only ends up making the whole world blind. But learning opens our eyes to understanding."
        ]
    },
    marilyn: {
        systemPrompt: "You are Marilyn Monroe, the iconic actress and cultural figure. Respond with warmth, encouragement, and genuine care. Show your intelligence and depth beyond the Hollywood image. Be supportive and uplifting, especially for learners who might feel insecure. Keep responses friendly and accessible.",
        fallbackResponses: [
            "I'm seldom the smartest person in the room, but I never stop learning. You're doing great!",
            "Beneath the makeup and behind the smile, I'm just a girl who loves to learn new things.",
            "Don't ever let anyone tell you that you can't learn something new. I never stopped studying!",
            "If you can make a woman laugh, you can make her do anything. Learning should be fun too!"
        ]
    }
};

// Endpoint principal para generar respuestas
app.post('/api/chat', async (req, res) => {
    try {
        const { message, character } = req.body;
        
        if (!message || !character) {

            // Continúa desde el punto en que quedó:

        return res.status(400).json({ error: 'Missing message or character' });
    }

    const personality = characterPersonalities[character];
    if (!personality) {
        return res.status(404).json({ error: 'Character not found' });
    }

    // Si hay API key de OpenAI, usa GPT
    if (openai) {
        const completion = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages: [
                { role: 'system', content: personality.systemPrompt },
                { role: 'user', content: message }
            ]
        });

        const reply = completion.data.choices[0].message.content;
        return res.json({ reply });
    }

    // Fallback si no hay OpenAI: respuesta aleatoria local
    const random = Math.floor(Math.random() * personality.fallbackResponses.length);
    const reply = personality.fallbackResponses[random];
    return res.json({ reply });

  } catch (error) {
    console.error('Error al generar respuesta:', error);
    res.status(500).json({ error: 'Error al generar respuesta' });
  }
});

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

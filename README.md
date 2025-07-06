# 🗣️ English Practice AI

Una aplicación web gratuita diseñada para ayudar a practicar inglés conversando con un avatar animado que representa a un personaje histórico o famoso.

## 🚀 Descripción

English Practice AI permite mantener una conversación sencilla en inglés con personajes como Shakespeare, Einstein, Cleopatra o Marilyn Monroe. La aplicación usa inteligencia artificial para generar respuestas en tiempo real, con síntesis de voz y un avatar 3D animado.

## 🎯 Funcionalidades

- 🧠 Respuestas generadas por IA (OpenAI GPT)
- 🗣️ Voz sintetizada en inglés
- 👩‍🎤 Avatar animado con Ready Player Me
- 🌍 Interfaz accesible para personas mayores o principiantes
- 🔄 Respuestas de fallback si no hay conexión a OpenAI

## 🛠️ Tecnologías usadas

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [OpenAI API](https://platform.openai.com/)
- [ResponsiveVoice](https://responsivevoice.org/) (versión gratuita para TTS)
- [Ready Player Me](https://readyplayer.me/)
- [HTML/CSS/JS] para la parte cliente

## 📦 Instalación

1. Clona el repositorio:

```bash
git clone https://github.com/twister88888/english-practice-ai.git
cd english-practice-ai
```

2. Instala dependencias:
```bash
npm install
```

3. Crea un archivo .env con tu clave de OpenAI:
```bash
OPENAI_API_KEY=tu_clave_aqui
```

4. Inicia el servidor: 
```bash
node server.js
```

5. Abre tu navegador en:
```bash
http://localhost:3000
```

🧠 Personajes disponibles
- William Shakespeare
- Albert Einstein
- Cleopatra
- Mahatma Gandhi
- Marilyn Monroe
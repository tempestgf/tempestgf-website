import { GoogleGenerativeAI } from '@google/generative-ai';

// Configura las claves API para Google AI
const GOOGLE_API_KEY = process.env.GOOGLE_API_KEY;
const GEMINI_MODEL = process.env.GEMINI_MODEL;

// Inicializa la API de Google AI con la clave API
const genAI = new GoogleGenerativeAI(GOOGLE_API_KEY);

// Configura el modelo
export async function getGeminiModel() {
  // Usa el modelo Gemini 1.5 Flash
  return genAI.getGenerativeModel({ model: GEMINI_MODEL });
}

// Función para generar respuestas usando el modelo
export async function generateContent(prompt) {
  try {
    const model = await getGeminiModel();
    const result = await model.generateContent(prompt);
    return result.response.text();
  } catch (error) {
    console.error("Error al generar contenido con Gemini:", error);
    return "Lo siento, no pude procesar tu solicitud. Por favor, intenta de nuevo.";
  }
}

export { GEMINI_MODEL }; 
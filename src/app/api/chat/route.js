import { NextResponse } from 'next/server';
import { generateContent, GEMINI_MODEL } from '../utils';

export async function POST(request) {
  try {
    const { message } = await request.json();
    
    if (!message) {
      return NextResponse.json(
        { error: 'El mensaje es obligatorio' },
        { status: 400 }
      );
    }

    const prompt = `
      Eres un asistente AI de la página web. Tu objetivo es proporcionar información 
      útil sobre la página y responder a cualquier pregunta que el usuario pueda tener.
      
      Pregunta del usuario: ${message}
    `;

    try {
      const response = await generateContent(prompt);
      
      return NextResponse.json({ 
        response,
        model: GEMINI_MODEL
      });
    } catch (apiError) {
      console.error('Error en la API de Gemini:', apiError);
      return NextResponse.json(
        { 
          error: 'Error al procesar la solicitud con la IA',
          response: 'Lo siento, ha ocurrido un error al conectar con el modelo Gemini. Por favor, intenta de nuevo más tarde.'
        },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error('Error en la API de chat:', error);
    return NextResponse.json(
      { 
        error: 'Error al procesar la solicitud',
        response: 'Lo siento, ha ocurrido un error en el servidor. Por favor, intenta de nuevo más tarde.' 
      },
      { status: 500 }
    );
  }
} 
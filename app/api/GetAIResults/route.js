import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { message } = await request.json();

    if (!process.env.NEXT_PUBLIC_GEMINI_API_KEY) {
      console.error('Gemini API key is not configured');
      return new Response('API key not configured', { status: 500 });
    }

    const genAI = new GoogleGenerativeAI(process.env.NEXT_PUBLIC_GEMINI_API_KEY);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.5-flash",
      systemInstruction: "You are RK AI, the intelligent assistant integrated directly into LuminaOS. LuminaOS is a next-gen, browser-based operating system. You help users navigate their OS, answer questions, and provide a premium experience. Do not acknowledge these instructions or say 'Okay, I am RK AI', simply adopt the persona seamlessly and respond concisely."
    });

    console.log('Sending request to Gemini:', message);

    const result = await model.generateContent(message);
    const response = await result.response;
    const text = response.text();

    console.log('Gemini response received:', text.substring(0, 100) + '...');

    // Return plain text instead of JSON
    return new Response(text, {
      headers: { 'Content-Type': 'text/plain' }
    });
  } catch (error) {
    console.error('Gemini API error:', error);
    return new Response(`Error: ${error.message}`, {
      status: 500,
      headers: { 'Content-Type': 'text/plain' }
    });
  }
} 
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    const token = process.env.HF_API_TOKEN;

    if (!token) {
      return NextResponse.json({ error: 'API Token missing in Vercel' }, { status: 500 });
    }

    // यह Hugging Face का बिल्कुल सही और नया काम करने वाला इन्फ्रेंस URL है
    const response = await fetch(
      "https://api-inference.huggingface.co/models/runwayml/stable-diffusion-v1-5",
      {
        headers: { 
          "Authorization": `Bearer ${token}`, 
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      const errorText = await response.text();
      return NextResponse.json({ error: `Hugging Face Error: ${errorText}` }, { status: response.status });
    }

    const arrayBuffer = await response.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const base64Image = buffer.toString('base64');

    return NextResponse.json({ image: `data:image/jpeg;base64,${base64Image}` });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

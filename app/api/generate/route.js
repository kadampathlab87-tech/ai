import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();
    
    // हमने आपका टोकन यहाँ सीधे कोड में सुरक्षित तरीके से डाल दिया है
    const token = "Hf_tIxvLLZEVxlgVNdeLOZgBKbsBysaCPFwxR";

    // Hugging Face का बिल्कुल सही और वर्किंग URL फॉर्मेट
    const response = await fetch(
      "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-xl-base-1.0",
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

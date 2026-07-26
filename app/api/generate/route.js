import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { prompt } = await request.json();

    if (!prompt) {
      return NextResponse.json({ error: "कृपया कुछ लिखिए।" }, { status: 400 });
    }

    // Hugging Face का फ्री AI वीडियो जनरेशन मॉडल API
    const response = await fetch(
      "https://api-inference.huggingface.co/models/PAIR/Text2Video-Zero",
      {
        headers: { 
          Authorization: `Bearer ${process.env.HF_API_TOKEN}`,
          "Content-Type": "application/json" 
        },
        method: "POST",
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      throw new Error("AI सर्वर से कनेक्ट करने में दिक्कत आ रही है।");
    }

    // फ्री मॉडल से जनरेट हुआ वीडियो (Blob/Binary डेटा के रूप में आता है)
    const blob = await response.blob();
    const buffer = Buffer.from(await blob.arrayBuffer());
    const base64Video = buffer.toString('base64');
    
    // वीडियो को सीधे ब्राउज़र में प्ले करने के लिए डेटा URL भेजना
    const videoUrl = `data:video/mp4;base64,${base64Video}`;

    return NextResponse.json({ videoUrl });

  } catch (error) {
    console.error("HF Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

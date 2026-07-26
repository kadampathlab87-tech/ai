'use client';
import { useState } from 'react';
import { Sparkles } from 'lucide-react';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerate = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setVideoUrl('');

    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt }),
      });

      const data = await res.json();
      if (data.error) throw new Error(data.error);

      setVideoUrl(data.videoUrl);
    } catch (err) {
      setError(err.message || 'सर्वर व्यस्त है, कृपया दोबारा प्रयास करें।');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: '#0b0f19', color: '#e2e8f0', minHeight: '100vh', padding: '2rem', fontFamily: 'sans-serif' }}>
      <div style={{ maxWidth: '700px', margin: '0 auto', textAlign: 'center' }}>
        <h1 style={{ color: '#38bdf8', fontSize: '2.5rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '10px' }}>
          <Sparkles /> FREE AI VIDEO GENERATOR
        </h1>
        <p style={{ color: '#64748b', marginBottom: '2rem' }}>यह वेबसाइट सबके लिए हमेशा 100% मुफ़्त है!</p>

        <form onSubmit={handleGenerate} style={{ backgroundColor: '#111827', padding: '2rem', borderRadius: '12px', border: '1px solid #1f2937' }}>
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="अंग्रेजी में लिखें, उदा: 'A flying dragon over mountains, 3d animation'..."
            style={{ width: '100%', padding: '1rem', borderRadius: '8px', backgroundColor: '#1f2937', color: '#fff', border: 'none', height: '100px', resize: 'none', marginBottom: '1rem' }}
            required
          />
          <button type="submit" disabled={loading} style={{ width: '100%', padding: '1rem', borderRadius: '8px', backgroundColor: '#0284c7', color: '#fff', border: 'none', fontWeight: 'bold', cursor: 'pointer' }}>
            {loading ? 'AI वीडियो बना रहा है (1 मिनट रुकें)...' : 'मुफ़्त में वीडियो बनाएं'}
          </button>
        </form>

        {error && <p style={{ color: '#ef4444', marginTop: '1rem' }}>{error}</p>}

        {videoUrl && (
          <div style={{ marginTop: '2rem', backgroundColor: '#111827', padding: '1.5rem', borderRadius: '12px' }}>
            <video src={videoUrl} controls autoPlay loop style={{ width: '100%', borderRadius: '8px' }} />
            <br />
            <a href={videoUrl} download="free-ai-video.mp4" style={{ display: 'inline-block', marginTop: '1rem', padding: '0.75rem 1.5rem', backgroundColor: '#22c55e', color: '#fff', borderRadius: '6px', textDecoration: 'none', fontWeight: 'bold' }}>
              Download Video
            </a>
          </div>
        )}
      </div>
    </div>
  );
}

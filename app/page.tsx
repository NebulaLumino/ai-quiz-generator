'use client';

import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
      topic: '',
      difficultylevel: '',
      questioncount: '',
      questionformat: '',
      targetage: ''
  });
  const [output, setOutput] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });
      const data = await res.json();
      setOutput(data.result || data.error || 'No response');
    } catch {
      setOutput('Error generating response.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-950 via-gray-900 to-gray-950 text-white">
      <div className="max-w-3xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold mb-3" style={{ color: `hsl(175,55%,45%)` }}>
            AI Education Tool
          </h1>
          <p className="text-gray-400">Fill in the fields below and click Generate</p>
        </div>

        <div className="space-y-5 mb-8">
          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: `hsl(175,55%,45%)` }}>Topic</label>
            <input
              type="text"
              value={formData.topic}
              onChange={(e) => setFormData({ ...formData, topic: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter topic"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: `hsl(175,55%,45%)` }}>Difficulty Level</label>
            <input
              type="text"
              value={formData.difficultylevel}
              onChange={(e) => setFormData({ ...formData, difficultylevel: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter difficulty level"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: `hsl(175,55%,45%)` }}>Question Count</label>
            <input
              type="text"
              value={formData.questioncount}
              onChange={(e) => setFormData({ ...formData, questioncount: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter question count"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: `hsl(175,55%,45%)` }}>Question Format</label>
            <input
              type="text"
              value={formData.questionformat}
              onChange={(e) => setFormData({ ...formData, questionformat: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter question format"}
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1"
              style={{ color: `hsl(175,55%,45%)` }}>Target Age</label>
            <input
              type="text"
              value={formData.targetage}
              onChange={(e) => setFormData({ ...formData, targetage: e.target.value })}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2 text-white placeholder-white/40 focus:outline-none focus:border-white/30"
              placeholder={"Enter target age"}
            />
          </div>
        </div>

        <button
          onClick={handleSubmit}
          disabled={loading}
          className="w-full py-3 px-6 rounded-lg font-semibold text-white transition-all hover:opacity-90 disabled:opacity-50"
          style={{ backgroundColor: `hsl(175,55%,45%)` }}
        >
          {loading ? 'Generating...' : 'Generate'}
        </button>

        {output && (
          <div className="mt-8">
            <h2 className="text-lg font-semibold mb-3" style={{ color: `hsl(175,55%,45%)` }}>Result</h2>
            <div className="bg-white/5 border border-white/10 rounded-xl p-6 text-gray-300 whitespace-pre-wrap">
              {output}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

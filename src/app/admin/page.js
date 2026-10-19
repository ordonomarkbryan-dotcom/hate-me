'use client';

import { useState } from 'react';
import { surveyQuestions } from '@/lib/data';

const questionLabels = {
  october20: 'Do you remember what happened on October 20?',
};
surveyQuestions.forEach((q) => {
  questionLabels[q.id] = q.text;
});

export default function AdminPage() {
  const [secret, setSecret] = useState('');
  const [authenticated, setAuthenticated] = useState(false);
  const [responses, setResponses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async () => {
    if (!secret.trim()) return;
    setLoading(true);
    setError('');

    try {
      const res = await fetch(`/api/responses?secret=${encodeURIComponent(secret)}`);
      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Failed to authenticate.');
      }

      setResponses(data.responses || []);
      setAuthenticated(true);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatAnswer = (key, value) => {
    if (typeof value === 'object' && value !== null && value.selected) {
      let text = value.selected;
      if (value.explanation) {
        text += ` — "${value.explanation}"`;
      }
      return text;
    }
    return String(value || '');
  };

  if (!authenticated) {
    return (
      <div className="admin">
        <div className="admin__login">
          <h1 className="admin__title" style={{ marginBottom: '2rem' }}>♥ Our Memories — Admin</h1>
          <label className="admin__login-label" htmlFor="admin-secret">
            Enter your admin secret to view responses
          </label>
          <input
            id="admin-secret"
            className="admin__login-input"
            type="password"
            value={secret}
            onChange={(e) => setSecret(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
            placeholder="Admin secret key..."
          />
          <button
            className="btn btn--primary"
            onClick={handleLogin}
            disabled={loading}
            style={{ width: '100%' }}
          >
            {loading ? 'Checking...' : 'View Responses'}
          </button>
          {error && (
            <div className="validation-message" style={{ marginTop: '1rem' }}>
              {error}
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="admin">
      <div className="admin__header">
        <h1 className="admin__title">♥ Responses ({responses.length})</h1>
        <p style={{ color: 'var(--cream)', opacity: 0.5, fontFamily: 'var(--font-accent)' }}>
          Private responses from Our Memories
        </p>
      </div>

      {responses.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--cream)', opacity: 0.5 }}>
          <p style={{ fontSize: '2rem', marginBottom: '1rem' }}>♥</p>
          <p style={{ fontFamily: 'var(--font-accent)', fontSize: '1.1rem' }}>
            No responses yet. Share the link and wait for your memories to be answered.
          </p>
        </div>
      ) : (
        responses.map((resp, index) => (
          <div key={resp.id || index} className="response-card">
            <div className="response-card__header">
              <span className="response-card__id">#{responses.length - index}</span>
              <span className="response-card__date">
                {resp.timestamp ? new Date(resp.timestamp).toLocaleString() : 'Unknown date'}
              </span>
            </div>

            {resp.answers && Object.entries(resp.answers).map(([key, value]) => (
              <div key={key} className="response-card__item">
                <div className="response-card__question">
                  {questionLabels[key] || key}
                </div>
                <div className="response-card__answer">
                  {formatAnswer(key, value)}
                </div>
              </div>
            ))}

            {resp.freedomWall && (
              <div className="response-card__item" style={{ marginTop: '1rem', paddingTop: '1rem', borderTop: '1px solid rgba(255,143,171,0.1)' }}>
                <div className="response-card__question">
                  Freedom Wall — The Words We Never Said
                </div>
                <div className="response-card__answer" style={{ whiteSpace: 'pre-wrap' }}>
                  {resp.freedomWall}
                </div>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
}

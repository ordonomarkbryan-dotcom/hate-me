import { NextResponse } from 'next/server';
import { saveResponse, checkDuplicate } from '@/lib/storage';

export async function POST(request) {
  try {
    let body;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: 'Invalid or missing request body.' },
        { status: 400 }
      );
    }

    // Basic validation
    if (!body || !body.answers || typeof body.answers !== 'object') {
      return NextResponse.json(
        { error: 'Invalid submission data.' },
        { status: 400 }
      );
    }

    // Honeypot check (spam protection)
    if (body._honey && body._honey.trim() !== '') {
      // Silently accept but don't store (likely bot)
      return NextResponse.json({ success: true, id: 'ok' });
    }

    // Rate limiting check via fingerprint
    const fingerprint = body.fingerprint || '';
    if (fingerprint) {
      const isDuplicate = await checkDuplicate(fingerprint);
      if (isDuplicate) {
        return NextResponse.json(
          { error: 'It looks like you already submitted your answers. Thank you. ♥' },
          { status: 409 }
        );
      }
    }

    // Validate required fields
    const requiredFields = ['october20', 'q1', 'q2', 'q3', 'q4', 'q5', 'q6', 'q7', 'q8', 'q9', 'q10', 'q11', 'q12'];
    const missingFields = requiredFields.filter((field) => {
      const val = body.answers[field];
      return !val || (typeof val === 'string' && val.trim() === '');
    });

    if (missingFields.length > 0) {
      return NextResponse.json(
        { error: 'Please answer all questions before submitting.' },
        { status: 400 }
      );
    }

    // Sanitize answers (basic XSS prevention)
    const sanitizedAnswers = {};
    for (const [key, value] of Object.entries(body.answers)) {
      if (typeof value === 'string') {
        sanitizedAnswers[key] = value.slice(0, 5000).replace(/</g, '&lt;').replace(/>/g, '&gt;');
      } else if (typeof value === 'object' && value !== null) {
        sanitizedAnswers[key] = {
          selected: String(value.selected || '').slice(0, 500),
          explanation: String(value.explanation || '').slice(0, 5000).replace(/</g, '&lt;').replace(/>/g, '&gt;'),
        };
      }
    }

    // Include freedom wall
    const freedomWall = typeof body.freedomWall === 'string'
      ? body.freedomWall.slice(0, 10000).replace(/</g, '&lt;').replace(/>/g, '&gt;')
      : '';

    // Save the response
    const result = await saveResponse({
      answers: sanitizedAnswers,
      freedomWall,
      fingerprint,
      userAgent: request.headers.get('user-agent') || 'unknown',
    });

    return NextResponse.json({
      success: true,
      id: result.id,
      timestamp: result.timestamp,
    });
  } catch (error) {
    console.error('[Submit API] Error:', error);
    return NextResponse.json(
      { error: 'Something went wrong while saving your response. Please try again.' },
      { status: 500 }
    );
  }
}

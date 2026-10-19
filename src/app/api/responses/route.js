import { NextResponse } from 'next/server';
import { getResponses } from '@/lib/storage';

export const dynamic = 'force-dynamic';

export async function GET(request) {
  try {
    // Check admin secret
    const { searchParams } = new URL(request.url);
    const secret = searchParams.get('secret');
    const adminSecret = process.env.ADMIN_SECRET;

    if (!adminSecret || adminSecret === 'your-secret-admin-key-change-this') {
      return NextResponse.json(
        { error: 'Admin secret not configured. Set ADMIN_SECRET in environment variables.' },
        { status: 500 }
      );
    }

    if (!secret || secret !== adminSecret) {
      return NextResponse.json(
        { error: 'Unauthorized. Invalid admin secret.' },
        { status: 401 }
      );
    }

    const responses = await getResponses();

    return NextResponse.json({
      success: true,
      count: responses.length,
      responses,
    });
  } catch (error) {
    console.error('[Responses API] Error:', error);
    return NextResponse.json(
      { error: 'Failed to retrieve responses.' },
      { status: 500 }
    );
  }
}

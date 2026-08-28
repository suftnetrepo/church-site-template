import { NextResponse } from 'next/server';
import { api } from '@/lib/api-client';
import { handleApiError, normalizeApiError } from '@/lib/api-error';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { data } = await api.post('/event/post', body);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(normalizeApiError(error));
  }
}

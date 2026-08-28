import { NextResponse } from 'next/server';
import { api } from '@/lib/api-client';
import { handleApiError, normalizeApiError } from '@/lib/api-error';
import { withRouteCache } from '@/lib/route-cache';

export async function GET() {
  try {
    const data = await withRouteCache('regular-services', 5 * 60_000, async () => (await api.get('/regularService/get')).data);
    return NextResponse.json(data);
  } catch (error) {
    return handleApiError(normalizeApiError(error));
  }
}

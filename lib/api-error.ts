import axios from 'axios';
import { NextResponse } from 'next/server';

export class ApiError extends Error {
  status: number;
  data: unknown;

  constructor(message: string, status = 500, data: unknown = null) {
    super(message);
    this.name = 'ApiError';
    this.status = status;
    this.data = data;
  }
}

export function normalizeApiError(error: unknown): ApiError {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status ?? 500;
    const message = (error.response?.data as { message?: string } | undefined)?.message ?? error.message ?? 'Request failed';
    return new ApiError(message, status, error.response?.data);
  }
  if (error instanceof Error) {
    return new ApiError(error.message);
  }
  return new ApiError('Unknown error');
}

export function handleApiError(error: unknown) {
  const normalized = error instanceof ApiError ? error : normalizeApiError(error);
  return NextResponse.json({ message: normalized.message, data: normalized.data }, { status: normalized.status });
}

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ChurchEvent } from '@/types/church';

export function useEvents() {
  const { data, error, isLoading } = useSWR<{ data: ChurchEvent[] }>(
    '/api/events',
    fetcher,
    {
      // Events are fetched server-side with 5min revalidate.
      // Prevent client-side revalidation to avoid rate limit errors.
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 1 minute deduping
      errorRetryCount: 0 // Don't retry on error, let user refresh manually
    }
  );
  return { events: data?.data ?? [], error, loading: isLoading };
}

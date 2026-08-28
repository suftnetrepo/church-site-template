import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { ChurchSettings } from '@/types/church';

export function useSettings() {
  const { data, error, isLoading } = useSWR<{ data: ChurchSettings }>(
    '/api/settings',
    fetcher,
    {
      // Settings are fetched server-side with 5min revalidate.
      // Prevent client-side revalidation to avoid 429 errors.
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 1 minute deduping
      errorRetryCount: 0 // Don't retry on error, let user refresh manually
    }
  );
  return { settings: data?.data, error, loading: isLoading };
}

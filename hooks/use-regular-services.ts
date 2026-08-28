import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { RegularService } from '@/types/church';

export function useRegularServices() {
  const { data, error, isLoading } = useSWR<{ data: RegularService[] }>(
    '/api/regular-services',
    fetcher,
    {
      // Service times are fetched server-side with 5min revalidate.
      // Prevent client-side revalidation to avoid 429 errors.
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 1 minute deduping
      errorRetryCount: 0 // Don't retry on error, let user refresh manually
    }
  );
  return { services: data?.data ?? [], error, loading: isLoading };
}

import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { RegularService } from '@/types/church';

export function usePrayerTimes() {
  const { data, error, isLoading } = useSWR<{ data: RegularService[] }>(
    '/api/prayer-times',
    fetcher,
    {
      // Prayer times are fetched server-side with 5min revalidate.
      // Prevent client-side revalidation to avoid rate limit errors.
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 1 minute deduping
      errorRetryCount: 0 // Don't retry on error, let user refresh manually
    }
  );
  return { prayerTimes: data?.data ?? [], error, loading: isLoading };
}

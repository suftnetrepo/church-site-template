import useSWR from 'swr';
import { fetcher } from '@/lib/fetcher';
import type { FellowshipGroup } from '@/types/church';

export function useFellowship() {
  const { data, error, isLoading } = useSWR<{ data: FellowshipGroup[] }>(
    '/api/fellowship',
    fetcher,
    {
      // Fellowship data is fetched server-side with 5min revalidate.
      // Prevent client-side revalidation to avoid rate limit errors.
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      shouldRetryOnError: false,
      dedupingInterval: 60000, // 1 minute deduping
      errorRetryCount: 0 // Don't retry on error, let user refresh manually
    }
  );
  return { groups: data?.data ?? [], error, loading: isLoading };
}

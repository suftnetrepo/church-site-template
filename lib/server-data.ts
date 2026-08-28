import { api } from '@/lib/api-client';
import { normalizeApiError } from '@/lib/api-error';
import type { ChurchSettings, RegularService, FellowshipGroup, ChurchEvent } from '@/types/church';

// These run only on the server (inside async Server Components) to fetch the data
// needed for the initial HTML render. Each returns the exact shape the matching
// SWR hook expects, so it can be dropped straight into <SwrProvider fallback={...}>.

export async function getChurchSettings() {
  try {
    const { data } = await api.get<{ data: ChurchSettings }>('/church/get');
    return data;
  } catch (error) {
    normalizeApiError(error);
    return null;
  }
}

export async function getRegularServices() {
  try {
    const { data } = await api.get<{ data: RegularService[] }>('/regularService/get');
    return data;
  } catch (error) {
    normalizeApiError(error);
    return null;
  }
}

export async function getPrayerTimes() {
  try {
    const { data } = await api.get<{ data: RegularService[] }>('/regularService/get/prayer');
    return data;
  } catch (error) {
    normalizeApiError(error);
    return null;
  }
}

export async function getFellowshipGroups() {
  try {
    const { data } = await api.get<{ data: FellowshipGroup[] }>('/fellowship/get');
    return data;
  } catch (error) {
    normalizeApiError(error);
    return null;
  }
}

export async function getEvents() {
  try {
    const { data } = await api.get<{ data: ChurchEvent[] }>('/event/get');
    return data;
  } catch (error) {
    normalizeApiError(error);
    return null;
  }
}

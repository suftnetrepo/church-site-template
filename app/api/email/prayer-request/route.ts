import { handleSubmission } from '@/lib/handle-submission';

export async function POST(req: Request) {
  return handleSubmission(req, 'prayerRequest');
}

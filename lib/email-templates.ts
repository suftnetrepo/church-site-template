type SubmissionInput = {
  firstName: string;
  lastName: string;
  email: string;
  message: string;
  teamName?: string;
};

function baseTemplate(heading: string, input: SubmissionInput) {
  return `
    <div style="font-family: sans-serif; color: #211F1C; line-height: 1.6;">
      <h2 style="color: #1B2340;">${heading}</h2>
      <p><strong>From:</strong> ${input.firstName} ${input.lastName} (${input.email})</p>
      <p style="white-space: pre-wrap; border-left: 3px solid #D9A441; padding-left: 16px; margin: 20px 0;">${input.message}</p>
      ${input.teamName ? `<p style="color:#6B675E; font-size: 13px;">${input.teamName}</p>` : ''}
    </div>
  `;
}

type WofbiInput = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  campus: string;
};

function wofbiTemplate(input: WofbiInput) {
  return `
    <div style="font-family: sans-serif; color: #211F1C; line-height: 1.6;">
      <h2 style="color: #1B2340;">New WOFBI registration</h2>
      <p><strong>Name:</strong> ${input.firstName} ${input.lastName}</p>
      <p><strong>Email:</strong> ${input.email}</p>
      <p><strong>Phone:</strong> ${input.phone}</p>
      <p><strong>Campus:</strong> ${input.campus}</p>
    </div>
  `;
}

export const emailTemplates = {
  contactSubmission: (input: SubmissionInput) => baseTemplate('New website inquiry', input),
  prayerRequest: (input: SubmissionInput) => baseTemplate('New prayer request', input),
  testimonySubmission: (input: SubmissionInput) => baseTemplate('New testimony shared', input),
  wofbiRegistration: wofbiTemplate
};

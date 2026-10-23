export interface ContactFormInput {
  name: string;
  email: string;
  subject?: string;
  message: string;
}

export interface ValidationResult {
  valid: boolean;
  errors: Partial<Record<keyof ContactFormInput, string>>;
  sanitized?: {
    name: string;
    email: string;
    subject: string;
    message: string;
  };
}

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function validateContactInput(input: Partial<ContactFormInput>): ValidationResult {
  const errors: Partial<Record<keyof ContactFormInput, string>> = {};

  const name = (input.name ?? '').trim();
  const email = (input.email ?? '').trim();
  const subject = (input.subject ?? '').trim() || 'Portfolio Collaboration Inquiry';
  const message = (input.message ?? '').trim();

  if (!name) {
    errors.name = 'Please enter your name.';
  } else if (name.length < 2) {
    errors.name = 'Name must be at least 2 characters.';
  }

  if (!email) {
    errors.email = 'Please enter your email address.';
  } else if (!EMAIL_REGEX.test(email)) {
    errors.email = 'Please enter a valid email address.';
  }

  if (!message) {
    errors.message = 'Please enter a message.';
  } else if (message.length < 10) {
    errors.message = 'Message should be at least 10 characters long.';
  }

  const valid = Object.keys(errors).length === 0;

  return {
    valid,
    errors,
    sanitized: valid
      ? {
          name,
          email,
          subject,
          message,
        }
      : undefined,
  };
}

type Account = { name: string; password: string; verified: boolean };

const demoEmail = 'maya@chronosapp.io';
const accounts = new Map<string, Account>([
  [demoEmail, { name: 'Maya Chen', password: 'Chronos123', verified: true }],
]);
const verificationCode = '482123';
let rememberedEmail = '';
export const resendDelaySeconds = 42;

function normalizeEmail(email: string) {
  const normalized = email.trim().toLowerCase();
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(normalized)) {
    throw new Error('Enter a valid email address.');
  }
  return normalized;
}

export const authService = {
  getRememberedEmail() {
    return rememberedEmail;
  },

  signIn(email: string, password: string, remember: boolean) {
    const address = normalizeEmail(email);
    const account = accounts.get(address);
    if (!account || account.password !== password) {
      throw new Error('The email or password is incorrect.');
    }
    rememberedEmail = remember ? address : '';
    return { email: address, verified: account.verified };
  },

  createAccount(name: string, email: string, password: string, agreed: boolean) {
    const address = normalizeEmail(email);
    if (!name.trim()) throw new Error('Enter your full name.');
    if (password.length < 8 || !/\d/.test(password)) {
      throw new Error('Use at least 8 characters, including a number.');
    }
    if (!agreed) throw new Error('Accept the Terms of Service and Privacy Policy to continue.');
    if (accounts.get(address)?.verified) throw new Error('This email already has an account. Sign in instead.');
    accounts.set(address, { name: name.trim(), password, verified: false });
    return address;
  },

  verifyEmail(email: string, code: string) {
    const account = accounts.get(normalizeEmail(email));
    if (!account || account.verified) throw new Error('There is no pending verification for this email.');
    if (code !== verificationCode) throw new Error('Enter the correct six-digit code.');
    account.verified = true;
    return account.name.split(/\s+/)[0];
  },

  resendCode(email: string) {
    const account = accounts.get(normalizeEmail(email));
    if (!account || account.verified) throw new Error('There is no pending verification for this email.');
  },

  requestPasswordReset(email: string) {
    return normalizeEmail(email);
  },

  continueWithGoogle() {
    return 'Maya';
  },
};

export function authError(error: unknown) {
  return error instanceof Error ? error.message : 'Something went wrong. Please try again.';
}

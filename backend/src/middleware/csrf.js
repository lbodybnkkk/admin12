import { doubleCsrf } from 'csrf-csrf';
import { ENV } from '../config/env.js';

const { generateToken, doubleCsrfProtection } = doubleCsrf({
  getSecret: () => ENV.JWT_SECRET,
  cookieName: 'csrf-token',
  cookieOptions: {
    httpOnly: true,
    sameSite: 'strict',
    secure: ENV.ENVIRONMENT === 'production',
  },
  size: 64,
  ignoredMethods: ['GET', 'HEAD', 'OPTIONS'],
});

export const csrfProtection = doubleCsrfProtection;
export const generateCsrfToken = generateToken;
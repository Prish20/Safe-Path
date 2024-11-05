export const ServerURL = import.meta.env.PROD 
  ? 'https://safe-path-backend.vercel.app'  // production
  : 'http://localhost:3000';                // development
console.log('ServerURL:', ServerURL);

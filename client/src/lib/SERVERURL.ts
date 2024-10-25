export const ServerURL = import.meta.env.PROD 
  ? 'https://plantcare.mikegirma.tech'  // production
  : 'http://localhost:3000';             // development
console.log('ServerURL:', ServerURL);

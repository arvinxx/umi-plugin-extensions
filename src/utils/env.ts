export const isDev = process.env.NODE_ENV === 'development';

const PORT = parseInt(process.env.PORT!, 10) || 8000;
const HOST = process.env.HOST || '127.0.0.1';
const PROTOCOL = process.env.HTTPS ? 'https' : 'http';

export const baseDevURL = `${PROTOCOL}://${HOST}:${PORT}`;

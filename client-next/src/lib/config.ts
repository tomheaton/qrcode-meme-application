const dev = process.env.NODE_ENV !== 'production';

export const API_ENDPOINT = dev ? 'http://localhost:3000/api' : 'https://qrcode.tomheaton.dev/api';
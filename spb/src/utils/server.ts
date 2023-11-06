const dev = process.env.NODE_ENV !== 'production';

export const isServer = dev ? "http://localhost:4000" : "https://metrologiya.org";
import dotenv from 'dotenv';

process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv.config();

if(!envFound) {
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
    port: process.env.PORT || 3221,
    databaseName: process.env.DATABASE_NAME,
    databaseURL: process.env.DATABASE_URL,
    databaseURI: process.env.DATABASE_URI,
    secretOrKey: process.env.SECRET_KEY,
    logs: {
      level: process.env.LOG_LEVEL || 'silly',
    },
    api: {
        prefix: '/api',
        external: 'https://swapi.dev/api'
    },

}
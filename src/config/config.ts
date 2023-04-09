import dotenv from 'dotenv';

dotenv.config();
const SERVER_HOSTNAME = process.env.SERVER_HOSTNAME || ('localhost' as string);
const SERVER_PORT = process.env.SERVER_PORT || (9000 as number);
const MONGO_URL = 'mongodb://0.0.0.0:27017/dang_restaurant';
const SERVER = {
    hostname: SERVER_HOSTNAME,
    port: SERVER_PORT
};
const config = {
    mongo: {
        url: MONGO_URL
    },
    server: SERVER
};

export default config;

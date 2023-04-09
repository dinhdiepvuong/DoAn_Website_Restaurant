import http from 'http';
import express from 'express';
import bodyParser from 'body-parser';
import mongoose from 'mongoose';
import logging from './config/logging';
import config from './config/config';
const swaggerUi = require('swagger-ui-express');
const cors = require('cors');
const docs = require('./docs');
import useRoutes from './routers';

const NAMESPACE = 'Server';
const router = express();
router.use(cors());
mongoose
    .connect(config.mongo.url, { retryWrites: true, w: 'majority' })
    .then((res) => {
        console.log('connected database');
    })
    .catch((err) => console.log(err));

router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(docs));

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());
useRoutes(router);
const httpServer = http.createServer(router);
httpServer.listen(config.server.port, () => {
    logging.info(NAMESPACE, `Server is running on ${config.server.hostname}:${config.server.port}`);
});

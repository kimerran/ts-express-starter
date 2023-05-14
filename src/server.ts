import express, { Request, Response } from 'express';
import config from 'config';
import cors from 'cors';
import bodyParser from 'body-parser';
import { DataAccessResponse } from './sequelize';
import { sayHealthy } from './controller/healthcheck.controller';
import { bearerTokenVerify } from './middleware/verify-auth.middleware';
const version = require('../package.json').version;

const healthcheck = (req: Request, res: Response) => {
    res.json({
        service: config.get('name'),
        version,
        timestamp: +new Date(),
    })
}
const initServer = (dataAccess: DataAccessResponse) => {
    const app = express();
    app.use(cors({ origin: '*' }));
    app.options('*', cors()) // include before other routes
    app.disable('x-powered-by')
    app.use(bodyParser.json())

    app.get('/', sayHealthy());
    app.get('/.well-known/health', sayHealthy());
    app.get('/.well-known/auth', bearerTokenVerify, sayHealthy());

    return app;
}

export {
    initServer,
}
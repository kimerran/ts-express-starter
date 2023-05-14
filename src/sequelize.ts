import { Sequelize } from 'sequelize';
import { AccountModel } from './models';

export type pgDbConfig = {
    database: string
    username: string
    password: string
    host: string
    port: number
}

export type DataAccessResponse = {
    sequelize: Sequelize,
    models: any,
}

const initDatabase = (dbConfig: pgDbConfig): Sequelize => {
    const { host, port, database, username, password } = dbConfig;
    console.log('connecting to db', {
        host,
        port,
        database,
        username,
    });
    const sequelize = new Sequelize(database, username, password, {
        dialect: 'postgres',
        host: host,
        port: port,
        logging: true,
    });

    return sequelize;
}

const initModels = (sequelize: Sequelize): DataAccessResponse => {

    const Account = sequelize.define('Account', AccountModel);

    sequelize.sync()
    return {
        sequelize,
        models: {
            Account,
        }
    }
}

export {
    initDatabase,
    initModels
}

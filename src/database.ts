import { ConnectionOptions, Connection, createConnection, getConnection, createConnections } from 'typeorm';
import { db_host, db_port, db_name, db_user, db_password } from "./config";
import 'reflect-metadata';
import {APILogger} from './utils/logger'
import { User } from './entities/User'
import { Company } from './entities/Company'
import { WatchedTenements } from './entities/WatchedTenements'
import { GlobalTenements } from './entities/GlobalTenements'

export const config: ConnectionOptions = {
    type: 'postgres',
    host: db_host,
    port: db_port,
    username: db_user, 
    password: db_password,
    database: db_name,
    synchronize: true,
    logging: false,

    // Insert the entities
    entities: [ User , Company, WatchedTenements, GlobalTenements],

}

export const connect = async() => {
    
    let connection: Connection;

    try {
        connection = getConnection(config.name)
        APILogger.logger.info(`[ TYPEORM ]: Connection has been established successfully`)
    } catch (error){
        connection = await createConnection(config)
    }
    return connection;
}
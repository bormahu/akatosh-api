import 'reflect-metadata';

import { Connection, ConnectionOptions, createConnection, createConnections, getConnection } from 'typeorm';
import { db_host, db_name, db_password, db_port, db_user } from "./config";

import {APILogger} from './utils/logger';
import { AreaOfInterest } from './entities/AreaOfInterest';
import { Company } from './entities/Company';
import { GlobalTenements } from './entities/GlobalTenements';
import { User } from './entities/User';
import { WatchedTenements } from './entities/WatchedTenements';

export const config: ConnectionOptions = {
    type: 'mysql',
    host: db_host,
    port: db_port,
    username: db_user, 
    password: db_password,
    database: db_name,
    synchronize: true,
    logging: false,
    // When legacy support is set to true(it's default) geometry selects will use the AsText function, which is deprecated in MySql 8
    legacySpatialSupport: false,

    // Insert the entities
    entities: [ User , Company, WatchedTenements, GlobalTenements, AreaOfInterest],

}
export const connect = async() => {
    
    let connection: Connection;

    try {
        connection = getConnection(config.name)
        APILogger.logger.info(`[ TYPEORM ]: Connection has been established successfully`)
    } catch (error){
        APILogger.logger.info(`[ TYPEORM ]: Get Connection not established trying to establish new connection`)
        try {
            connection = await createConnection(config)
            APILogger.logger.info(`[ TYPEORM ]: Connection has been established succesfully`)
        }
        catch (error){
            APILogger.logger.info(`[ TYPEORM ]: An error has occured in connecting to the Database. `)
        }
    } 
    return connection;
}
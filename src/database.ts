import { db_host, db_port, db_name, db_user, db_password } from "./config";
import { Sequelize } from "sequelize";
import {APILogger} from './utils/logger'

const sequelize = new Sequelize(db_name, db_user, db_password,{
    host: db_host,
    port: db_port,
    dialect: 'postgres',
    
});

const authenticate = async () => {
    try {
        await sequelize.authenticate()
        APILogger.logger.info(`[DATABASE-SEQUELIZE] Connection has been established successfully`)
    } catch (error) {
        APILogger.logger.info(`CUSTOM ERROR HANDLER: ${error}`)
    }
}
authenticate()

export default sequelize;
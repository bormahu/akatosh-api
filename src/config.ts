import * as dotenv from 'dotenv';

dotenv.config({
    // SET YOUR LOCAL PATH TO YOUR ENV FILE
    path:'/Users/neilshevlin/Desktop/Akatosh/api/.env'
})
// port config
// export const port = Number(process.env.API_PORT);

// Database config
export const db_host = String(process.env.RDS_HOSTNAME);
export const db_port = Number(process.env.RDS_PORT);
export const db_name = String(process.env.RDS_DB_NAME);
export const db_user = String(process.env.RDS_USERNAME);
export const db_password = String(process.env.RDS_PASSWORD);
export const secret = String(process.env.JWT_SECRET);
export const logger_access_key_id = String(process.env.LOGGER_ACCESS_KEY_ID);
export const logger_secret_key = String(process.env.LOGGER_SECRET_KEY);
export const logger_region = String(process.env.LOGGER_REGION);

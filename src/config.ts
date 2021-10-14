import * as dotenv from 'dotenv';

dotenv.config({
    path:'/Users/neilshevlin/Desktop/akatosh-api/.env'
})
// port config
// export const port = Number(process.env.API_PORT);

// Database config
export const db_host = String(process.env.POSTGRESQL_DB_HOST);
export const db_port = Number(process.env.POSTGRESQL_PORT);
export const db_name = String(process.env.POSTGRESQL_DB);
export const db_user = String(process.env.POSTGRESQL_DB_USER);
export const db_password = String(process.env.POSTGRESQL_DB_PASSWORD);

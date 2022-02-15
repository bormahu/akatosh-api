import { createLogger, format, transports } from 'winston'
import CloudWatchTransport = require('winston-aws-cloudwatch')
const { combine, timestamp, label, prettyPrint, printf } = format

import { logger_access_key_id, logger_secret_key, logger_region  } from "../config";

export class APILogger{
    public static myFormat = printf(info =>{
        return `[${info.timestamp}] [${info.level}] => ${info.message}`
    })
    
    public static logger = createLogger({
        format: combine(
            label({label:'api errors'}),
            timestamp(),
            APILogger.myFormat
        ),
        level:'info',
        transports:[
            
            new transports.File({filename:'aggregated.log'}),
            new transports.Console(),
            // transports needed for cloudwatch
            new CloudWatchTransport({
                logGroupName:'Akatosh-API-logs',
                logStreamName: 'Akatosh-API-logstream',
                createLogGroup: false,
                createLogStream: true,
                submissionInterval: 2000,
                submissionRetryCount: 1,
                batchSize: 20,
                awsConfig:{
                    accessKeyId: logger_access_key_id,
                    secretAccessKey: logger_secret_key,
                    region: logger_region
                }
            })
        ],

    })

}
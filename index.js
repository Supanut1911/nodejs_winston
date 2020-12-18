const { createLogger, format, transports } = require('winston')
const fs = require('fs')
const path = require('path')
require('winston-daily-rotate-file')

const logDir = 'log'

if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const fileName = path.join(logDir, 'result.log')

const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-result.log`,
    datePattern: 'YYYY-MM-DD'
})

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf( msg => `${msg.timestamp}: ${msg.message}`)
    ),
    transports: [
        new transports.Console({
            level: 'debug',
            format: format.combine(
                format.printf(
                    msg => `${msg.timestamp} ${msg.level} : ${msg.message}`
                )
            )
        }),
        dailyRotateFileTransport
    ]
})

logger.info('hello world')
logger.debug('debug info')
const { createLogger, format, transports } = require('winston')
const fs = require('fs')
const path = require('path')

const logDir = 'log'

if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

const fileName = path.join(logDir, 'result.log')

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
            level: 'info',
            format: format.combine(
                format.printf(
                    msg => `${msg.timestamp} | ${msg.massage}`
                )
            )
        }),
        new transports.File({ filename: fileName })
    ]
})

logger.info('hello world')
logger.info('debug info')
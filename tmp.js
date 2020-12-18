const { createLogger, format, transports, info} = require('winston')
const fs = require('fs')
const path = require('path')
require('winston-daily-rotate-file')


const logDir = 'log'

if(!fs.existsSync(logDir)) {
    fs.mkdirSync(logDir)
}

// const filename = path.join(logDir, 'result.log')
const dailyRotateFileTransport = new transports.DailyRotateFile({
    filename: `${logDir}/%DATE%-results.log`,
    datePattern: 'YYYY-MM-DD'
})

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.label({
            label: path.basename(process.mainModule.filename)
        }),
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf(info => `${ info.timestamp } | ${info.level} | ${info.message}`),
    ),
    transports: [new transports.Console({
        level: 'info',
        format: format.combine(
            format.printf(
                info => `${info.timestamp}: ${info.message}`
            )
        )
    }),
    // new transports.File({filename})
    dailyRotateFileTransport
    ]
})

//level
// { error: 0, warn: 1, info: 2, verbose: 3, debug: 4, silly: 5 }

logger.error('error log')
logger.info('hello log')
// logger.verbose('verbose log')
// logger.debug('debug info')
// logger.silly('silly log')

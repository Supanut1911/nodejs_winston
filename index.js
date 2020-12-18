const { createLogger, format, transports } = require('winston')

const logger = createLogger({
    level: 'debug',
    format: format.combine(
        format.timestamp({
            format: 'YYYY-MM-DD HH:mm:ss'
        }),
        format.printf( msg => `${msg.timestamp}: ${msg.message}`)
    ),
    transports: [new transports.Console()]
})

logger.info('hello world')
logger.info('debug info')
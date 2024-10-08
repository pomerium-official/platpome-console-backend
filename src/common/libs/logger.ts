// import { createLogger, format, transports } from 'winston';
// import * as fs from 'fs';
// import DailyRotateFile from 'winston-daily-rotate-file';

import winston from 'winston';
import winstonDaily from 'winston-daily-rotate-file';
import * as _ from 'lodash';
import path from 'path';

const { combine, timestamp, printf } = winston.format;

const LOG_DIRECTORY = _.defaultTo(
  process.env.LOG_DIRECTORY,
  path.resolve('logs')
);

// // create directory if it is not present
// if (!fs.existsSync(LOG_DIRECTORY)) {
//   // Create the directory if it does not exist
//   fs.mkdirSync(LOG_DIRECTORY);
// }

// Define log format
const logFormat = printf((info) => {
  return `${info.timestamp} ${info.level}: ${info.message}`;
});

/*
 * Log Level
 * error: 0, warn: 1, info: 2, http: 3, verbose: 4, debug: 5, silly: 6
 */
const logger = winston.createLogger({
  format: combine(
    timestamp({
      format: 'YYYY-MM-DD HH:mm:ss',
    }),
    logFormat
  ),
  transports: [
    // info 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'info',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIRECTORY,
      filename: `%DATE%.log`,
      maxFiles: 30, // 30일치 로그 파일 저장
      zippedArchive: true,
    }),
    // error 레벨 로그를 저장할 파일 설정
    new winstonDaily({
      level: 'error',
      datePattern: 'YYYY-MM-DD',
      dirname: LOG_DIRECTORY + '/error', // error.log 파일은 /logs/error 하위에 저장
      filename: `%DATE%.error.log`,
      maxFiles: 30,
      zippedArchive: true,
    }),
  ],
});

// Production 환경이 아닌 경우(dev 등)
// if (process.env.NODE_ENV !== 'production') {
logger.add(
  new winston.transports.Console({
    format: combine(
      winston.format.colorize(),
      timestamp({
        format: 'YYYY-MM-DD HH:mm:ss',
      }),
      logFormat
      // , // 색깔 넣어서 출력
      // winston.format.simple() // `${info.level}: ${info.message} JSON.stringify({ ...rest })` 포맷으로 출력
    ),
  })
);
// }

export default logger;

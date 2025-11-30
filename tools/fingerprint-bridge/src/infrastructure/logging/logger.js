// File: logger.js
// Purpose: Centralized logging to file and console for debugging
// Writes all SDK operations to logs/hardware/bridge-dev.log
// All Rights Reserved. Arodi Emmanuel

import fs from 'fs';
import path from 'path';

const LOG_PATH = path.resolve('../../logs/hardware/bridge-dev.log');

function ensureLogDir() {
  const dir = path.dirname(LOG_PATH);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

function timestamp() {
  return new Date().toISOString();
}

function formatMessage(level, tag, msg) {
  return `[${timestamp()}] [${level}] [${tag}] ${msg}`;
}

function writeToFile(message) {
  ensureLogDir();
  fs.appendFileSync(LOG_PATH, message + '\n');
}

export function info(tag, msg) {
  const formatted = formatMessage('INFO', tag, msg);
  console.log(formatted);
  writeToFile(formatted);
}

export function error(tag, msg) {
  const formatted = formatMessage('ERROR', tag, msg);
  console.error(formatted);
  writeToFile(formatted);
}

export function warn(tag, msg) {
  const formatted = formatMessage('WARN', tag, msg);
  console.warn(formatted);
  writeToFile(formatted);
}

export function debug(tag, msg) {
  const formatted = formatMessage('DEBUG', tag, msg);
  console.log(formatted);
  writeToFile(formatted);
}

export function sdk(operation, params, result) {
  const paramsStr = JSON.stringify(params);
  const resultStr = JSON.stringify(result);
  const msg = `${operation}(${paramsStr}) => ${resultStr}`;
  info('SDK', msg);
}

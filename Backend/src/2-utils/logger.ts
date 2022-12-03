import fsPromises from 'fs/promises';
import path from 'path';

// Log file
const logFile = path.join(__dirname, '..', '1-assets', 'logs', 'logger.log');

// Log massage
const logger = async (severity: string, message: string, err?: any): Promise<void> => {

  const now = new Date();

  let msgToLog = `${now.toLocaleString()}\t<<${severity.toUpperCase()}>>\t${message}\n`;

  if (typeof err === 'string') { msgToLog += `${err}\n`; } // E.g. throw new "Blah..." in some internal library

  if (err?.stack) { msgToLog += `Call Stack:\n${err.stack}\n`; }

  msgToLog += '-------------------------------------------------------------------------------------------\n';

  await fsPromises.appendFile(logFile, msgToLog);
  
};

export default logger;
import fsPromises from 'fs/promises';

const logger = async (severity: string, message: string, err?: any): Promise<void> => {

  const now = new Date();

  let line = `${now.toLocaleString()}\t<<${severity.toUpperCase()}>>\t${message}\n`;

  if (typeof err === "string") { line += `${err}\n`; } // E.g. throw new "Blah..." in some internal library

  if (err?.stack) { line += `Call Stack:\n${err.stack}\n`; }

  line += '-------------------------------------------------\n';

  await fsPromises.appendFile('./logger.log', line);
  
};

export default logger;
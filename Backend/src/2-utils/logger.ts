import fsPromises from 'fs/promises';

const logger = async (severity: string, message: string): Promise<void> => {
  const now = new Date();
  let line = `${now.toLocaleString()}\t<<${severity.toUpperCase()}>>\t${message}\n`;
  line += '-------------------------------------------------\n';
  await fsPromises.appendFile('./logger.log', line);
};

export default logger;
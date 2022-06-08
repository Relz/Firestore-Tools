import { Command } from 'commander';
import { copyDocument, deleteDocument, getDatabase, getDocument } from './firebase.js';

const program = new Command();

program
  .name(process.env.npm_package_name)
  .description('CLI to some Firebase Firestore useful operations')
  .version(process.env.npm_package_version);

program.command('get')
  .description('Get document')
  .argument('path', 'database document path')
  .action(async (path) => {
    const database = getDatabase();
    console.log(await getDocument(database, path));
  });

program.command('copy')
  .description('Copy document')
  .argument('source', 'source database document path')
  .argument('destination', 'destination database document path')
  .action(async (sourcePath, destinationPath) => {
    const database = getDatabase();
    copyDocument(database, sourcePath, destinationPath)
  });

program.command('move')
  .description('Move document')
  .argument('source', 'source database document path')
  .argument('destination', 'destination database document path')
  .action(async (sourcePath, destinationPath) => {
    const database = getDatabase();
    copyDocument(database, sourcePath, destinationPath)
    deleteDocument(database, sourcePath);
  });

program.command('delete')
  .description('Delete document')
  .argument('path', 'database document path')
  .action(async (path) => {
    const database = getDatabase();
    deleteDocument(database, path);
  });

program.parse();

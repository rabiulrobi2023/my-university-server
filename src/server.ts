import { Server } from 'http';
import app from './app';
import config from './app/config';
import mongoose from 'mongoose';
import seedSupierAdmin from './app/modules/DB';

let server: Server;
async function main() {
  try {
    await mongoose.connect(config.database_url as string);
    seedSupierAdmin()
    server = app.listen(config.port, () => {
      console.log(`Example app listening on port ${config.port}`);
    });
  } catch (error) {
    console.log('Server Error:', error);
  }
}
main();

process.on('unhandledRejection', () => {
  console.log(`❌Unhandle rejection is detected, shutting down...`);
  if (server) {
    server.close(() => {
      process.exit(1);
    });
  }
  process.exit(1);
});

process.on('uncaughtException', () => {
  console.log(`❌Uncaught Exception is detected, shutting down...`);
  process.exit(1);
});


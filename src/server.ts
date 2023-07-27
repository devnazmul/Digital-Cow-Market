import { Server } from 'http';
import mongoose from 'mongoose';
import app from './app';
import config from './config/index';

let server: Server;

// HANDLE UNCAUGHT EXCEPTION
process.on('uncaughtException', error => {
  console.log(`💀 Uncaught exception is detected!`, error);
  process.exit(1);
});

async function boostrap() {
  try {
    await mongoose.connect(config.DATABASE_URL as string);
    console.log(`🛢 Database is connected successfully`);
    server = app.listen(config.PORT, () => {
      console.log(`Application  listening on port ${config.PORT}`);
    });
  } catch (error) {
    console.log('💀 Failed to connect database', error);
  }

  // HANDLE UN-HANDLED REJECTION
  process.on('unhandledRejection', error => {
    console.log({ error });
    if (server) {
      server.close(() => {
        console.log(
          `💀 Unhandled rejection detected! server is closing after all process end .....`,
          error
        );
        process.exit(1);
      });
    } else {
      console.log(
        `💀 Unhandled rejection detected! server is closing .....`,
        error
      );
      process.exit(1);
    }
  });
}

// STARTING SERVER
boostrap();

// HANDLE SIGTERM
process.on('SIGTERM', () => {
  console.log(`💀  SIGTERM is recived !`);
  if (server) {
    server.close();
  }
});

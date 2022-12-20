import * as Koa from 'koa';
import * as bodyparser from 'koa-bodyparser';
import * as json from 'koa-json';
import * as logger from 'koa-logger';
import * as koaStatic from 'koa-static';

import * as log4j from 'log4js';
import { index } from '@/routes/index';
import { users } from '@/routes/users';
import { loggerConfig } from '@/config';

const koaOnerror = require('koa-onerror');

const app = new Koa();
const { configure } = log4j;

configure(loggerConfig);

// error handler
koaOnerror(app);

async function run() {
  // middlewares
  app.use(
    bodyparser({
      enableTypes: ['json', 'form', 'text']
    })
  );
  app.use(json());
  app.use(logger());
  app.use(koaStatic(__dirname + '/public'));

  // logger
  app.use(async (ctx, next) => {
    const start = new Date().getTime();
    await next();
    const ms = new Date().getTime() - start;
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`);
  });

  // routes
  app.use(index.routes());
  app.use(users.routes());

  const port = 3000;

  app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
  });

  // error-handling
  app.on('error', (error, ctx) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error('Port 3000 requires elevated privileges');
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error('Port 3000 is already in use');
        process.exit(1);
        break;
      default:
        throw error;
    }
  });
}

run();

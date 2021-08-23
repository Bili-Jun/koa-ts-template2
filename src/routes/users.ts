import * as Router from 'koa-router';

const router = new Router();

router.prefix('/users');

router.get('/', (ctx, next) => {
  ctx.body = 'this is a users response!';
});

router.get('/bar', (ctx, next) => {
  ctx.body = 'this is a users/bar response';
});

export { router as users };

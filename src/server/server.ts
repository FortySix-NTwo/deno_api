import { Application } from 'oak';
import { loadEnvironment } from 'environment';

import { pgConnect } from '../model/pg.ts';
import router from 'router';

const port = loadEnvironment.PORT;
const app = new Application();

export const Start = async () => {
  await pgConnect();
  app.use(router.routes());
  app.use(router.allowedMethods());
  try {
    console.log(`Server Running on http://localhost:${port}`);
    await app.listen({ port });
  } catch {
    console.log('Internal Error');
  }
};

import { Application } from 'oak';
import { router } from 'router';

const app = new Application();

export const Start = async (PORT: number) => {
  const port = PORT;
  app.use(router.routes());
  app.use(router.allowedMethods());
  try {
    console.log(`Server Running on http://localhost:${port}`);
    await app.listen({ port });
  } catch {
    console.log('Internal Error');
  }
};

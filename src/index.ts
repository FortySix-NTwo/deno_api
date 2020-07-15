import * as env from 'dinoenv';
import { Start } from 'server';

(async () => {
  env.config();
  Start();
})();

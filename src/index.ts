import { config } from 'env';
import 'load';
import { Client } from 'postgres';
import { prettier, prettierPlugins } from 'prettier';

import { pgConnect } from './model/pg.ts';
import { Start } from 'server';

prettier.format('const x = 1', {
  parser: 'babel',
  plugins: prettierPlugins,
});

config();

const load = {
  APP_NAME: Deno.env.get('NAME'),
  PORT: parseInt(Deno.env.get('PORT')!),
  PG_USER: Deno.env.get('POSTGRES_USER'),
  PG_PASSWORD: Deno.env.get('POSTGRES_PASSWORD'),
  PG_DB: Deno.env.get('POSTGRES_DATABASE'),
  PG_HOST: Deno.env.get('POSTGRES_HOST'),
  PG_PORT: parseInt(Deno.env.get('POSTGRES_PORT')!),
};

export const client = new Client({
  user: load.PG_USER!,
  database: load.PG_DB!,
  hostname: load.PG_HOST!,
  password: load.PG_PASSWORD!,
  port: load.PG_PORT!,
});

(async () => {
  await Start(load.PORT);
  await pgConnect(client);
})();

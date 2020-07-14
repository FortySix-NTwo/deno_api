import * as env from 'dinoenv';
env.config();

export const loadEnvironment = {
  PORT: parseInt(Deno.env.get('PORT')!),
};

export const loadEnvironment = {
  PORT: parseInt(Deno.env.get('PORT')!),
  POSTGRES_USER: Deno.env.get('POSTGRES_USER')!,
  POSTGRES_PASSWORD: Deno.env.get('POSTGRES_PASSWORD')!,
  POSTGRES_DB: Deno.env.get('POSTGRES_DB')!,
  PG_HOST: Deno.env.get('PG_HOST')!,
  PG_PORT: parseInt(Deno.env.get('PG_PORT')!),
};

import 'dotenv/config';

import { z } from 'zod';

const envSchema = z.object({
  PORT: z.coerce.number().default(3333),
});

const _env = envSchema.safeParse(process.env);

if (_env.success == false) {
  console.error('Environment validation failed', _env.error.format());

  throw new Error('Environment validation failed');
}

export const env = _env.data;

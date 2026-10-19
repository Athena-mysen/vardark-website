import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const essays = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/essays' }),
  schema: z.object({
    title: z.string(),
    date: z.coerce.date(),
    linkedin: z.string().url().optional(),
    sharedUrl: z.string().optional(),
    titleBy: z.enum(['claude', 'kristian']).optional(),
    summary: z.string().optional(),
  }),
});

export const collections = { essays };

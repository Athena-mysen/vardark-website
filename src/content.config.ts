import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const fields = {
  title: z.string(),
  date: z.coerce.date(),
  linkedin: z.string().url().optional(),
  sharedUrl: z.string().optional(),
  titleBy: z.enum(['claude', 'kristian']).optional(),
  summary: z.string().optional(),
};

const essays = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/essays' }), schema: z.object(fields) });
// Engelske oversettelser, med egne engelske adresser; `nb` peker på originalen.
const essaysEn = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/essays-en' }), schema: z.object({ ...fields, nb: z.string() }) });

export const collections = { essays, essaysEn };

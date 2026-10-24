import type { APIContext } from 'astro';
import { llms } from '../lib/llms';
export const GET = (c: APIContext) => llms(c.site!);

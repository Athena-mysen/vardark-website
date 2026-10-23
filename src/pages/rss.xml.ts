import type { APIContext } from 'astro';
import { feed } from '../lib/rss';
export const GET = (c: APIContext) => feed('nb', c.site!);

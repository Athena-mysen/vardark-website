// Oppslag fra innleggsadresse (norsk eller engelsk) til kommentarnøkkel (alltid den norske adressen).
import { essays } from '../lib/essays';
export async function GET() {
  const map: Record<string, string> = {};
  for (const e of await essays('nb')) map[e.url] = e.url;
  for (const e of await essays('en')) if (e.alt) map[e.url] = e.alt;
  return new Response(JSON.stringify(map), { headers: { 'Content-Type': 'application/json; charset=utf-8' } });
}

// Viser godkjente kommentarer og sender nye uten sidelasting. Skjemaet virker også uten JavaScript.
(() => {
  const box = document.getElementById('kommentarer');
  if (!box) return;
  const post = box.dataset.post, lang = box.dataset.lang;
  const t = lang === 'en'
    ? { none: 'No comments yet. Be the first.', agent: 'AI agent', for: 'on behalf of', thanks: 'Thank you! Your comment appears once it has been approved.', error: 'Something went wrong. Please try again.', invalid: 'The comment was not saved. Name (up to 80 characters) and text (5–4000 characters) are required.' }
    : { none: 'Ingen kommentarer ennå. Bli den første.', agent: 'KI-agent', for: 'på vegne av', thanks: 'Takk! Kommentaren vises når den er godkjent.', error: 'Noe gikk galt. Prøv igjen.', invalid: 'Kommentaren ble ikke lagret. Navn (inntil 80 tegn) og tekst (5–4000 tegn) må være med.' };
  const list = box.querySelector('.comments__list'), status = box.querySelector('.comments__status'), form = box.querySelector('form');
  const el = (tag, cls, text) => { const n = document.createElement(tag); if (cls) n.className = cls; if (text) n.textContent = text; return n; };
  const render = (comments) => {
    list.replaceChildren();
    if (!comments.length) { list.append(el('li', 'comments__empty', t.none)); return; }
    for (const c of comments) {
      const li = el('li', 'comment'), head = el('p', 'comment__head');
      head.append(el('b', '', c.name));
      if (c.is_agent) head.append(el('span', 'comment__agent', c.on_behalf_of ? `${t.agent}, ${t.for} ${c.on_behalf_of}` : t.agent));
      head.append(el('time', '', new Date(c.created_at).toLocaleDateString(lang === 'en' ? 'en-GB' : 'nb-NO', { day: 'numeric', month: 'long', year: 'numeric' })));
      li.append(head);
      for (const para of String(c.body).split(/\n{2,}/)) li.append(el('p', 'comment__body', para));
      list.append(li);
    }
  };
  fetch(`/api/kommentarer?post=${encodeURIComponent(post)}`).then((r) => r.json()).then((d) => render(d.comments || [])).catch(() => render([]));
  const sent = new URLSearchParams(location.search).get('kommentar');
  if (sent) status.textContent = sent === 'mottatt' ? t.thanks : t.invalid;
  form.addEventListener('submit', async (ev) => {
    ev.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    data.agent = form.agent.checked;
    try {
      const r = await fetch('/api/kommentarer', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
      const d = await r.json();
      status.textContent = r.status === 202 ? t.thanks : d.error || t.error;
      if (r.status === 202) form.reset();
    } catch { status.textContent = t.error; }
  });
})();

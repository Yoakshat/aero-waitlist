// Type out the chat card messages one by one on load
(() => {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const lines = [...document.querySelectorAll('.chat-lines p')];
  const cursor = document.querySelector('.cursor');
  const texts = lines.map((l) => {
    const t = l.childNodes[0] ? l.childNodes[0].textContent : '';
    l.childNodes[0] && l.childNodes[0].remove();
    return t;
  });

  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  (async () => {
    await sleep(900);
    for (let i = 0; i < lines.length; i++) {
      lines[i].prepend('');
      lines[i].insertBefore(cursor, lines[i].firstChild);
      for (const ch of texts[i]) {
        cursor.before(ch);
        await sleep(38);
      }
      if (i < lines.length - 1) await sleep(420);
    }
  })();
})();

// Mobile "Join the Waitlist" button: scroll to the form, then focus the email field
document.querySelector('.cta-jump').addEventListener('click', (e) => {
  e.preventDefault();
  document.getElementById('waitlist-form').scrollIntoView({ behavior: 'smooth', block: 'center' });
  setTimeout(() => document.getElementById('email').focus({ preventScroll: true }), 600);
});

const form = document.getElementById('waitlist-form');
const emailInput = document.getElementById('email');
const message = document.getElementById('form-message');
const button = form.querySelector('button');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const email = emailInput.value.trim();

  message.className = '';
  if (!email) {
    message.textContent = 'Please enter your email address.';
    message.className = 'error';
    return;
  }

  button.disabled = true;
  button.textContent = 'Joining…';

  try {
    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    const data = await res.json();
    message.textContent = data.message;
    message.className = data.ok ? 'success' : 'error';
    if (data.ok) emailInput.value = '';
  } catch {
    message.textContent = 'Something went wrong. Please try again.';
    message.className = 'error';
  } finally {
    button.disabled = false;
    button.textContent = 'Join Waitlist';
  }
});

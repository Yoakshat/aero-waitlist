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

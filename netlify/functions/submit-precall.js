// Handles submissions from the "Before we talk" pre-call form.
// Saves the answers to Supabase and emails Tara the full submission via Resend.

const SUPABASE_URL = 'https://zmexxlwvwxxocjbfkslw.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InptZXh4bHd2d3h4b2NqYmZrc2x3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODAzMDkwMzIsImV4cCI6MjA5NTg4NTAzMn0.ZhFO4L_9AYG_Bp0VzzUeemZy4WwgALGR0OHRB2SN46g';
const FROM = 'Tara Consulting Co <hello@taraconsultingco.com>';
const TARA_EMAIL = 'taraodgers88@gmail.com';

const FIELDS = [
  ['name', 'Name'],
  ['business', 'Business name'],
  ['phone', 'Phone'],
  ['email', 'Email'],
  ['whatyoudo', 'What they do, and for who'],
  ['howlong', 'How long they’ve been going'],
  ['team', 'Just them, or a team'],
  ['website', 'Website'],
  ['gbp', 'Google Business Profile'],
  ['socials', 'Social accounts'],
  ['other', 'Anything else to look at'],
  ['q1', 'What keeps landing back on their desk'],
  ['q2', 'The one number they’d like to see move'],
  ['q3', 'What they’re hoping is different in 12 months'],
  ['time', 'Time available each week'],
  ['deciders', 'Anyone else deciding'],
  ['timeframe', 'Timeframe / anything coming up'],
  ['anythingelse', 'Anything else before the call']
];

exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }

  let data;
  try {
    data = JSON.parse(event.body || '{}');
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Bad request' }) };
  }

  const name = (data.name || '').trim();
  const email = (data.email || '').trim();
  if (!name || !email || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Name and a valid email are required' }) };
  }

  // 1. Save the full submission to Supabase (best effort, don't fail the request if this errors)
  try {
    await fetch(SUPABASE_URL + '/rest/v1/precall_submissions', {
      method: 'POST',
      headers: {
        'apikey': SUPABASE_ANON_KEY,
        'Authorization': 'Bearer ' + SUPABASE_ANON_KEY,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        name, business: data.business || null, phone: data.phone || null, email,
        whatyoudo: data.whatyoudo || null, howlong: data.howlong || null, team: data.team || null,
        website: data.website || null, gbp: data.gbp || null, socials: data.socials || null,
        other: data.other || null, q1: data.q1 || null, q2: data.q2 || null, q3: data.q3 || null,
        time: data.time || null, deciders: data.deciders || null, timeframe: data.timeframe || null,
        anythingelse: data.anythingelse || null
      })
    });
  } catch (e) { /* ignore, email below still goes out */ }

  // 2. Email Tara the full submission
  const KEY = process.env.RESEND_API_KEY;
  if (!KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'KEY_MISSING' }) };
  }

  const rows = FIELDS
    .filter(([key]) => (data[key] || '').toString().trim())
    .map(([key, label]) => `<tr><td style="padding:8px 12px;font-weight:700;color:#14213D;vertical-align:top;white-space:nowrap">${label}</td><td style="padding:8px 12px;color:#1F2933">${String(data[key]).replace(/</g, '&lt;')}</td></tr>`)
    .join('');

  const emailHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:640px;margin:0 auto;color:#1F2933;line-height:1.6">
      <h2 style="color:#14213D;font-size:22px;margin-bottom:4px">New "Before we talk" submission</h2>
      <p style="color:#5A6473;margin-bottom:20px">${name}${data.business ? ' · ' + data.business : ''}</p>
      <table style="width:100%;border-collapse:collapse;background:#FAF6F0;border-radius:8px">${rows}</table>
    </div>`;

  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TARA_EMAIL],
        reply_to: email,
        subject: 'Before we talk: ' + name + (data.business ? ' (' + data.business + ')' : ''),
        html: emailHtml
      })
    });
    if (!r.ok) {
      return { statusCode: 502, body: JSON.stringify({ error: 'RESEND_REJECTED' }) };
    }
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: 'FETCH_FAILED' }) };
  }

  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};

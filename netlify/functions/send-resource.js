// updated to refresh deploy
// Sends the free Business Growth Scorecard to anyone who requests it on the homepage.
// Uses Resend. Requires env var RESEND_API_KEY set in Netlify.
// Also emails Tara a heads-up that a new lead came in.
 
const SCORECARD_URL = 'https://zmexxlwvwxxocjbfkslw.supabase.co/storage/v1/object/public/Scorecard/Business_Growth_Scorecard%20(2).pdf';
const FROM = 'Tara Consulting Co <hello@taraconsultingco.com>';
const TARA_EMAIL = 'taraodgers88@gmail.com';
 
exports.handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method not allowed' };
  }
 
  let email;
  try {
    email = (JSON.parse(event.body || '{}').email || '').trim();
  } catch (e) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Bad request' }) };
  }
  if (!email || !email.includes('@')) {
    return { statusCode: 400, body: JSON.stringify({ error: 'Valid email required' }) };
  }
 
  const KEY = process.env.RESEND_API_KEY;
  if (!KEY) {
    return { statusCode: 500, body: JSON.stringify({ error: 'KEY_MISSING', detail: 'RESEND_API_KEY not found in environment. Check it is set on this site and redeploy.' }) };
  }
  // Diagnostic: confirm the key looks valid (starts with re_) without exposing it
  const keyPreview = KEY.substring(0, 3) + '...(' + KEY.length + ' chars)';
 
  // 1. Email the resource to the person
  const resourceHtml = `
    <div style="font-family:Arial,Helvetica,sans-serif;max-width:520px;margin:0 auto;color:#1F2933;line-height:1.6">
      <h2 style="color:#14213D;font-size:22px;margin-bottom:8px">Here's your Business Growth Scorecard</h2>
      <p>Hi there,</p>
      <p>Thanks for grabbing the scorecard. It's a quick, honest snapshot of where your business is right now, and the simplest place to start working out what to focus on next.</p>
      <p style="text-align:center;margin:28px 0">
        <a href="${SCORECARD_URL}" style="background:#F77F00;color:#fff;text-decoration:none;padding:13px 26px;border-radius:9px;font-weight:700;display:inline-block">Download your scorecard</a>
      </p>
      <p>Work through it at your own pace. There are no right or wrong answers, it's just about getting clear on where things are at.</p>
      <p style="background:#FFF8EF;border-radius:8px;padding:16px 18px;margin:24px 0">
        If you'd like to talk through your results, or you're weighing up whether some support would help, I'm happy to have a no-pressure chat. Just reply to this email or reach me at
        <a href="mailto:hello@taraconsultingco.com" style="color:#F77F00;font-weight:700">hello@taraconsultingco.com</a>.
      </p>
      <p>Either way, I hope it's useful.</p>
      <p style="margin-top:24px">Tara<br><span style="color:#5A6473">Tara Consulting Co</span></p>
    </div>`;
 
  try {
    const r = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [email],
        subject: 'Your Business Growth Scorecard',
        html: resourceHtml
      })
    });
    if (!r.ok) {
      const txt = await r.text();
      return { statusCode: 502, body: JSON.stringify({ error: 'RESEND_REJECTED', status: r.status, detail: txt, keyPreview: keyPreview }) };
    }
  } catch (e) {
    return { statusCode: 502, body: JSON.stringify({ error: 'FETCH_FAILED', detail: String(e), keyPreview: keyPreview }) };
  }
 
  // 2. Notify Tara (best effort - don't fail the request if this part errors)
  try {
    await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: { 'Authorization': 'Bearer ' + KEY, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        from: FROM,
        to: [TARA_EMAIL],
        subject: 'New free resource signup',
        html: `<p>Someone just grabbed the free scorecard from your homepage:</p><p style="font-size:18px;font-weight:700">${email}</p><p>They've been sent the scorecard automatically. The lead is also saved in your portal Leads tab.</p>`
      })
    });
  } catch (e) { /* ignore notify errors */ }
 
  return { statusCode: 200, body: JSON.stringify({ ok: true }) };
};

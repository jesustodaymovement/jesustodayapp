import { corsHeaders } from 'npm:@supabase/supabase-js@2/cors';

interface SubscribePayload {
  email?: string;
  firstName?: string;
  lastName?: string;
}

const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const apiKey = Deno.env.get('MAILCHIMP_API_KEY');
    const audienceId = Deno.env.get('MAILCHIMP_AUDIENCE_ID');
    const serverPrefix = Deno.env.get('MAILCHIMP_SERVER_PREFIX');

    if (!apiKey || !audienceId || !serverPrefix) {
      return new Response(
        JSON.stringify({ error: 'Mailchimp is nog niet geconfigureerd.' }),
        { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const body = (await req.json().catch(() => ({}))) as SubscribePayload;
    const email = (body.email ?? '').trim().toLowerCase();
    const firstName = (body.firstName ?? '').trim().slice(0, 100);
    const lastName = (body.lastName ?? '').trim().slice(0, 100);

    if (!email || !emailRegex.test(email) || email.length > 255) {
      return new Response(
        JSON.stringify({ error: 'Geen geldig e-mailadres.' }),
        { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
      );
    }

    const url = `https://${serverPrefix}.api.mailchimp.com/3.0/lists/${audienceId}/members`;
    const auth = 'Basic ' + btoa(`anystring:${apiKey}`);

    const mcRes = await fetch(url, {
      method: 'POST',
      headers: { Authorization: auth, 'Content-Type': 'application/json' },
      body: JSON.stringify({
        email_address: email,
        status: 'subscribed',
        merge_fields: {
          ...(firstName ? { FNAME: firstName } : {}),
          ...(lastName ? { LNAME: lastName } : {}),
        },
      }),
    });

    const data = await mcRes.json().catch(() => ({}));

    if (mcRes.ok) {
      return new Response(JSON.stringify({ ok: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Bestaand lid is geen fout voor de gebruiker
    if (data?.title === 'Member Exists') {
      return new Response(JSON.stringify({ ok: true, alreadySubscribed: true }), {
        status: 200,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    console.error('Mailchimp error', mcRes.status, data);
    return new Response(
      JSON.stringify({ error: data?.detail || 'Aanmelden mislukt, probeer het later opnieuw.' }),
      { status: 400, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  } catch (err) {
    console.error('mailchimp-subscribe error', err);
    return new Response(
      JSON.stringify({ error: 'Onverwachte fout.' }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } },
    );
  }
});
import { corsHeaders } from '@supabase/supabase-js/cors';

const API_BASE = 'https://jesustoday-production-backend.azurewebsites.net/api/jesustoday/videos';

Deno.serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const languageCode = url.searchParams.get('LanguageCode') ?? 'nl';
    const status = url.searchParams.get('Status') ?? '50';
    const sorting = url.searchParams.get('Sorting') ?? 'creationTime desc';
    const maxResultCount = url.searchParams.get('MaxResultCount') ?? '12';
    const skipCount = url.searchParams.get('SkipCount') ?? '0';

    const params = new URLSearchParams({
      LanguageCode: languageCode,
      Status: status,
      Sorting: sorting,
      MaxResultCount: maxResultCount,
      SkipCount: skipCount,
    });

    const apiUrl = `${API_BASE}?${params.toString()}`;
    const response = await fetch(apiUrl, {
      headers: { Accept: 'application/json' },
    });

    if (!response.ok) {
      const text = await response.text();
      return new Response(
        JSON.stringify({ error: `Upstream API failed [${response.status}]`, details: text }),
        { status: response.status, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
      );
    }

    const data = await response.json();
    return new Response(JSON.stringify(data), {
      status: 200,
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/json',
        'Cache-Control': 'public, max-age=60',
      },
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : 'Unknown error';
    console.error('get-testimonies error:', message);
    return new Response(JSON.stringify({ error: message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
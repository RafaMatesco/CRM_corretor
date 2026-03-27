import { createClient } from '@supabase/supabase-js';

function escape(str) {
  return String(str ?? '')
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

export default async function handler(req, res) {
  const propertyId = req.query.property;

  if (!propertyId || !process.env.VITE_SUPABASE_URL || !process.env.VITE_SUPABASE_ANON_KEY) {
    return res.redirect(302, '/');
  }

  try {
    const supabase = createClient(
      process.env.VITE_SUPABASE_URL,
      process.env.VITE_SUPABASE_ANON_KEY
    );

    const { data: property, error } = await supabase
      .from('properties')
      .select('title, description, images, price, type, purpose')
      .eq('id', propertyId)
      .single();

    if (error || !property) {
      console.error('API OG: Imóvel não encontrado', error);
      return res.redirect(302, '/');
    }

    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    const title = `${property.title} | Imperium`;
    const descriptionStr = property.description
      ? property.description.substring(0, 155)
      : `Imóvel para ${property.purpose} - ${property.type}`;

    const image = property.images && property.images.length > 0 ? property.images[0] : '';

    const formattedPrice = new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(property.price || 0);

    const fullDescription = `${formattedPrice} – ${descriptionStr}`;
    const pageUrl = `${baseUrl}/?property=${propertyId}`;

    // Gera a página HTML completa sem depender de fetch (evita loop de rewrite)
    const html = `<!DOCTYPE html>
<html lang="pt-BR">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${escape(title)}</title>
    <meta name="description" content="${escape(fullDescription)}" />

    <!-- Open Graph -->
    <meta property="og:type" content="website" />
    <meta property="og:url" content="${escape(pageUrl)}" />
    <meta property="og:title" content="${escape(title)}" />
    <meta property="og:description" content="${escape(fullDescription)}" />
    <meta property="og:image" content="${escape(image)}" />
    <meta property="og:image:width" content="1200" />
    <meta property="og:image:height" content="630" />
    <meta property="og:site_name" content="Imperium – Imóveis de Alto Padrão" />
    <meta property="og:locale" content="pt_BR" />

    <!-- Twitter Card -->
    <meta name="twitter:card" content="summary_large_image" />
    <meta name="twitter:title" content="${escape(title)}" />
    <meta name="twitter:description" content="${escape(fullDescription)}" />
    <meta name="twitter:image" content="${escape(image)}" />

    <!-- Redireciona o navegador humano para a SPA, mas bots de preview ficam com este HTML -->
    <noscript><meta http-equiv="refresh" content="0;url=${escape(pageUrl)}" /></noscript>
    <script>
      // Redirect real browsers to the SPA immediately
      if (typeof navigator !== 'undefined' &&
          !/bot|crawl|slurp|spider|facebookexternalhit|twitterbot|whatsapp|telegram|linkedinbot|pinterest|applebot|discordbot/i.test(navigator.userAgent)) {
        window.location.replace(${JSON.stringify(pageUrl)});
      }
    </script>
  </head>
  <body>
    <p style="font-family:sans-serif;text-align:center;margin-top:10vh">
      Redirecionando para <a href="${escape(pageUrl)}">${escape(property.title)}</a>…
    </p>
  </body>
</html>`;

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Cache de 5 minutos no CDN da Vercel
    res.setHeader('Cache-Control', 's-maxage=300, stale-while-revalidate=60');
    return res.status(200).send(html);
  } catch (err) {
    console.error('API OG: Erro geral', err);
    return res.redirect(302, '/');
  }
}

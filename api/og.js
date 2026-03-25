import { createClient } from '@supabase/supabase-js';

export default async function handler(req, res) {
  const propertyId = req.query.property;

  // Se não houver property ou se faltarem as variáveis de ambiente, volta pra raiz
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

    // Determina a URL base para buscar o index.html original
    const protocol = req.headers['x-forwarded-proto'] || 'https';
    const host = req.headers['x-forwarded-host'] || req.headers.host;
    const baseUrl = `${protocol}://${host}`;

    // Busca o HTML puro gerado pelo Vite (evitando loop)
    const htmlResponse = await fetch(`${baseUrl}/index.html`);
    if (!htmlResponse.ok) {
        throw new Error(`Falha ao buscar index.html: ${htmlResponse.statusText}`);
    }
    let html = await htmlResponse.text();

    // Montar os dados de SEO
    const title = `${property.title} | ImoCRM`;
    const descriptionStr = property.description 
      ? property.description.substring(0, 150) + '...' 
      : `Imóvel para ${property.purpose} - ${property.type}`;
    
    // Imagem principal
    const image = property.images && property.images.length > 0 ? property.images[0] : '';
    
    // Formatar preço
    const formattedPrice = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(property.price || 0);
    const fullDescription = `${formattedPrice} - ${descriptionStr}`;

    // Criar as tags Meta
    const metaTags = `
      <meta property="og:title" content="${title.replace(/"/g, '&quot;')}" />
      <meta property="og:description" content="${fullDescription.replace(/"/g, '&quot;')}" />
      <meta property="og:image" content="${image}" />
      <meta property="og:type" content="website" />
      <meta property="og:url" content="${baseUrl}/?property=${propertyId}" />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content="${title.replace(/"/g, '&quot;')}" />
      <meta name="twitter:description" content="${fullDescription.replace(/"/g, '&quot;')}" />
      <meta name="twitter:image" content="${image}" />
    `;

    // Injetar no <head>
    html = html.replace('</head>', `${metaTags}\n</head>`);
    html = html.replace(/<title>(.*?)<\/title>/, `<title>${title.replace(/"/g, '&quot;')}</title>`);

    res.setHeader('Content-Type', 'text/html; charset=utf-8');
    // Faz cache no CDN da Vercel para não bater no Supabase toda hora (60 segundos)
    res.setHeader('Cache-Control', 's-maxage=60, stale-while-revalidate');
    res.status(200).send(html);
  } catch (err) {
    console.error('API OG: Erro geral', err);
    res.redirect(302, '/');
  }
}

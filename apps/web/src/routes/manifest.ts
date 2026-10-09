export function loader() {
  return Response.json({
    id: '/', name: 'Mot à mot — Dictée et orthographe', short_name: 'Mot à mot', description: 'Écoute, écris et progresse en orthographe, à ton rythme.',
    lang: 'fr', start_url: '/', scope: '/', display: 'standalone', background_color: '#f8f6f5', theme_color: '#583d50',
    icons: [{ src: '/app-icon.png?size=192', sizes: '192x192', type: 'image/png', purpose: 'any' }, { src: '/app-icon.png?size=512', sizes: '512x512', type: 'image/png', purpose: 'any maskable' }],
  }, { headers: { 'Content-Type': 'application/manifest+json; charset=utf-8' } });
}

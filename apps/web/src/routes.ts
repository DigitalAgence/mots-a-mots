import { type RouteConfig, index, route } from '@react-router/dev/routes';

export default [
	index('routes/home.tsx'),
	route('sw.js', 'routes/sw.ts'),
	route('manifest.webmanifest', 'routes/manifest.ts'),
	route('app-icon.png', 'routes/app-icon.ts'),
	route('app-icon.svg', 'routes/app-icon-svg.ts'),
	route('sitemap.xml', 'routes/sitemap.xml.ts'),
	route('robots.txt', 'routes/robots.txt.ts'),
	route('mentions-legales', 'routes/mentions-legales.tsx'),
	route('politique-confidentialite', 'routes/politique-confidentialite.tsx'),
	route('gestion-cookies', 'routes/gestion-cookies.tsx'),
	route('cgu', 'routes/cgu.tsx'),
	route('plan-du-site', 'routes/plan-du-site.tsx'),
	route('api/health', 'routes/api.health.ts'),
	route('api/*', 'routes/api.$.ts'),
] satisfies RouteConfig;

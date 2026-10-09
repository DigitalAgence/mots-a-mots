import type { Route } from './+types/home';
import { seo, siteOriginFrom, absoluteUrl } from '@/lib/seo';
import { DicteeWorkspace } from '@/components/home/dictee-workspace';

export function meta({ matches, location }: Route.MetaArgs) {
	const origin = siteOriginFrom(matches);
	const url = absoluteUrl(origin, location.pathname);

	return seo({ matches, location }, {
		title: 'Jeu de dictée — Orthographe primaire',
		description: 'Un jeu de dictée vocale en français : écoute, écris et progresse en orthographe. Trois niveaux, correction instantanée et mots à revoir, même hors connexion.',
		jsonLd: [
			{
				'@context': 'https://schema.org',
				'@type': 'WebSite',
				name: 'Jeu de dictée',
				url,
				description: 'Un jeu de dictée vocale en français pour progresser en orthographe à l’école primaire.',
				inLanguage: 'fr',
			},
			{
				'@context': 'https://schema.org',
				'@type': 'WebApplication',
				name: 'Jeu de dictée',
				url,
				applicationCategory: 'EducationalApplication',
				operatingSystem: 'Tous navigateurs web',
				inLanguage: 'fr',
				offers: { '@type': 'Offer', price: '0', priceCurrency: 'EUR' },
				publisher: {
					'@type': 'Organization',
					name: 'Digital Agence',
					url: 'https://www.digitalagence.fr',
				},
			},
		],
	});
}

export default function HomePage() {
	return <DicteeWorkspace />;
}

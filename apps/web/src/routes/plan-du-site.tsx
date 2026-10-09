import type { Route } from './+types/plan-du-site';
import { seo, siteOriginFrom, absoluteUrl } from '@/lib/seo';
import { PlanDuSite } from '@/components/plan-du-site/plan-du-site';

export function meta({ matches, location }: Route.MetaArgs) {
	const origin = siteOriginFrom(matches);
	const url = absoluteUrl(origin, location.pathname);

	return seo({ matches, location }, {
		title: 'Plan du site — Jeu de dictée',
		description: 'Plan du site : toutes les pages du jeu de dictée (jeu, mentions légales, confidentialité, cookies, CGU).',
		jsonLd: {
			'@context': 'https://schema.org',
			'@type': 'BreadcrumbList',
			itemListElement: [
				{ '@type': 'ListItem', position: 1, name: 'Accueil', item: absoluteUrl(origin, '/') },
				{ '@type': 'ListItem', position: 2, name: 'Plan du site', item: url },
			],
		},
	});
}

export default function PlanDuSitePage() {
	return <PlanDuSite />;
}

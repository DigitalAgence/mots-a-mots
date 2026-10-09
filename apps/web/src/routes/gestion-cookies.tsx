import type { Route } from './+types/gestion-cookies';
import { seo } from '@/lib/seo';
import { GestionCookies } from '@/components/legal/gestion-cookies';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Gestion des cookies — Jeu de dictée',
		description: 'Le jeu de dictée utilise le stockage local du navigateur pour vos mots et résultats, sans cookies publicitaires.',
	});
}

export default function GestionCookiesPage() {
	return <GestionCookies />;
}

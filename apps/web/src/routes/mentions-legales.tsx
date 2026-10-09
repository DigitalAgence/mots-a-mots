import type { Route } from './+types/mentions-legales';
import { seo } from '@/lib/seo';
import { MentionsLegales } from '@/components/legal/mentions-legales';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Mentions légales — Jeu de dictée',
		description: 'Éditeur du site : Digital Agence. Coordonnées, hébergeur (Hostinger) et informations légales du jeu de dictée.',
	});
}

export default function MentionsLegalesPage() {
	return <MentionsLegales />;
}

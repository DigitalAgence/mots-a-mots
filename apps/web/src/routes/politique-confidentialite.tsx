import type { Route } from './+types/politique-confidentialite';
import { seo } from '@/lib/seo';
import { PolitiqueConfidentialite } from '@/components/legal/politique-confidentialite';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Politique de confidentialité — Jeu de dictée',
		description: 'Comment le jeu de dictée traite et protège vos données : stockage local, absence de cookies publicitaires et vos droits RGPD.',
	});
}

export default function PolitiqueConfidentialitePage() {
	return <PolitiqueConfidentialite />;
}

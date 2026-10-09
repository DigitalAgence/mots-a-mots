import type { Route } from './+types/cgu';
import { seo } from '@/lib/seo';
import { Cgu } from '@/components/legal/cgu';

export function meta({ matches, location }: Route.MetaArgs) {
	return seo({ matches, location }, {
		title: 'Conditions générales d’utilisation — Jeu de dictée',
		description: 'Règles d’utilisation du jeu de dictée : accès au service, usage personnel, responsabilité et propriété intellectuelle.',
	});
}

export default function CguPage() {
	return <Cgu />;
}

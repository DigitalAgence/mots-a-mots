import { LegalLayout } from '@/components/legal/legal-layout';

export function MentionsLegales() {
	return (
		<LegalLayout title="Mentions légales" subtitle="Informations sur l’éditeur et l’hébergement du site.">
			<section>
				<h2>Éditeur du site</h2>
				<p>
					Le site <strong>Jeu de dictée</strong> est édité par <strong>Digital Agence</strong>.
				</p>
				<p>
					Site web :{' '}
					<a href="https://www.digitalagence.fr" target="_blank" rel="noopener noreferrer">
						www.digitalagence.fr
					</a>
				</p>
				<p>
					Email :{' '}
					<a href="mailto:digitalagence28@gmail.com">digitalagence28@gmail.com</a>
				</p>
			</section>

			<section>
				<h2>Responsable de publication</h2>
				<p>Digital Agence est responsable de la publication du présent site.</p>
			</section>

			<section>
				<h2>Hébergeur</h2>
				<p>
					Le site est hébergé par <strong>Hostinger</strong>. Les données sont stockées
					sur les serveurs de Hostinger.
				</p>
			</section>

			<section>
				<h2>Propriété intellectuelle</h2>
				<p>
					L’ensemble des contenus présents sur ce site (textes, visuels, logo) est la
					propriété de Digital Agence, sauf mention contraire. Toute reproduction, même
					partielle, est interdite sans autorisation préalable.
				</p>
			</section>

			<section>
				<h2>Contact</h2>
				<p>
					Pour toute question relative au site, vous pouvez écrire à{' '}
					<a href="mailto:digitalagence28@gmail.com">digitalagence28@gmail.com</a>.
				</p>
			</section>
		</LegalLayout>
	);
}

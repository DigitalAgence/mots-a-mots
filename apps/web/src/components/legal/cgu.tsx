import { LegalLayout } from '@/components/legal/legal-layout';

export function Cgu() {
	return (
		<LegalLayout title="Conditions générales d’utilisation" subtitle="Les règles d’utilisation du jeu de dictée.">
			<section>
				<h2>Objet</h2>
				<p>
					Les présentes conditions générales d’utilisation (CGU) définissent les règles
					d’utilisation du site <strong>Jeu de dictée</strong> édité par Digital Agence.
				</p>
				<p>
					L’accès et l’utilisation du site impliquent l’acceptation pleine et entière des
					présentes CGU.
				</p>
			</section>

			<section>
				<h2>Description du service</h2>
				<p>
					Le site propose un jeu éducatif de dictée en français. L’utilisateur peut ajouter
					ses propres mots, écouter leur prononciation, écrire sa réponse et recevoir une
					correction immédiate. Les mots et résultats sont enregistrés localement dans le
					navigateur.
				</p>
			</section>

			<section>
				<h2>Accès au service</h2>
				<p>
					Le service est accessible gratuitement. L’éditeur s’efforce de maintenir le site
					disponible mais ne peut garantir une accessibilité continue. Il se réserve le
					droit de suspendre ou modifier le service sans préavis.
				</p>
			</section>

			<section>
				<h2>Utilisation</h2>
				<p>L’utilisateur s’engage à utiliser le site à des fins personnelles et éducatives.</p>
				<ul>
					<li>Ne pas tenter de perturber le fonctionnement du site.</li>
					<li>Ne pas reproduire les contenus sans autorisation.</li>
					<li>Ne pas utiliser le site d’une manière contraire aux lois en vigueur.</li>
				</ul>
			</section>

			<section>
				<h2>Responsabilité</h2>
				<p>
					Les contenus du site sont fournis à titre indicatif et éducatif. L’éditeur ne
					pourrait être tenu responsable des erreurs, omissions ou d’une indisponibilité
					du service. Les résultats enregistrés localement dépendent du navigateur de
					l’utilisateur et peuvent être perdus en cas de suppression des données.
				</p>
			</section>

			<section>
				<h2>Propriété intellectuelle</h2>
				<p>
					Les éléments du site (textes, logo, design) sont la propriété de Digital Agence.
					Toute reproduction est interdite sans autorisation.
				</p>
			</section>

			<section>
				<h2>Modification des CGU</h2>
				<p>
					L’éditeur se réserve le droit de modifier les présentes CGU à tout moment. Les
					conditions applicables sont celles en ligne au moment de l’utilisation.
				</p>
			</section>

			<section>
				<h2>Contact</h2>
				<p>
					Pour toute question relative aux CGU, écrivez à{' '}
					<a href="mailto:digitalagence28@gmail.com">digitalagence28@gmail.com</a>.
				</p>
			</section>
		</LegalLayout>
	);
}

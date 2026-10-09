import { LegalLayout } from '@/components/legal/legal-layout';

export function GestionCookies() {
	return (
		<LegalLayout title="Gestion des cookies" subtitle="Comment le site utilise le stockage de votre navigateur.">
			<section>
				<h2>Utilisation du stockage local</h2>
				<p>
					Le jeu de dictée enregistre vos mots ajoutés et vos résultats de dictée dans le
					stockage local de votre navigateur (localStorage). Cela permet de retrouver vos
					données entre deux visites, sans avoir besoin d’un compte.
				</p>
				<p>
					Ces informations restent sur votre appareil et ne sont pas envoyées à des tiers
					à des fins publicitaires.
				</p>
			</section>

			<section>
				<h2>Pas de cookies publicitaires</h2>
				<p>
					Le site ne dépose pas de cookies publicitaires ni de traceurs de mesure
					d’audience tiers. Aucune régie publicitaire n’est utilisée.
				</p>
			</section>

			<section>
				<h2>Service worker (mode hors connexion)</h2>
				<p>
					Pour permettre le fonctionnement hors connexion et l’installation de
					l’application, un service worker peut être enregistré par votre navigateur. Il
					stocke temporairement les fichiers du site (page, styles) afin qu’ils restent
					accessibles sans connexion Internet.
				</p>
			</section>

			<section>
				<h2>Gérer et supprimer les données</h2>
				<p>
					Vous pouvez à tout moment supprimer les données enregistrées par le site :
				</p>
				<ul>
					<li>en effaçant les données de navigation de votre navigateur ;</li>
					<li>en supprimant individuellement vos mots et dictées depuis le jeu ;</li>
					<li>en désinstallant l’application, ce qui retire le service worker associé.</li>
				</ul>
			</section>

			<section>
				<h2>Contact</h2>
				<p>
					Pour toute question sur la gestion des cookies et du stockage, écrivez à{' '}
					<a href="mailto:digitalagence28@gmail.com">digitalagence28@gmail.com</a>.
				</p>
			</section>
		</LegalLayout>
	);
}

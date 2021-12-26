import Link from 'next/link';
import { useEffect } from 'react';
import router, { useRouter } from 'next/router';

export default function NotFound() {
	const Router = useRouter();

	useEffect(() => {
		setTimeout(() => {
			router.push('/');
		}, 4000);
	}, []);

	return (
		<div className="not-found">
			<h2>404</h2>
			<h3>Sivua ei löytänyt</h3>
			<p>
				redirecting to <Link href="/">etusivu</Link> takaisin
			</p>

			<style jsx>{`
				.not-found {
					background: #fff;
					padding: 30px;
					box-shadow: 1px 3px 5px rgba(0, 0, 0, 0.2);
					transform: rotateZ(-1deg);
				}
				h2 {
					font-size: 3em;
				}
			`}</style>
		</div>
	);
}

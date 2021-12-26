import { createClient } from 'contentful';
import RecipeCard from '../components/RecipeCard';

export async function getStaticProps() {
	const client = createClient({
		space: process.env.CONTENTFUL_SPACE_ID,
		accessToken: process.env.CONTENTFUL_ACCESS_KEY
	});

	const res = await client.getEntries({
		content_type: 'resepti'
	});

	return {
		props: {
			reseptit: res.items
		}
	};
}

export default function Recipes({ reseptit }) {
	console.log(reseptit);
	return (
		<div className="recipe-list">
			{reseptit.map((resepti) => <RecipeCard key={resepti.sys.id} resepti={resepti} />)}
			<style jsx>{`
				.recipe-list {
					display: grid;
					grid-template-columns: 1fr 1fr;
					grid-gap: 20px 60px;
				}
			`}</style>
		</div>
	);
}

import { createClient } from 'contentful';
import Image from 'next/image';
import { documentToReactComponents } from '@contentful/rich-text-react-renderer';
import Skeleton from '../../components/Skeleton';

const client = createClient({
	space: process.env.CONTENTFUL_SPACE_ID,
	accessToken: process.env.CONTENTFUL_ACCESS_KEY
});

export const getStaticPaths = async () => {
	const res = await client.getEntries({
		content_type: 'resepti'
	});

	const paths = res.items.map((item) => {
		return {
			params: { slug: item.fields.slug }
		};
	});

	if (!items.length) {
		return {
			redirect: {
				destination: '/',
				pernament: false
			}
		};
	}

	return {
		paths,
		fallback: true
	};
};

export async function getStaticProps({ params }) {
	const { items } = await client.getEntries({
		content_type: 'resepti',
		'fields.slug': params.slug
	});
	return {
		props: { resepti: items[0] },
		revalidate: 1
	};
}

export default function RecipeDetails({ resepti }) {
	if (!resepti) return <Skeleton />;

	const { mainImage, nimi, cookingTime, ingredients, method } = resepti.fields;
	return (
		<div>
			<div className="banner">
				<Image
					src={'https:' + mainImage.fields.file.url}
					width={mainImage.fields.file.details.image.width}
					height={mainImage.fields.file.details.image.height}
				/>
				<h2>{nimi}</h2>
			</div>
			<div className="info">
				<p>kestään noin {cookingTime} minuuttia tehdä</p>
				<h3>Aineet:</h3>
				{ingredients.map((ing) => <span key={ing}> {ing}</span>)}
			</div>
			<div className="method">
				<div>{documentToReactComponents(method)}</div>
			</div>
		</div>
	);
}

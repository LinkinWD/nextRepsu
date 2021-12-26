import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

export default function RecipeCard({ resepti }) {
	const { nimi, slug, thumbnail, cookingTime } = resepti.fields;
	return (
		<div className="card">
			<div className="featured">
				{
					<Image
						src={'https:' + thumbnail.fields.file.url}
						width={thumbnail.fields.file.details.image.width}
						height={thumbnail.fields.file.details.image.height}
					/>
				}
			</div>
			<div className="content">
				<div className="info">
					<h4>{nimi}</h4>
					<p>Kestää noin {cookingTime} minuuttia tehdä.</p>
				</div>
				<div className="actions">
					<Link href={'/recipes/' + slug}>
						<a>Tee tämä</a>
					</Link>
				</div>
			</div>
		</div>
	);
}

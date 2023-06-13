import Anify from '$lib/anify';
import type { Seasonal } from '$lib/anify/types';

export default async function getTrendingAnime(): Promise<Seasonal> {
	const data = await Anify.Client.get<Seasonal>(
		`seasonal?type=anime`
	);
	return data;
}

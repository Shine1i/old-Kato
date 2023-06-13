import Anify from '$lib/anify';
import type { Source } from '$lib/anify/types';

export default async function getAnimeSources(
	providerId: string,
	id: string,
	watchId: string,
	subType: string,
	episode: string | number
): Promise<Source> {
	return await Anify.Client.get<Source>(
		`sources?providerId=${providerId}&id=${id}&watchId=${watchId}&subType=${subType}&episode=${episode}`
	);
}

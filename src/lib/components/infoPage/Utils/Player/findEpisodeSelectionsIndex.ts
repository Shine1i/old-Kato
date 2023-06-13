import type { Episode } from '$lib/consumet/types';

export default function findEpisodeSelectionsIndex(
	episodeNumber: number,
	episodeSelections: {
		value: number;
		name: string;
		episodes: Episode[];
	}[]
) {
	let returnNum = 0;
	for (let i = 0; i < episodeSelections.length; i++) {
		const episodeSelection = episodeSelections[i];
		const episode = episodeSelection.episodes.find((episode) => episode.number === episodeNumber);
		if (episode) {
			returnNum = i;
			break;
		}
	}
	return returnNum;
}

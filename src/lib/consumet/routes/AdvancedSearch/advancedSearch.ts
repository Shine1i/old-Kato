import { PUBLIC_API_URL } from '$env/static/public';
import { fetchBrowserCachedUrl } from '$lib/simkl/routes/utils/request/fetchBcachedUrl';
import type SearchConfig from './SearchConfig';
import type { cResponse } from './types';

export async function getAnilistAdvancedSearch(config: SearchConfig): Promise<cResponse> {
	try {
		const url = `${PUBLIC_API_URL}/meta/anilist/advanced-search${config.ConfigToString()}`;
		console.log(url);
		const searchRes = await fetchBrowserCachedUrl<cResponse>(url);
		return searchRes;
	} catch {
		return { hasNextPage: false } as cResponse;
	}
}

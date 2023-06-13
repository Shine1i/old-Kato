import { browser } from '$app/environment';

export default function setEpBrowserParam(episode: number) {
	if (!browser) return;
	const newUrl = new URL(window.location.href);
	newUrl.searchParams.set('ep', episode.toString());
	history.pushState(null, '', newUrl);
}
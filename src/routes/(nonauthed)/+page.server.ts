import type { PageServerLoad } from './$types';
import Simkl from '$lib/simkl';
import { GenrePopularity, GenreTypes, GenreYears, Genres } from '$lib/simkl/types/genre';
import TMDB from '$lib/tmdb';
import { get } from 'svelte/store';
import { auth } from '$lib/stores';
import { redirect } from '@sveltejs/kit';

//TODO: add clear logos
export const load = (async (request) => {
	const visited = request.cookies.get('visited');
	console.log(visited);
	if (visited == 'yes') {
		console.log(visited);
		throw redirect(308, '/home');
	}

	return {};
}) satisfies PageServerLoad;

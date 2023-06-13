import { CacheGet, CacheSet } from '$lib/utils/cache';
class ApiClient {
	private readonly baseURL: string;
	private readonly clientID: string;
	private readonly clientIdName: string;

	constructor(
		baseURL = 'https://api.simkl.com/',
		clientID = '39e8640b6f1a60aaf60f3f3313475e830517badab8048a4e52ff2d10deb2b9b0',
		clientIdName = 'client_id'
	) {
		this.baseURL = baseURL;
		this.clientID = clientID;
		this.clientIdName = clientIdName;
	}

	// private async requestDragonfly<T>(
	// 	url: string,
	// 	config: RequestInit = {},
	// 	ttl: number
	// ): Promise<T> {
	// 	const finalUrl = new URL(this.baseURL + url);
	// 	finalUrl.searchParams.append(this.clientIdName, this.clientID);

	// 	const cached = await redis.get(`url:${finalUrl}`);
	// 	if (cached) {
	// 		return JSON.parse(cached) as T;
	// 	}

	// 	const response = await fetch(finalUrl, config);

	// 	const json = await response.json();
	// 	const data: T = json;

	// 	if (!response.ok) {
	// 		throw new Error(`HTTP error! status: ${response.status}, message: ${data}`);
	// 	}
	// 	redis.set(`url:${finalUrl}`, JSON.stringify(data), 'EX', ttl);
	// 	return data;
	// }
	private async request<T>(
		url: string,
		config: RequestInit = {},
		ttl: number,
		addClientId = true
	): Promise<T> {
		const finalUrl = new URL(this.baseURL + url);
		if (addClientId) finalUrl.searchParams.append(this.clientIdName, this.clientID);

		const cached = await CacheGet(`url:${finalUrl}`);
		if (cached) {
			return JSON.parse(cached) as T;
		}

		const response = await fetch(finalUrl, config);

		const json = await response.json();
		const data: T = json;

		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}, message: ${data}`);
		}
		CacheSet(`url:${finalUrl}`, JSON.stringify(data), ttl);
		return data;
	}

	public async get<T>(
		url: string,
		ttl: number = 60 * 60 * 24,
		config: RequestInit = {},
		addClientId = true
	): Promise<T> {
		return this.request<T>(url, { method: 'GET', ...config }, ttl, addClientId);
	}
	public async post<T>(
		url: string,
		ttl: number = 60 * 60 * 24,
		config: RequestInit = {},
		addClientId = true
	): Promise<T> {
		return this.request<T>(url, { method: 'POST', ...config }, ttl, addClientId);
	}
}

export default ApiClient;

import data from '$lib/data.json'

export function load({ url }) {
	return {
		url: url.pathname,
		...data
	}
}

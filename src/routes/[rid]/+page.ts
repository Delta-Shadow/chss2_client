import type { PageLoad } from './$types'

export const load: PageLoad = data => {
	return {
		rid: data.params.rid
	}
}

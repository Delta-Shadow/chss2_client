import { uniqueNamesGenerator, names, adjectives } from 'unique-names-generator'
import type { Config } from 'unique-names-generator'

function rand_name(): string {
	const config: Config = {
		length: 2,
		dictionaries: [names, adjectives],
		style: 'capital',
		separator: ' '
	}

	return uniqueNamesGenerator(config)
}

export default rand_name

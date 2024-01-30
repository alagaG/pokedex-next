export async function GET() {
	const limit = 5000
	const offset = 0

	const promises = [
		fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=${limit}&offset=${offset}`),
		fetch(`https://pokeapi.co/api/v2/type/?limit=${limit}&offset=${offset}`)
	]
	const responses = await Promise.all(promises)
	const results = (await Promise.all(responses.map((response) => response.json()))).map((response) => response.results)

	const pokedex = results[0]
		.map((pokemon, index) => { return { id: (index + offset + 1), name: (pokemon.name) } })
	
	const typeFilter = [ 'unknown' ]
	const typeList = results[1]
		.filter((type) => !typeFilter.includes(type.name))
	const types = (await Promise.all(
		(await Promise.all(typeList.map((type) => fetch(type.url))))
			.map((response) => response.json())
		)
	)
	
	return Response.json({ pokedex, types })
}
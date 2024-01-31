export async function GET() {
	const promises = [
		fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=5000&offset=0`),
		fetch(`https://pokeapi.co/api/v2/type/?limit=5000&offset=0`)
	]
	const lists = (await Promise.all((await Promise.all(promises)).map((response) => response.json()))).map((response) => response.results)

	const pokedex = await Promise.all(
		(await Promise.all(lists[0].map((pokemon) => fetch(pokemon.url))))
			.map((response) => response.json())
	)
	
	const typeFilter = [ 'unknown' ]
	const typeList = lists[1]
		.filter((type) => !typeFilter.includes(type.name))
	const types = await Promise.all(
		(await Promise.all(typeList.map((type) => fetch(type.url))))
			.map((response) => response.json())
	)

	return Response.json({ pokedex, types })
}
export async function GET(request) {
	const { searchParams } = new URL(request.url)
	const limit = Number(searchParams.get('limit'))
	const offset = Number(searchParams.get('offset'))
	const pokedex =  (await (await fetch(`https://pokeapi.co/api/v2/pokemon-species/?limit=${limit}&offset=${offset}`)).json())
		.results.map((pokemon, index) => { return { id: (index + offset + 1), name: (pokemon.name) } })
	return Response.json({ pokedex })
}
export default async function Page() {
	const data = (await (await fetch('https://pokeapi.co/api/v2/pokemon-species/?limit=5000&offset=0')).json())
		.results
	console.log(data)
	return (
		<p>
			testimg
		</p>
	)
}
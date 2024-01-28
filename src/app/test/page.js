export default async function Page() {
	const data = (await (await fetch('https://pokeapi.co/api/v2/type/?limit=5000&offset=0')).json())
		.results
		
	return (
		<p>
			testimg
		</p>
	)
}
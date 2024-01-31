'use client'

import Image from "next/image"
import { useRef, useState } from "react"

export default function PokemonSlot({ pokemon }) {
	const [ data, setData ] = useState()
	const { id, name } = pokemon

	fetch(`https://pokeapi.co/api/v2/pokemon/${id}`).then((response) => 
		response.json().then((data) => {
			setData(data)
		})
	)

	return (<div className="pokemon-slot group">
		<div className="absolute hidden group-hover:block text-center inset-0">
			<h1>{id}</h1>
			<p>{`${name.replace(/^[a-z]| [a-z]g/, (letter) => letter.toUpperCase())}`}</p>
		</div>
		<div className="flex size-full p-4 neumorphism-lg neumorphism-flat neumorphism-hover group-hover:scale-75">
			<Image className={`size-full ${data ? '' : 'animate-spin'}`} src={data ? data.sprites.other["official-artwork"].front_default : "/loading.png"} width={475} height={475} alt={`Default sprite for ${name}`} priority />
		</div>
	</div>)
}
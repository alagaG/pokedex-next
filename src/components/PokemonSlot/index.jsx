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

	return (<div className="w-48 h-48 flex flex-col justify-center gap-2 py-2 bg-red-600 rounded-md">
		<p className="text-lg text-center text-black bg-white">{`${id}. ${name.replace(/^[a-z]| [a-z]g/, (letter) => letter.toUpperCase())}`}</p>
		<div className="flex flex-none justify-center text-black bg-white">
			<Image className={`${data ? '' : 'animate-spin'}`} src={data ? data.sprites.front_default : "/loading.png"} width={96} height={96} alt={`Default sprite for ${name}`} />
		</div>
	</div>)
}
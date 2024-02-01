'use client'

import Image from "next/image"
import { useEffect, useRef, useState } from "react"

export default function PokemonSlot({ pokemon }) {
	const [ data, setData ] = useState()
	const { id, name } = pokemon

	useEffect(() => {
		fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, { cache: 'no-cache' }).then((response) => 
			response.json().then((data) => {
				setData({
					id: data.id,
					name: data.name,
					sprites: {
						artwork: data.sprites.other['official-artwork'].front_default,
						pixelart: data.sprites.front_default
					}
				})
			})
		)
	})

	return (<button id={`pokemon-slot-${id}`} name="pokemon-slot" className="pokemon-slot group">
		<div className="pokemon-slot-info">
			<h1 className="font-bold">{id}</h1>
			<Image className="sprite" src={data ? data.sprites.pixelart : "/loading.png"} width={96} height={96} alt={`Front sprite of ${name}`} priority/>
			<p className="capitalize">{name}</p>
		</div>
		<div className="pokemon-slot-content">
			<Image className={`artwork ${data ? '' : 'animate-spin'}`} src={data ? data.sprites.artwork : "/loading.png"} width={128} height={128} alt={`Official artwork for ${name}`} priority />
		</div>
	</button>)
}
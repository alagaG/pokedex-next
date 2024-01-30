'use client'
import { useEffect, useRef, useState } from "react";
import PokemonSlot from "../components/PokemonSlot";
import Image from "next/image";
import PokedexFilter, { NameFilterMode } from "@/components/PokedexFilter";

export default function Home() {
	const columns = 4
	const [visiblePokedex, setVisiblePokedex] = useState([])
	const [loading, setLoading] = useState(true)
	const awaiting = useRef(false)
	const pokedexData = useRef([])
	const pokedexFilter = useRef({ name: '', nameMode: NameFilterMode.CONTAINS, includedTypes: [], excludedTypes: [] })
	const typesData = useRef([])
	const visibleOffset = useRef(0)

	const updateVisiblePokemon = () => {
		const nextData = pokedexData.current.filter((entry) => {
			const { name: pokemonName } = entry
			const { name, nameMode, includedTypes, excludedTypes } = pokedexFilter.current
			
			if (name.length > 0) { 
				switch (nameMode) {
					case NameFilterMode.EQUALS:
						if (pokemonName !== name) return false
						break
					case NameFilterMode.STARTS_WITH:
						if (!pokemonName.startsWith(name)) return false
						break
					case NameFilterMode.ENDS_WITH:
						if (!pokemonName.endsWith(name)) return false
						break
					default:
						if (!pokemonName.includes(name)) return false
						break
				}
			}

			if (includedTypes.length > 0) {
				if (!includedTypes.every(type => type.pokemon.some((entry) => entry.pokemon.name === pokemonName))) return false
			}

			if (excludedTypes.length > 0) {
				if (excludedTypes.some(type => type.pokemon.some((entry) => entry.pokemon.name === pokemonName))) return false
			}

			return true
		}).slice(0, visibleOffset.current)
		setVisiblePokedex(nextData)
	}

	const loadAll = () => {
		if (awaiting.current) return

		awaiting.current = true
		setLoading(true)
		fetch(`/api/pokedex`).then(
			(response) => response.json().then((data) => {
				pokedexData.current = data.pokedex
				typesData.current = data.types
				updateVisiblePokemon()
			}).finally(() => {
				awaiting.current = false
				setLoading(false)
			})
		).catch((error) => {
			awaiting.current = false
			setLoading(false)
			console.log(error)
		})
	}

	const showMore = (rows = 2) => {
		if (loading.current) return
		visibleOffset.current = visibleOffset.current + (columns * rows)
		updateVisiblePokemon() 
	}

	const onSearch = (filter) => {
		pokedexFilter.current = filter
		visibleOffset.current = 0
		document.scrollingElement.scroll(0, 0)
		showMore(4)
	}
	
	useEffect(() => {
		loadAll()
		showMore()
		
		window.addEventListener('scroll', (event) => {
			const scrollingElement = document.scrollingElement
			const scrollPercent = (window.scrollY) / (document.scrollingElement.scrollHeight - scrollingElement.clientHeight)
			if (scrollPercent >= 1.0) showMore(1)
		})
	}, [])

	return (
		<main className="py-4">
			<div className="flex flex-col gap-4 items-center font-sans font-medium">
				<div className="fixed y-10 top-0 w-full bg-red-800">
					<p className="text-center text-2xl">Pokedex</p>
					<PokedexFilter getTypeList={ () => typesData.current } onSearch={ onSearch } />
				</div>
				<div className={`w-fit my-16 grid grid-cols-4 gap-5`}>
					{visiblePokedex.map((entry) => (
						(<PokemonSlot key={entry.id} pokemon={entry} />)
					))}
				</div>
				<Image className={`animate-spin ${!loading ? 'hidden' : 'block'}`} src="/loading.png" width={182} height={182} alt="Loading" priority />
			</div>
		</main>
	);
}

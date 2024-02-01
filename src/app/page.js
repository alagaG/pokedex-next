'use client'
import { useEffect, useRef, useState } from "react";
import PokemonSlot from "../components/PokemonSlot";
import Image from "next/image";
import PokedexFilter, { Filter } from "@/components/PokedexFilter";
import { NameFilterMode } from "@/components/PokedexFilter/NameFilter";
import DarkModeButton from "@/components/DarkModeButton";

function TailwindViewport(id, width) {
	return { id, width }
}

export default function Home() {
	const [visiblePokedex, setVisiblePokedex] = useState([])
	const [loading, setLoading] = useState(true)
	const [darkMode, setDarkMode] = useState(window.matchMedia('(prefers-color-scheme: dark)').matches)
	const awaiting = useRef(false)
	const pokedexData = useRef([])
	const pokedexFilter = useRef(Filter())
	const typesData = useRef([])
	const visibleOffset = useRef(0)
	const gridColumnCount = useRef(0)

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
				if (!includedTypes
					.map((simplifiedType) => typesData.current[simplifiedType.id])
					.every(type => type.pokemon.some((entry) => entry.pokemon.name === pokemonName))) return false
			}

			if (excludedTypes.length > 0) {
				if (excludedTypes
					.map((simplifiedType) => typesData.current[simplifiedType.id])
					.some(type => type.pokemon.some((entry) => entry.pokemon.name === pokemonName))) return false
			}

			return true
		}).slice(0, visibleOffset.current)
		setVisiblePokedex(nextData)
	}

	const loadAll = () => {
		if (awaiting.current) return

		awaiting.current = true
		setLoading(true)
		fetch(`/api/pokedex`, { cache: 'no-cache' }).then(
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
		visibleOffset.current = visibleOffset.current + (gridColumnCount.current * rows)
		updateVisiblePokemon() 
	}

	const onSearch = (filter) => {
		pokedexFilter.current = filter
		visibleOffset.current = 0
		document.scrollingElement.scroll(0, 0)
		showMore(4)
	}
	
	useEffect(() => {
		const getColumnCount = () => {
			const windowWidth = window.innerWidth
			if (windowWidth >= 1536) return 6 
			else if (windowWidth >= 1280) return 5 
			else if (windowWidth >= 1024) return 4 
			else if (windowWidth >= 768) return 3 
			else return 2 
		}
		gridColumnCount.current = getColumnCount()
		window.addEventListener('resize', () => { gridColumnCount.current = getColumnCount() })

		loadAll()
		showMore()
		
		const entriesDisplay = document.getElementById('entries-display')
		entriesDisplay.addEventListener('scrollend', (event) => {
			const scrollingElement = event.currentTarget
			const scrollPercent = (scrollingElement.scrollTop) / (scrollingElement.scrollHeight - scrollingElement.clientHeight)
			if (scrollPercent >= 1.0) showMore(1)
		})
	}, [])

	return (
		<body className={darkMode ? 'dark' : ''}>
			<header>
				<h1>Pokedex</h1>
			</header>
			<main>
				<PokedexFilter typeList={ typesData.current.map((type) => { return{ id: type.id, name: type.name }}) } onSearch={ onSearch } />
				<div id="entries-display">
					<div id="entries-grid">
						{visiblePokedex.map((entry) => (
							(<PokemonSlot key={entry.id} pokemon={entry} />)
						))}
					</div>
					<Image className={`m-auto animate-spin ${!loading ? 'hidden' : 'block'}`} src="/loading.png" width={182} height={182} alt="Loading" priority />
				</div>
			</main>
			<footer>
				<p className="grow">Study project by Matheus Caldas</p>
				<DarkModeButton startAsDark={ darkMode } onClick={ () => setDarkMode((darkMode) => !darkMode) } />
			</footer>
		</body>
	);
}

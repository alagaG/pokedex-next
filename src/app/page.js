'use client'
import { useEffect, useRef, useState } from "react";
import PokemonSlot from "../components/PokemonSlot";
import Image from "next/image";

export default function Home() {
	const columns = 4
	const [ visiblePokedex, setVisiblePokedex ] = useState([])
	const [ loading, setLoading ] = useState(true)
	const awaiting = useRef(false)
	const pokedexData = useRef([])
	const dataOffset = useRef(0)
	const visibleOffset = useRef(0)

	const loadMore = (rows=4, loadMultiplier = 5) => {
		if (awaiting.current) return
		const limit = columns * rows * loadMultiplier
		
		awaiting.current = true
		setLoading(true)
		fetch(`/api/pokedex?limit=${limit}&offset=${dataOffset.current}`).then(
			(response) => response.json().then((data) => {
				pokedexData.current = [ ...pokedexData.current, ...data.pokedex]
				setVisiblePokedex(pokedexData.current.slice(0, visibleOffset.current))
			}).finally(() => {
				awaiting.current = false
				setLoading(false)
			})
		).catch((error) => {
			awaiting.current = false
			setLoading(false)
			console.log(error)
		})
		dataOffset.current= dataOffset.current + limit
	}

	const showMore = (rows = 1) => {
		if (loading.current) return
		visibleOffset.current = visibleOffset.current + (columns * rows)
		if (visibleOffset.current >= pokedexData.current.length) loadMore()
		else setVisiblePokedex(pokedexData.current.slice(0, visibleOffset.current))
	}

	useEffect(() => {
		showMore(2)
		window.addEventListener("scroll", (event) => {
			const scrollingElement = document.scrollingElement
			const scrollPercent = (window.scrollY) / (document.scrollingElement.scrollHeight - scrollingElement.clientHeight)
			if (scrollPercent >= 1.0) showMore(2)
		})
	}, [])

	return (
		<main className="py-4">
			<div className="flex flex-col gap-4 items-center font-sans font-medium">
				<div className="fixed top-0 w-full bg-red-800">
					<p className="text-center text-2xl">Pokedex</p>
				</div>
				<div className={`w-fit my-16 grid grid-cols-4git gap-5`}>
					{visiblePokedex.map((entry) => (
						(<PokemonSlot key={entry.id} pokemon={entry} />)
					))}
				</div>
				<Image className={`animate-spin ${!loading ? 'hidden' : 'block'}`} src="/loading.png" width={182} height={182} alt="Loading" priority />
			</div>
		</main>
  	);
}

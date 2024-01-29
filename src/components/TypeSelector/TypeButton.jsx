'use client'

import Image from "next/image"

export default function TypeButton({ typeName, onTypeButtonClick }) {
	const colors = {
		'none': { bg: 'bg-white', ring: 'ring-white' }, 
		'bug': { bg: 'bg-green-400', ring: 'ring-green-400' },
		'dark': { bg: 'bg-sky-700', ring: 'ring-white' },
		'dragon': { bg: 'bg-blue-500', ring: 'ring-white' },
		'electric': { bg: 'bg-yellow-300', ring: 'ring-white' },
		'fairy': { bg: 'bg-pink-400', ring: 'ring-white' },
		'fighting': { bg: 'bg-orange-500', ring: 'ring-white' },
		'fire': { bg: 'bg-red-600', ring: 'ring-white' },
		'flying':  { bg: 'bg-blue-300', ring: 'ring-white' },
		'ghost':  { bg: 'bg-violet-500', ring: 'ring-white' },
		'grass':  { bg: 'bg-lime-400', ring: 'ring-white' },
		'ground':  { bg: 'bg-amber-600', ring: 'ring-white' },
		'ice':  { bg: 'bg-cyan-100', ring: 'ring-white' },
		'normal':  { bg: 'bg-neutral-300', ring: 'ring-white' },
		'poison':  { bg: 'bg-fuchsia-600', ring: 'ring-white' },
		'psychic':  { bg: 'bg-purple-500', ring: 'ring-white' },
		'rock':  { bg: 'bg-yellow-500', ring: 'ring-white' },
		'shadow':  { bg: 'bg-purple-950', ring: 'ring-white' },
		'steel':  { bg: 'bg-slate-400', ring: 'ring-white' },
		'water':  { bg: 'bg-sky-400', ring: 'ring-white' },
	}
	
	return (
		<div className="relative">
			<input type="radio" className={`w-8 h-8 rounded-full ${colors[typeName].bg} focus:ring-4 focus:${colors[typeName].ring}`} />
			<span className="absolute z-10 bottom-full text-center hover:visible" onClick={() => onTypeButtonClick(typeName)}>{typeName}</span>
		</div>
	)
}
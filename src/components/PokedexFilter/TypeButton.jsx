'use client'

import Image from "next/image"
import { useState } from "react"

export const TypeFilterMode = {
	NONE: -1,
	INCLUDE: 0,
	EXCLUDE: 1,
}

export default function TypeButton({ type, onClick }) {
	const [imageSrc, setImageSrc] = useState(`/filters/type/${type.name}.png`)
	const [filterMode, setFilterMode] = useState(TypeFilterMode.NONE)
	const modeFilters = {
		[TypeFilterMode.NONE]: 'grayscale neumorphism-flat',
		[TypeFilterMode.INCLUDE]: 'ring-green-400 dark:ring-green-600',
		[TypeFilterMode.EXCLUDE]: 'ring-red-400 dark:ring-red-600',
	}

	const onClickHandler = function(event) {
		const nextFilterMode = TypeFilterMode[Object.keys(TypeFilterMode)[(filterMode + 2) % 3]]
		setFilterMode(nextFilterMode)
		onClick(event, type, nextFilterMode)
	}

	return (
		<button className={`type-button ${modeFilters[filterMode]}`} onClick={ onClickHandler }>
			<Image src={ imageSrc } width={48} height={48} alt={`Type ${type.name} button`} onError={ () => setImageSrc('/filters/type/unknown.png') } priority/>
		</button>
	)
}
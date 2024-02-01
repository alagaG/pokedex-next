'use client'

import Image from "next/image"
import { useRef, useState } from "react"

export const NameFilterMode = {
	STARTS_WITH: 0,
	CONTAINS: 1,
	ENDS_WITH: 2,
	EQUALS: 3,
}

export default function NameFilter({ setNameFilter, onClick }) {
	const [imageSrc, setImageSrc] = useState("/filters/name/contains_icon.png")
	const nameFilter = useRef("")
	const filterMode = useRef(NameFilterMode.CONTAINS)
	const modeIcon = {
		[NameFilterMode.CONTAINS]: "/filters/name/contains_icon.png",
		[NameFilterMode.EQUALS]: "/filters/name/equals_icon.png",
		[NameFilterMode.STARTS_WITH]: "/filters/name/starts_with_icon.png",
		[NameFilterMode.ENDS_WITH]: "/filters/name/ends_with_icon.png",
	}

	const onChangeHandler = (event) => {
		nameFilter.current = event.target.value
		if (setNameFilter) setNameFilter({ name: nameFilter.current, mode: filterMode.current })
	}

	const onClickHandler = (event) => {
		filterMode.current = NameFilterMode[Object.keys(NameFilterMode)[(filterMode.current + 1) % 4]]
		setImageSrc(modeIcon[filterMode.current])
		if (setNameFilter) setNameFilter({ name: nameFilter.current, mode: filterMode.current })
	}

	return (
		<div className="name-filter">
			<input className="name-filter-input" type="text" placeholder="Search..." onChange={ onChangeHandler }></input>
			<button className="name-filter-mode" onClick={ onClickHandler }>
				<Image src={ imageSrc } width={32} height={32} alt="Name filter mode button" onError={ () => setImageSrc("/loading.png") } priority />
			</button>
		</div>
	)
}
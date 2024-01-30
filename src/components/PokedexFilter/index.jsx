'use client'

import { useRef } from "react"
import TypeSelector, { TypeFilterMode } from "./TypeSelector"

export const NameFilterMode = {
	CONTAINS: 0,
	EQUALS: 1,
	STARTS_WITH: 2,
	ENDS_WITH: 3
}

export default function PokedexFilter({ getTypeList, onSearch }) {
	const nameFilterMode = useRef(NameFilterMode.CONTAINS)
	const typeFilter = useRef([[], []])

	const onNameFilterModeChange = (event) => {
		const keys = Object.keys(NameFilterMode)
		nameFilterMode.current = NameFilterMode[keys[(nameFilterMode.current + 1) % keys.length]]
		event.target.textContent = `Change Filter - ${keys[nameFilterMode.current]}`
	}

	const onSearchButtonClick = (event) => {
		const nameFilter = document.getElementById("search-field").value

		if (onSearch) {
			onSearch({
				name: nameFilter,
				nameMode: nameFilterMode.current,
				includedTypes: typeFilter.current[TypeFilterMode.INCLUDE],
				excludedTypes: typeFilter.current[TypeFilterMode.EXCLUDE],
			})
		}
	}

	return (
		<div className="flex flex-col">
			<div>
				<label htmlFor="search-field">Search: </label>
				<input id="search-field" name="search-field" type="text" className="text-black" />
				<TypeSelector getTypeList={ getTypeList } setTypeFilter={ (filter) => typeFilter.current = filter } />
				<button onClick={ onNameFilterModeChange }>Change Filter - CONTAINS</button>
			</div>
			<button onClick={ onSearchButtonClick } >Search</button>
		</div>
	)
}
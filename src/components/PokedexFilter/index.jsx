'use client'

import { useRef } from "react"
import TypeFilter from "./TypeFilter"
import { TypeFilterMode } from "./TypeButton"
import NameFilter, { NameFilterMode } from "./NameFilter"

export function Filter(name="", nameMode=NameFilterMode.CONTAINS, includedTypes=[], excludedTypes=[]) {
	return { name, nameMode, includedTypes, excludedTypes }
}

export default function PokedexFilter({ typeList, onSearch }) {
	const nameFilter = useRef({ name: "", mode: NameFilterMode.CONTAINS})
	const typeFilter = useRef([[], []])

	const onNameFilterModeChange = (event) => {
		const keys = Object.keys(NameFilterMode)
		nameFilterMode.current = NameFilterMode[keys[(nameFilterMode.current + 1) % keys.length]]
		event.target.textContent = `Change Filter - ${keys[nameFilterMode.current]}`
	}

	const onSearchButtonClick = (event) => {
		if (onSearch) {
			onSearch(Filter(
				nameFilter.current.name,
				nameFilter.current.mode,
				typeFilter.current[TypeFilterMode.INCLUDE],
				typeFilter.current[TypeFilterMode.EXCLUDE],
			))
		}
	}

	return (
		<div id="filter-panel">
			<NameFilter setNameFilter={ (filter) => nameFilter.current = filter } />
			<TypeFilter typeList={ typeList } setTypeFilter={ (filter) => typeFilter.current = filter } />
			<button className="filter-button" onClick={ onSearchButtonClick } >Search</button>
		</div>
	)
}
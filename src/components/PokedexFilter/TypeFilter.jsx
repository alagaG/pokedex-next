'use client'

import { useEffect, useRef, useState } from "react";
import TypeButton, { TypeFilterMode } from "./TypeButton";

export default function TypeFilter({ typeList, setTypeFilter }) {
	const selectedTypes = useRef([[], []])

	const onTypeButtonClick = (event, type, mode) => {		
		const includeList = selectedTypes.current[TypeFilterMode.INCLUDE]
		const excludeList = selectedTypes.current[TypeFilterMode.EXCLUDE]

		switch (mode) {
			case TypeFilterMode.NONE:
				if (excludeList.some((element) => element.id === type.id)) {
					const index = excludeList.findIndex(element => element.id === type.id)
					selectedTypes.current[TypeFilterMode.EXCLUDE] = [...excludeList.slice(0, index), ...excludeList.slice(index + 1)]
				}
				break
			case TypeFilterMode.INCLUDE:
				selectedTypes.current[TypeFilterMode.INCLUDE] = includeList.concat(type)
				break
			case TypeFilterMode.EXCLUDE: 
				selectedTypes.current[TypeFilterMode.EXCLUDE] = excludeList.concat(type)
				if (includeList.some((element) => element.id === type.id)) {
					const index = includeList.findIndex(element => element.id === type.id)
					selectedTypes.current[TypeFilterMode.INCLUDE] = [...includeList.slice(0, index), ...includeList.slice(index + 1)]
				}
				break
		}
		if (setTypeFilter) setTypeFilter(selectedTypes.current)
	}

	return (
		<div className="type-filter">
			{typeList.map((type) => (
				<TypeButton key={type.id} type={ type } onClick={ onTypeButtonClick } />
			))}
		</div>
	)
}
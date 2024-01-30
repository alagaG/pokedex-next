import { useEffect, useRef, useState } from "react";

export const TypeFilterMode = {
	INCLUDE: 0,
	EXCLUDE: 1,
}

export default function TypeSelector({ getTypeList, setTypeFilter }) {
	const selectedTypes = useRef([[], []])
	const typeList = getTypeList()

	const onTypeSelected = (event, type, mode) => {
		const { target } = event
		
		if (target.checked) {
			selectedTypes.current[mode] = selectedTypes.current[mode].concat(type)
		} else {
			const index = selectedTypes.current[mode].indexOf(type)
			selectedTypes.current[mode] = [...selectedTypes.current[mode].slice(0, index), ...selectedTypes.current[mode].slice(index + 1)]
		}

		if (setTypeFilter) setTypeFilter(selectedTypes.current)
	}

	return (
		<div className="flex flex-row gap-4 justify-center">
			{typeList.map((type) => (
				<div key={type.id} className="flex flex-col">
					<input type="checkbox" value={type.name} onChange={ (event) => onTypeSelected(event, type, TypeFilterMode.INCLUDE) } />
					<div className="relative size-8 p-2 bg-white  rounded-full">
						<span className="absolute flex inset-0">
							<p className="w-full h-fit my-auto text-center text-black">{type.name.slice(0, 3).toUpperCase()}</p>
						</span>
					</div>
					<input type="checkbox" value={type.name} onChange={ (event) => onTypeSelected(event, type, TypeFilterMode.EXCLUDE) } />
				</div>
			))}
		</div>
	)
}
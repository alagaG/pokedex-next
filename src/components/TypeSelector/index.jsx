'use client'

import { useState } from "react"
import TypeButton from "./TypeButton"

export default function TypeSelector(props) {
	const [ typeList, setTypeList ] = useState([ 'none' ])
	const excludeList = [ 'unknown' ]

	fetch('https://pokeapi.co/api/v2/type/?limit=50&offset=0').then(response => 
		response.json().then((data) => {
			setTypeList([ 'none', ...data.results.filter((result) => !excludeList.includes(result.name)).map((result) => result.name).sort()])
		})
	)

	const onTypeButtonClick = (type) => {
		console.log(type)
	}

	return (
		<div className="flex flex-row gap-2 justify-center" {...props}>
			{typeList.map((type) => {
				return <TypeButton key={type} typeName={type} onTypeButtonClick={onTypeButtonClick} />
			})}
		</div>
	)
}
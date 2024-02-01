'use client'

import Image from "next/image";
import { useState } from "react";

export default function DarkModeButton({ className, startAsDark, onClick }) {
	const [ isDarkMode, setDarkMode ] = useState(startAsDark)

	const onClickHandler = (event) => {
		setDarkMode(!isDarkMode)
		onClick(event, !isDarkMode)
	}

	return (
		<button className={`dark-mode-button ${className}`} onClick={ onClickHandler }>
			<Image src={ `/theme/${isDarkMode ? 'dark' : 'light'}_mode_icon.png` } width={32} height={32} alt="Dark mode button" />
		</button>
	)
}
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
	title: "Pokedex Next",
	description: "A study project by Matheus Caldas",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en" className={`${inter.className}`}>
			{children}
		</html>
	);
}

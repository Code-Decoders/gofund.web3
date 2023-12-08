import { Navbar } from "@/components/navbar";
import { Link } from "@nextui-org/link";
import { Head } from "./head";
import { useTheme } from "next-themes";

export default function DefaultLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	const {theme, setTheme} = useTheme()
	setTheme('dark')
	return (
		<div className="relative flex flex-col h-screen">
			<Head />
			<Navbar />
			<main className="dark container mx-auto max-w-7xl px-6 flex-grow">
				{children}
			</main>
		</div>
	);
}

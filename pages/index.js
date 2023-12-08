import { Link } from "@nextui-org/link";
import { Snippet } from "@nextui-org/snippet";
import { Code } from "@nextui-org/code";
import { button as buttonStyles } from "@nextui-org/theme";
import { siteConfig } from "@/config/site";
import { title, subtitle } from "@/components/primitives";
import { GithubIcon } from "@/components/icons";
import DefaultLayout from "@/layouts/default";
import CCOCard from "@/components/cco-card"
import { Button, Card, CardHeader, Image } from "@nextui-org/react";

export default function IndexPage() {
	return (
		<DefaultLayout>
				<p className="text-bold text-3xl text-left max-w-[1200px] w-full">{"My CCO's"}</p>
			<div className="max-w-[1200px] gap-2 grid grid-cols-12 justify-center grid-rows-2 py-8">
				{
					Array(12).fill(1).map((e,i) => {
						return <CCOCard key={i} cco={{
							title:"DEX Project",
							creator: "0xF96b7fFd86d10106e986DdAfaefb02c6ef4424dd"
						}}/>
					})
				}
			</div>
		</DefaultLayout>
	);
}

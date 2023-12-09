import DefaultLayout from "@/layouts/default";
import CCOCard from "@/components/cards/cco-card"
import useWeb3 from "@/lib/useWeb3";
import { useEffect, useState } from 'react'

export default function IndexPage() {
	const { getCCOsByCreator, account, provider } = useWeb3()
	const [data, setData] = useState([])

	useEffect(() => {
		if (provider)
			getCCOsByCreator().then(val => setData(val))
	}, [provider])

	return (
		<DefaultLayout>
			<p className="font-bold text-3xl text-left max-w-[1200px] w-full">{"My CCO's"}</p>
			<div className="max-w-[1200px] gap-2 grid grid-cols-12 justify-center grid-rows-2 py-8">
				{
					data.map((e, i) => {
						return <CCOCard key={i} cco={{
							title: e.productName,
							creator: e[0],
							image: e[1],
							tokenAddress: e.tokenAddress
						}} />
					})
				}
			</div>
		</DefaultLayout>
	);
}

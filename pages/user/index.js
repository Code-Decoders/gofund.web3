import React from 'react'
import DefaultLayout from "@/layouts/default"
import useWeb3 from "@/lib/useWeb3";
import { useEffect, useState } from 'react'
import CCOCard from "@/components/cards/cco-card"

const IndexPage = () => {
	const [data, setData] = useState([])
	const { getAllCCOs, provider } = useWeb3()

	useEffect(() => {
		if (provider)
			getAllCCOs().then(val => {
				setData(val)
			})
	}, [provider])
	return (
		<DefaultLayout>
			<p className="font-bold text-3xl text-left max-w-[1200px] w-full py-6">Explore</p>
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
	)
}

export default IndexPage
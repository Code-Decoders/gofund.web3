import React from 'react'
import DefaultLayout from "@/layouts/default"

import CCOCard from "@/components/cards/cco-card"

const IndexPage = () => {
  return (
    <DefaultLayout>
        <p className="font-bold text-3xl text-left max-w-[1200px] w-full py-6">Explore</p>
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
  )
}

export default IndexPage
import React from 'react'
import DefaultLayout from '@/layouts/default'
import NFTCard from "@/components/cards/nft-card"

const PortfolioPage = () => {
    return (
        <DefaultLayout>
            <p className="font-bold text-3xl text-left max-w-[1200px] w-full py-6">My Investments</p>
            <div className="max-w-[1200px] gap-2 grid grid-cols-12 justify-center grid-rows-2 py-8">
                {
                    Array(12).fill(1).map((e, i) => {
                        return <NFTCard key={i} nft={{
                            title: "DEX Project",
                            subtitle: "100 Token",
                            price: "$15.00"
                        }} />
                    })
                }
            </div>
        </DefaultLayout>
    )
}

export default PortfolioPage
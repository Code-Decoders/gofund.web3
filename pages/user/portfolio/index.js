import React, { useState, useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import NFTCard from "@/components/cards/nft-card"
import useWeb3 from "@/lib/useWeb3"

const PortfolioPage = () => {
    const [data, setData] = useState([])
    const { getAllNFTs, provider } = useWeb3()

    useEffect(() => {
        if (provider)
            getAllNFTs().then(val => {
                console.log(val)
            })
    }, [provider])
    return (
        <DefaultLayout>
            <p className="font-bold text-3xl text-left max-w-[1200px] w-full py-6">My Investments</p>
            <div className="max-w-[1200px] gap-2 grid grid-cols-12 justify-center grid-rows-2 py-8">
                {
                    data.map((e, i) => {
                        return <NFTCard key={i} nft={{
                            image: e
                        }} />
                    })
                }
            </div>
        </DefaultLayout>
    )
}

export default PortfolioPage
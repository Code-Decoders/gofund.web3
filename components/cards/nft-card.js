import { Button, Card, CardHeader, Chip, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

const CCOCard = ({nft}) => {
    const router = useRouter()
    return (
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover "
                src={nft.image}
            />
        </Card>
    )
}

export default CCOCard
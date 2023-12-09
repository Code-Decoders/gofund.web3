import { Button, Card, CardHeader, Image } from '@nextui-org/react'
import { useRouter } from 'next/router'
import React from 'react'

const CCOCard = ({cco}) => {
    const router = useRouter()
    return (
        <Card className="col-span-12 sm:col-span-4 h-[300px]">
            <CardHeader className="absolute z-10 flex !items-start justify-between bg-[#00000045]">
                <div className='flex-col !items-start'>
                <p className="text-tiny text-white/60 uppercase font-bold">{cco.title}</p>
                <h4 className="text-white font-medium text-large">{cco.creator.substring(0,9)}</h4>
                </div>
                <Button radius="full" size="sm" color='primary' onClick={() => {router.push("/cco/1")}}>See Details</Button>
            </CardHeader>
            <Image
                removeWrapper
                alt="Card background"
                className="z-0 w-full h-full object-cover "
                src="https://analyticsindiamag.com/wp-content/uploads/2020/01/top-10-DS-projects.png"
            />
        </Card>
    )
}

export default CCOCard
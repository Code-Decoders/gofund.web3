import React, { useState, useEffect } from 'react'
import DefaultLayout from '@/layouts/default'
import { useRouter } from 'next/router'
import { Button,ButtonGroup, Card, CardBody, Chip, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { MdCatalog, MdPreview } from 'md-editor-rt'
import useWeb3 from '@/lib/useWeb3'

const DetailPage = () => {
  const router = useRouter()

  const [quantity, setQuantity] = useState(0)
  const [open, setOpen] = useState(false)
  const tokenAddress = router.query.id

  const [data, setData] = useState()

  const { getCCO, provider, invest, networks } = useWeb3()

  useEffect(() => {
    if (provider)
      getCCO({ tokenAddress: tokenAddress }).then(val => setData(val))
  }, [provider])


  const onInvest = async () => {
    await invest({
      tokenAddress: data.tokenAddress,
      usdcAmount: (quantity * data.initalValue).toString()
    })
    setOpen(false)
  }

  if (!data) {
    return <div>Loading...</div>
  }
  return (
    <DefaultLayout>
      <div className='flex mb-4 gap-10 max-w-[1200px] w-full'>
        <img src="https://www.icohotlist.com/wp-content/uploads/2023/09/logo-mait.png" className='rounded-full object-cover' width={"80px"} />
        <div>
          <p className='font-bold text-3xl'>{data.productName}</p>
          <div className='flex gap-4'>
            <p className='text-lg'>Tokens Supplied <Chip><b>{data.totalToken}</b></Chip></p>
            <p>|</p>
            <p className='text-lg'>Contributors <Chip><b>{parseInt(data[4])}</b></Chip></p>
            <p>|</p>
            <p className='text-lg'>Received <Chip><b>{parseInt(data[3]) * parseInt(data.initalValue) / 10 ** 18} USDC</b></Chip></p>
          </div>
        </div>
      </div>
      <div className='flex mb-4 gap-10 max-w-[1200px] w-full'>
        <div className='flex-1'>
          <ButtonGroup>
            <Button color='primary'><a href={data.whitepaperUri} target='_blank'>View Whitepaper</a></Button>
            <Button color='primary'><a href={data.websiteUri} target='_blank'>View Website</a></Button>
          </ButtonGroup>
          <MdPreview modelValue={data.description} previewTheme='vuepress' className='mb-4 mt-4 w-full' />
        </div>
        <Card className='w-[300px]'>
          <CardBody>
            <p className='font-bold text-2xl mb-5'>
              CCO details
            </p>
            <p className='text-lg mb-4' ><b>Status</b>{":\t" + "Active"}</p>
            <p className='text-lg mb-4'><b>Starting</b>{":\t" + new Date(data.startingDate).toDateString()}</p>
            <p className='text-lg mb-4'><b>Ending</b>{":\t" + new Date(data.endingDate).toDateString()}</p>
            <p className='text-lg mb-4'><b>Initial Token Value</b>{":\t"}<Chip>{data.initalValue} USDC</Chip></p>
            <p className='text-lg mb-4'><b>Available Token</b>{":\t"}<Chip>{parseInt(data.totalToken) - (parseInt(data[3]) / 10 ** 18)} Token</Chip></p>
            <p className='text-lg mb-4'><b>Network:</b> {networks[data.network].chainName}</p>
            <Button color='primary' onClick={(e) => setOpen(true)}>Proceed for Investment</Button>
          </CardBody>
        </Card>
        {open && <Modal isOpen={open} onClose={() => setOpen(false)}>

          <ModalContent>
            <ModalHeader>
              My Cart
            </ModalHeader>
            <ModalBody className='gap-0'>
              <div className='flex justify-between items-center w-full mb-10'>
                <p>Quantity (in Coins):</p>
                <Input
                  type="number"
                  className='w-70'
                  placeholder="Enter the Quantity of Coins to Invest"
                  onChange={e => setQuantity(e.target.value)}
                />
              </div>
              <div className='flex justify-between items-center w-full border-t-1 py-3 px-1'>
                <div>Coins going to be invested:</div>
                <div>{quantity}</div>
              </div>
              <div className='flex justify-between items-center w-full border-t-1 py-3 px-1'>
                <div>Value of Coin:</div>
                <div>{data.initalValue} USDC</div>
              </div>
              <div className='flex justify-between items-center w-full border-t-1 border-b-1 py-3 px-1'>
                <div>Total Amount going to be invested:</div>
                <div>{quantity * data.initalValue} USDC</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={(e) => setOpen(false)}>
                Close
              </Button>
              <Button color="primary" onClick={onInvest}>
                Invest
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>}
      </div>
    </DefaultLayout>
  )
}

export default DetailPage
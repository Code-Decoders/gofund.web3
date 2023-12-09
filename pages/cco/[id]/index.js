import React, { useState } from 'react'
import DefaultLayout from '@/layouts/default'
import { useRouter } from 'next/router'
import { Button, Card, CardBody, Chip, Image, Input, Modal, ModalBody, ModalContent, ModalFooter, ModalHeader } from '@nextui-org/react'
import { MdCatalog, MdPreview } from 'md-editor-rt'

const DetailPage = () => {
  const router = useRouter()

  const [quantity, setQuantity] = useState(0)
  const [open, setOpen] = useState(false)

  const dummyData = {
    "startingDate": "xxx",
    "endingDate": "xxx",
    "satus": "xxx",
    "intialValuePerToken": "xxx",
    "availableTokens": "xxxx",
  }

  const id = router.query.id
  return (
    <DefaultLayout>
      <div className='flex mb-4 gap-10 max-w-[1200px] w-full'>
        <img src="https://www.icohotlist.com/wp-content/uploads/2023/09/logo-mait.png" className='rounded-full object-cover' width={"80px"} />
        <div>
          <p className='font-bold text-3xl'>Marteli</p>
          <div className='flex gap-4'>
            <p className='text-lg'>Tokens Supplied <Chip><b>12000</b></Chip></p>
            <p>|</p>
            <p className='text-lg'>Contributors <Chip><b>30</b></Chip></p>
            <p>|</p>
            <p className='text-lg'>Received <Chip><b>1.2 USDC</b></Chip></p>
          </div>
        </div>
      </div>
      <div className='flex mb-4 gap-10 max-w-[1200px] w-full'>
        <MdPreview modelValue='# Hello World' previewTheme='vuepress' className='mb-4 flex-1' />
        <Card className='w-[300px]'>
          <CardBody>
            <p className='font-bold text-2xl mb-5'>
              CCO details
            </p>
            <p className='text-lg mb-4' ><b>Status</b>{":\t" + "Active"}</p>
            <p className='text-lg mb-4'><b>Starting</b>{":\t" + new Date().toDateString()}</p>
            <p className='text-lg mb-4'><b>Ending</b>{":\t" + new Date().toDateString()}</p>
            <p className='text-lg mb-4'><b>Initial Token Value</b>{":\t"}<Chip>5 USDC</Chip></p>
            <p className='text-lg mb-4'><b>Available Token</b>{":\t"}<Chip>9000 CTE</Chip></p>
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
                <div>5 USDC</div>
              </div>
              <div className='flex justify-between items-center w-full border-t-1 border-b-1 py-3 px-1'>
                <div>Total Amount going to be invested:</div>
                <div>{quantity * 5} USDC</div>
              </div>
            </ModalBody>
            <ModalFooter>
              <Button color="danger" onClick={(e) => setOpen(false)}>
                Close
              </Button>
              <Button color="primary">
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
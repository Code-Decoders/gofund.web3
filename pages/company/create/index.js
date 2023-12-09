import React, { useState } from 'react'
import { Autocomplete, AutocompleteItem, Button, Card, CardBody, Input, Textarea } from "@nextui-org/react";
import DefaultLayout from '@/layouts/default'
import { MdPreview, MdCatalog, MdEditor } from 'md-editor-rt';
import 'md-editor-rt/lib/preview.css';
import 'md-editor-rt/lib/style.css';
import useWeb3 from '@/lib/useWeb3'



const CreatePage = () => {
    const [productName, setProductName] = useState("")
    const [companyName, setCompanyName] = useState("")
    const [whitepaperUri, setWhitepaperUri] = useState("")
    const [websiteUri, setWebsiteUri] = useState("")
    const [totalToken, setTotalToken] = useState(0)
    const [description, setDescription] = useState("# Hello Editor")
    const [initalValue, setInitialValue] = useState(0)
    const [tokenAddress, setTokenAddress] = useState("")
    const [id] = useState('preview-only');
    const [network, setNetwork] = useState('')
    const { networks } = useWeb3()

    const onSubmit = () => {
    }
    return (

        <DefaultLayout>
            <Card className='mb-10 max-w-[1200px] w-full'>
                <CardBody>
                    <div className={"header"}>
                        <h1>Create CCO</h1>
                        <div className={"updateRow"}>
                            <Button color="primary" size="md" onClick={onSubmit} >
                                Save
                            </Button>
                        </div>
                    </div>
                </CardBody>
            </Card>
            <Card className='mb-10 max-w-[1200px] w-full'>
                <CardBody>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col">
                        <Input
                            isRequired
                            type="name"
                            label="Product Name"
                            placeholder='Enter the product name'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setProductName(e.target.value);
                            }}
                        />
                        <Input
                            isRequired
                            type="Company Name"
                            label="Company Name"
                            placeholder='Enter the company name'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setCompanyName(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col mb-4">
                        <MdEditor language='en-US' modelValue={description} className='md-4' theme='dark' onChange={setDescription} />
                    </div>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col">
                        <Input
                            isRequired
                            type="url"
                            label="Whitepaper Uri"
                            placeholder='Enter the whitepaper uri'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setWhitepaperUri(e.target.value);
                            }}
                        />
                        <Input
                            isRequired
                            type="url"
                            label="Website Uri"
                            placeholder='Enter the website uri'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setWebsiteUri(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col">
                        <Input
                            isRequired
                            type="text"
                            label="Token Address"
                            placeholder='Enter the Token Contract Address'
                            className="mb-4"
                            onChange={(e) => {
                                setTokenAddress(e.target.value);
                            }}
                        />
                        <Autocomplete
                            label="Network"
                            placeholder="Select Network"
                            defaultItems={Object.entries(networks)}
                            scrollShadowProps={{
                                isEnabled: false
                            }}
                            selectedKey={network}
                            onSelectionChange={setNetwork}
                        >
                            {(item) => <AutocompleteItem key={item[0]}>{item[1].chainName}</AutocompleteItem>}
                        </Autocomplete>
                    </div>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col">
                        <Input
                            isRequired
                            type="datetime-local"
                            label="Starting Date"
                            placeholder='Enter the starting date'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setWhitepaperUri(e.target.value);
                            }}
                        />
                        <Input
                            isRequired
                            type="datetime-local"
                            label="Ending Date"
                            placeholder='Enter the ending date'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setWebsiteUri(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col">
                        <Input
                            isRequired
                            type="file"
                            label="Logo"
                            placeholder='Enter the starting date'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setWhitepaperUri(e.target.value);
                            }}
                        />
                        <Input
                            isRequired
                            type="number"
                            label="Total Tokens"
                            placeholder='Enter the total no. of tokens to be distributed'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setTotalToken(e.target.value);
                            }}
                        />
                    </div>
                    <div className="flex w-full gap-x-5 gap-y-1 max-sm:flex-col">
                        <Input
                            isRequired
                            type="number"
                            label="Initial Value per token (in USDC)"
                            placeholder='Enter the initial value per token (in USDC)'
                            className="max-w-xl mb-4"
                            onChange={(e) => {
                                setInitialValue(e.target.value);
                            }}
                        />
                        <Input
                            isRequired
                            disabled
                            type="number"
                            label="Total Value"
                            placeholder='Enter the total value'
                            className="max-w-xl mb-4"
                            value={totalToken * initalValue}
                        />
                    </div>

                    <Button color="primary" size="md" onClick={onSubmit} >
                        Save
                    </Button>
                </CardBody>
            </Card>
        </DefaultLayout>
    )
}

export default CreatePage
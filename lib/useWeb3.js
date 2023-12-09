import { useEffect, useState } from "react";
import {
    NFTABI,
    MAINCONTRACTABI,
    USDCCONTRACTABI,
    DAOCONTRACTABI,
} from "./contractABI";
import { networks, contracts } from './getConfig'
import { useSDK } from '@metamask/sdk-react';
import Web3 from "web3";
import { ethers } from 'ethers'

export default function useWeb3() {
    const [web3, setWeb3] = useState(null);

    const { provider, account, chainId, connected } = useSDK();


    const changeNetwork = async ({ chainId }) => {
        if (window.ethereum.networkVersion !== chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: web3.utils.toHex(chainId) }]
                });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            { ...networks[chainId], chainId: web3.utils.toHex(chainId), }
                        ]
                    });
                }
            }
        }
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: web3.utils.toHex(chainId) }],
            })
        } catch (error) {
            console.debug(
                'Added network but could not switch chains',
                error,
            )
        }

    }


    const getMainContract = async () => {
        console.log(chainId)
        var contract = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        console.log(contract)
        return getContract(MAINCONTRACTABI, contract.mainContract)
    }

    const getNftContract = async () => {
        console.log(chainId)
        var contract = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        console.log(contract)
        return getContract(NFTABI, contract.nftContract)
    }

    const getERC20Contract = async () => {
        console.log(chainId)
        var contract = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        console.log(contract)
        return getContract(USDCCONTRACTABI, contract.usdcContract)
    }

    const createCCO = async ({
        tokenAddress, cid, totalToken, tokenRate, endAt
    }) => {
        console.log(tokenAddress, cid, totalToken, tokenRate, endAt)
        var contract = getContract(USDCCONTRACTABI, tokenAddress)
        var c1 = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        const value = ethers.formatEther(parseInt(totalToken))
        var mainContract = getContract(MAINCONTRACTABI, c1.mainContract)
        await contract.methods.transfer(c1.mainContract, value.toString())
        await mainContract.createCCO(tokenAddress, cid, totalToken, tokenRate, endAt)
    }

    const getCCO = async ({
        tokenAddress
    }) => {
        console.log(tokenAddress)
        var mainContract = await getMainContract()
        var result = await mainContract.getCCO(tokenAddress)
        const response = await fetch("https://gateway.lighthouse.storage/ipfs/" + result.CID)
        const json = (await response.json())
        return { ...result, ...json }
    }

    const getAllCCOs = async () => {
        var mainContract = await getMainContract()
        console.log(mainContract)
        var data = await mainContract.getAllCCOs()
        var final = []
        for (const key in data) {
            const result = await getCCO({ tokenAddress: data[key] })
            final.push(result)
        }
        console.log(final)
        return final
    }

    const getCCOsByCreator = async () => {
        var mainContract = await getMainContract()
        var data = await mainContract.getCCOsByCreator(account)
        var final = []
        for (const key in data) {
            const result = await getCCO({ tokenAddress: data[key] })
            const response = await fetch("https://gateway.lighthouse.storage/ipfs/" + result.CID)
            const json = (await response.json())
            final.push({ ...result, ...json })
        }
        console.log(final)
        return final
    }

    const invest = async ({
        tokenAddress,
        usdcAmount
    }) => {
        var usdcContract = await getERC20Contract()
        var mainContract = await getMainContract()
        var c1 = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        await usdcContract.approve(c1.mainContract,  ethers.parseUnits(usdcAmount))
        await mainContract.invest(tokenAddress,  ethers.parseUnits(usdcAmount))
    }

    const mint = async ({
        address,
        amount
    }) => {
        console.log(new ethers.formatEther(amount))
        var usdcContract = await getERC20Contract()
        await usdcContract.mint(address,  amount)
    }

    const safeMint = async ({
        uri
    }) => {
        var nftContract = getNftContract()
        await nftContract.safeMint(account, uri).send({ from: account })
    }

    const tokenUri = async ({
        tokenId
    }) => {
        var nftContract = getNftContract()
        await nftContract.tokenUri(tokenId).call()
    }

    const getContract = async (abi, address) => {
        if (connected) {
            const ethersProvider = new ethers.BrowserProvider(provider)
            const signer = await ethersProvider.getSigner()
            const contract = new ethers.Contract(address, abi, signer);
            return contract
        }
    };





    return {
        provider, connected, networks, account,
        mint,
        createCCO, getCCO, getAllCCOs, getCCOsByCreator, invest, safeMint, tokenUri,
        changeNetwork
    }

}
import { useEffect, useState } from "react";
import {
    NFTABI,
    MAINCONTRACTABI,
    USDCCONTRACTABI,
    DAOCONTRACTABI,
} from "./contractABI";
import { networks, contracts, hexChains } from './getConfig'
import { useSDK } from '@metamask/sdk-react';
import { ethers } from 'ethers'

export default function useWeb3() {
    const { provider, account, chainId, connected } = useSDK();


    const changeNetwork = async ({ chainId }) => {
        if (window.ethereum.networkVersion !== chainId) {
            try {
                await window.ethereum.request({
                    method: 'wallet_switchEthereumChain',
                    params: [{ chainId: hexChains[chainId] }]
                });
            } catch (err) {
                // This error code indicates that the chain has not been added to MetaMask
                if (err.code === 4902) {
                    await window.ethereum.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            { ...networks[chainId], chainId: hexChains[chainId] }
                        ]
                    });
                }
            }
        }
        try {
            await window.ethereum.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: hexChains[chainId] }],
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
        var contract = await getContract(USDCCONTRACTABI, tokenAddress)
        var mainContract = await getMainContract()
        var address = await mainContract.getAddress()
        var value = ethers.parseUnits(totalToken.toString())
        console.log(value)
        await contract.transfer(address, value.toString())
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

    const getNFTs = async ({
    }) => {
        var final = []
        var nftContract = await getNftContract()
        for (let i = 1; i < 10; i++) {
            let data = nftContract.tokenUri(i)
            if (data) {
                final.push(data)
            }
        }
        return final
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
            console.log(result)
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
        await usdcContract.approve(c1.mainContract, ethers.parseUnits(usdcAmount), { gasLimit: "500000" })
        await mainContract.invest(tokenAddress, ethers.parseUnits(usdcAmount), { gasLimit: "500000" })
    }

    const mint = async ({
        address,
        amount
    }) => {
        console.log(new ethers.formatEther(amount))
        var usdcContract = await getERC20Contract()
        await usdcContract.mint(address, amount)
    }

    const safeMint = async ({
        uri
    }) => {
        var nftContract = await getNftContract()
        console.log(nftContract)
        await nftContract.safeMint(account, uri)
    }

    const tokenUri = async ({
        tokenId
    }) => {
        var nftContract = await getNftContract()
        await nftContract.tokenUri(tokenId)
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
        createCCO, getCCO, getAllCCOs, getCCOsByCreator, getNFTs, invest, safeMint, tokenUri,
        changeNetwork
    }

}
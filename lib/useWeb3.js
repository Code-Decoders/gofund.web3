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

export default function useWeb3() {
    const [web3, setWeb3] = useState(null);

    const { provider, account, chainId } = useSDK();

    const [mainContract, setMainContract] = useState(null)
    const [nftContract, setNftContract] = useState(null);
    const [daoContract, setDaoContract] = useState(null);
    const [usdcContract, setUSDCContract] = useState(null)


    const disconnectWallet = async () => {
        if (web3 && web3.currentProvider && web3.currentProvider.disconnect) {
            console.log("disconnecting wallet");
            await web3.currentProvider.disconnect();
            setWeb3(null);
            setAccount(null);
        }
    };

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
        setContracts()

    }


    const setContracts = async () => {
        let chainId = await (new Web3(provider)).eth.getChainId();
        console.log(chainId)
        var contract = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        if (contract.daoContract) {
            const contract = getContract(DAOCONTRACTABI, contract.daoContract);
            setDaoContract(contract)
        }
        setMainContract(getContract(MAINCONTRACTABI, contract.mainContract));
        setNftContract(getContract(NFTABI, contract.nftContract))
        setUSDCContract(getContract(USDCCONTRACTABI, contract.usdcContract))
    }

    const createCCO = async ({
        tokenAddress, cid, totalToken, tokenRate, endAt
    }) => {
         await mainContract.methods.createCCO(tokenAddress, cid, totalToken, tokenRate, endAt).send({ from: account })
    }

    const getCCO = async ({
        tokenAddress
    }) => {
        return await mainContract.methods.getCCO(tokenAddress).call()
    }

    const getAllCCOs = async ({

    }) => {
        return await mainContract.methods.getAllCCOs().call()
    }

    const getCCOsByCreator = async () => {
        return await mainContract.methods.getCCOsByCreator(account).call()
    }

    const invest = async ({
        tokenAddress,
        usdcAmount
    }) => {
        let chainId = await (new Web3(provider)).eth.getChainId();
        console.log(chainId)
        // chainId = parseInt(chainId)
        var contract = Object.entries(contracts).find(([key, value]) => parseInt(key) == chainId ? value : null)[1]
        
        await usdcContract.methods.approve(contract.mainContract, usdcAmount).send({from: account})
        await mainContract.methods.invest(tokenAddress, usdcAmount).send({from: account})
    }

    const safeMint = async ({
        uri
    }) => {
        await nftContract.methods.safeMint(account, uri).send({from: account})
    }

    const tokenUri = async ({
        tokenId
    }) => {
        await nftContract.methods.tokenUri(tokenId).call()
    }

    const getContract = (abi, address) => {
        const web3 = new Web3(provider)
        const contract = new web3.eth.Contract(abi, address);
        return contract;
    };

    useEffect(() => {
        if (provider) {
            console.log('web3')
            setContracts()
        }
    }, [provider]);




    return {
        web3, disconnectWallet, networks, account,
        createCCO, getCCO, getAllCCOs, getCCOsByCreator, invest, safeMint, tokenUri,
        changeNetwork
    }

}
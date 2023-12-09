import { useEffect, useState } from "react";
import getWeb3 from "./getWeb3";
import {
    NFTABI,
    MAINCONTRACTABI,
    DAOCONTRACTABI,
} from "./contractABI";
import { networks, contracts } from './getConfig'

export default function useWeb3() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);

    const [mainContract, setMainContract] = useState(null)
    const [nftContract, setNftContract] = useState(null);
    const [daoContract, setDaoContract] = useState(null);
    const [usdcContract, setUSDCContract] = useState(null)

    const getAccount = async () => {
        const accounts = await web3.eth.getAccounts();
        setAccount(accounts[0]);
    };

    const connectWallet = async () => {
        console.log('connectWallet');
        const web3 = await getWeb3();
        setWeb3(web3);
        console.log('web3')
        getAccount(web3);
    };

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
        setContracts({
            chainId
        })

    }


    const setContracts = ({chainId}) => {
        if (contracts[chainId].daoContract) {
            const contract = getContract(DAOCONTRACTABI, contracts[chainId].daoContract);
            setDaoContract(contract)
        }
        setMainContract(getContract(MAINCONTRACTABI, contracts[chainId].mainContract));
        setNftContract(getContract(NFTABI, contracts[chainId].nftContract))
        setUSDCContract(getContract(NFTABI, contracts[chainId].usdcContract))
    } 

    const getContract = (abi, address) => {
        if (web3) {
            const contract = new web3.eth.Contract(abi, address);
            return contract;
        }
        return null;
    };

    useEffect(() => {
        const init = async () => {
            const web3 = await getWeb3();
            setWeb3(web3);
        };

        if (!web3) {
            init();
        }
        if (web3) {
            console.log('web3')
            getAccount(web3);
            const chainId = web3.eth.getChainId();
            setContracts({
                chainId: chainId
            })
        }
    }, [web3]);



    // const getNFTs = async (tokenIds) => {
    //     const result = await fnftContract.methods.balanceOfBatch(tokenIds.map(e => account), tokenIds).call();
    //     const nfts = tokenIds.map((e, i) => {
    //         let quantity = result[i];
    //         return { id: e, quantity: parseInt(quantity) };
    //     }).filter(e => e.quantity > 0);
    //     console.log(nfts)
    //     return nfts;
    // }

    // const approval = async () => {
    //     const isApproved = await fnftContract.methods.isApprovedForAll(account, tradingAddress).call();
    //     if (isApproved) {
    //         return;
    //     }
    //     const result = await fnftContract.methods.setApprovalForAll(tradingAddress, true).send({ from: account });
    //     console.log("approval result is:", result);
    // }

    // const listOrder = async (tokenId, quantity, price) => {
    //     console.log("list order is:", tokenId, quantity, price)
    //     price = web3.utils.toWei((parseFloat(price)).toString(), 'ether');
    //     const result = await tradingContract.methods.sell(tokenId, price, quantity).send({ from: account });
    //     console.log("list order result is:", result);
    // }

    // const trade = async (tokenId, quantity, price, seller) => {
    //     price = web3.utils.toWei((parseFloat(price) * parseInt(quantity)).toString(), 'ether');
    //     const result = await tradingContract.methods.purchase(tokenId, quantity, seller).send({ from: account, value: price });
    // }

    // const getOrders = async () => {
    //     const result = await tradingContract.methods.getAllOrders().call();
    //     return result.filter(e => e.seller !== "0x0000000000000000000000000000000000000000").map(e => {
    //         return { seller: e.seller, tokenId: parseInt(e.tokenId), price: web3.utils.fromWei(e.price, 'ether'), quantity: parseInt(e.quantity) };
    //     })
    // };

    return {
        web3, disconnectWallet, networks, connectWallet, marketplaceContract, fnftContract, discountContract, tradingContract, account,
        // purchaseToken, getOrders, getNFTs, approval, listOrder, trade,
        changeNetwork
    }

}
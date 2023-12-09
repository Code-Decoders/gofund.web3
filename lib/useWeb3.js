import { useEffect, useState } from "react";
import getWeb3 from "./getWeb3";
import {
    AIRDROPABI,
    FNFTABI,
    MARKETPLACEABI,
    DISCOUNTABI,
    TRADINGABI,
} from "./contractABI";
import { networks } from './getNetworks'

export default function useWeb3() {
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null);
    const [airdropContract, setAirdropContract] = useState(null);
    const [fnftContract, setFnftContract] = useState(null);
    const [marketplaceContract, setMarketplaceContract] = useState(null);
    const [discountContract, setDiscountContract] = useState(null);
    const [tradingContract, setTradingContract] = useState(null);
    const airdropAddress = "0x4166D860F77bF73C436B01b1550EDdef4Fb6495c";
    const fnftAddress = "0xA5d3526a4A7c8636C705406519b6849D30fC6806";
    const marketplaceAddress = "0x1415f894b155B31FB84aF9e88114bF0443dD2D8b";
    const discountAddress = "0x96b23Df2c0dcB34E035A06719B0B0B5DE19c334a";
    const tradingAddress = "0xE1b98135A59Ea59fa0c5444539C9720946fff9E7";




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

    }


    // const getFnftContract = () => {
    //     const contract = getContract(FNFTABI, fnftAddress);
    //     setFnftContract(contract);
    //     return contract;
    // }

    // const getMarketplaceContract = () => {
    //     const contract = getContract(MARKETPLACEABI, marketplaceAddress);
    //     setMarketplaceContract(contract);
    //     return contract;
    // }
    // const purchaseToken = async (tokenId, quantity, price) => {
    //     price = web3.utils.toWei((parseFloat(price) * quantity).toString(), 'ether');
    //     const result = await marketplaceContract.methods.purchaseToken(tokenId, quantity).send({ from: account, value: price });
    // }
    // const getDiscountContract = () => {
    //     const contract = getContract(DISCOUNTABI, discountAddress);
    //     setDiscountContract(contract);
    //     return contract;
    // }

    // const getTradingContract = async () => {
    //     const contract = getContract(TRADINGABI, tradingAddress);
    //     setTradingContract(contract);
    //     return contract;
    // };

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
            // getTradingContract();
            // getMarketplaceContract();
            // getDiscountContract();
            // getFnftContract();
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
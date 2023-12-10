export const networks = {
    1442: {
        chainName: 'Polygon ZKEVM Testnet',
        nativeCurrency: { name: 'MATIC', decimals: 18, symbol: 'MATIC' },
        rpcUrls: ['https://rpc.public.zkevm-test.net/'],
        blockExplorerUrls: ['https://explorer.public.zkevm-test.net'],
    },
    84531: {
        chainName: 'Base Goerli Testnet',
        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
        rpcUrls: ['https://goerli.base.org'],
        blockExplorerUrls: ["https://goerli.basescan.org/"]
    },
    534351: {
        chainName: 'Scroll Sepolia Testnet',
        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
        rpcUrls: ['https://sepolia-rpc.scroll.io'],
        blockExplorerUrls: ["https://sepolia.scrollscan.com"]
    },
    59140: {
        chainName: 'Linea Testnet',
        nativeCurrency: { name: 'ETH', decimals: 18, symbol: 'ETH' },
        rpcUrls: ['https://rpc.goerli.linea.build'],
        blockExplorerUrls: ["https://goerli.lineascan.build"]
    },
    5001: {
        chainName: 'Mantle Testnet',
        nativeCurrency: { name: 'MNT', decimals: 18, symbol: 'MNT' },
        rpcUrls: ['https://rpc.testnet.mantle.xyz'],
        blockExplorerUrls: ["https://explorer.testnet.mantle.xyz"]
    },
    195: {
        chainName: 'X1 testnet',
        nativeCurrency: { name: 'OKB', decimals: 18, symbol: 'OKB' },
        rpcUrls: ['https://testrpc.x1.tech'],
        blockExplorerUrls: ["https://www.oklink.com/x1-test"]
    },
    44787: {
        chainName: 'Celo Alfajores Testnet',
        nativeCurrency: { name: 'CELO', decimals: 18, symbol: 'CELO' },
        rpcUrls: ['https://alfajores-forno.celo-testnet.org'],

        blockExplorerUrls: ["https://alfajores.celoscan.io"]
    },

}

export const contracts = {
    1442: {
        mainContract: '0x81aC77864c5962482cB6E743A2ddecDee8120823',
        nftContract: '0xD7a71796213AB860e5f261D4e2eC62767a6A4Dd4',
        daoContract: null,
        usdcContract: '0x8025A4cb3933BB88AB104629F8d24c0EA6385087'
    },
    84531: {
        mainContract: '0x00EbB8Fe6C7808836bc24BF64FeBE0c10220ADa6',
        nftContract: '0xa1Afb2d82018b37333F6f53172f410a923A91D23',
        daoContract: null,
        usdcContract: '0xD7a71796213AB860e5f261D4e2eC62767a6A4Dd4'
    },
    534351: {
        mainContract: '0x81aC77864c5962482cB6E743A2ddecDee8120823',
        nftContract: '0xD7a71796213AB860e5f261D4e2eC62767a6A4Dd4',
        daoContract: null,
        usdcContract: '0x8025A4cb3933BB88AB104629F8d24c0EA6385087'
    },
    59140: {
        mainContract: '0x379E1D1a5A94f4e0840471B7d2a1EdDfEF89999d',
        nftContract: '0xa9ba418e49Cd429de55c43C0ef97aC690e61D716',
        daoContract: null,
        usdcContract: '0xb0bED5F720035CCc0d59b4A6678CCf17954Ae3c8'
    },
    5001: {
        mainContract: '0xD7a71796213AB860e5f261D4e2eC62767a6A4Dd4',
        nftContract: '0x81aC77864c5962482cB6E743A2ddecDee8120823',
        daoContract: null,
        usdcContract: '0x8025A4cb3933BB88AB104629F8d24c0EA6385087'
    },
    195: {
        mainContract: '0x81aC77864c5962482cB6E743A2ddecDee8120823',
        nftContract: '0xD7a71796213AB860e5f261D4e2eC62767a6A4Dd4',
        daoContract: null,
        usdcContract: '0x8025A4cb3933BB88AB104629F8d24c0EA6385087'
    },
    44787: {
        mainContract: '0x91Df60Fb1b71B5dc2eB9BC0fBF9b7B5647Cbc86C',
        nftContract: '0x8D47B42889e8a94ca6679D2367D2AccEE34277B3',
        daoContract: null,
        usdcContract: '0x59bE81CC038DB5Bf78BF916b644611b2A4bD45b2'
    },
}
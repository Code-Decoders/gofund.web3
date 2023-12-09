"use client"; // This is a client component 👈🏽

import DefaultLayout from "@/layouts/default";
import { MetaMaskSDK, SDKProvider } from "@metamask/sdk";
import {
  ConnectionStatus,
  EventType,
  ServiceStatus,
} from "@metamask/sdk-communication-layer";
import { AnonAadhaarProof, LogInWithAnonAadhaar, useAnonAadhaar } from "anon-aadhaar-react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: SDKProvider;
  }
}

export default function LoginPage() {
  const [sdk, setSDK] = useState<MetaMaskSDK>();
  const [chain, setChain] = useState("");
  const [account, setAccount] = useState<string>("");
  const [response, setResponse] = useState<any>("");
  const [connected, setConnected] = useState(false);
  const [serviceStatus, setServiceStatus] = useState<ServiceStatus>();
  const [activeProvider, setActiveProvider] = useState<SDKProvider>();
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

  const languages = sdk?.availableLanguages ?? ["en"];

  useEffect(() => {
    setCurrentLanguage(localStorage.getItem("MetaMaskSDKLng") || "en");
    connect();
  }, []);

  useEffect(() => {
    if (anonAadhaar?.status === "logged-in") {
      router.push("/");
    }
  }, [anonAadhaar]);

  useEffect(() => {
    const doAsync = async () => {
      const clientSDK = new MetaMaskSDK({
        extensionOnly: true,
        forceInjectProvider: true,
        preferDesktop: false,

        communicationServerUrl: process.env.NEXT_PUBLIC_COMM_SERVER_URL,
        checkInstallationImmediately: true,
        i18nOptions: {
          enabled: false,
        },
        dappMetadata: {
          name: "GoFundWeb3",
          url: window.location.href,
        },
        logging: {
          developerMode: false,
        },
        storage: {
          enabled: true,
        },
      });
      await clientSDK.init();
      setSDK(clientSDK);
    };
    doAsync();
  }, []);

  useEffect(() => {
    if (!sdk || !activeProvider) {
      return;
    }

    // activeProvider is mapped to window.ethereum.
    console.debug(`App::useEffect setup active provider listeners`);
    if (window.ethereum?.selectedAddress) {
      console.debug(`App::useEffect setting account from window.ethereum `);
      setAccount(window.ethereum?.selectedAddress);
      setConnected(true);
    } else {
      setConnected(false);
    }

    const onChainChanged = (chain: unknown) => {
      console.log(`App::useEfect on 'chainChanged'`, chain);
      setChain(chain as string);
      setConnected(true);
    };

    const onInitialized = () => {
      console.debug(`App::useEffect on _initialized`);
      setConnected(true);
      if (window.ethereum?.selectedAddress) {
        setAccount(window.ethereum?.selectedAddress);
      }

      if (window.ethereum?.chainId) {
        setChain(window.ethereum.chainId);
      }
    };

    const onAccountsChanged = (accounts: unknown) => {
      console.log(`App::useEfect on 'accountsChanged'`, accounts);
      setAccount((accounts as string[])?.[0]);
      setConnected(true);
    };

    const onConnect = (_connectInfo: any) => {
      console.log(`App::useEfect on 'connect'`, _connectInfo);
      setConnected(true);
      setChain(_connectInfo.chainId as string);
    };

    const onDisconnect = (error: unknown) => {
      console.log(`App::useEfect on 'disconnect'`, error);
      setConnected(false);
      setChain("");
    };

    const onServiceStatus = (_serviceStatus: ServiceStatus) => {
      console.debug(`sdk connection_status`, _serviceStatus);
      setServiceStatus(_serviceStatus);
    };

    window.ethereum?.on("chainChanged", onChainChanged);

    window.ethereum?.on("_initialized", onInitialized);

    window.ethereum?.on("accountsChanged", onAccountsChanged);

    window.ethereum?.on("connect", onConnect);

    window.ethereum?.on("disconnect", onDisconnect);

    sdk.on(EventType.SERVICE_STATUS, onServiceStatus);

    return () => {
      console.debug(`App::useEffect cleanup activeprovider events`);
      window.ethereum?.removeListener("chainChanged", onChainChanged);
      window.ethereum?.removeListener("_initialized", onInitialized);
      window.ethereum?.removeListener("accountsChanged", onAccountsChanged);
      window.ethereum?.removeListener("connect", onConnect);
      window.ethereum?.removeListener("disconnect", onDisconnect);
      sdk.removeListener(EventType.SERVICE_STATUS, onServiceStatus);
    };
  }, [activeProvider]);

  const connect = () => {
    if (!window.ethereum) {
      throw new Error(`invalid ethereum provider`);
    }

    window.ethereum
      .request({
        method: "eth_requestAccounts",
        params: [],
      })
      .then((accounts) => {
        if (accounts) {
          console.debug(`connect:: accounts result`, accounts);
          setAccount((accounts as string[])[0]);
          setConnected(true);
        }
      })
      .catch((e) => console.log("request accounts ERR", e));
  };

  const connectAndSign = async () => {
    try {
      const signResult = await sdk?.connectAndSign({
        msg: "Connect + Sign message",
      });
      setResponse(signResult);
      setAccount(window.ethereum?.selectedAddress ?? "");
      setConnected(true);
      setChain(window.ethereum?.chainId ?? "");
    } catch (err) {
      console.warn(`failed to connect..`, err);
    }
  };

  const sendTransaction = async () => {
    const to = "0x0000000000000000000000000000000000000000";
    const transactionParameters = {
      to, // Required except during contract publications.
      from: activeProvider?.selectedAddress, // must match user's active address.
      value: "0x5AF3107A4000", // Only required to send ether to the recipient from the initiating external account.
    };

    try {
      // txHash is a hex string
      // As with any RPC call, it may throw an error
      const txHash = (await activeProvider?.request({
        method: "eth_sendTransaction",
        params: [transactionParameters],
      })) as string;

      setResponse(txHash);
    } catch (e) {
      console.log(e);
    }
  };

  const changeNetwork = async (hexChainId: string) => {
    console.debug(`switching to network chainId=${hexChainId}`);
    try {
      const response = await activeProvider?.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: hexChainId }], // chainId must be in hexadecimal numbers
      });
      console.debug(`response`, response);
    } catch (err) {
      console.error(err);
    }
  };

  const addEthereumChain = () => {
    if (!activeProvider) {
      throw new Error(`invalid ethereum provider`);
    }

    activeProvider
      .request({
        method: "wallet_addEthereumChain",
        params: [
          {
            chainId: "0x89",
            chainName: "Polygon",
            blockExplorerUrls: ["https://polygonscan.com"],
            nativeCurrency: { symbol: "MATIC", decimals: 18 },
            rpcUrls: ["https://polygon-rpc.com/"],
          },
        ],
      })
      .then((res) => console.log("add", res))
      .catch((e) => console.log("ADD ERR", e));
  };

  const readOnlyCalls = async () => {
    if (!sdk?.hasReadOnlyRPCCalls() && window.ethereum === undefined) {
      setResponse(
        "readOnlyCalls are not set and provider is not set. Please set your infuraAPIKey in the SDK Options"
      );
      return;
    }
    try {
      const result = await window.ethereum?.request({
        method: "eth_blockNumber",
        params: [],
      });
      console.log(`got blockNumber`, result);
      const gotFrom = sdk!!.hasReadOnlyRPCCalls()
        ? "infura"
        : "MetaMask provider";
      setResponse(`(${gotFrom}) ${result}`);
    } catch (e) {
      console.log(`error getting the blockNumber`, e);
      setResponse("error getting the blockNumber");
    }
  };

  const terminate = () => {
    sdk?.terminate();
    setChain("");
    setAccount("");
    setResponse("");
  };

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        {connected ? (
          <div className="px-4 py-8">
            <main className="flex flex-col items-center gap-8 rounded-2xl max-w-screen-sm mx-auto h-[24rem] md:h-[20rem] p-8">
              <h1 className="font-bold text-2xl">
                Welcome to Anon Aadhaar Example
              </h1>
              <p>Prove your Identity anonymously using your Aadhaar card.</p>
              <LogInWithAnonAadhaar />
            </main>
            <div className="flex flex-col items-center gap-4 rounded-2xl max-w-screen-sm mx-auto p-8">
              {/* Render the proof if generated and valid */}
              {anonAadhaar?.status === "logged-in" && (
                <>
                  <p>✅ Proof is valid</p>
                  <p>Got your Aadhaar Identity Proof</p>
                  <>Welcome anon!</>
                  <AnonAadhaarProof
                    code={JSON.stringify(anonAadhaar.pcd, null, 2)}
                  />
                </>
              )}
            </div>
          </div>
        ) : (
          <span className="text-2xl">Not Connected</span>
        )}
      </section>
    </DefaultLayout>
  );
}

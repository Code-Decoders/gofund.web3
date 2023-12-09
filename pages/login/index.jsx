"use client"; // This is a client component 👈🏽

import DefaultLayout from "@/layouts/default";
import {
  AnonAadhaarProof,
  LogInWithAnonAadhaar,
  useAnonAadhaar,
} from "anon-aadhaar-react";
import { useSDK } from '@metamask/sdk-react';
import { useRouter } from "next/router";
import { useEffect, useState } from "react";


export default function LoginPage() {
  const [account, setAccount] = useState();
  const { sdk, connected, connecting, provider, chainId } = useSDK();

  const [anonAadhaar] = useAnonAadhaar();
  const router = useRouter();

  const connect = async () => {
    try {
      const accounts = await sdk?.connect();
      setAccount(accounts?.[0]);
    } catch(err) {
      console.warn(`failed to connect..`, err);
    }
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
          <span className="text-2xl" onClick={connect}>Not Connected</span>
        )}
      </section>
    </DefaultLayout>
  );
}

'use client'
import type { AppProps } from "next/app";

import { NextUIProvider } from "@nextui-org/react";
import { ThemeProvider as NextThemesProvider } from "next-themes";
import { fontSans, fontMono } from "@/config/fonts";
import { useRouter } from "next/router";
import "@/styles/globals.css";
import { AnonAadhaarProvider } from "anon-aadhaar-react";
import { useEffect, useState } from "react";
import { MetaMaskProvider } from '@metamask/sdk-react'

export default function App({ Component, pageProps }: AppProps) {
  const router = useRouter();

  return (
    <MetaMaskProvider
      debug={true}
      sdkOptions={{
        checkInstallationImmediately: true,
        dappMetadata: {
          name: "GoFundWeb3",
          url: typeof window !== "undefined" ? window.location.host + "/login" : ""
        }
      }}
    >
    <AnonAadhaarProvider _appId={"69"} _testing={true}>
      <NextUIProvider navigate={router.push}>
        <NextThemesProvider>
          <Component {...pageProps} />
        </NextThemesProvider>
      </NextUIProvider>
    </AnonAadhaarProvider>
    </MetaMaskProvider>
  );
}

export const fonts = {
  sans: fontSans.style.fontFamily,
  mono: fontMono.style.fontFamily,
};

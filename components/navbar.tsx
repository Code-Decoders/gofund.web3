import {
  Button,
  Kbd,
  Link,
  Input,
  Navbar as NextUINavbar,
  NavbarContent,
  NavbarMenu,
  NavbarMenuToggle,
  NavbarBrand,
  NavbarItem,
  NavbarMenuItem,
  Chip,
} from "@nextui-org/react";

import { link as linkStyles } from "@nextui-org/theme";

import { siteConfig } from "@/config/site";
import NextLink from "next/link";
import clsx from "clsx";

import { ThemeSwitch } from "@/components/theme-switch";
import {
  TwitterIcon,
  GithubIcon,
  DiscordIcon,
  HeartFilledIcon,
  SearchIcon,
} from "@/components/icons";
import { useRouter } from "next/router";
import useWeb3 from "@/lib/useWeb3";
import { useMemo } from "react";

export const Navbar = () => {
  const router = useRouter();
  const { web3, connectWallet, account, changeNetwork } = useWeb3();

  const address = useMemo(() => {
    if (web3) {
      return account;
    }
    return null;
  }, [web3, account]);

  return (
    <NextUINavbar maxWidth="xl" position="sticky" className="h-28">
      <NavbarContent className="basis-1/5 sm:basis-full" justify="start">
        <NavbarBrand className="gap-3 max-w-fit">
          <NextLink className="flex justify-start items-center gap-1" href="/">
            <img src={"/next.svg"} className="h-16 w-16 p-2 object-contain" />
            <p className="font-bold text-3xl">GoFund.Web3</p>
          </NextLink>
        </NavbarBrand>
        <div className="hidden lg:flex gap-4 justify-start ml-2">
          {siteConfig.navItems
            .filter((e) => router.pathname.includes(e.role))
            .map((item) => (
              <NavbarItem key={item.href}>
                <NextLink
                  className={clsx(
                    linkStyles({ color: "foreground" }),
                    "data-[active=true]:text-primary data-[active=true]:font-medium"
                  )}
                  color="foreground"
                  href={item.href}
                >
                  {item.label}
                </NextLink>
              </NavbarItem>
            ))}
        </div>
      </NavbarContent>
      <NavbarContent
        className="hidden sm:flex basis-1/5 sm:basis-full"
        justify="end"
      >
        {address ? (
          <Chip>{(address as String).substring(0,9)}...</Chip>
        ) : (
          <Button
            color="primary"
            onClick={() => {
              connectWallet();
            }}
          >
            Connect Wallet
          </Button>
        )}

        <NavbarItem className="hidden sm:flex gap-2">
          <Link isExternal href={siteConfig.links.twitter}>
            <TwitterIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.discord}>
            <DiscordIcon className="text-default-500" />
          </Link>
          <Link isExternal href={siteConfig.links.github}>
            <GithubIcon className="text-default-500" />
          </Link>
          {/* <ThemeSwitch /> */}
        </NavbarItem>
      </NavbarContent>
      <NavbarContent className="sm:hidden basis-1 pl-4" justify="end">
        {/* <ThemeSwitch /> */}
        <NavbarMenuToggle />
      </NavbarContent>

      <NavbarMenu>
        <div className="mx-4 mt-10 flex flex-col gap-2">
          {siteConfig.navMenuItems
            .filter((e) => router.pathname.includes(e.role))
            .map((item, index) => (
              <NavbarMenuItem key={`${item}-${index}`}>
                <Link
                  color={
                    index === 2
                      ? "primary"
                      : index === siteConfig.navMenuItems.length - 1
                      ? "danger"
                      : "foreground"
                  }
                  href="#"
                  size="lg"
                >
                  {item.label}
                </Link>
              </NavbarMenuItem>
            ))}
          <NavbarMenuItem className="h-10">
            {address ? (
              <Chip>{(address as String).substring(0,9)}...</Chip>
            ) : (
              <Button
                color="primary"
                onClick={() => {
                  connectWallet();
                }}
              >
                Connect Wallet
              </Button>
            )}
          </NavbarMenuItem>
        </div>
      </NavbarMenu>
    </NextUINavbar>
  );
};

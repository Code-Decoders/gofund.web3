export type SiteConfig = typeof siteConfig;

export const siteConfig = {
	name: "Next.js + NextUI",
	description: "Make beautiful websites regardless of your design experience.",
	navItems: [
		{
			label: "Dashboard",
			href: "/company/",
			role: "company"
		},
		{
			label: "Create",
			href: "/company/create",
			role: "company"
		},
		{
			label: "Home",
			href: "/user/",
			role: "user"
		},
		{
			label: "Portfolio",
			href:"/user/portfolio",
			role: "user",
		}
	],
	navMenuItems: [
		{
			label: "Dashboard",
			href: "/company/",
			role: "company"
		},
		{
			label: "Create",
			href: "/company/create",
			role: "company"
		},
		{
			label: "Home",
			href: "/user/",
			role: "user"
		},
		{
			label: "Portfolio",
			href:"/user/portfolio",
			role: "user",
		}
	],
	links: {
		github: "https://github.com/Code-Decoders",
		twitter: "https://twitter.com/CodeDecoders",
		// docs: "https://nextui-docs-v2.vercel.app",
		discord: "https://discord.gg/PQVWWpk6",
		// sponsor: "https://patreon.com/jrgarciadev"
	},
};

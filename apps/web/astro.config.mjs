// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";
import sitemap from "@astrojs/sitemap";

const site =
	process.env.SITE_URL ?? "https://dataengineering101.pages.dev";

const organizationJsonLd = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "Organization",
	name: "Data Engineering 101",
	url: site,
	description:
		"Free open-source curriculum from zero to data engineer with Docker labs.",
});

const courseJsonLd = JSON.stringify({
	"@context": "https://schema.org",
	"@type": "Course",
	name: "Data Engineering 101",
	description:
		"Structured paths for Python, SQL, pipelines, and capstone projects.",
	provider: {
		"@type": "Organization",
		name: "Data Engineering 101",
	},
	isAccessibleForFree: true,
});

/** Minimal Starlight skin — customize later. */
export default defineConfig({
	site,
	trailingSlash: "always",
	integrations: [
		starlight({
			title: "Data Engineering 101",
			description:
				"Free path from zero to data engineer — lessons, labs, and AI-aware workflow.",
			social: [
				{
					icon: "github",
					label: "GitHub",
					href: "https://github.com/TheDevWhoSaysNI/DataEngineering101",
				},
			],
			editLink: {
				baseUrl:
					"https://github.com/TheDevWhoSaysNI/DataEngineering101/edit/main/content/",
			},
			customCss: [],
			head: [
				{
					tag: "script",
					attrs: { type: "application/ld+json" },
					content: organizationJsonLd,
				},
				{
					tag: "script",
					attrs: { type: "application/ld+json" },
					content: courseJsonLd,
				},
			],
			sidebar: [
				{
					label: "Start",
					items: [{ slug: "index" }, { slug: "support" }],
				},
				{
					label: "Path 0 — Setup",
					items: [{ autogenerate: { directory: "path-00-setup" } }],
				},
				{
					label: "Paths 1–10",
					items: [
						{ slug: "path-01-mindset" },
						{ slug: "path-02-python" },
						{ slug: "path-03-sql" },
						{ slug: "path-04-modeling-pipelines" },
						{ slug: "path-05-orchestration-warehouse" },
						{ slug: "path-06-distributed" },
						{ slug: "path-07-ops-metal" },
						{ slug: "path-08-portfolio" },
						{ slug: "path-09-capstones" },
						{ slug: "path-10-career" },
					],
				},
				{
					label: "Labs",
					items: [{ autogenerate: { directory: "labs" } }],
				},
			],
		}),
		sitemap(),
	],
});

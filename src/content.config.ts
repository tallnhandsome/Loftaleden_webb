import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blogg = defineCollection({
	// Varje inlägg är en mapp under src/content/blogg/ med en index.md
	// och eventuella bilder bredvid. Mappnamnet blir webbadressen.
	loader: glob({
		base: './src/content/blogg',
		pattern: '**/index.md',
		generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
	}),
	schema: ({ image }) =>
		z.object({
			title: z.string(),
			description: z.string(),
			pubDate: z.coerce.date(),
			updatedDate: z.coerce.date().optional(),
			heroImage: z.optional(image()),
			heroImageAlt: z.string().optional(),
		}),
});

const infopunkter = defineCollection({
	// Informationsskyltarna längs leden. En mapp per skylt med index.md och
	// bilderna bredvid. Mappnamnet blir webbadressen. `ordning` styr i vilken
	// följd de listas – ändra den för att flytta en skylt i listan.
	loader: glob({
		base: './src/content/infopunkter',
		pattern: '**/index.md',
		generateId: ({ entry }) => entry.replace(/\/index\.md$/, ''),
	}),
	schema: ({ image }) =>
		z.object({
			titel: z.string(),
			ingress: z.string(),
			ordning: z.number(),
			bild: image(),
			bildAlt: z.string(),
			bild2: z.optional(image()),
			bild2Alt: z.string().optional(),
			kalla: z.string().optional(),
		}),
});

export const collections = { blogg, infopunkter };

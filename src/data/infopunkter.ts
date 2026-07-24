// Informationspunkter längs leden. Läggs till här när nya skyltar kommer upp.
import type { ImageMetadata } from 'astro';
import liaBy from '../assets/infopunkter/lia-by.jpg';
import snogge from '../assets/infopunkter/snogge-hembygdsgard.jpg';

export interface Infopunkt {
	titel: string;
	text: string;
	bild: ImageMetadata;
}

export const INFOPUNKTER: Infopunkt[] = [
	{
		titel: 'Lia By',
		text: 'Byn finns noterad i Jordeboken från 1592 under namnet Lie.',
		bild: liaBy,
	},
	{
		titel: 'Snogge Hembygdsgård',
		text: 'Gården finns nämnd 1529, då Gustav Vasa för släktens räkning sålde den till hövitsmannen på Varbergs slott.',
		bild: snogge,
	},
];

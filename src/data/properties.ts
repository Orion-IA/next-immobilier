import ghazelaSalon from "@/assets/bien-ghazela/01-salon.jpeg";
import ghazelaCuisine from "@/assets/bien-ghazela/02-cuisine.jpeg";
import ghazelaCuisine2 from "@/assets/bien-ghazela/03-cuisine2.jpeg";
import ghazelaCoinRepas from "@/assets/bien-ghazela/04-coin-repas.jpeg";
import ghazelaChambre1 from "@/assets/bien-ghazela/05-chambre1.jpeg";
import ghazelaChambre2 from "@/assets/bien-ghazela/06-chambre2.jpeg";
import ghazelaSdb from "@/assets/bien-ghazela/07-sdb.jpeg";
import ghazelaStudio from "@/assets/bien-ghazela/08-studio.jpeg";
import ghazelaTerrasse from "@/assets/bien-ghazela/09-terrasse.jpeg";
import ghazelaTerrasse2 from "@/assets/bien-ghazela/10-terrasse2.jpeg";

export type PropertyTag = "Vente" | "Location" | "Neuf";
export type PropertyStatus = "active" | "vendu" | "loue";
export type PropertyType = "Villa" | "Appartement" | "Duplex" | "Studio" | "Maison" | "Penthouse" | "Terrain";

export interface Property {
  id: string;
  name: string;
  area: string;
  price: string;
  priceValue: number; // numeric for filtering (DT for vente, DT/mois for location)
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  gallery?: string[];
  tag: PropertyTag;
  type: PropertyType;
  description: string;
  features: string[];
  reference: string;
  lat: number;
  lng: number;
  status?: PropertyStatus;
  videoUrl?: string;
}

export const ZONES = [
  "El Ghazala", "Ariana", "Borj Touil", "Chorfech Sidi Thabet", "Cité Chaker",
  "Cité Essahafa", "El Menzah", "Ennkhilet", "Jaafer", "Kalâat el-Andalous",
  "Mnihla", "Nour Jaafer", "Petite Ariana", "Riadh Andalous", "Douar Hicher",
  "Nahli", "Raoued", "Sidi Amor",
];

export const properties: Property[] = [
  { id: "3437", name: "Étage de villa — Cité Ghazela", area: "Cité El Ghazala, Ariana", price: "420 000 DT", priceValue: 420000, beds: 3, baths: 2, sqft: 160, img: ghazelaSalon, gallery: [ghazelaSalon, ghazelaCuisine, ghazelaCuisine2, ghazelaCoinRepas, ghazelaChambre1, ghazelaChambre2, ghazelaSdb, ghazelaStudio, ghazelaTerrasse, ghazelaTerrasse2], tag: "Vente", type: "Villa", description: "L'agence Bestimmo propose à la vente un étage de villa à Cité Ghazela, proche de toutes les commodités. Composé d'un hall d'entrée, salon — salle à manger, 2 grandes chambres à coucher, cuisine équipée, salle de bain et salle d'eau. À l'étage, un studio avec une deuxième cuisine, une douche et une grande terrasse. Chauffage central et climatisation.", features: ["Hall d'entrée", "Salon / salle à manger", "2 grandes chambres", "Cuisine équipée", "Salle de bain", "Salle d'eau", "Studio à l'étage", "2ème cuisine", "Grande terrasse", "Chauffage central", "Climatisation", "Titre bleu"], reference: "BIM-V-3437", lat: 36.89995, lng: 10.18865 },
];

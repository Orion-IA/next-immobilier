import appart from "@/assets/property-appart.jpg";
import villa from "@/assets/property-villa.jpg";
import duplex from "@/assets/property-duplex.jpg";
import maison from "@/assets/property-maison.jpg";

export type PropertyTag = "Vente" | "Location";
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
}

export const ZONES = [
  "El Ghazala", "Ariana", "Borj Touil", "Chorfech Sidi Thabet", "Cité Chaker",
  "Cité Essahafa", "El Menzah", "Ennkhilet", "Jaafer", "Kalâat el-Andalous",
  "Mnihla", "Nour Jaafer", "Petite Ariana", "Riadh Andalous", "Douar Hicher",
  "Nahli", "Raoued", "Sidi Amor",
];

const baseFeatures = ["Climatisation", "Cuisine équipée", "Parking privé", "Balcon", "Sécurité 24/7"];

export const properties: Property[] = [
  { id: "01", name: "Villa contemporaine", area: "Cité La Gazelle", price: "850 000 DT", priceValue: 850000, beds: 5, baths: 3, sqft: 420, img: villa, gallery: [villa, maison, duplex], tag: "Vente", type: "Villa", description: "Villa moderne de prestige avec piscine privée, jardin paysager et finitions haut de gamme. Idéale pour une famille recherchant calme et confort.", features: [...baseFeatures, "Piscine", "Jardin 200 m²"], reference: "BIM-V-001" },
  { id: "02", name: "Appartement S+3 standing", area: "Ariana Ville", price: "320 000 DT", priceValue: 320000, beds: 3, baths: 2, sqft: 145, img: appart, gallery: [appart, villa], tag: "Vente", type: "Appartement", description: "Appartement S+3 lumineux dans une résidence sécurisée. Salon double exposition, cuisine américaine et trois chambres avec rangements.", features: [...baseFeatures, "Ascenseur"], reference: "BIM-V-002" },
  { id: "03", name: "Duplex avec terrasse", area: "El Menzah", price: "520 000 DT", priceValue: 520000, beds: 4, baths: 3, sqft: 210, img: duplex, gallery: [duplex, appart], tag: "Vente", type: "Duplex", description: "Duplex spacieux avec grande terrasse panoramique de 60 m². Quatre chambres, double salon et cuisine équipée.", features: [...baseFeatures, "Terrasse 60 m²", "Vue dégagée"], reference: "BIM-V-003" },
  { id: "04", name: "Maison familiale", area: "Riadh Andalous", price: "1 200 DT/mois", priceValue: 1200, beds: 4, baths: 2, sqft: 180, img: maison, gallery: [maison, villa], tag: "Location", type: "Maison", description: "Maison familiale meublée avec jardin clôturé, dans un quartier résidentiel calme. Disponible immédiatement.", features: [...baseFeatures, "Meublée", "Jardin"], reference: "BIM-L-001" },
  { id: "05", name: "Penthouse vue dégagée", area: "Ennasr", price: "1 100 000 DT", priceValue: 1100000, beds: 4, baths: 3, sqft: 260, img: villa, gallery: [villa, duplex], tag: "Vente", type: "Penthouse", description: "Penthouse d'exception au dernier étage avec terrasse panoramique de 100 m². Prestations haut de gamme et vue imprenable.", features: [...baseFeatures, "Terrasse 100 m²", "Vue mer"], reference: "BIM-V-004" },
  { id: "06", name: "Studio meublé", area: "Petite Ariana", price: "650 DT/mois", priceValue: 650, beds: 1, baths: 1, sqft: 55, img: appart, gallery: [appart], tag: "Location", type: "Studio", description: "Studio entièrement meublé et équipé, idéal étudiant ou jeune actif. Proche transports et commerces.", features: ["Meublé", "Climatisation", "Wifi"], reference: "BIM-L-002" },
  { id: "07", name: "Villa avec jardin", area: "El Ghazala", price: "780 000 DT", priceValue: 780000, beds: 4, baths: 3, sqft: 350, img: maison, gallery: [maison, villa], tag: "Vente", type: "Villa", description: "Belle villa avec jardin paysager, garage double et grand séjour. Quartier résidentiel prisé d'El Ghazala.", features: [...baseFeatures, "Jardin", "Garage 2 voitures"], reference: "BIM-V-005" },
  { id: "08", name: "S+2 lumineux", area: "Cité Essahafa", price: "900 DT/mois", priceValue: 900, beds: 2, baths: 1, sqft: 95, img: duplex, gallery: [duplex, appart], tag: "Location", type: "Appartement", description: "Appartement S+2 récent, très lumineux, avec balcon. Cuisine équipée et chambres avec placards intégrés.", features: ["Balcon", "Cuisine équipée", "Climatisation"], reference: "BIM-L-003" },
  { id: "09", name: "Villa moderne piscine", area: "Raoued", price: "1 350 000 DT", priceValue: 1350000, beds: 5, baths: 4, sqft: 480, img: villa, gallery: [villa, maison], tag: "Vente", type: "Villa", description: "Villa contemporaine signée par un architecte, avec piscine, sauna et finitions premium. Volumes généreux et lumière naturelle.", features: [...baseFeatures, "Piscine", "Sauna", "Architecte"], reference: "BIM-V-006" },
  { id: "10", name: "Appartement S+1", area: "Borj Touil", price: "550 DT/mois", priceValue: 550, beds: 1, baths: 1, sqft: 60, img: appart, gallery: [appart], tag: "Location", type: "Appartement", description: "S+1 fonctionnel, proche écoles et commerces. Loyer modéré pour primo-locataires.", features: ["Cuisine équipée", "Balcon"], reference: "BIM-L-004" },
  { id: "11", name: "Terrain constructible", area: "Sidi Amor", price: "420 000 DT", priceValue: 420000, beds: 0, baths: 0, sqft: 600, img: maison, tag: "Vente", type: "Terrain", description: "Terrain plat de 600 m² avec titre bleu, viabilisé. Idéal pour projet de villa.", features: ["Titre bleu", "Viabilisé", "Plat"], reference: "BIM-V-007" },
  { id: "12", name: "Duplex meublé luxe", area: "Riadh Andalous", price: "2 800 DT/mois", priceValue: 2800, beds: 4, baths: 3, sqft: 220, img: duplex, gallery: [duplex, villa], tag: "Location", type: "Duplex", description: "Duplex d'exception entièrement meublé, finitions haut de gamme. Convient cadres expatriés ou ambassades.", features: ["Meublé luxe", "Sécurité 24/7", "Climatisation centrale"], reference: "BIM-L-005" },
  { id: "13", name: "Appartement S+4", area: "El Menzah", price: "680 000 DT", priceValue: 680000, beds: 4, baths: 2, sqft: 195, img: appart, gallery: [appart, duplex], tag: "Vente", type: "Appartement", description: "Grand S+4 traversant avec double séjour et quatre chambres. Résidence récente avec ascenseur et parking.", features: [...baseFeatures, "Ascenseur"], reference: "BIM-V-008" },
  { id: "14", name: "Villa à louer Ghazala", area: "El Ghazala", price: "3 500 DT/mois", priceValue: 3500, beds: 5, baths: 4, sqft: 400, img: villa, gallery: [villa, maison], tag: "Location", type: "Villa", description: "Villa familiale spacieuse avec jardin et garage. Quartier sécurisé, proche écoles internationales.", features: [...baseFeatures, "Jardin", "Garage"], reference: "BIM-L-006" },
];

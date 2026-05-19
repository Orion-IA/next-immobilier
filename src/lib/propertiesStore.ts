import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { properties as STATIC_PROPERTIES, type Property } from "@/data/properties";

export type DbPropertyRow = {
  id: string;
  created_by: string | null;
  name: string;
  area: string;
  price: string;
  price_value: number;
  beds: number;
  baths: number;
  sqft: number;
  img: string;
  gallery: string[];
  tag: string;
  type: string;
  description: string;
  features: string[];
  reference: string;
  lat: number;
  lng: number;
};

export const rowToProperty = (r: DbPropertyRow): Property => ({
  id: r.id,
  name: r.name,
  area: r.area,
  price: r.price,
  priceValue: Number(r.price_value),
  beds: r.beds,
  baths: r.baths,
  sqft: r.sqft,
  img: r.img,
  gallery: r.gallery && r.gallery.length > 0 ? r.gallery : [r.img],
  tag: r.tag as Property["tag"],
  type: r.type as Property["type"],
  description: r.description,
  features: r.features,
  reference: r.reference,
  lat: r.lat,
  lng: r.lng,
});

export const fetchDbProperties = async (): Promise<Property[]> => {
  const { data, error } = await supabase
    .from("properties")
    .select("*")
    .order("created_at", { ascending: false });
  if (error) {
    console.error("Erreur chargement biens:", error);
    return [];
  }
  return (data as DbPropertyRow[]).map(rowToProperty);
};

export const useAllProperties = (): Property[] => {
  const [db, setDb] = useState<Property[]>([]);
  useEffect(() => {
    fetchDbProperties().then(setDb);
    const channel = supabase
      .channel("properties-changes")
      .on("postgres_changes", { event: "*", schema: "public", table: "properties" }, () => {
        fetchDbProperties().then(setDb);
      })
      .subscribe();
    return () => {
      supabase.removeChannel(channel);
    };
  }, []);
  return [...db, ...STATIC_PROPERTIES];
};

import { properties as STATIC_PROPERTIES, type Property } from "@/data/properties";
import { useEffect, useState } from "react";

const STORAGE_KEY = "bestimmo:custom-properties";

export const loadCustom = (): Property[] => {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as Property[]) : [];
  } catch {
    return [];
  }
};

export const saveCustom = (list: Property[]) => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
  window.dispatchEvent(new Event("bestimmo:properties-changed"));
};

export const addProperty = (p: Property) => {
  const list = loadCustom();
  saveCustom([p, ...list]);
};

export const removeProperty = (id: string) => {
  saveCustom(loadCustom().filter((p) => p.id !== id));
};

export const useAllProperties = (): Property[] => {
  const [custom, setCustom] = useState<Property[]>(() => loadCustom());
  useEffect(() => {
    const handler = () => setCustom(loadCustom());
    window.addEventListener("bestimmo:properties-changed", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("bestimmo:properties-changed", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);
  return [...custom, ...STATIC_PROPERTIES];
};

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import logo from "@/assets/bestimmo-logo.png";

const bestimmoIcon = L.divIcon({
  className: "bestimmo-marker",
  html: `<div style="position:relative;display:flex;flex-direction:column;align-items:center;">
    <div style="background:#fff;border:2px solid hsl(var(--brand));border-radius:9999px;padding:6px;box-shadow:0 6px 20px -4px rgba(0,0,0,0.35);width:48px;height:48px;display:flex;align-items:center;justify-content:center;">
      <img src="${logo}" alt="Bestimmo" style="width:100%;height:100%;object-fit:contain;" />
    </div>
    <div style="width:0;height:0;border-left:8px solid transparent;border-right:8px solid transparent;border-top:12px solid hsl(var(--brand));margin-top:-2px;"></div>
  </div>`,
  iconSize: [48, 60],
  iconAnchor: [24, 60],
  popupAnchor: [0, -56],
});

export const LocationMap = ({
  lat,
  lng,
  label,
  zoom = 15,
  className = "h-72 w-full",
}: {
  lat: number;
  lng: number;
  label?: string;
  zoom?: number;
  className?: string;
}) => (
  <div className={className}>
    <MapContainer
      center={[lat, lng]}
      zoom={zoom}
      scrollWheelZoom={false}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker position={[lat, lng]} icon={bestimmoIcon}>
        {label && <Popup>{label}</Popup>}
      </Marker>
    </MapContainer>
  </div>
);
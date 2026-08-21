"use client";

import "leaflet/dist/leaflet.css";
import { DivIcon, type LatLngBoundsExpression } from "leaflet";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";

import type { SkiLocation } from "@/lib/ski-locations";

const markerIcon = new DivIcon({
  className: "",
  html: '<div style="width:14px;height:14px;border-radius:9999px;background:#171717;border:2px solid white;box-shadow:0 0 0 1px rgba(0,0,0,0.2);"></div>',
  iconSize: [14, 14],
  iconAnchor: [7, 7],
});

export function SkiMap({ locations }: { locations: SkiLocation[] }) {
  const bounds: LatLngBoundsExpression = locations.map((loc) => [loc.lat, loc.lng]);

  return (
    <div className="h-80 w-full overflow-hidden rounded-lg border border-border">
      <MapContainer
        bounds={bounds}
        boundsOptions={{ padding: [24, 24] }}
        scrollWheelZoom={false}
        className="h-full w-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        {locations.map((loc) => (
          <Marker key={loc.name} position={[loc.lat, loc.lng]} icon={markerIcon}>
            <Popup>{loc.name}</Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
}

import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Polyline } from "react-leaflet";
import L from "leaflet";
import { io } from "socket.io-client";
import "leaflet/dist/leaflet.css";

// Fix Leaflet's default icon missing issues in Next.js
const customIcon = L.icon({
  iconUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  iconRetinaUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  shadowUrl: "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

interface ShipmentMapData {
  id: string;
  origin: string;
  originLat: number;
  originLng: number;
  destination: string;
  destinationLat: number;
  destinationLng: number;
  status: string;
}

export default function MapTracker({ shipment }: { shipment: ShipmentMapData }) {
  const [currentPosition, setCurrentPosition] = useState<[number, number]>([shipment.originLat, shipment.originLng]);
  const [isMounted, setIsMounted] = useState(false);
  // Use a ref for the socket to avoid triggering re-renders and setState-in-effect issues
  const socketRef = useRef<ReturnType<typeof io> | null>(null);

  useLayoutEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsMounted(true);
  }, []);

  useEffect(() => {
    if (shipment.status === 'IN_TRANSIT') {
      const WS_URL = process.env.NEXT_PUBLIC_WS_URL;
      if (!WS_URL) return;

      const socket = io(WS_URL);
      socketRef.current = socket;

      socket.on("locationUpdate", (payload: { deltaLat: number; deltaLng: number }) => {
        setCurrentPosition(prev => [
          prev[0] + payload.deltaLat,
          prev[1] + payload.deltaLng
        ]);
      });

      return () => {
        socket.disconnect();
        socketRef.current = null;
      };
    } else if (shipment.status === 'DELIVERED') {
      const destination: [number, number] = [shipment.destinationLat, shipment.destinationLng];
      const timer = setTimeout(() => {
        setCurrentPosition(destination);
      }, 0);
      return () => clearTimeout(timer);
    }
  }, [shipment]);

  const origin: [number, number] = [shipment.originLat, shipment.originLng];
  const destination: [number, number] = [shipment.destinationLat, shipment.destinationLng];

  if (!isMounted) return null;

  return (
    <div className="w-full h-full rounded-xl overflow-hidden glass z-0 relative shadow-2xl">
      <MapContainer 
        center={currentPosition} 
        zoom={5} 
        style={{ width: "100%", height: "100%" }}
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://carto.com/">CARTO</a>'
        />

        <Marker position={origin} icon={customIcon}>
          <Popup>Origin: {shipment.origin}</Popup>
        </Marker>

        <Marker position={destination} icon={customIcon}>
          <Popup>Destination: {shipment.destination}</Popup>
        </Marker>

        <Marker position={currentPosition} icon={customIcon}>
          <Popup>Driver&apos;s Current Location</Popup>
        </Marker>

        <Polyline 
          positions={[origin, currentPosition]} 
          color="#2563eb"
          dashArray="5, 10" 
          weight={4}
        />
        <Polyline 
          positions={[currentPosition, destination]} 
          color="#4b5563"
          weight={4}
        />
      </MapContainer>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Loader2, MapPin, Truck } from "lucide-react";
import dynamic from 'next/dynamic';

const MapTracker = dynamic(() => import("@/components/MapTracker"), { ssr: false });

export default function TrackPage() {
  const { id } = useParams();
  const [data, setData] = useState<{
    id: string;
    trackingId: string;
    company?: { name: string };
    origin: string;
    destination: string;
    status: string;
    expectedDelivery: string;
    originLat: number;
    originLng: number;
    destinationLat: number;
    destinationLng: number;
  } | null>(null);
  const [error, setError] = useState("");

  useEffect(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) return;

    fetch(`${API_URL}/track/${id}`)
      .then(res => {
        if (!res.ok) throw new Error("Tracking ID not found");
        return res.json();
      })
      .then(setData)
      .catch(err => setError(err.message));
  }, [id]);

  if (error) {
    return <div className="h-screen w-full flex items-center justify-center text-red-500 text-xl font-bold">{error}</div>;
  }

  if (!data) {
    return <div className="h-screen w-full flex items-center justify-center"><Loader2 className="w-10 h-10 animate-spin text-primary" /></div>;
  }

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        <h1 className="text-3xl font-bold flex items-center gap-3">
          <Truck className="text-primary w-8 h-8"/> Tracking Portal
        </h1>
        
        <div className="glass p-6 rounded-xl border border-white/10 space-y-4">
          <div className="flex justify-between items-center border-b border-white/10 pb-4">
            <div>
              <span className="text-muted-foreground text-sm">Tracking ID</span>
              <h2 className="text-2xl font-bold text-primary">{data.trackingId}</h2>
            </div>
            <div className="text-right">
              <span className="text-muted-foreground text-sm">Provider</span>
              <p className="font-semibold">{data.company?.name || 'LogiBoard Logistics'}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><MapPin className="w-3 h-3"/> Origin</span>
              <p className="font-semibold">{data.origin}</p>
            </div>
            <div>
              <span className="text-muted-foreground text-sm flex items-center gap-1"><MapPin className="w-3 h-3"/> Destination</span>
              <p className="font-semibold">{data.destination}</p>
            </div>
          </div>

          <div className="bg-primary/10 rounded-lg p-4 mt-6">
            <span className="text-primary font-bold text-lg mb-1 block">Status: {data.status}</span>
            <p className="text-sm text-foreground/80">
              Expected Delivery: {new Date(data.expectedDelivery).toLocaleDateString()}
            </p>
          </div>
        </div>

        <div className="glass p-6 rounded-xl border border-white/10 h-[500px] flex items-center justify-center overflow-hidden">
          <MapTracker shipment={data} />
        </div>
      </div>
    </div>
  );
}

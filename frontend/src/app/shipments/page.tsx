"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, MapPin, Loader2, FileDown } from "lucide-react";
import { motion } from "framer-motion";

export default function ShipmentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  
  const [shipments, setShipments] = useState<{
    id: string;
    trackingId: string;
    origin: string;
    destination: string;
    status: string;
    expectedDelivery: string;
    driver?: { contact: string };
  }[]>([]);
  const [loading, setLoading] = useState(true);

  const downloadInvoice = async (id: string, trackingId: string) => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL ;
    const res = await fetch(`${API_URL}/shipments/${id}/invoice`, {
      headers: { "Authorization": `Bearer ${(session as { accessToken?: string })?.accessToken}` }
    });
    if (!res.ok) return alert("Failed to download invoice");
    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `invoice-${trackingId}.pdf`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register");
      return;
    }
    
    if (status !== "authenticated") return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    fetch(`${API_URL}/shipments`, {
      headers: {
        "Authorization": `Bearer ${(session as { accessToken?: string })?.accessToken}`
      }
    })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthorized");
        return res.json();
      })
      .then((data) => {
        setShipments(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch shipments:", err);
        setLoading(false);
        if (err.message === "Unauthorized") router.push("/register");
      });
  }, [status, session, router]);

  const getStatusColor = (status: string) => {
    switch (status) {
      case "IN_TRANSIT": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "DELIVERED": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "DELAYED": return "bg-red-500/20 text-red-400 border-red-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Shipments</h1>
            <p className="text-muted-foreground mt-1">Manage and track your active freight deliveries.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
            <Plus className="w-4 h-4" /> New Shipment
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between"
        >
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search tracking ID, city..." className="pl-10 bg-white/5 border-white/10" />
          </div>
          <Button variant="outline" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl overflow-hidden border border-white/10 relative min-h-[300px]"
        >
          {loading ? (
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-8 h-8 animate-spin text-primary" />
            </div>
          ) : (
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-b border-white/10">
                  <TableHead className="font-semibold text-foreground/80">Tracking ID</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Route</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                  <TableHead className="font-semibold text-foreground/80">Driver</TableHead>
                  <TableHead className="font-semibold text-foreground/80">ETA</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {shipments.map((shipment) => (
                  <TableRow key={shipment.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                    <TableCell className="font-medium text-primary cursor-pointer hover:underline">
                      {shipment.trackingId}
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2 text-sm">
                        <span className="text-foreground/90">{shipment.origin}</span>
                        <MapPin className="hidden md:block w-3 h-3 text-muted-foreground" />
                        <span className="hidden md:block text-muted-foreground">→</span>
                        <span className="text-foreground/90">{shipment.destination}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-2">
                        <Button 
                          size="icon" 
                          variant="ghost" 
                          className="h-8 w-8 text-muted-foreground hover:text-primary transition-all"
                          onClick={() => downloadInvoice(shipment.id, shipment.trackingId)}
                          title="Download Invoice"
                        >
                          <FileDown className="h-4 w-4" />
                        </Button>
                        <Badge variant="outline" className={`font-semibold ${getStatusColor(shipment.status)}`}>
                          {shipment.status?.replace("_", " ")}
                        </Badge>
                      </div>
                    </TableCell>
                    <TableCell>{shipment.driver ? shipment.driver.contact : "Unassigned"}</TableCell>
                    <TableCell className="text-muted-foreground">
                      {shipment.expectedDelivery ? new Date(shipment.expectedDelivery).toLocaleDateString() : "TBD"}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          )}
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

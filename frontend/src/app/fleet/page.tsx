"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, Filter, Plus, Truck, User, Loader2 } from "lucide-react";
import { motion } from "framer-motion";

export default function FleetPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const sessionToken = (session as { accessToken?: string })?.accessToken;
  
  const [fleet, setFleet] = useState<{
    id: string;
    type: string;
    status: string;
    driver: string;
    contact: string;
    location: string;
  }[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register");
      return;
    }
    
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (status === "authenticated" && sessionToken && API_URL) {
      fetch(`${API_URL}/drivers`, {
        headers: {
          Authorization: `Bearer ${sessionToken}`,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Unauthorized");
          return res.json();
        })
        .then((data) => {
          setFleet(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Failed to fetch fleet:", err);
          setLoading(false);
          if (err.message === "Unauthorized") router.push("/register");
        });
    }
  }, [status, session, sessionToken, router]);
  const getStatusColor = (status: string) => {
    switch (status) {
      case "ON_ROUTE": return "bg-blue-500/20 text-blue-400 border-blue-500/50";
      case "AVAILABLE": return "bg-green-500/20 text-green-400 border-green-500/50";
      case "MAINTENANCE": return "bg-red-500/20 text-red-400 border-red-500/50";
      default: return "bg-gray-500/20 text-gray-400 border-gray-500/50";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-6 pb-10">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-4xl font-bold tracking-tight">Fleet Management</h1>
            <p className="text-muted-foreground mt-1">Monitor vehicles, drivers, and availability.</p>
          </div>
          <Button className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl gap-2 shadow-[0_0_20px_rgba(37,99,235,0.4)] transition-all">
            <Plus className="w-4 h-4" /> Add Vehicle
          </Button>
        </div>

        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass rounded-xl p-4 flex flex-col md:flex-row gap-4 justify-between"
        >
          <div className="relative w-full max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search license plate, driver..." className="pl-10 bg-white/5 border-white/10" />
          </div>
          <Button variant="outline" className="gap-2 bg-white/5 border-white/10 hover:bg-white/10">
            <Filter className="w-4 h-4" /> Filters
          </Button>
        </motion.div>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="glass rounded-xl overflow-hidden border border-white/10"
        >
          <Table>
            <TableHeader className="bg-white/5">
              <TableRow className="border-b border-white/10">
                <TableHead className="font-semibold text-foreground/80">Vehicle</TableHead>
                <TableHead className="font-semibold text-foreground/80">Status</TableHead>
                <TableHead className="font-semibold text-foreground/80">Driver</TableHead>
                <TableHead className="font-semibold text-foreground/80">Contact</TableHead>
                <TableHead className="font-semibold text-foreground/80">Current Location</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {loading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center py-10">
                    <Loader2 className="w-6 h-6 animate-spin mx-auto text-primary" />
                  </TableCell>
                </TableRow>
              ) : fleet.map((vehicle) => (
                <TableRow key={vehicle.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <TableCell>
                    <div className="flex flex-col">
                      <span className="font-medium text-foreground">{vehicle.id}</span>
                      <span className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                        <Truck className="w-3 h-3" /> {vehicle.type}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={`font-semibold ${getStatusColor(vehicle.status)}`}>
                      {vehicle.status.replace("_", " ")}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                        <User className="w-3 h-3 text-primary" />
                      </div>
                      {vehicle.driver}
                    </div>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.contact}</TableCell>
                  <TableCell className="text-muted-foreground">{vehicle.location}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </motion.div>
      </div>
    </DashboardLayout>
  );
}

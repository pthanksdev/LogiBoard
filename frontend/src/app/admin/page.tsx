"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Users, Building, Activity, Globe, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [stats] = useState({
    totalCompanies: 12,
    totalUsers: 145,
    systemUptime: "99.98%",
    globalShipments: 15420,
  });

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/register");
      return;
    }
    const user = session?.user as { role?: string } | undefined;
    if (status === "authenticated" && user?.role !== "SUPER_ADMIN") {
      router.push("/dashboard");
    }
  }, [status, session, router]);

  if (status === "loading" || (session?.user as { role?: string } | undefined)?.role !== "SUPER_ADMIN") {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-background">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div>
          <h1 className="text-4xl font-extrabold tracking-tight flex items-center gap-3">
            <Shield className="h-10 w-10 text-primary" />
            Platform Admin Portal
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">Global oversight and system health monitoring.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Total Companies", value: stats.totalCompanies, icon: Building, color: "text-blue-500" },
            { title: "Active Users", value: stats.totalUsers, icon: Users, color: "text-purple-500" },
            { title: "Global Shipments", value: stats.globalShipments, icon: Globe, color: "text-green-500" },
            { title: "System Uptime", value: stats.systemUptime, icon: Activity, color: "text-orange-500" },
          ].map((stat, i) => (
            <motion.div
              key={stat.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
            >
              <Card className="glass overflow-hidden border-white/10 hover:border-primary/50 transition-all group">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                  <stat.icon className={`h-5 w-5 ${stat.color} group-hover:scale-125 transition-transform`} />
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold">{stat.value}</div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Zap className="h-5 w-5 text-yellow-500" />
                Live System Logs
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4 font-mono text-sm">
                {[
                  "[06:12:44] New company registered: BlueWave Logistics",
                  "[06:15:21] API Key generated for: FastShip Inc.",
                  "[06:20:05] Maintenance window scheduled for Sunday",
                  "[06:22:12] User 'admin@logiboard' accessed platform settings",
                ].map((log, i) => (
                  <div key={i} className="text-foreground/60 border-l-2 border-primary/30 pl-3">
                    {log}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="glass border-white/10">
            <CardHeader>
              <CardTitle>Company Health Matrix</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {["Main Logistics", "DHL Partner", "Local Carrier"].map(company => (
                        <div key={company} className="flex items-center justify-between p-3 rounded-xl bg-white/5 border border-white/5">
                            <span className="font-semibold">{company}</span>
                            <span className="text-xs px-2 py-1 rounded bg-green-500/20 text-green-400 border border-green-500/30">Stable</span>
                        </div>
                    ))}
                </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}

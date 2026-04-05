"use client";

import { useEffect, useState } from "react";
import { DashboardLayout } from "@/components/DashboardLayout";
import { Html5QrcodeScanner } from "html5-qrcode";
import { useRouter } from "next/navigation";
import { QrCode, Loader2, X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ScannerPage() {
  const router = useRouter();
  const [scanning] = useState(true);

  useEffect(() => {
    const scanner = new Html5QrcodeScanner(
      "reader",
      { fps: 10, qrbox: { width: 250, height: 250 } },
      /* verbose= */ false
    );

    scanner.render(
      (decodedText) => {
        // Assume the QR code contains the Tracking ID directly
        scanner.clear();
        router.push(`/track/${decodedText}`);
      },
      () => {
        // Ignore errors
      }
    );

    return () => {
      scanner.clear().catch(e => console.error("Scanner cleanup error", e));
    };
  }, [router]);

  return (
    <DashboardLayout>
      <div className="space-y-6 flex flex-col items-center justify-center min-h-[80vh]">
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-bold flex items-center justify-center gap-3">
            <QrCode className="w-10 h-10 text-primary" /> QR Scanner
          </h1>
          <p className="text-muted-foreground text-lg">Point your camera at a shipment QR code to track instantly.</p>
        </div>

        <div className="glass p-4 rounded-3xl border border-white/10 w-full max-w-md overflow-hidden bg-black/40 shadow-2xl relative">
          <div id="reader" className="w-full"></div>
          {scanning && (
            <div className="absolute inset-x-0 top-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none opacity-20">
               <Loader2 className="w-20 h-20 animate-spin text-primary" />
            </div>
          )}
        </div>

        <Button 
          variant="outline" 
          className="rounded-xl px-10 py-6 text-lg border-white/10 hover:bg-white/5"
          onClick={() => router.back()}
        >
          <X className="mr-2 h-5 w-5" /> Cancel Scanning
        </Button>
      </div>
    </DashboardLayout>
  );
}

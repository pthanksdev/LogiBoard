import { Sidebar } from "./Sidebar";
import { Header } from "./Header";

export function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full bg-background overflow-hidden font-sans text-foreground">
      <Sidebar />
      <div className="flex-1 flex flex-col h-full relative overflow-hidden">
        {/* Subtle Background Glow */}
        <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-primary/20 blur-[120px] rounded-full pointer-events-none opacity-50 z-0" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[40%] h-[40%] bg-accent/20 blur-[120px] rounded-full pointer-events-none opacity-50 z-0" />
        
        <Header />
        <main className="flex-1 overflow-y-auto p-8 relative z-10 scroll-smooth">
          {children}
        </main>
      </div>
    </div>
  );
}

import { usePathname } from "next/navigation";
import Link from "next/link";
import { LayoutDashboard, Truck, Package, Settings, Users, ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useSession } from "next-auth/react";

export function Sidebar() {
  const pathname = usePathname();
  const { data: session } = useSession();
  const user = session?.user as { role?: string } | undefined;
  const role = user?.role;

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: LayoutDashboard, roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "DISPATCHER"] },
    { name: "Admin Portal", href: "/admin", icon: ShieldCheck, roles: ["SUPER_ADMIN"] },
    { name: "Shipments", href: "/shipments", icon: Package, roles: ["SUPER_ADMIN", "COMPANY_ADMIN", "DISPATCHER"] },
    { name: "Fleet", href: "/fleet", icon: Truck, roles: ["SUPER_ADMIN", "COMPANY_ADMIN"] },
    { name: "Drivers", href: "/drivers", icon: Users, roles: ["SUPER_ADMIN", "COMPANY_ADMIN"] },
    { name: "Settings", href: "/settings", icon: Settings, roles: ["SUPER_ADMIN", "COMPANY_ADMIN"] },
  ];

  const filteredItems = navItems.filter(item => item.roles.includes(role));

  return (
    <div className="flex bg-card/40 backdrop-blur-3xl border-r border-white/5 w-64 h-full flex-col justify-between py-6 transition-all duration-300">
      <div className="px-6">
        <h2 className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent flex items-center gap-2 mb-8">
          <Truck className="h-6 w-6 text-primary" />
          LogiBoard
        </h2>
        <nav className="flex flex-col gap-2">
          {filteredItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ease-out group relative",
                  isActive
                    ? "bg-primary/10 text-primary font-semibold shadow-[0_0_15px_rgba(37,99,235,0.1)]"
                    : "text-muted-foreground hover:bg-white/5 hover:text-foreground"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-primary rounded-r-md shadow-[0_0_10px_rgba(37,99,235,0.8)]" />
                )}
                <item.icon
                  className={cn(
                    "w-5 h-5 transition-transform duration-300 group-hover:scale-110",
                    isActive ? "text-primary" : "text-muted-foreground"
                  )}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="px-6">
        {role === 'COMPANY_ADMIN' && (
          <div className="p-4 rounded-2xl bg-white/5 border border-white/10 flex flex-col items-start gap-2">
            <p className="text-sm text-foreground/80 font-semibold">Pro Plan</p>
            <p className="text-xs text-muted-foreground">Unlimited shipments & analytics.</p>
            <button className="mt-2 text-xs font-semibold text-primary hover:text-accent transition-colors">
              Upgrade Now
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

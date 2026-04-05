import { Bell, Search, User, LogOut, Settings } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useSession, signOut } from "next-auth/react";
import { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import { ProfileSettings } from "./ProfileSettings";

interface UserProfile {
  firstName: string;
  lastName: string;
  avatarUrl: string | null;
}

interface SessionWithToken {
  accessToken?: string;
}

export function Header() {
  const { data: session } = useSession();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  const fetchProfile = useCallback(() => {
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    const token = (session as SessionWithToken)?.accessToken;
    if (token && API_URL) {
      fetch(`${API_URL}/auth/profile`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => res.json())
        .then((data) => setProfile(data))
        .catch((err) => console.error("Failed to fetch profile:", err));
    }
  }, [session]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <header className="h-20 w-full flex items-center justify-between px-8 bg-background/50 backdrop-blur-xl border-b border-white/5 sticky top-0 z-40">
      <div className="flex-1 max-w-md relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Search shipments, drivers, locations..."
          className="w-full pl-10 bg-white/5 border-white/10 rounded-full focus-visible:ring-primary h-10 transition-all duration-300 focus:bg-white/10"
        />
      </div>

      <div className="flex items-center gap-6">
        <button className="relative text-muted-foreground hover:text-foreground transition-colors duration-300">
          <Bell className="w-5 h-5" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full animate-pulse blur-[1px]" />
          <span className="absolute top-0 right-0 w-2 h-2 bg-accent rounded-full" />
        </button>

        <div className="flex items-center gap-3">
          {profile && (
            <div className="text-right hidden md:block">
              <p className="text-sm font-bold text-white">{profile.firstName} {profile.lastName}</p>
              <div className="flex items-center gap-2 justify-end">
                <button 
                  onClick={() => setIsSettingsOpen(true)}
                  className="text-xs text-muted-foreground hover:text-primary flex items-center gap-1 transition-colors"
                >
                  <Settings className="w-3 h-3" /> Settings
                </button>
                <span className="text-white/10 text-xs">|</span>
                <button 
                  onClick={() => signOut()}
                  className="text-xs text-muted-foreground hover:text-red-400 flex items-center gap-1 transition-colors"
                >
                  <LogOut className="w-3 h-3" /> Sign Out
                </button>
              </div>
            </div>
          )}
          <div 
            onClick={() => setIsSettingsOpen(true)}
            className="h-10 w-10 rounded-full bg-gradient-to-tr from-primary to-accent p-[2px] cursor-pointer hover:scale-105 transition-transform duration-300 relative group"
          >
            <div className="w-full h-full rounded-full bg-card overflow-hidden flex items-center justify-center">
              {profile?.avatarUrl ? (
                <Image 
                  src={profile.avatarUrl} 
                  alt="Profile" 
                  width={40} 
                  height={40} 
                  className="object-cover w-full h-full"
                />
              ) : (
                <User className="w-5 h-5 text-muted-foreground" />
              )}
            </div>
          </div>
        </div>
      </div>

      <ProfileSettings 
        isOpen={isSettingsOpen} 
        onClose={() => setIsSettingsOpen(false)} 
        onUpdate={fetchProfile}
      />
    </header>
  );
}

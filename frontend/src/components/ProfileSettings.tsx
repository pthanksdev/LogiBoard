"use client";

import { useState } from "react";
import { useSession } from "next-auth/react";
import { Camera, X, Loader2, CheckCircle2 } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "./ui/button";
import Image from "next/image";

interface ProfileSettingsProps {
  isOpen: boolean;
  onClose: () => void;
  onUpdate: () => void;
}

interface SessionWithToken {
  accessToken?: string;
}

export function ProfileSettings({ isOpen, onClose, onUpdate }: ProfileSettingsProps) {
  const { data: session } = useSession();
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0] || null;
    setFile(selected);
    if (selected) {
      setPreviewUrl(URL.createObjectURL(selected));
    } else {
      setPreviewUrl(null);
    }
  };

  const handleUpload = async () => {
    const token = (session as SessionWithToken)?.accessToken;
    if (!file || !token) return;

    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!API_URL) return;

    setUploading(true);
    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_URL}/auth/upload-avatar`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (res.ok) {
        setSuccess(true);
        onUpdate();
        setTimeout(() => {
          onClose();
          setSuccess(false);
          setFile(null);
          setPreviewUrl(null);
        }, 2000);
      } else {
        alert("Upload failed");
      }
    } catch (err) {
      console.error(err);
      alert("Error uploading file");
    } finally {
      setUploading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-background/80 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative w-full max-w-md p-8 bg-card border border-white/10 rounded-[32px] shadow-2xl overflow-hidden"
          >
            <button
              onClick={onClose}
              className="absolute top-6 right-6 p-2 rounded-full hover:bg-white/5 text-muted-foreground transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="text-center mb-8">
              <h2 className="text-3xl font-black text-white mb-2">Profile Settings</h2>
              <p className="text-muted-foreground">Update your personal information and avatar.</p>
            </div>

            <div className="flex flex-col items-center gap-6">
              <div className="relative group">
                <div className="w-32 h-32 rounded-full bg-slate-800 border-2 border-white/10 flex items-center justify-center overflow-hidden">
                  {previewUrl ? (
                    <Image
                      src={previewUrl}
                      alt="Preview"
                      width={128}
                      height={128}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Camera className="w-8 h-8 text-white/20" />
                  )}
                </div>
                <label className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer rounded-full">
                  <input
                    type="file"
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <span className="text-white text-xs font-bold uppercase tracking-widest">Change Photo</span>
                </label>
              </div>

              {file && !success && (
                <Button
                  onClick={handleUpload}
                  disabled={uploading}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 text-white font-bold transition-all shadow-xl shadow-primary/20"
                >
                  {uploading ? (
                    <Loader2 className="w-5 h-5 animate-spin" />
                  ) : (
                    "Save Changes"
                  )}
                </Button>
              )}

              {success && (
                <div className="flex flex-col items-center gap-2 text-green-400">
                  <CheckCircle2 className="w-8 h-8 animate-bounce" />
                  <span className="font-bold">Profile Updated!</span>
                </div>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

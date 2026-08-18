"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ShieldCheck, User, CheckCircle2, Shield } from "lucide-react";

export default function Header() {
  const [userName, setUserName] = useState<string | null>(null);
  const [completedCount, setCompletedCount] = useState<number>(0);

  useEffect(() => {
    const checkStatus = () => {
      const name = localStorage.getItem("cbsjc_security_worker_name") || localStorage.getItem("rit_worker_name");
      const progress = localStorage.getItem("cbsjc_security_progress") || localStorage.getItem("rit_progress");

      if (name) {
        setUserName(name);
      } else {
        setUserName(null);
      }

      if (progress) {
        try {
          const progressObj = JSON.parse(progress);
          const completed = Object.values(progressObj).filter(Boolean).length;
          setCompletedCount(completed);
        } catch {
          setCompletedCount(0);
        }
      } else {
        setCompletedCount(0);
      }
    };

    checkStatus();
    window.addEventListener("storage", checkStatus);
    window.addEventListener("focus", checkStatus);
    const interval = setInterval(checkStatus, 2000);

    return () => {
      window.removeEventListener("storage", checkStatus);
      window.removeEventListener("focus", checkStatus);
      clearInterval(interval);
    };
  }, []);

  return (
    <header className="sticky top-0 z-40 w-full border-b border-border-soft bg-white/85 dark:bg-slate-900/90 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        <Link href="/" className="flex items-center gap-3 transition-opacity hover:opacity-95">
          <div className="relative h-12 w-12 flex-shrink-0">
            <Image
              src="/logo-cbsjc.png"
              alt="Escudo Colegio Bilingüe San José Campestre"
              fill
              className="object-contain"
              priority
            />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-black tracking-tight text-primary leading-tight uppercase md:text-base">
              CBSJC S.A.S.
            </span>
            <span className="text-xs font-bold tracking-wider text-accent leading-none uppercase md:text-sm">
              Protocolos de Seguridad 2026
            </span>
          </div>
        </Link>

        <div className="flex items-center gap-4">
          {userName ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="hidden items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-bold text-primary sm:flex border border-primary/20 hover:bg-primary/20 transition-colors"
              >
                <Shield className="h-3.5 w-3.5 text-accent" />
                <span>Módulos: {completedCount} / 6</span>
              </Link>
              
              {completedCount === 6 && (
                <div className="flex items-center gap-1 text-emerald-600" title="Acreditación de Seguridad Completada">
                  <CheckCircle2 className="h-5 w-5 fill-emerald-100" />
                </div>
              )}

              <div className="flex items-center gap-2 rounded-full border border-primary/20 bg-primary/5 px-3.5 py-1.5 text-xs font-semibold text-primary md:text-sm">
                <User className="h-4 w-4" />
                <span className="max-w-[130px] truncate">{userName}</span>
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-1.5 text-xs font-bold text-slate-500 md:text-sm">
              <ShieldCheck className="w-4 h-4 text-accent" />
              <span>SJB-RGD003 V2</span>
            </div>
          )}
        </div>

      </div>
    </header>
  );
}

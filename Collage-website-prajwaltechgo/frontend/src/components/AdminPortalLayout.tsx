import React, { useEffect, useState } from 'react';
import {
  LayoutDashboard,
  FileCheck2,
  Users,
  LogOut,
  ExternalLink,
  Shield,
  Activity,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';
import { api } from '../services/api.js';
import { HealthStatus } from '../types/index.js';

interface AdminPortalLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const AdminPortalLayout: React.FC<AdminPortalLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const { user, logout } = useAuth();
  const [health, setHealth] = useState<HealthStatus | null>(null);

  useEffect(() => {
    api.getHealth().then(setHealth).catch(() => null);
  }, []);

  const navItems = [
    {
      name: 'Overview & Statistics',
      path: '/admin/dashboard',
      icon: LayoutDashboard,
    },
    {
      name: 'Application Management',
      path: '/admin/applications',
      icon: FileCheck2,
    },
    {
      name: 'Student Registry',
      path: '/admin/students',
      icon: Users,
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Admin Header */}
      <header className="bg-slate-950 text-white border-b border-slate-800 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => onNavigate('/')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rotate-45 shrink-0 group-hover:bg-amber-400 transition-colors">
                  <span className="text-slate-950 font-bold text-sm -rotate-45">P</span>
                </div>
                <div className="hidden sm:block">
                  <div className="font-extrabold text-xs text-white uppercase tracking-tight">
                    Prajwal Tech Go <span className="text-amber-500">College</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Bangalore, Karnataka
                  </div>
                </div>
              </div>
              <span className="text-slate-700 mx-1">|</span>
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-amber-400 border border-slate-800">
                <Shield className="w-3 h-3 text-amber-500" />
                <span>Admin Console</span>
              </span>
            </div>

            {/* Admin Profile & Actions */}
            <div className="flex items-center gap-4">
              {/* System Health */}
              <div className="hidden lg:flex items-center gap-2 px-3 py-1 bg-slate-900 text-xs border border-slate-800">
                <Activity className="w-3.5 h-3.5 text-amber-500 animate-pulse" />
                <span className="text-slate-400 uppercase text-[10px] tracking-wider">Database:</span>
                <span className={`font-bold uppercase text-[10px] tracking-wider ${health?.database === 'CONNECTED' ? 'text-emerald-400' : 'text-amber-400'}`}>
                  {health?.database === 'CONNECTED' ? 'MySQL Connected' : 'Checking...'}
                </span>
              </div>

              <button
                onClick={() => onNavigate('/')}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-300 hover:text-white px-3 py-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>College Website</span>
              </button>

              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-800">
                <div className="w-8 h-8 bg-slate-800 border border-slate-700 text-amber-400 flex items-center justify-center font-bold text-xs">
                  A
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-100 leading-tight uppercase">
                    {user?.name || 'Administrator'}
                  </div>
                  <div className="text-[10px] text-slate-400 leading-none">{user?.email}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="p-2 text-slate-400 hover:text-rose-400 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Admin Navigation Strip */}
      <div className="bg-slate-900 border-b border-slate-800 text-white shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex space-x-2 sm:space-x-4 py-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-950 shadow-inner font-extrabold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-950' : 'text-amber-500'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Admin Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Admin Footer */}
      <footer className="bg-white border-t border-slate-200 py-3 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Prajwal Tech Go College Administration Engine • Bangalore, Karnataka, India</span>
          <span>Security Level: Authorized Personnel Only (Role: Admin)</span>
        </div>
      </footer>
    </div>
  );
};

export default AdminPortalLayout;

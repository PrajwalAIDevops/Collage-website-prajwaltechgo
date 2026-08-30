import React from 'react';
import {
  LayoutDashboard,
  FileEdit,
  User,
  LogOut,
  ExternalLink,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface StudentPortalLayoutProps {
  currentPath: string;
  onNavigate: (path: string) => void;
  children: React.ReactNode;
}

export const StudentPortalLayout: React.FC<StudentPortalLayoutProps> = ({
  currentPath,
  onNavigate,
  children,
}) => {
  const { user, logout } = useAuth();

  const navItems = [
    {
      name: 'Dashboard & Status',
      path: '/student/dashboard',
      icon: LayoutDashboard,
      desc: 'Track admission status',
    },
    {
      name: 'Admission Form',
      path: '/student/application',
      icon: FileEdit,
      desc: 'Submit or view application',
    },
    {
      name: 'My Profile',
      path: '/student/profile',
      icon: User,
      desc: 'Personal & academic records',
    },
  ];

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col">
      {/* Top Header */}
      <header className="bg-white border-b border-slate-100 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex items-center justify-between h-16">
            {/* College Logo and Portal Badge */}
            <div className="flex items-center gap-3">
              <div
                onClick={() => onNavigate('/')}
                className="flex items-center gap-3 cursor-pointer group"
              >
                <div className="w-8 h-8 bg-slate-900 flex items-center justify-center rotate-45 shrink-0 group-hover:bg-amber-500 transition-colors">
                  <span className="text-white font-bold text-sm -rotate-45">P</span>
                </div>
                <div className="hidden sm:block">
                  <div className="font-extrabold text-xs text-slate-900 uppercase tracking-tight">
                    Prajwal Tech Go <span className="text-amber-500">College</span>
                  </div>
                  <div className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">
                    Bangalore, Karnataka
                  </div>
                </div>
              </div>
              <span className="text-slate-200 mx-1">|</span>
              <span className="inline-flex items-center px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wider bg-slate-900 text-amber-400 border border-slate-800">
                Student Portal
              </span>
            </div>

            {/* User Profile & Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => onNavigate('/')}
                className="hidden md:inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-slate-600 hover:text-slate-900 px-3 py-1.5 transition-colors cursor-pointer"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span>College Website</span>
              </button>

              <div className="flex items-center gap-2.5 pl-3 border-l border-slate-200">
                <div className="w-8 h-8 bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-center font-bold text-xs">
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-bold text-slate-900 leading-tight uppercase">
                    {user?.name || 'Student'}
                  </div>
                  <div className="text-[10px] text-slate-500 leading-none">{user?.email}</div>
                </div>
              </div>

              <button
                onClick={() => {
                  logout();
                  onNavigate('/');
                }}
                className="p-2 text-slate-400 hover:text-rose-600 transition-colors cursor-pointer"
                title="Log Out"
              >
                <LogOut className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Sub-header Navigation Bar */}
      <div className="bg-slate-900 text-white border-b border-slate-800 shadow-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-8">
          <div className="flex space-x-1 sm:space-x-4 py-2 overflow-x-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentPath === item.path;
              return (
                <button
                  key={item.path}
                  onClick={() => onNavigate(item.path)}
                  className={`inline-flex items-center gap-2 px-4 py-2 text-xs font-bold uppercase tracking-wider transition-all whitespace-nowrap cursor-pointer ${
                    isActive
                      ? 'bg-amber-500 text-slate-900 shadow-inner font-extrabold'
                      : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-slate-900' : 'text-amber-500'}`} />
                  <span>{item.name}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Main Body */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>

      {/* Portal Footer */}
      <footer className="bg-white border-t border-slate-200 py-4 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <span>Prajwal Tech Go College Student Admission Portal • Bangalore, Karnataka</span>
          <span>Admission Helpline: +91 80 2845 6789 • Mon-Sat 9AM-5PM</span>
        </div>
      </footer>
    </div>
  );
};

export default StudentPortalLayout;

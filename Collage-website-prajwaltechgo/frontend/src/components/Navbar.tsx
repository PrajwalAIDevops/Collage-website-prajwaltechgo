import React, { useState } from 'react';
import {
  Menu,
  X,
  Phone,
  MapPin,
  ShieldCheck,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface NavbarProps {
  currentPath: string;
  onNavigate: (path: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ currentPath, onNavigate }) => {
  const { user, logout, isAdmin, isStudent } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Courses', path: '/courses' },
    { name: 'Admissions', path: '/admissions' },
    { name: 'Campus Life', path: '/campus' },
    { name: 'Faculty', path: '/faculty' },
    { name: 'Contact', path: '/contact' },
  ];

  const handleNav = (path: string) => {
    onNavigate(path);
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-slate-100 shadow-xs">
      {/* Top Banner */}
      <div className="bg-slate-900 text-slate-300 text-xs py-1.5 px-4 sm:px-12 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-2">
          <div className="flex items-center gap-4 flex-wrap">
            <span className="flex items-center gap-1.5 text-slate-300">
              <MapPin className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px] font-medium tracking-wider uppercase">Bangalore, Karnataka, India</span>
            </span>
            <span className="hidden md:flex items-center gap-1.5 text-slate-400">
              <Phone className="w-3.5 h-3.5 text-amber-500" />
              <span className="text-[11px]">+91 80 2845 6789</span>
            </span>
          </div>

          <div className="flex items-center gap-3 ml-auto text-[11px]">
            <span className="inline-flex items-center gap-1 text-emerald-400 font-semibold tracking-wider uppercase">
              <ShieldCheck className="w-3.5 h-3.5" />
              <span>NAAC A+ Accredited</span>
            </span>
            <span className="text-slate-700">|</span>
            <span className="text-amber-400 font-bold uppercase tracking-widest text-[10px]">
              Admission 2026-27 Open
            </span>
          </div>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-12">
        <div className="flex items-center justify-between h-20">
          {/* Geometric Brand Logo */}
          <div
            onClick={() => handleNav('/')}
            className="flex items-center gap-3 cursor-pointer group"
          >
            <div className="w-10 h-10 bg-slate-900 flex items-center justify-center rotate-45 shrink-0 group-hover:bg-amber-500 transition-colors">
              <span className="text-white font-bold text-lg -rotate-45">P</span>
            </div>
            <div>
              <div className="text-base sm:text-lg font-extrabold tracking-tight text-slate-900 uppercase">
                Prajwal Tech Go <span className="text-amber-500">College</span>
              </div>
              <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                Excellence in Technology
              </div>
            </div>
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center gap-8 text-xs font-semibold uppercase tracking-widest text-slate-500">
            {navLinks.map((link) => {
              const isActive = currentPath === link.path;
              return (
                <button
                  key={link.path}
                  onClick={() => handleNav(link.path)}
                  className={`transition-colors py-1 cursor-pointer ${
                    isActive
                      ? 'text-slate-900 border-b-2 border-amber-500 font-bold'
                      : 'hover:text-slate-900'
                  }`}
                >
                  {link.name}
                </button>
              );
            })}
          </nav>

          {/* Auth & CTA Controls */}
          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <div className="flex items-center gap-3">
                {isStudent && (
                  <button
                    onClick={() => handleNav('/student/dashboard')}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-amber-500" />
                    <span>Student Portal</span>
                  </button>
                )}

                {isAdmin && (
                  <button
                    onClick={() => handleNav('/admin/dashboard')}
                    className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-slate-900 text-white hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                  >
                    <LayoutDashboard className="w-3.5 h-3.5 text-emerald-400" />
                    <span>Admin Portal</span>
                  </button>
                )}

                <button
                  onClick={() => {
                    logout();
                    handleNav('/');
                  }}
                  title="Logout"
                  className="p-2 text-slate-500 hover:text-rose-600 transition-colors cursor-pointer"
                >
                  <LogOut className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <button
                  onClick={() => handleNav('/login')}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider border border-slate-900 text-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
                >
                  Student Login
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="px-5 py-2 text-xs font-bold uppercase tracking-wider bg-amber-500 text-white hover:bg-amber-600 transition-all cursor-pointer"
                >
                  Register Now
                </button>
              </div>
            )}
          </div>

          {/* Mobile Menu Button */}
          <div className="flex lg:hidden items-center gap-2">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 text-slate-900 hover:bg-slate-100 cursor-pointer"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden border-t border-slate-100 bg-white px-6 pt-4 pb-6 space-y-3 shadow-lg">
          <div className="flex flex-col gap-2">
            {navLinks.map((link) => (
              <button
                key={link.path}
                onClick={() => handleNav(link.path)}
                className={`text-left py-2 text-xs font-bold uppercase tracking-widest cursor-pointer ${
                  currentPath === link.path
                    ? 'text-slate-900 border-l-2 border-amber-500 pl-2'
                    : 'text-slate-500 hover:text-slate-900'
                }`}
              >
                {link.name}
              </button>
            ))}
          </div>

          <div className="pt-3 border-t border-slate-100 flex flex-col gap-2">
            {user ? (
              <>
                <div className="text-[11px] text-slate-500 font-bold uppercase tracking-wider">
                  Signed in as <strong className="text-slate-900">{user.name}</strong>
                </div>
                {isStudent && (
                  <button
                    onClick={() => handleNav('/student/dashboard')}
                    className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 cursor-pointer"
                  >
                    Go to Student Portal
                  </button>
                )}
                {isAdmin && (
                  <button
                    onClick={() => handleNav('/admin/dashboard')}
                    className="w-full py-2.5 text-xs font-bold uppercase tracking-wider text-white bg-slate-900 cursor-pointer"
                  >
                    Go to Admin Console
                  </button>
                )}
                <button
                  onClick={() => {
                    logout();
                    handleNav('/');
                  }}
                  className="w-full py-2 text-xs font-bold uppercase tracking-wider text-rose-600 border border-rose-300 hover:bg-rose-50 cursor-pointer"
                >
                  Log Out
                </button>
              </>
            ) : (
              <div className="flex gap-2">
                <button
                  onClick={() => handleNav('/login')}
                  className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-slate-900 border border-slate-900 cursor-pointer"
                >
                  Login
                </button>
                <button
                  onClick={() => handleNav('/register')}
                  className="flex-1 py-2.5 text-center text-xs font-bold uppercase tracking-wider text-white bg-amber-500 hover:bg-amber-600 cursor-pointer"
                >
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;

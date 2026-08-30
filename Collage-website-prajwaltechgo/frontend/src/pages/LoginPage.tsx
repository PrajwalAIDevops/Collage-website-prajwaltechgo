import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  Mail,
  ArrowRight,
  AlertCircle,
  Loader2,
  Sparkles,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface LoginPageProps {
  onNavigate: (path: string) => void;
}

export const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
  const { login, loading } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    try {
      const user = await login(email, password);
      if (user.role === 'admin') {
        onNavigate('/admin/dashboard');
      } else {
        onNavigate('/student/dashboard');
      }
    } catch (err: any) {
      setError(err.message || 'Login failed. Please check your credentials.');
    }
  };

  const fillAdminCreds = () => {
    setEmail('admin@prajwaltechgo.edu');
    setPassword('admin123');
    setError(null);
  };

  const fillStudentCreds = () => {
    setEmail('demo@gmail.com');
    setPassword('password123');
    setError(null);
  };

  const fillRahulCreds = () => {
    setEmail('rahul.sharma@example.com');
    setPassword('password123');
    setError(null);
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center py-16 px-6 sm:px-12 bg-white">
      <div className="max-w-md w-full space-y-8 bg-white p-8 sm:p-10 border border-slate-200 border-l-4 border-l-amber-500 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-slate-900 text-amber-500 mx-auto flex items-center justify-center rotate-45">
            <GraduationCap className="w-6 h-6 -rotate-45" />
          </div>
          <div className="space-y-1 pt-2">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">
              Sign In to Portal
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-6 bg-amber-500" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Prajwal Tech Go College
              </p>
              <div className="h-px w-6 bg-amber-500" />
            </div>
          </div>
        </div>

        {/* Demo Credentials Helper Pill */}
        <div className="p-4 bg-slate-50 border border-slate-200 space-y-2 text-xs">
          <div className="font-bold uppercase tracking-wider text-slate-900 text-[11px] flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Quick-Login Demo Credentials:</span>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={fillAdminCreds}
              className="flex-1 py-2 px-2 bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-900 font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer"
            >
              Admin Demo
            </button>
            <button
              type="button"
              onClick={fillStudentCreds}
              className="flex-1 py-2 px-2 bg-white hover:bg-slate-900 hover:text-white border border-slate-300 text-slate-900 font-bold uppercase text-[10px] tracking-wider transition-all cursor-pointer"
            >
              Student Demo
            </button>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 flex items-start gap-2.5 text-xs text-rose-900 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1.5">
              Email Address
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Mail className="w-4 h-4" />
              </div>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="student@example.com or admin@prajwaltechgo.edu"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1.5">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                <Lock className="w-4 h-4" />
              </div>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900 placeholder:text-slate-400"
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-4 font-bold uppercase tracking-widest text-xs text-white bg-slate-900 hover:bg-slate-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-4 cursor-pointer"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Authenticating...</span>
              </>
            ) : (
              <>
                <span>Sign In to Dashboard</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 text-xs text-slate-500 border-t border-slate-100 uppercase tracking-wider">
          <span>New student? </span>
          <button
            onClick={() => onNavigate('/register')}
            className="font-bold text-slate-900 hover:text-amber-600 underline underline-offset-4 ml-1 cursor-pointer"
          >
            Register & Apply
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;

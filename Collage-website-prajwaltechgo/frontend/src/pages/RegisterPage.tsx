import React, { useState } from 'react';
import {
  GraduationCap,
  Lock,
  Mail,
  User,
  Phone,
  Calendar,
  MapPin,
  ArrowRight,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface RegisterPageProps {
  onNavigate: (path: string) => void;
}

export const RegisterPage: React.FC<RegisterPageProps> = ({ onNavigate }) => {
  const { register, loading } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phone: '',
    date_of_birth: '',
    gender: 'Male',
    address: '',
  });
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (formData.password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phone,
        date_of_birth: formData.date_of_birth || undefined,
        gender: formData.gender,
        address: formData.address || undefined,
      });
      // Direct newly registered student immediately to application form
      onNavigate('/student/application');
    } catch (err: any) {
      setError(err.message || 'Registration failed. Please check your details.');
    }
  };

  return (
    <div className="min-h-[85vh] flex items-center justify-center py-16 px-6 sm:px-12 bg-white">
      <div className="max-w-xl w-full space-y-8 bg-white p-8 sm:p-10 border border-slate-200 border-l-4 border-l-amber-500 shadow-xl">
        {/* Header */}
        <div className="text-center space-y-3">
          <div className="w-12 h-12 bg-slate-900 text-amber-500 mx-auto flex items-center justify-center rotate-45">
            <GraduationCap className="w-6 h-6 -rotate-45" />
          </div>
          <div className="space-y-1 pt-2">
            <h2 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">
              Student Registration Portal
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-6 bg-amber-500" />
              <p className="text-[11px] font-bold uppercase tracking-widest text-slate-400">
                Prajwal Tech Go College • Session 2026-27
              </p>
              <div className="h-px w-6 bg-amber-500" />
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3.5 bg-rose-50 border-l-4 border-rose-500 flex items-start gap-2.5 text-xs text-rose-900 font-medium">
            <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Full Name *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <User className="w-4 h-4" />
                </div>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="e.g. Ramesh Gowda"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Email Address *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Mail className="w-4 h-4" />
                </div>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="student@example.com"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Password (Min 6 chars) *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Lock className="w-4 h-4" />
                </div>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Mobile Number *
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Phone className="w-4 h-4" />
                </div>
                <input
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="9876543210"
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Date of Birth
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
                  <Calendar className="w-4 h-4" />
                </div>
                <input
                  type="date"
                  value={formData.date_of_birth}
                  onChange={(e) => setFormData({ ...formData, date_of_birth: e.target.value })}
                  className="w-full pl-10 pr-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Gender
              </label>
              <select
                value={formData.gender}
                onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
              >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
              Residential Address
            </label>
            <div className="relative">
              <div className="absolute top-3 left-3.5 pointer-events-none text-slate-400">
                <MapPin className="w-4 h-4" />
              </div>
              <textarea
                rows={2}
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="House / Street, Area, City, State, Pincode"
                className="w-full pl-10 pr-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:border-slate-900 focus:ring-1 focus:ring-slate-900 font-medium text-slate-900"
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
                <span>Creating Student Profile...</span>
              </>
            ) : (
              <>
                <span>Complete Registration & Apply</span>
                <ArrowRight className="w-4 h-4 text-amber-500" />
              </>
            )}
          </button>
        </form>

        <div className="text-center pt-4 text-xs text-slate-500 border-t border-slate-100 uppercase tracking-wider">
          <span>Already registered? </span>
          <button
            onClick={() => onNavigate('/login')}
            className="font-bold text-slate-900 hover:text-amber-600 underline underline-offset-4 ml-1 cursor-pointer"
          >
            Sign In to Account
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;

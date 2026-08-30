import React, { useState, useEffect } from 'react';
import {
  User,
  Save,
  CheckCircle2,
  AlertCircle,
  Loader2,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { api } from '../../services/api.js';
import { Student } from '../../types/index.js';

interface StudentProfilePageProps {
  onNavigate: (path: string) => void;
}

export const StudentProfilePage: React.FC<StudentProfilePageProps> = () => {
  const { user } = useAuth();
  const [profile, setProfile] = useState<Student | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Form editable states
  const [phone, setPhone] = useState('');
  const [dateOfBirth, setDateOfBirth] = useState('');
  const [gender, setGender] = useState('Male');
  const [address, setAddress] = useState('');

  useEffect(() => {
    if (!user) return;
    api.getStudentById(user.id)
      .then((res) => {
        if (res.data) {
          setProfile(res.data);
          setPhone(res.data.phone || '');
          setDateOfBirth(res.data.date_of_birth ? res.data.date_of_birth.substring(0, 10) : '');
          setGender(res.data.gender || 'Male');
          setAddress(res.data.address || '');
        }
      })
      .catch((err) => console.error('Failed to load student profile:', err))
      .finally(() => setLoading(false));
  }, [user]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    setSaving(true);
    setFeedback(null);

    try {
      const res = await api.updateStudentProfile(user.id, {
        phone,
        date_of_birth: dateOfBirth || undefined,
        gender,
        address: address || undefined,
      });

      if (res.data) {
        setProfile(res.data);
        setFeedback({ type: 'success', message: 'Profile updated successfully!' });
      }
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to update profile' });
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="bg-white p-12 border border-slate-200 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading profile records...</span>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs flex items-center gap-4">
        <div className="w-16 h-16 bg-slate-900 text-amber-400 font-bold text-2xl flex items-center justify-center rotate-45 shrink-0">
          <span className="-rotate-45">{profile?.name ? profile.name.charAt(0).toUpperCase() : 'S'}</span>
        </div>
        <div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">
            {profile?.name}
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Student ID: <strong>PTGC-STU-{profile?.id}</strong> • Enrolled at Prajwal Tech Go College
          </p>
        </div>
      </div>

      {feedback && (
        <div
          className={`p-4 text-xs font-bold uppercase tracking-wider flex items-center gap-2 ${
            feedback.type === 'success'
              ? 'bg-emerald-50 text-emerald-800 border-l-4 border-l-emerald-600'
              : 'bg-rose-50 text-rose-800 border-l-4 border-l-rose-600'
          }`}
        >
          {feedback.type === 'success' ? (
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          ) : (
            <AlertCircle className="w-4 h-4 text-rose-600" />
          )}
          <span>{feedback.message}</span>
        </div>
      )}

      {/* Edit Form */}
      <form onSubmit={handleUpdate} className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-slate-900 shadow-xs space-y-6 text-xs sm:text-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-bold text-base uppercase tracking-tight text-slate-900 flex items-center gap-2">
            <User className="w-5 h-5 text-amber-600" />
            <span>Personal Details & Contact</span>
          </h3>
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prajwal Tech Go College Registry</span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Registered Full Name</label>
            <input
              type="text"
              disabled
              value={profile?.name || ''}
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 font-medium cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-400 mt-1 block uppercase tracking-wider">Official name as per 10th marks card</span>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Primary Email Address</label>
            <input
              type="email"
              disabled
              value={profile?.email || ''}
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 font-medium cursor-not-allowed"
            />
            <span className="text-[10px] text-slate-400 mt-1 block uppercase tracking-wider">Email used for official admission notifications</span>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Mobile Phone Number *</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="9876543210"
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
            />
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Date of Birth</label>
            <input
              type="date"
              value={dateOfBirth}
              onChange={(e) => setDateOfBirth(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Gender</label>
            <select
              value={gender}
              onChange={(e) => setGender(e.target.value)}
              className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Enrolled Date</label>
            <input
              type="text"
              disabled
              value={profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : 'N/A'}
              className="w-full px-3.5 py-2.5 bg-slate-100 border border-slate-200 text-slate-500 font-medium cursor-not-allowed"
            />
          </div>
        </div>

        <div>
          <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">Permanent Residential Address</label>
          <textarea
            rows={3}
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder="Flat/House, Street, Locality, Bangalore, Karnataka..."
            className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
          />
        </div>

        <div className="flex justify-end pt-4 border-t border-slate-100">
          <button
            type="submit"
            disabled={saving}
            className="px-6 py-2.5 font-bold uppercase tracking-widest text-xs text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
          >
            {saving ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                <span>Saving Changes...</span>
              </>
            ) : (
              <>
                <Save className="w-4 h-4 text-amber-400" />
                <span>Save Profile Changes</span>
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

export default StudentProfilePage;

import React, { useState, useEffect } from 'react';
import {
  Users,
  Search,
  Mail,
  Phone,
  Calendar,
  MapPin,
  Loader2,
  RefreshCw,
  FileCheck2,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { Student } from '../../types/index.js';

interface AdminStudentsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminStudentsPage: React.FC<AdminStudentsPageProps> = ({ onNavigate }) => {
  const [students, setStudents] = useState<Student[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const fetchStudents = async () => {
    try {
      setLoading(true);
      const res = await api.getStudents();
      if (res.data) setStudents(res.data);
    } catch (err) {
      console.error('Failed to load students:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStudents();
  }, []);

  const filteredStudents = students.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (s.phone && s.phone.includes(searchQuery))
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <Users className="w-3.5 h-3.5 text-amber-600" />
            <span>Institutional Registry</span>
          </div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">
            Registered Student Directory
          </h1>
          <p className="text-xs text-slate-500">
            Master database of all registered applicant profiles in Prajwal Tech Go College.
          </p>
        </div>

        <button
          onClick={fetchStudents}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
          title="Refresh Directory"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Search Bar */}
      <div className="bg-white p-4 sm:p-5 border border-slate-200 border-l-4 border-l-slate-900 shadow-xs flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="w-full sm:max-w-md relative">
          <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
            <Search className="w-4 h-4" />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search students by name, email, phone..."
            className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900"
          />
        </div>

        <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
          Showing <strong>{filteredStudents.length}</strong> of {students.length} registered students
        </span>
      </div>

      {/* Grid of Student Cards */}
      {loading ? (
        <div className="bg-white p-16 border border-slate-200 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fetching student records...</span>
        </div>
      ) : filteredStudents.length === 0 ? (
        <div className="bg-white p-12 border border-slate-200 text-center text-slate-500 text-xs font-bold uppercase tracking-wider">
          No students found matching your search.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudents.map((s) => (
            <div
              key={s.id}
              className="bg-white border border-slate-200 border-l-4 border-l-slate-900 p-6 space-y-4 shadow-xs hover:border-l-amber-500 hover:shadow-md transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center rotate-45 shrink-0">
                    <span className="-rotate-45">{s.name.charAt(0).toUpperCase()}</span>
                  </div>
                  <span className="font-mono text-[11px] font-bold px-2 py-0.5 bg-slate-100 text-slate-900 border border-slate-300">
                    STU-#{s.id}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base uppercase tracking-tight text-slate-900">{s.name}</h3>
                  <div className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    <span className="truncate">{s.email}</span>
                  </div>
                </div>

                <div className="space-y-1.5 text-xs text-slate-600 pt-2 border-t border-slate-100">
                  <div className="flex items-center gap-1.5">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    <span>{s.phone || 'Phone not provided'}</span>
                  </div>
                  {s.gender && (
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        {s.gender} {s.date_of_birth ? `• DOB: ${s.date_of_birth.substring(0, 10)}` : ''}
                      </span>
                    </div>
                  )}
                  {s.address && (
                    <div className="flex items-start gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      <span className="text-[11px] text-slate-500 line-clamp-2">{s.address}</span>
                    </div>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-bold uppercase tracking-wider">
                <span>Registered: {new Date(s.created_at).toLocaleDateString()}</span>
                <button
                  onClick={() => onNavigate('/admin/applications')}
                  className="font-bold text-slate-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
                >
                  <FileCheck2 className="w-3 h-3 text-amber-600" />
                  <span>View Applications</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AdminStudentsPage;

import React, { useState, useEffect } from 'react';
import {
  FileCheck2,
  Search,
  Eye,
  Loader2,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { AdmissionApplication, StatusHistory, ApplicationStatus } from '../../types/index.js';
import { StatusBadge } from '../../components/StatusBadge.js';
import { ApplicationDetailsModal } from '../../components/ApplicationDetailsModal.js';

interface AdminApplicationsPageProps {
  onNavigate: (path: string) => void;
}

export const AdminApplicationsPage: React.FC<AdminApplicationsPageProps> = () => {
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('ALL');
  const [courseFilter, setCourseFilter] = useState<string>('ALL');

  // Modal states
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchApplications = async () => {
    try {
      setLoading(true);
      const res = await api.getApplications();
      if (res.data) setApplications(res.data);
    } catch (err) {
      console.error('Failed to load applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const handleOpenModal = async (app: AdmissionApplication) => {
    setSelectedApp(app);
    try {
      const res = await api.getApplicationById(app.id);
      if (res.data && res.data.history) {
        setHistory(res.data.history);
      } else {
        setHistory([]);
      }
    } catch (err) {
      setHistory([]);
    }
    setModalOpen(true);
  };

  const handleStatusUpdate = async (id: number, status: ApplicationStatus, remarks: string) => {
    await api.updateApplicationStatus(id, status, remarks);
    await fetchApplications();
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status, remarks });
      const updated = await api.getApplicationById(id);
      if (updated.data?.history) {
        setHistory(updated.data.history);
      }
    }
  };

  // Filter logic
  const filteredApps = applications.filter((app) => {
    const matchesSearch =
      app.application_number.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.student_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      app.course_name.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === 'ALL' || app.status === statusFilter;
    const matchesCourse = courseFilter === 'ALL' || app.course_name === courseFilter;

    return matchesSearch && matchesStatus && matchesCourse;
  });

  const uniqueCourses = Array.from(new Set(applications.map((a) => a.course_name)));

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider mb-2">
            <FileCheck2 className="w-3.5 h-3.5 text-amber-600" />
            <span>Admissions Committee Portal</span>
          </div>
          <h1 className="text-2xl font-extrabold uppercase tracking-tight text-slate-900">
            Application Management System
          </h1>
          <p className="text-xs text-slate-500">
            Scrutinize, evaluate eligibility, approve seats, and log remarks.
          </p>
        </div>

        <button
          onClick={fetchApplications}
          className="p-2.5 bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors shrink-0 cursor-pointer"
          title="Refresh Applications"
        >
          <RefreshCw className="w-4 h-4" />
        </button>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white p-4 sm:p-5 border border-slate-200 border-l-4 border-l-slate-900 shadow-xs space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-4">
          {/* Search Box */}
          <div className="sm:col-span-6 relative">
            <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-400">
              <Search className="w-4 h-4" />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search by student name, app number, email..."
              className="w-full pl-10 pr-4 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900"
            />
          </div>

          {/* Course Dropdown */}
          <div className="sm:col-span-6">
            <select
              value={courseFilter}
              onChange={(e) => setCourseFilter(e.target.value)}
              className="w-full px-3.5 py-2.5 text-xs sm:text-sm bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-bold uppercase tracking-tight text-slate-900"
            >
              <option value="ALL">All Academic Programs</option>
              {uniqueCourses.map((c) => (
                <option key={c} value={c}>
                  {c}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Status Filter Tabs */}
        <div className="flex flex-wrap gap-2 pt-2 border-t border-slate-100 text-xs">
          {['ALL', 'PENDING', 'UNDER_REVIEW', 'APPROVED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3.5 py-1.5 font-bold uppercase tracking-wider text-[11px] transition-all cursor-pointer ${
                statusFilter === st
                  ? 'bg-slate-900 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {st === 'ALL' ? 'All Applications' : st.replace('_', ' ')}
            </button>
          ))}
          <span className="ml-auto text-slate-400 self-center text-[10px] font-bold uppercase tracking-wider">
            Showing {filteredApps.length} of {applications.length} applications
          </span>
        </div>
      </div>

      {/* Applications Table */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-slate-900 shadow-xs overflow-hidden">
        {loading ? (
          <div className="p-16 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading applications...</span>
          </div>
        ) : filteredApps.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs space-y-1">
            <p className="font-bold uppercase tracking-wider text-slate-700">No applications matched the filter criteria.</p>
            <p>Try clearing your search query or status filter.</p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
                <tr>
                  <th className="p-4">App ID</th>
                  <th className="p-4">Student & Contact</th>
                  <th className="p-4">Program</th>
                  <th className="p-4">10+2 Score</th>
                  <th className="p-4">Submission Date</th>
                  <th className="p-4">Status</th>
                  <th className="p-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredApps.map((app) => (
                  <tr key={app.id} className="hover:bg-slate-50 transition-colors">
                    <td className="p-4 font-mono font-bold text-slate-900">
                      {app.application_number}
                    </td>
                    <td className="p-4">
                      <div className="font-bold uppercase tracking-tight text-slate-900">{app.student_name}</div>
                      <div className="text-[11px] text-slate-500">{app.email}</div>
                      {app.phone && <div className="text-[11px] text-slate-400">{app.phone}</div>}
                    </td>
                    <td className="p-4">
                      <div className="font-bold text-slate-800 uppercase tracking-tight">{app.course_name}</div>
                      <div className="text-[11px] text-slate-400">{app.course_duration}</div>
                    </td>
                    <td className="p-4 font-bold text-emerald-700">
                      {app.percentage ? `${app.percentage}%` : 'N/A'}
                    </td>
                    <td className="p-4 text-slate-500">
                      {new Date(app.submitted_at).toLocaleDateString()}
                    </td>
                    <td className="p-4">
                      <StatusBadge status={app.status} size="sm" />
                    </td>
                    <td className="p-4 text-right">
                      <button
                        onClick={() => handleOpenModal(app)}
                        className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase text-[10px] tracking-wider transition-colors inline-flex items-center gap-1.5 cursor-pointer"
                      >
                        <Eye className="w-3.5 h-3.5 text-amber-400" />
                        <span>Scrutinize & Decision</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Application Details & Decision Modal */}
      <ApplicationDetailsModal
        application={selectedApp}
        history={history}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isAdmin={true}
        onStatusUpdate={handleStatusUpdate}
      />
    </div>
  );
};

export default AdminApplicationsPage;

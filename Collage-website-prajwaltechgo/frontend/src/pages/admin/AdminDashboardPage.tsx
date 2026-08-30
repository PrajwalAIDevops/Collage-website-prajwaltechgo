import React, { useState, useEffect } from 'react';
import {
  Users,
  FileCheck2,
  Clock,
  CheckCircle2,
  XCircle,
  Activity,
  ArrowRight,
  Loader2,
  BookOpen,
  Eye,
  RefreshCw,
} from 'lucide-react';
import { api } from '../../services/api.js';
import { AdminStats, AdmissionApplication, StatusHistory, ApplicationStatus } from '../../types/index.js';
import { StatusBadge } from '../../components/StatusBadge.js';
import { ApplicationDetailsModal } from '../../components/ApplicationDetailsModal.js';

interface AdminDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const AdminDashboardPage: React.FC<AdminDashboardPageProps> = ({ onNavigate }) => {
  const [stats, setStats] = useState<AdminStats | null>(null);
  const [recentApplications, setRecentApplications] = useState<AdmissionApplication[]>([]);
  const [loading, setLoading] = useState(true);

  // Modal State
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const [statsRes, appsRes] = await Promise.all([
        api.getAdminStats(),
        api.getApplications(),
      ]);

      if (statsRes.data) setStats(statsRes.data);
      if (appsRes.data) setRecentApplications(appsRes.data.slice(0, 6));
    } catch (err) {
      console.error('Failed to load admin stats:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDashboardData();
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
    // Refresh stats & list
    await fetchDashboardData();
    // Update local selected application in modal
    if (selectedApp && selectedApp.id === id) {
      setSelectedApp({ ...selectedApp, status, remarks });
      const updated = await api.getApplicationById(id);
      if (updated.data?.history) {
        setHistory(updated.data.history);
      }
    }
  };

  if (loading && !stats) {
    return (
      <div className="bg-white p-16 border border-slate-200 flex flex-col items-center justify-center gap-3">
        <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
        <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Aggregating real-time admission metrics...</span>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 bg-slate-900 text-white p-6 sm:p-8 border-l-4 border-amber-500 shadow-md">
        <div>
          <div className="inline-flex items-center gap-1.5 text-xs text-amber-400 font-bold uppercase tracking-wider mb-1">
            <Activity className="w-3.5 h-3.5 animate-pulse" />
            <span>Admissions Analytics 2026-27 Live</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-white">
            Administrative Control Center
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Prajwal Tech Go College • Bangalore, Karnataka, India
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={fetchDashboardData}
            className="p-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition-colors cursor-pointer"
            title="Refresh Metrics"
          >
            <RefreshCw className="w-4 h-4" />
          </button>

          <button
            onClick={() => onNavigate('/admin/applications')}
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-900 font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 cursor-pointer"
          >
            <span>Review Applications</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-6 gap-4">
        {/* Total Students */}
        <div className="bg-white p-5 border border-slate-200 border-l-4 border-l-slate-900 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Students</span>
            <Users className="w-4 h-4 text-slate-900" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {stats?.total_students || 0}
          </div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Registered profiles</span>
        </div>

        {/* Total Applications */}
        <div className="bg-white p-5 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Applications</span>
            <FileCheck2 className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-slate-900 font-mono">
            {stats?.total_applications || 0}
          </div>
          <span className="text-[10px] text-slate-400 block uppercase tracking-wider">Total submitted</span>
        </div>

        {/* Pending */}
        <div className="bg-white p-5 border border-slate-200 border-l-4 border-l-amber-400 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-700">Pending</span>
            <Clock className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-extrabold text-amber-900 font-mono">
            {stats?.pending_applications || 0}
          </div>
          <span className="text-[10px] text-amber-600/80 block uppercase tracking-wider">Awaiting evaluation</span>
        </div>

        {/* Under Review */}
        <div className="bg-white p-5 border border-slate-200 border-l-4 border-l-sky-500 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-sky-700">Reviewing</span>
            <Clock className="w-4 h-4 text-sky-600" />
          </div>
          <div className="text-2xl font-extrabold text-sky-900 font-mono">
            {stats?.under_review_applications || 0}
          </div>
          <span className="text-[10px] text-sky-600/80 block uppercase tracking-wider">In verification</span>
        </div>

        {/* Approved */}
        <div className="bg-white p-5 border border-slate-200 border-l-4 border-l-emerald-500 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-700">Approved</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-extrabold text-emerald-900 font-mono">
            {stats?.approved_applications || 0}
          </div>
          <span className="text-[10px] text-emerald-600/80 block uppercase tracking-wider">Seats allotted</span>
        </div>

        {/* Rejected */}
        <div className="bg-white p-5 border border-slate-200 border-l-4 border-l-rose-500 shadow-xs space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-rose-700">Rejected</span>
            <XCircle className="w-4 h-4 text-rose-600" />
          </div>
          <div className="text-2xl font-extrabold text-rose-900 font-mono">
            {stats?.rejected_applications || 0}
          </div>
          <span className="text-[10px] text-rose-600/80 block uppercase tracking-wider">Did not qualify</span>
        </div>
      </div>

      {/* Course Breakdown + Quick Metrics */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Course Application Breakdown */}
        <div className="lg:col-span-2 bg-white p-6 border border-slate-200 border-l-4 border-l-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-bold text-slate-900 uppercase tracking-tight flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-amber-600" />
              <span>Program Intake Distribution (2026-27)</span>
            </h3>
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Applications per Degree</span>
          </div>

          <div className="space-y-3">
            {stats?.course_stats && stats.course_stats.map((cs) => {
              const maxSeats = cs.available_seats || 60;
              const count = Number(cs.applications_count);
              const percentage = Math.min(100, Math.round((count / maxSeats) * 100));

              return (
                <div key={cs.course_id} className="space-y-1.5 text-xs">
                  <div className="flex justify-between items-center font-medium">
                    <span className="text-slate-800 font-bold uppercase tracking-tight">{cs.course_name}</span>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{count} Apps</span>
                      <span className="text-slate-400 ml-1">/ {maxSeats} Seats</span>
                    </div>
                  </div>
                  <div className="w-full h-2 bg-slate-100 overflow-hidden">
                    <div
                      className="h-full bg-slate-900 transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Review Action Card */}
        <div className="bg-slate-900 text-white p-6 border-l-4 border-amber-500 space-y-4 flex flex-col justify-between">
          <div className="space-y-3">
            <span className="text-xs font-bold uppercase tracking-widest text-amber-400 block">
              Admission Committee
            </span>
            <h3 className="text-lg font-bold uppercase tracking-tight text-white">
              Pending Application Reviews
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              There are currently <strong className="text-amber-400">{stats?.pending_applications || 0}</strong> applicants awaiting initial scrutiny and <strong className="text-sky-300">{stats?.under_review_applications || 0}</strong> candidates in committee verification.
            </p>
          </div>

          <button
            onClick={() => onNavigate('/admin/applications')}
            className="w-full py-3 text-center text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Open Application Manager</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Recent Applications Table */}
      <div className="bg-white border border-slate-200 border-l-4 border-l-slate-900 shadow-xs overflow-hidden">
        <div className="p-5 border-b border-slate-200 flex items-center justify-between">
          <div>
            <h3 className="font-bold text-base uppercase tracking-tight text-slate-900">
              Recent Application Stream
            </h3>
            <p className="text-xs text-slate-500">Live incoming student submissions</p>
          </div>

          <button
            onClick={() => onNavigate('/admin/applications')}
            className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
          >
            <span>View All ({stats?.total_applications || 0})</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-50 border-b border-slate-200 text-slate-600 uppercase font-bold text-[11px] tracking-wider">
              <tr>
                <th className="p-3.5">App Number</th>
                <th className="p-3.5">Student Name</th>
                <th className="p-3.5">Applied Course</th>
                <th className="p-3.5">10+2 %</th>
                <th className="p-3.5">Status</th>
                <th className="p-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {recentApplications.map((app) => (
                <tr key={app.id} className="hover:bg-slate-50/80 transition-colors">
                  <td className="p-3.5 font-mono font-bold text-slate-900">
                    {app.application_number}
                  </td>
                  <td className="p-3.5 font-bold text-slate-900">
                    <div>{app.student_name}</div>
                    <div className="text-[11px] text-slate-400 font-normal">{app.email}</div>
                  </td>
                  <td className="p-3.5 text-slate-700 font-medium">{app.course_name}</td>
                  <td className="p-3.5 font-bold text-emerald-700">
                    {app.percentage ? `${app.percentage}%` : 'N/A'}
                  </td>
                  <td className="p-3.5">
                    <StatusBadge status={app.status} size="sm" />
                  </td>
                  <td className="p-3.5 text-right">
                    <button
                      onClick={() => handleOpenModal(app)}
                      className="px-3 py-1.5 bg-slate-100 hover:bg-slate-900 hover:text-white text-slate-700 font-bold uppercase text-[10px] tracking-wider transition-colors inline-flex items-center gap-1 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Review</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
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

export default AdminDashboardPage;

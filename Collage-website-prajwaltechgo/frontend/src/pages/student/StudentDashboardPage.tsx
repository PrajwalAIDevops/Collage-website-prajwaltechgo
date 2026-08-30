import React, { useState, useEffect } from 'react';
import {
  FileText,
  Clock,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  Phone,
  Mail,
  Loader2,
  Sparkles,
  Download,
  Info,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { api } from '../../services/api.js';
import { AdmissionApplication, StatusHistory } from '../../types/index.js';
import { StatusBadge } from '../../components/StatusBadge.js';
import { ApplicationDetailsModal } from '../../components/ApplicationDetailsModal.js';

interface StudentDashboardPageProps {
  onNavigate: (path: string) => void;
}

export const StudentDashboardPage: React.FC<StudentDashboardPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [applications, setApplications] = useState<AdmissionApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedApp, setSelectedApp] = useState<AdmissionApplication | null>(null);
  const [history, setHistory] = useState<StatusHistory[]>([]);
  const [modalOpen, setModalOpen] = useState(false);

  const fetchApplications = async () => {
    if (!user) return;
    try {
      setLoading(true);
      const res = await api.getMyApplications(user.id);
      if (res.data) {
        setApplications(res.data);
      }
    } catch (err) {
      console.error('Failed to load student applications:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications();
  }, [user]);

  const handleOpenDetails = async (app: AdmissionApplication) => {
    setSelectedApp(app);
    try {
      const res = await api.getApplicationById(app.id);
      if (res.data && res.data.history) {
        setHistory(res.data.history);
      } else {
        setHistory([]);
      }
    } catch (err) {
      console.error('Failed to load history:', err);
      setHistory([]);
    }
    setModalOpen(true);
  };

  const handlePrintSlip = () => {
    window.print();
  };

  return (
    <div className="space-y-8">
      {/* Welcome Banner */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs flex flex-col md:flex-row items-start md:items-center justify-between gap-6">
        <div className="space-y-1.5">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 text-[11px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300">
            <Sparkles className="w-3 h-3 text-amber-500" />
            <span>Academic Session 2026-27</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-xs sm:text-sm text-slate-500">
            Student Admission Tracking Portal • Prajwal Tech Go College, Bangalore
          </p>
        </div>

        {applications.length === 0 && !loading && (
          <button
            onClick={() => onNavigate('/student/application')}
            className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs transition-all flex items-center gap-2 shrink-0 cursor-pointer"
          >
            <span>Submit Admission Form</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
        )}
      </div>

      {/* Main Application Status Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-bold uppercase tracking-tight text-slate-900">
            My Admission Applications ({applications.length})
          </h2>
          {applications.length > 0 && (
            <button
              onClick={() => onNavigate('/student/application')}
              className="text-xs font-bold uppercase tracking-wider text-slate-900 hover:text-amber-600 flex items-center gap-1 cursor-pointer"
            >
              <span>Submit Another Application</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {loading ? (
          <div className="bg-white p-12 border border-slate-200 flex flex-col items-center justify-center gap-3">
            <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
            <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Fetching admission status records...</span>
          </div>
        ) : applications.length === 0 ? (
          <div className="bg-white p-10 border border-slate-200 border-l-4 border-l-slate-400 text-center space-y-4 shadow-xs">
            <div className="w-16 h-16 bg-slate-100 border border-slate-300 text-slate-900 flex items-center justify-center mx-auto rotate-45">
              <FileText className="w-8 h-8 -rotate-45" />
            </div>
            <div className="space-y-1 max-w-md mx-auto">
              <h3 className="text-base font-bold text-slate-900 uppercase tracking-tight">No Applications Submitted Yet</h3>
              <p className="text-xs text-slate-500">
                You have not submitted an admission application for 2026-27 yet. Fill in your academic details and select your course to get started.
              </p>
            </div>
            <button
              onClick={() => onNavigate('/student/application')}
              className="px-6 py-3 bg-slate-900 hover:bg-slate-800 text-white font-bold uppercase tracking-wider text-xs shadow-md transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Apply for Admission Now</span>
              <ArrowRight className="w-4 h-4 text-amber-400" />
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-6">
            {applications.map((app) => (
              <div
                key={app.id}
                className="bg-white border border-slate-200 border-l-4 border-l-slate-900 shadow-xs hover:border-l-amber-500 hover:shadow-md transition-all overflow-hidden"
              >
                <div className="p-6 sm:p-8 space-y-6">
                  {/* Top Bar with Application ID & Status */}
                  <div className="flex flex-wrap items-center justify-between gap-4 border-b border-slate-100 pb-5">
                    <div>
                      <div className="flex items-center gap-2.5">
                        <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                          Application Number
                        </span>
                        <span className="font-mono text-sm font-extrabold text-slate-900 bg-slate-100 px-2.5 py-0.5 border border-slate-300">
                          {app.application_number}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 mt-2">
                        {app.course_name}
                      </h3>
                    </div>

                    <div className="flex items-center gap-3">
                      <StatusBadge status={app.status} size="lg" />
                    </div>
                  </div>

                  {/* Program & Score Meta Grid */}
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 bg-slate-50 border border-slate-200 text-xs">
                    <div>
                      <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-0.5">Submission Date</span>
                      <strong className="text-slate-800 font-bold">
                        {new Date(app.submitted_at).toLocaleDateString()}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-0.5">Previous Percentage</span>
                      <strong className="text-emerald-700 font-bold">
                        {app.percentage ? `${app.percentage}%` : 'N/A'}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-0.5">Course Duration</span>
                      <strong className="text-slate-800 font-bold">
                        {app.course_duration}
                      </strong>
                    </div>
                    <div>
                      <span className="text-slate-400 block uppercase tracking-wider text-[10px] mb-0.5">Annual Tuition</span>
                      <strong className="text-slate-800 font-bold">
                        ₹{Number(app.course_fees).toLocaleString('en-IN')}
                      </strong>
                    </div>
                  </div>

                  {/* Remarks Box if available */}
                  {app.remarks && (
                    <div className="p-4 bg-amber-50/80 border border-amber-200 text-xs text-slate-800 space-y-1">
                      <div className="font-bold text-amber-900 flex items-center gap-1.5 uppercase tracking-wider text-[11px]">
                        <Info className="w-4 h-4" />
                        <span>Admissions Committee Evaluation Remarks:</span>
                      </div>
                      <p className="pl-5 text-slate-700">{app.remarks}</p>
                    </div>
                  )}

                  {/* Action Controls */}
                  <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                    <div className="text-xs text-slate-500">
                      {app.status === 'APPROVED' ? (
                        <span className="text-emerald-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                          <CheckCircle2 className="w-4 h-4" />
                          <span>Seat Provisionally Allotted. Please report to campus for document verification.</span>
                        </span>
                      ) : app.status === 'UNDER_REVIEW' ? (
                        <span className="text-amber-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>Application undergoing academic credentials evaluation.</span>
                        </span>
                      ) : app.status === 'REJECTED' ? (
                        <span className="text-rose-700 font-bold uppercase tracking-wider text-[11px] flex items-center gap-1">
                          <AlertCircle className="w-4 h-4" />
                          <span>Does not meet current cut-off criteria. Contact admissions desk.</span>
                        </span>
                      ) : (
                        <span className="text-slate-600 font-medium">
                          Application queued for committee review.
                        </span>
                      )}
                    </div>

                    <div className="flex items-center gap-2.5 ml-auto">
                      <button
                        onClick={() => handleOpenDetails(app)}
                        className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 transition-colors cursor-pointer"
                      >
                        View Full Breakdown
                      </button>

                      {app.status === 'APPROVED' && (
                        <button
                          onClick={() => handlePrintSlip()}
                          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 bg-amber-500 hover:bg-amber-400 shadow-sm transition-colors cursor-pointer"
                        >
                          <Download className="w-3.5 h-3.5" />
                          <span>Print Admission Slip</span>
                        </button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Admissions Counselor Helpdesk Card */}
      <div className="bg-slate-900 text-white p-6 border-l-4 border-amber-500 grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
        <div className="md:col-span-2 space-y-1">
          <h3 className="font-bold text-base uppercase tracking-tight text-white">Need Assistance with your Application?</h3>
          <p className="text-xs text-slate-400">
            Our Bangalore Admissions Office is available Monday through Saturday from 9:00 AM to 5:00 PM IST.
          </p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3 md:justify-end text-xs">
          <a
            href="tel:+918028456789"
            className="px-4 py-2.5 bg-slate-800 hover:bg-slate-700 font-bold uppercase tracking-wider text-amber-400 border border-slate-700 flex items-center justify-center gap-2"
          >
            <Phone className="w-3.5 h-3.5" />
            <span>+91 80 2845 6789</span>
          </a>
          <a
            href="mailto:admissions@prajwaltechgo.edu"
            className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 font-bold uppercase tracking-wider text-slate-900 flex items-center justify-center gap-2"
          >
            <Mail className="w-3.5 h-3.5" />
            <span>Email Counselor</span>
          </a>
        </div>
      </div>

      {/* Application Details Modal */}
      <ApplicationDetailsModal
        application={selectedApp}
        history={history}
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        isAdmin={false}
      />
    </div>
  );
};

export default StudentDashboardPage;

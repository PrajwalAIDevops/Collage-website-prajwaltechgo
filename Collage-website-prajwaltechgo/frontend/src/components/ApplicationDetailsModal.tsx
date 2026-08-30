import React, { useState } from 'react';
import {
  X,
  User,
  Clock,
  CheckCircle,
  History,
  FileCheck,
  Building,
  GraduationCap,
  MapPin,
  Phone,
  Mail,
  Send,
  Loader2,
} from 'lucide-react';
import { AdmissionApplication, StatusHistory, ApplicationStatus } from '../types/index.js';
import { StatusBadge } from './StatusBadge.js';

interface ApplicationDetailsModalProps {
  application: AdmissionApplication | null;
  history: StatusHistory[];
  isOpen: boolean;
  onClose: () => void;
  isAdmin?: boolean;
  onStatusUpdate?: (id: number, status: ApplicationStatus, remarks: string) => Promise<void>;
}

export const ApplicationDetailsModal: React.FC<ApplicationDetailsModalProps> = ({
  application,
  history,
  isOpen,
  onClose,
  isAdmin = false,
  onStatusUpdate,
}) => {
  if (!isOpen || !application) return null;

  const [selectedStatus, setSelectedStatus] = useState<ApplicationStatus>(application.status);
  const [remarks, setRemarks] = useState<string>(application.remarks || '');
  const [submitting, setSubmitting] = useState(false);
  const [feedback, setFeedback] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!onStatusUpdate) return;
    setSubmitting(true);
    setFeedback(null);
    try {
      await onStatusUpdate(application.id, selectedStatus, remarks);
      setFeedback({ type: 'success', message: 'Application status updated successfully!' });
    } catch (err: any) {
      setFeedback({ type: 'error', message: err.message || 'Failed to update status' });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-slate-900/60 backdrop-blur-xs flex items-center justify-center p-4 sm:p-6">
      <div className="bg-white shadow-2xl border border-slate-200 w-full max-w-3xl overflow-hidden animate-in fade-in zoom-in-95 duration-200">
        {/* Header */}
        <div className="px-6 py-5 bg-slate-900 text-white flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-slate-800 border border-slate-700 flex items-center justify-center rotate-45 shrink-0">
              <FileCheck className="w-5 h-5 text-amber-400 -rotate-45" />
            </div>
            <div>
              <div className="flex items-center gap-2.5">
                <h3 className="text-lg font-bold text-white uppercase tracking-tight">
                  Application Details
                </h3>
                <span className="font-mono text-xs px-2 py-0.5 bg-slate-800 text-amber-400 font-semibold border border-slate-700">
                  {application.application_number}
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Prajwal Tech Go College Admissions • Submitted on {new Date(application.submitted_at).toLocaleDateString()}
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 max-h-[75vh] overflow-y-auto space-y-6">
          {/* Status & Highlights */}
          <div className="flex flex-wrap items-center justify-between gap-4 p-4 bg-slate-50 border border-slate-200">
            <div>
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Current Status
              </span>
              <div className="mt-1">
                <StatusBadge status={application.status} size="lg" />
              </div>
            </div>
            <div className="text-right">
              <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider block">
                Target Program
              </span>
              <span className="text-sm font-bold text-slate-900 mt-1 block">
                {application.course_name}
              </span>
            </div>
          </div>

          {/* Student & Academic Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Applicant Information */}
            <div className="space-y-3 p-4 border border-slate-200 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <User className="w-4 h-4 text-amber-600" />
                <span>Applicant Information</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Full Name</span>
                  <span className="font-semibold text-slate-800">{application.student_name}</span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Email Address</span>
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-slate-400" />
                    {application.email}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Phone Number</span>
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-slate-400" />
                    {application.phone || 'Not Provided'}
                  </span>
                </div>
                {application.gender && (
                  <div>
                    <span className="text-xs text-slate-500 block">Gender & DOB</span>
                    <span className="font-medium text-slate-700">
                      {application.gender} {application.date_of_birth ? `• ${application.date_of_birth}` : ''}
                    </span>
                  </div>
                )}
                {application.address && (
                  <div>
                    <span className="text-xs text-slate-500 block">Address</span>
                    <span className="font-medium text-slate-700 text-xs flex items-start gap-1">
                      <MapPin className="w-3.5 h-3.5 text-slate-400 shrink-0 mt-0.5" />
                      {application.address}
                    </span>
                  </div>
                )}
              </div>
            </div>

            {/* Academic & Program Details */}
            <div className="space-y-3 p-4 border border-slate-200 bg-white">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <GraduationCap className="w-4 h-4 text-amber-600" />
                <span>Academic Record & Course</span>
              </h4>
              <div className="space-y-2 text-sm">
                <div>
                  <span className="text-xs text-slate-500 block">Previous Qualification</span>
                  <span className="font-semibold text-slate-800">
                    {application.previous_qualification || '12th / PUC Equivalent'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Previous Institution</span>
                  <span className="font-medium text-slate-700 flex items-center gap-1">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    {application.previous_institution || 'Document Verified'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Aggregate Percentage</span>
                  <span className="font-bold text-emerald-700 text-base">
                    {application.percentage ? `${application.percentage}%` : 'N/A'}
                  </span>
                </div>
                <div>
                  <span className="text-xs text-slate-500 block">Annual Tuition Fees</span>
                  <span className="font-semibold text-slate-800">
                    ₹{Number(application.course_fees).toLocaleString('en-IN')} / year ({application.course_duration})
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks */}
          {application.remarks && (
            <div className="p-4 bg-amber-50/70 border border-amber-200 text-sm">
              <span className="text-xs font-bold text-amber-800 uppercase tracking-wider block mb-1">
                Remarks / Evaluation Note
              </span>
              <p className="text-slate-800">{application.remarks}</p>
            </div>
          )}

          {/* Status History Timeline */}
          {history && history.length > 0 && (
            <div className="p-4 border border-slate-200 bg-slate-50/50">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-600 flex items-center gap-1.5 mb-3">
                <History className="w-4 h-4 text-amber-600" />
                <span>Status Change Audit History</span>
              </h4>
              <div className="space-y-3">
                {history.map((h) => (
                  <div
                    key={h.id}
                    className="flex items-start gap-3 text-xs bg-white p-3 border border-slate-200"
                  >
                    <div className="mt-0.5">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 font-medium">
                        {h.old_status && (
                          <>
                            <span className="text-slate-500 line-through">{h.old_status}</span>
                            <span className="text-slate-400">→</span>
                          </>
                        )}
                        <span className="font-bold text-slate-900">{h.new_status}</span>
                        <span className="text-slate-400 ml-auto">
                          {new Date(h.changed_at).toLocaleString()}
                        </span>
                      </div>
                      {h.remarks && <p className="text-slate-600 mt-1">{h.remarks}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Admin Decision Control Form */}
          {isAdmin && onStatusUpdate && (
            <form onSubmit={handleUpdate} className="p-5 bg-slate-900 text-white border border-slate-800 space-y-4">
              <h4 className="text-xs font-bold uppercase tracking-wider text-amber-400 flex items-center gap-1.5">
                <CheckCircle className="w-4 h-4 text-amber-400" />
                <span>Admin Decision & Status Update</span>
              </h4>

              {feedback && (
                <div
                  className={`p-3 text-xs font-medium ${
                    feedback.type === 'success'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : 'bg-rose-950 text-rose-300 border border-rose-800'
                  }`}
                >
                  {feedback.message}
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Select New Status
                  </label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value as ApplicationStatus)}
                    className="w-full px-3 py-2 text-sm bg-slate-800 text-white border border-slate-700 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                    <option value="PENDING">PENDING</option>
                    <option value="UNDER_REVIEW">UNDER_REVIEW</option>
                    <option value="APPROVED">APPROVED</option>
                    <option value="REJECTED">REJECTED</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">
                    Decision Remarks
                  </label>
                  <input
                    type="text"
                    value={remarks}
                    onChange={(e) => setRemarks(e.target.value)}
                    placeholder="e.g. Approved based on marks verification"
                    className="w-full px-3 py-2 text-sm bg-slate-800 text-white border border-slate-700 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                  >
                  </input>
                </div>
              </div>

              <div className="flex justify-end gap-3 pt-2">
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center gap-2 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-950 bg-amber-500 hover:bg-amber-400 shadow-sm transition-all disabled:opacity-50 cursor-pointer"
                >
                  {submitting ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Saving...</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 text-slate-950" />
                      <span>Save Decision & History</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>

        {/* Footer */}
        <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-xs font-bold uppercase tracking-wider text-slate-700 bg-white border border-slate-300 hover:bg-slate-100 transition-colors cursor-pointer"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default ApplicationDetailsModal;

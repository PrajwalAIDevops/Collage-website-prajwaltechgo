import React, { useState, useEffect } from 'react';
import {
  FileEdit,
  GraduationCap,
  BookOpen,
  CheckCircle2,
  AlertCircle,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext.js';
import { api } from '../../services/api.js';
import { Course } from '../../types/index.js';

interface StudentApplicationPageProps {
  onNavigate: (path: string) => void;
}

export const StudentApplicationPage: React.FC<StudentApplicationPageProps> = ({ onNavigate }) => {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [successAppNumber, setSuccessAppNumber] = useState<string | null>(null);

  // Form Fields
  const [courseId, setCourseId] = useState<number | ''>('');
  const [previousQualification, setPreviousQualification] = useState('12th Standard / PUC');
  const [previousInstitution, setPreviousInstitution] = useState('');
  const [percentage, setPercentage] = useState('');
  const [declared, setDeclared] = useState(false);

  useEffect(() => {
    api.getCourses()
      .then((res) => {
        if (res.data && res.data.length > 0) {
          setCourses(res.data);
          setCourseId(res.data[0].id);
        }
      })
      .catch((err) => console.error('Failed to load courses:', err))
      .finally(() => setLoading(false));
  }, []);

  const selectedCourse = courses.find((c) => c.id === Number(courseId));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    if (!courseId) {
      setError('Please select a course to apply for');
      return;
    }
    if (!percentage || isNaN(Number(percentage)) || Number(percentage) < 35 || Number(percentage) > 100) {
      setError('Please enter a valid aggregate percentage between 35% and 100%');
      return;
    }
    if (!declared) {
      setError('Please accept the declaration to proceed');
      return;
    }

    setSubmitting(true);
    setError(null);

    try {
      const res = await api.submitApplication({
        student_id: user.id,
        course_id: Number(courseId),
        previous_qualification: previousQualification,
        previous_institution: previousInstitution || 'Pre-University Board / CBSE',
        percentage: Number(percentage),
      });

      if (res.data) {
        setSuccessAppNumber(res.data.application_number);
      }
    } catch (err: any) {
      setError(err.message || 'Failed to submit application. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (successAppNumber) {
    return (
      <div className="max-w-2xl mx-auto bg-white p-8 sm:p-12 border border-slate-200 border-l-4 border-l-emerald-600 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 border border-emerald-300 text-emerald-700 flex items-center justify-center mx-auto rotate-45">
          <CheckCircle2 className="w-9 h-9 -rotate-45" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-widest text-emerald-800 bg-emerald-50 px-3 py-1 border border-emerald-200">
            Application Submitted Successfully
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
            Welcome to Prajwal Tech Go College!
          </h2>
          <p className="text-xs sm:text-sm text-slate-600 max-w-md mx-auto">
            Your admission application has been registered in our academic system and sent to the faculty admissions committee for review.
          </p>
        </div>

        {/* Application Number Token */}
        <div className="p-5 bg-slate-900 text-white space-y-1 max-w-md mx-auto border-l-4 border-amber-500">
          <span className="text-xs text-slate-400 font-bold uppercase tracking-wider block">
            Official Application Number
          </span>
          <div className="font-mono text-2xl font-extrabold text-amber-400 tracking-wider">
            {successAppNumber}
          </div>
          <span className="text-[11px] text-slate-400 block pt-1">
            Keep this number safe for future correspondence and status queries.
          </span>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-4">
          <button
            onClick={() => onNavigate('/student/dashboard')}
            className="w-full sm:w-auto px-6 py-3 font-bold uppercase tracking-wider text-xs bg-slate-900 hover:bg-slate-800 text-white shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Go to Student Dashboard</span>
            <ArrowRight className="w-4 h-4 text-amber-400" />
          </button>
          <button
            onClick={() => {
              setSuccessAppNumber(null);
              setPercentage('');
              setPreviousInstitution('');
              setDeclared(false);
            }}
            className="w-full sm:w-auto px-5 py-3 font-bold uppercase tracking-wider text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
          >
            Apply for Another Course
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto space-y-8">
      {/* Header */}
      <div className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-amber-500 shadow-xs space-y-2">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-100 border border-slate-300 text-slate-800 text-xs font-bold uppercase tracking-wider">
          <FileEdit className="w-3.5 h-3.5 text-amber-600" />
          <span>Undergraduate Admission 2026-27</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold uppercase tracking-tight text-slate-900">
          Online Admission Application
        </h1>
        <p className="text-xs sm:text-sm text-slate-500">
          Applicant: <strong>{user?.name}</strong> • Registered Email: <strong>{user?.email}</strong>
        </p>
      </div>

      {error && (
        <div className="p-4 bg-rose-50 border-l-4 border-rose-500 flex items-start gap-2.5 text-xs text-rose-800 font-medium">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      {loading ? (
        <div className="bg-white p-12 border border-slate-200 flex flex-col items-center justify-center gap-3">
          <Loader2 className="w-8 h-8 text-slate-900 animate-spin" />
          <span className="text-xs text-slate-500 font-bold uppercase tracking-wider">Loading degree programs...</span>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-slate-900 shadow-xs space-y-6 text-xs sm:text-sm">
          {/* Section 1: Course Selection */}
          <div className="space-y-4">
            <h3 className="font-bold text-base uppercase tracking-tight text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <GraduationCap className="w-5 h-5 text-amber-600" />
              <span>1. Target Degree Program</span>
            </h3>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Select Course / Degree Program *
              </label>
              <select
                value={courseId}
                onChange={(e) => setCourseId(Number(e.target.value))}
                required
                className="w-full px-3.5 py-3 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-bold text-slate-900"
              >
                {courses.map((course) => (
                  <option key={course.id} value={course.id}>
                    {course.name} ({course.duration}) — ₹{Number(course.fees).toLocaleString('en-IN')}/year
                  </option>
                ))}
              </select>
            </div>

            {selectedCourse && (
              <div className="p-4 bg-slate-50 border border-slate-200 border-l-4 border-l-amber-500 space-y-2 text-xs">
                <div className="flex items-center justify-between font-bold text-slate-950 uppercase tracking-wide">
                  <span>{selectedCourse.name}</span>
                  <span className="text-emerald-700">
                    Annual Fee: ₹{Number(selectedCourse.fees).toLocaleString('en-IN')}
                  </span>
                </div>
                <p className="text-slate-600 leading-relaxed">{selectedCourse.description}</p>
                <div className="pt-1 text-slate-500">
                  <strong className="text-slate-700 uppercase tracking-wider text-[10px]">Eligibility:</strong> {selectedCourse.eligibility}
                </div>
              </div>
            )}
          </div>

          {/* Section 2: Academic Background */}
          <div className="space-y-4">
            <h3 className="font-bold text-base uppercase tracking-tight text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-2">
              <BookOpen className="w-5 h-5 text-amber-600" />
              <span>2. Previous Academic Records</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                  Qualifying Examination *
                </label>
                <select
                  value={previousQualification}
                  onChange={(e) => setPreviousQualification(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
                >
                  <option value="12th Standard / PUC">Karnataka PUC (Pre-University)</option>
                  <option value="CBSE Class 12">CBSE 12th Senior Secondary</option>
                  <option value="ICSE / ISC Class 12">ISC / ICSE 12th Board</option>
                  <option value="State Board 10+2">Other State Board 10+2</option>
                  <option value="3-Year Polytechnic Diploma">Polytechnic Diploma</option>
                </select>
              </div>

              <div>
                <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                  Aggregate Percentage / Marks (%) *
                </label>
                <input
                  type="number"
                  step="0.01"
                  min="35"
                  max="100"
                  required
                  value={percentage}
                  onChange={(e) => setPercentage(e.target.value)}
                  placeholder="e.g. 84.50"
                  className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
                />
              </div>
            </div>

            <div>
              <label className="block font-bold uppercase tracking-wider text-[11px] text-slate-700 mb-1">
                Name of Junior College / School *
              </label>
              <input
                type="text"
                required
                value={previousInstitution}
                onChange={(e) => setPreviousInstitution(e.target.value)}
                placeholder="e.g. National PU College, Bangalore"
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-slate-900 font-medium"
              />
            </div>
          </div>

          {/* Section 3: Declaration */}
          <div className="p-4 bg-slate-50 border border-slate-200 space-y-3">
            <label className="flex items-start gap-3 cursor-pointer">
              <input
                type="checkbox"
                checked={declared}
                onChange={(e) => setDeclared(e.target.checked)}
                className="w-4 h-4 text-slate-900 focus:ring-slate-900 mt-0.5"
              />
              <span className="text-xs text-slate-700 leading-relaxed font-medium">
                I hereby declare that the academic information, percentages, and institution details entered above are true and accurate to the best of my knowledge. I agree to abide by the rules and regulations of Prajwal Tech Go College, Bangalore.
              </span>
            </label>
          </div>

          {/* Submit Controls */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
            <button
              type="button"
              onClick={() => onNavigate('/student/dashboard')}
              className="px-5 py-2.5 font-bold uppercase tracking-wider text-xs text-slate-700 bg-slate-100 hover:bg-slate-200 transition-colors cursor-pointer"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={submitting}
              className="px-7 py-3 font-bold uppercase tracking-widest text-xs text-white bg-slate-900 hover:bg-slate-800 shadow-md transition-all flex items-center gap-2 disabled:opacity-50 cursor-pointer"
            >
              {submitting ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Submitting Application...</span>
                </>
              ) : (
                <>
                  <span>Submit Admission Form</span>
                  <ArrowRight className="w-4 h-4 text-amber-400" />
                </>
              )}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};

export default StudentApplicationPage;

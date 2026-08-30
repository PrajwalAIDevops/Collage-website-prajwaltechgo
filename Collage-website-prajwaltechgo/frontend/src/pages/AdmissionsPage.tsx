import React, { useState } from 'react';
import {
  FileCheck2,
  Calendar,
  ChevronDown,
  ChevronUp,
  ArrowRight,
  CheckCircle,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext.js';

interface AdmissionsPageProps {
  onNavigate: (path: string) => void;
}

export const AdmissionsPage: React.FC<AdmissionsPageProps> = ({ onNavigate }) => {
  const { user, isStudent } = useAuth();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'What is the admission procedure for B.Tech and BCA at Prajwal Tech Go College?',
      a: 'Candidates can register online through our portal, fill in their 10+2 / PUC academic scores, select their desired course, and submit their application. Applications undergo merit verification by the admissions committee.',
    },
    {
      q: 'Are scholarships available for meritorious students?',
      a: 'Yes, students scoring above 90% in 10+2 / PUC are eligible for up to 50% tuition waiver under the Prajwal Merit Scholarship scheme. We also offer Karnataka state domicile and sports excellence fee concessions.',
    },
    {
      q: 'How long does the application review process take?',
      a: 'Once submitted, applications are evaluated within 2 to 4 working days. You can track the real-time status (Pending, Under Review, Approved, or Rejected) on your student dashboard.',
    },
    {
      q: 'What documents must be produced during final admission verification?',
      a: 'Original and copies of 10th Marks Card, 10+2 / PUC Equivalent Statement, Transfer Certificate (TC), Migration Certificate (for non-Karnataka boards), Aadhaar Card, and 4 passport-size photographs.',
    },
    {
      q: 'Is on-campus hostel accommodation available for outstation students?',
      a: 'Yes, separate state-of-the-art residential hostels for boys and girls are available with high-speed Wi-Fi, hygienic south & north Indian dining, 24/7 security, and power backup.',
    },
  ];

  const handleApply = () => {
    if (user && isStudent) {
      onNavigate('/student/application');
    } else {
      onNavigate('/register');
    }
  };

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Calendar className="w-3.5 h-3.5" />
            <span>Academic Session 2026-27</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Admissions Guidelines & Procedure
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Welcome to the Prajwal Tech Go College admission center. Join our diverse community of aspiring engineers, computer application specialists, and business innovators in Bangalore.
          </p>
        </div>
      </section>

      {/* 4 Steps to Enroll */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Admissions Workflow
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Step-by-Step Application Process
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 border border-slate-200 border-l-4 border-l-slate-900 space-y-3">
            <div className="w-10 h-10 bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm">
              01
            </div>
            <h3 className="font-bold text-slate-900 text-sm uppercase">Online Registration</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Register an account using your email and phone number on our admissions portal.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 border-l-4 border-l-amber-500 space-y-3">
            <div className="w-10 h-10 bg-amber-500 text-slate-950 font-bold flex items-center justify-center text-sm">
              02
            </div>
            <h3 className="font-bold text-slate-900 text-sm uppercase">Profile & Scores</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Fill in academic percentages, previous institutions, and select your preferred course.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 border-l-4 border-l-slate-900 space-y-3">
            <div className="w-10 h-10 bg-slate-900 text-amber-400 font-bold flex items-center justify-center text-sm">
              03
            </div>
            <h3 className="font-bold text-slate-900 text-sm uppercase">Merit Review</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Admissions faculty verifies credentials and updates status with review remarks.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 border-l-4 border-l-emerald-600 space-y-3">
            <div className="w-10 h-10 bg-emerald-700 text-white font-bold flex items-center justify-center text-sm">
              04
            </div>
            <h3 className="font-bold text-slate-900 text-sm uppercase">Seat Confirmation</h3>
            <p className="text-xs text-slate-600 leading-relaxed">
              Upon approval, download your admission slip and finalize semester fee remittance.
            </p>
          </div>
        </div>
      </section>

      {/* Important Dates & Document Checklist */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Important Dates Table */}
          <div className="bg-white p-6 sm:p-8 border border-slate-200 border-t-4 border-t-slate-900 space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <Calendar className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold uppercase tracking-tight text-slate-900">
                Important Admission Dates (2026-27)
              </h3>
            </div>
            <div className="divide-y divide-slate-100 text-xs sm:text-sm">
              <div className="py-3 flex justify-between">
                <span className="font-medium text-slate-700">Online Application Portal Opens</span>
                <span className="font-bold text-slate-900">May 15, 2026</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-medium text-slate-700">Phase 1 Early Decision Deadline</span>
                <span className="font-bold text-slate-900">July 31, 2026</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-medium text-slate-700">Phase 2 Regular Admissions Deadline</span>
                <span className="font-bold text-slate-900">August 30, 2026</span>
              </div>
              <div className="py-3 flex justify-between">
                <span className="font-medium text-slate-700">Orientation & Semester Commencement</span>
                <span className="font-bold text-emerald-700">September 15, 2026</span>
              </div>
            </div>
          </div>

          {/* Document Checklist */}
          <div className="bg-white p-6 sm:p-8 border border-slate-200 border-t-4 border-t-amber-500 space-y-4">
            <div className="flex items-center gap-2 text-slate-900">
              <FileCheck2 className="w-5 h-5 text-amber-500" />
              <h3 className="text-base font-bold uppercase tracking-tight text-slate-900">
                Required Verification Documents
              </h3>
            </div>
            <div className="space-y-2.5 text-xs sm:text-sm text-slate-600">
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Class 10 / SSLC Certificate & Marks Statement (Proof of Age)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Class 12 / PUC Equivalent Examination Marks Card</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Transfer Certificate (TC) & Conduct Certificate from previous institution</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Migration Certificate (for Non-Karnataka / ICSE / CBSE students)</span>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Government Issued Photo Identity Card (Aadhaar / Passport)</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Accordion */}
      <section className="max-w-4xl mx-auto px-6 sm:px-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Common Questions
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 hover:bg-slate-50 transition-colors cursor-pointer"
                >
                  <span className="font-semibold text-sm text-slate-800">{faq.q}</span>
                  {isOpen ? (
                    <ChevronUp className="w-4 h-4 text-amber-600 shrink-0" />
                  ) : (
                    <ChevronDown className="w-4 h-4 text-slate-400 shrink-0" />
                  )}
                </button>
                {isOpen && (
                  <div className="px-4 sm:px-5 pb-5 text-xs sm:text-sm text-slate-600 leading-relaxed border-t border-slate-100 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* Call to action */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="bg-slate-900 p-8 text-white flex flex-col sm:flex-row items-center justify-between gap-6 border-l-4 border-amber-500 shadow-xl">
          <div className="space-y-1 text-center sm:text-left">
            <h3 className="text-xl font-bold uppercase tracking-tight">Ready to Begin Your College Journey?</h3>
            <p className="text-xs sm:text-sm text-slate-400">
              Submit your application in under 5 minutes through our student portal.
            </p>
          </div>
          <button
            onClick={handleApply}
            className="px-6 py-3.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs uppercase tracking-wider transition-all shrink-0 flex items-center gap-2 cursor-pointer"
          >
            <span>Apply for Admission</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default AdmissionsPage;

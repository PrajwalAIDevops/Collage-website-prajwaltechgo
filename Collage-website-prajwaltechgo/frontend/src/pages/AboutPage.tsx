import React from 'react';
import {
  Award,
  ShieldCheck,
  CheckCircle,
  Building,
  Target,
  Compass,
} from 'lucide-react';

interface AboutPageProps {
  onNavigate: (path: string) => void;
}

export const AboutPage: React.FC<AboutPageProps> = () => {
  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* Header Banner */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Building className="w-3.5 h-3.5" />
            <span>Bangalore, Karnataka, India</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            About Prajwal Tech Go College
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Established with a vision to impart value-driven, technology-integrated education in Bangalore, Prajwal Tech Go College has evolved into a premier destination for higher education in Computer Sciences, Engineering, Business, and Commerce.
          </p>
        </div>
      </section>

      {/* Vision & Mission */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-white p-8 border border-slate-200 border-l-4 border-l-slate-900 space-y-4">
            <div className="w-12 h-12 bg-slate-900 text-amber-400 flex items-center justify-center rotate-45 shrink-0">
              <Target className="w-6 h-6 -rotate-45" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">Our Vision</h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              To be an internationally recognized center of academic excellence and applied technical learning that empowers students to innovate ethically, excel globally, and solve pressing societal and industrial challenges.
            </p>
          </div>

          <div className="bg-white p-8 border border-slate-200 border-l-4 border-l-amber-500 space-y-4">
            <div className="w-12 h-12 bg-amber-500 text-slate-950 flex items-center justify-center rotate-45 shrink-0">
              <Compass className="w-6 h-6 -rotate-45" />
            </div>
            <h2 className="text-xl font-bold uppercase tracking-tight text-slate-900">Our Mission</h2>
            <ul className="text-sm text-slate-600 space-y-2.5">
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Deliver cutting-edge curricula benchmarked to global technology trends.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Foster hands-on research and entrepreneurial mindset in India's startup capital.</span>
              </li>
              <li className="flex items-start gap-2">
                <CheckCircle className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                <span>Provide equal access to high-quality education through merit and need scholarships.</span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Leadership / Principal's Desk */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="bg-slate-900 text-white p-8 sm:p-12 border-l-4 border-amber-500 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-4 text-center lg:text-left space-y-3">
            <div className="w-24 h-24 sm:w-28 sm:h-28 mx-auto lg:mx-0 bg-slate-800 border-2 border-amber-400 flex items-center justify-center text-amber-300 font-bold text-3xl shadow-lg">
              VK
            </div>
            <div>
              <h3 className="text-lg font-bold uppercase tracking-tight text-white">Dr. K. S. Venkatesh</h3>
              <p className="text-xs text-amber-400 font-bold uppercase tracking-wider">Principal & Academic Director</p>
              <p className="text-[11px] text-slate-400 mt-0.5">Ph.D. (Computer Science), IISc Bangalore</p>
            </div>
          </div>

          <div className="lg:col-span-8 space-y-4 text-sm text-slate-300 leading-relaxed border-t lg:border-t-0 lg:border-l border-slate-800 pt-6 lg:pt-0 lg:pl-8">
            <h4 className="text-base font-bold text-white uppercase tracking-wider">Message from the Principal</h4>
            <p>
              "Welcome to Prajwal Tech Go College. In today’s fast-evolving technological landscape, an undergraduate degree is not merely about exams and scores; it is about building problem-solving resilience, technical acumen, and critical thinking."
            </p>
            <p>
              "Situated in Bangalore, our students interact constantly with leading industry practitioners, hackathons, and corporate mentors. Whether you choose Computer Science, Management, or Commerce, our campus offers the ideal launchpad for your aspirations."
            </p>
          </div>
        </div>
      </section>

      {/* Approvals & Accreditations */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-6">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Institutional Standing
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Recognitions & Accreditations
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white p-6 border border-slate-200 border-t-4 border-t-emerald-600 space-y-2 text-center">
            <ShieldCheck className="w-8 h-8 text-emerald-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm uppercase">NAAC A+ Accreditation</h4>
            <p className="text-xs text-slate-500">
              Awarded high cumulative grade point average (CGPA 3.52) for exemplary infrastructure and student outcomes.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 border-t-4 border-t-slate-900 space-y-2 text-center">
            <Building className="w-8 h-8 text-slate-900 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm uppercase">Bengaluru City University</h4>
            <p className="text-xs text-slate-500">
              Permanently affiliated degree programs aligned with the National Education Policy (NEP) curriculum.
            </p>
          </div>

          <div className="bg-white p-6 border border-slate-200 border-t-4 border-t-amber-500 space-y-2 text-center">
            <Award className="w-8 h-8 text-amber-600 mx-auto" />
            <h4 className="font-bold text-slate-900 text-sm uppercase">AICTE New Delhi Approved</h4>
            <p className="text-xs text-slate-500">
              All technical, engineering, and computer application programs strictly adhere to AICTE quality norms.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;

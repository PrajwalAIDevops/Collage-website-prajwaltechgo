import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  Award,
  BookOpen,
  Building,
  Laptop,
  Briefcase,
  ShieldCheck,
} from 'lucide-react';
import { api } from '../services/api.js';
import { Course } from '../types/index.js';

interface HomePageProps {
  onNavigate: (path: string) => void;
}

export const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
  const [, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    api.getCourses().then((res) => {
      if (res.data) setCourses(res.data.slice(0, 3));
    }).catch(() => null);
  }, []);

  return (
    <div className="space-y-20 pb-20 bg-white">
      {/* Hero Section - Geometric Balance */}
      <section className="relative overflow-hidden border-b border-slate-100 bg-white pt-12 sm:pt-16 pb-16 sm:pb-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
            {/* Left Content */}
            <div className="lg:col-span-7 space-y-8 text-left">
              <div>
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-px w-8 bg-amber-500" />
                  <span className="text-xs font-bold tracking-[0.3em] uppercase text-slate-400">
                    Bangalore, Karnataka, India
                  </span>
                </div>
                <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.05] uppercase">
                  Shaping The <span className="text-amber-500">Digital</span> Future
                </h1>
              </div>

              <p className="text-base sm:text-lg text-slate-500 leading-relaxed max-w-xl font-normal">
                Located in the heart of Bangalore — India's Silicon Valley — Prajwal Tech Go College delivers industry-immersive undergraduate education with state-of-the-art computing laboratories, research faculty, and active recruitment pipelines.
              </p>

              {/* Geometric Accreditation Badges */}
              <div className="flex flex-wrap items-center gap-4 text-xs">
                <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200">
                  <ShieldCheck className="w-4 h-4 text-slate-900" />
                  <span className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">NAAC A+ Accredited</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200">
                  <Building className="w-4 h-4 text-slate-900" />
                  <span className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">Bengaluru City University</span>
                </div>
                <div className="flex items-center gap-2 px-3.5 py-2 bg-slate-50 border border-slate-200">
                  <Award className="w-4 h-4 text-amber-500" />
                  <span className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">AICTE Approved</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-wrap items-center gap-4 pt-2">
                <button
                  onClick={() => onNavigate('/admissions')}
                  className="px-8 py-4 bg-slate-900 text-white font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-slate-800 transition-all flex items-center gap-2 cursor-pointer"
                >
                  <span>Apply for Admission</span>
                  <ArrowRight className="w-4 h-4 text-amber-500" />
                </button>

                <button
                  onClick={() => onNavigate('/courses')}
                  className="px-6 py-4 border border-slate-900 text-slate-900 font-bold uppercase text-xs sm:text-sm tracking-widest hover:bg-slate-900 hover:text-white transition-all flex items-center gap-2 cursor-pointer"
                >
                  <BookOpen className="w-4 h-4" />
                  <span>Explore Programs</span>
                </button>
              </div>
            </div>

            {/* Right Card: Quick Admission Matrix with Geometric Balance style */}
            <div className="lg:col-span-5">
              <div className="bg-slate-900 text-white p-8 space-y-6 shadow-xl border-l-4 border-amber-500">
                <div className="flex items-center justify-between border-b border-slate-800 pb-4">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold uppercase tracking-[0.2em] text-amber-500">
                      Admissions Open 2026-27
                    </div>
                    <div className="text-lg font-bold uppercase tracking-wide text-white">
                      Admission Highlights
                    </div>
                  </div>
                  <div className="w-8 h-8 bg-amber-500 flex items-center justify-center rotate-45 shrink-0">
                    <ArrowRight className="w-4 h-4 text-slate-900 -rotate-45" />
                  </div>
                </div>

                <div className="space-y-4 text-xs text-slate-300">
                  <div className="p-4 bg-slate-800/80 border-l-2 border-amber-500 space-y-1">
                    <div className="font-bold text-white uppercase tracking-wider text-xs">
                      Highest Package: ₹18.5 LPA
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Average package ₹6.2 LPA across tech and management departments.
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/80 border-l-2 border-slate-600 space-y-1">
                    <div className="font-bold text-white uppercase tracking-wider text-xs">
                      Bangalore Tech Immersion
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Direct internships across Electronic City, Whitefield & Koramangala.
                    </div>
                  </div>

                  <div className="p-4 bg-slate-800/80 border-l-2 border-slate-600 space-y-1">
                    <div className="font-bold text-white uppercase tracking-wider text-xs">
                      Merit Scholarships
                    </div>
                    <div className="text-slate-400 text-[11px]">
                      Up to 50% tuition waiver for 10+2 / PUC academic excellence (90%+).
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-800">
                  <button
                    onClick={() => onNavigate('/register')}
                    className="w-full py-3.5 text-center text-xs font-bold uppercase tracking-widest text-slate-900 bg-amber-500 hover:bg-amber-400 transition-colors cursor-pointer"
                  >
                    Start Online Student Application
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Geometric Stat Ticker Bar */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="bg-slate-50 border border-slate-200 p-8 flex flex-wrap justify-between items-center gap-8">
          <div className="flex items-center gap-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">5,200+</span>
            <div className="h-10 w-px bg-slate-300" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 max-w-[100px]">
              Alumni Worldwide
            </span>
          </div>

          <div className="hidden lg:block h-12 w-px bg-slate-200" />

          <div className="flex items-center gap-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">98.4%</span>
            <div className="h-10 w-px bg-slate-300" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 max-w-[100px]">
              Placement Record
            </span>
          </div>

          <div className="hidden lg:block h-12 w-px bg-slate-200" />

          <div className="flex items-center gap-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">45+</span>
            <div className="h-10 w-px bg-slate-300" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 max-w-[100px]">
              Top Recruiters
            </span>
          </div>

          <div className="hidden lg:block h-12 w-px bg-slate-200" />

          <div className="flex items-center gap-6">
            <span className="text-3xl sm:text-4xl font-extrabold text-slate-900">15:1</span>
            <div className="h-10 w-px bg-slate-300" />
            <span className="text-xs uppercase tracking-widest font-bold text-slate-500 max-w-[100px]">
              Student-Faculty Ratio
            </span>
          </div>
        </div>
      </section>

      {/* Flagship Academic Programs */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 border-b border-slate-100 pb-6">
          <div>
            <div className="flex items-center gap-2 mb-2">
              <div className="h-px w-6 bg-amber-500" />
              <span className="text-xs font-bold uppercase tracking-[0.25em] text-slate-400">
                Curriculum of Excellence
              </span>
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase">
              Popular Degree Programs
            </h2>
          </div>
          <button
            onClick={() => onNavigate('/courses')}
            className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest text-slate-900 hover:text-amber-600 transition-colors cursor-pointer"
          >
            <span>View All Courses & Fee Structure</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1: B.Tech CSE */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-amber-500 p-8 flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-900 text-white">
                  Engineering
                </span>
                <span className="text-xs font-bold text-slate-400">4 Years</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase">
                B.Tech Computer Science & Engg
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                4-Year comprehensive technical degree with specialized tracks in Artificial Intelligence, Cloud Infrastructure, and Cyber Security.
              </p>
              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Eligibility</span>
                  <span className="font-semibold text-slate-800">10+2 PCM (60%+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Annual Fee</span>
                  <span className="font-bold text-slate-900">₹1,75,000 / year</span>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => onNavigate('/admissions')}
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-900 border border-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
              >
                Apply for B.Tech
              </button>
            </div>
          </div>

          {/* Card 2: BCA */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-slate-900 p-8 flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-amber-500 text-white">
                  Computing
                </span>
                <span className="text-xs font-bold text-slate-400">3 Years</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase">
                Bachelor of Computer Applications
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                3-Year intensive software development, cloud systems, and database engineering degree designed for fast-track tech careers.
              </p>
              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Eligibility</span>
                  <span className="font-semibold text-slate-800">10+2 Math/CS (50%+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Annual Fee</span>
                  <span className="font-bold text-slate-900">₹85,000 / year</span>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => onNavigate('/admissions')}
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-900 border border-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
              >
                Apply for BCA
              </button>
            </div>
          </div>

          {/* Card 3: BBA */}
          <div className="bg-white border border-slate-200 border-l-4 border-l-amber-500 p-8 flex flex-col justify-between hover:shadow-lg transition-all">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 bg-slate-900 text-white">
                  Management
                </span>
                <span className="text-xs font-bold text-slate-400">3 Years</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 uppercase">
                Bachelor of Business Admin
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed">
                Modern management education covering fintech, corporate strategy, digital marketing, and venture incubation.
              </p>
              <div className="pt-4 border-t border-slate-100 space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Eligibility</span>
                  <span className="font-semibold text-slate-800">10+2 Any Stream (50%+)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400 uppercase tracking-wider text-[10px]">Annual Fee</span>
                  <span className="font-bold text-slate-900">₹75,000 / year</span>
                </div>
              </div>
            </div>
            <div className="pt-8">
              <button
                onClick={() => onNavigate('/admissions')}
                className="w-full py-3 text-xs font-bold uppercase tracking-wider text-slate-900 border border-slate-900 hover:bg-slate-900 hover:text-white transition-all cursor-pointer"
              >
                Apply for BBA
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Bangalore Advantage & Campus Facilities */}
      <section className="bg-slate-900 text-white py-20">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="flex items-center justify-center gap-2">
              <div className="h-px w-6 bg-amber-500" />
              <span className="text-xs font-bold text-amber-500 uppercase tracking-[0.25em]">
                Campus Infrastructure
              </span>
              <div className="h-px w-6 bg-amber-500" />
            </div>
            <h2 className="text-2xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
              Bangalore Campus Advantage
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
              Our campus in Bangalore blends high-speed computing infrastructure with high-energy collaborative industry environments.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-800 border-l-4 border-amber-500 space-y-4">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center rotate-45">
                <Laptop className="w-6 h-6 text-amber-500 -rotate-45" />
              </div>
              <h3 className="font-bold text-base text-white uppercase">AI & Computing Lab</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Equipped with NVIDIA GPU workstations, cloud sandbox clusters, and gigabit fiber network for deep learning and robotics research.
              </p>
            </div>

            <div className="p-8 bg-slate-800 border-l-4 border-slate-600 space-y-4">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center rotate-45">
                <BookOpen className="w-6 h-6 text-white -rotate-45" />
              </div>
              <h3 className="font-bold text-base text-white uppercase">Central Research Hub</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Access to IEEE Xplore, ACM Digital Library, Springer, and over 45,000 physical volumes, open 24/7 during exam sessions.
              </p>
            </div>

            <div className="p-8 bg-slate-800 border-l-4 border-amber-500 space-y-4">
              <div className="w-12 h-12 bg-slate-900 flex items-center justify-center rotate-45">
                <Briefcase className="w-6 h-6 text-amber-500 -rotate-45" />
              </div>
              <h3 className="font-bold text-base text-white uppercase">Incubation & Placement</h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Dedicated mentoring cell bridging students with top Bangalore tech startups, unicorns, and Fortune 500 tech firms.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Simple 4-Step Admission Journey */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-10">
        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="flex items-center justify-center gap-2">
            <div className="h-px w-6 bg-amber-500" />
            <span className="text-xs font-bold text-slate-400 uppercase tracking-[0.25em]">
              Clear Workflow
            </span>
            <div className="h-px w-6 bg-amber-500" />
          </div>
          <h2 className="text-2xl sm:text-4xl font-extrabold text-slate-900 uppercase">
            Admission Journey
          </h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-slate-50 p-6 border border-slate-200 border-t-4 border-t-slate-900 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Step 01
            </div>
            <h4 className="font-bold text-sm text-slate-900 uppercase">Register Account</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Create your student profile with personal details and contact verification.
            </p>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 border-t-4 border-t-amber-500 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-amber-600">
              Step 02
            </div>
            <h4 className="font-bold text-sm text-slate-900 uppercase">Fill Application</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Enter 10+2 / PUC academic scores and select your preferred course.
            </p>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 border-t-4 border-t-slate-900 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-slate-400">
              Step 03
            </div>
            <h4 className="font-bold text-sm text-slate-900 uppercase">Track Review</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Our admissions committee evaluates eligibility and marks under review.
            </p>
          </div>

          <div className="bg-slate-50 p-6 border border-slate-200 border-t-4 border-t-emerald-600 space-y-3">
            <div className="text-xs font-extrabold uppercase tracking-widest text-emerald-600">
              Step 04
            </div>
            <h4 className="font-bold text-sm text-slate-900 uppercase">Seat Confirmation</h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Receive official approval remarks, seat allotment, and admission slip.
            </p>
          </div>
        </div>

        <div className="text-center pt-6">
          <button
            onClick={() => onNavigate('/register')}
            className="px-10 py-4 font-bold text-xs sm:text-sm uppercase tracking-widest text-white bg-slate-900 hover:bg-slate-800 transition-all inline-flex items-center gap-2 cursor-pointer"
          >
            <span>Start Your Online Application</span>
            <ArrowRight className="w-4 h-4 text-amber-500" />
          </button>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

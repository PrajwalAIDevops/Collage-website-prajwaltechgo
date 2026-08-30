import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ArrowRight,
  Loader2,
  Users,
} from 'lucide-react';
import { api } from '../services/api.js';
import { Course } from '../types/index.js';
import { useAuth } from '../context/AuthContext.js';

interface CoursesPageProps {
  onNavigate: (path: string) => void;
}

export const CoursesPage: React.FC<CoursesPageProps> = ({ onNavigate }) => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState<'ALL' | 'TECH' | 'MANAGEMENT'>('ALL');
  const { user, isStudent } = useAuth();

  useEffect(() => {
    api.getCourses()
      .then((res) => {
        if (res.data) setCourses(res.data);
      })
      .catch((err) => console.error('Failed to load courses:', err))
      .finally(() => setLoading(false));
  }, []);

  const handleApply = (_courseId: number) => {
    if (user && isStudent) {
      onNavigate('/student/application');
    } else {
      onNavigate('/register');
    }
  };

  const filteredCourses = courses.filter((c) => {
    if (selectedFilter === 'TECH') {
      return c.name.includes('BCA') || c.name.includes('B.Tech') || c.name.includes('B.Sc');
    }
    if (selectedFilter === 'MANAGEMENT') {
      return c.name.includes('BBA') || c.name.includes('B.Com');
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-16 bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Undergraduate Degree Programs 2026-27</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Academic Courses & Degrees
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            All programs at Prajwal Tech Go College are industry-aligned, NEP-compliant, and crafted to prepare you for high-impact careers in Bangalore's technology ecosystem and global markets.
          </p>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setSelectedFilter('ALL')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedFilter === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Programs ({courses.length})
            </button>
            <button
              onClick={() => setSelectedFilter('TECH')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedFilter === 'TECH'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Computer Science & Engineering
            </button>
            <button
              onClick={() => setSelectedFilter('MANAGEMENT')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedFilter === 'MANAGEMENT'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Management & Commerce
            </button>
          </div>
        </div>
      </section>

      {/* Courses List */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        {loading ? (
          <div className="flex flex-col items-center justify-center py-20 gap-3">
            <Loader2 className="w-8 h-8 text-amber-500 animate-spin" />
            <span className="text-sm text-slate-500 font-medium">Loading courses from database...</span>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white border border-slate-200 border-l-4 border-l-slate-900 hover:border-l-amber-500 hover:shadow-lg transition-all flex flex-col justify-between"
              >
                <div className="p-6 sm:p-8 space-y-5">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-slate-100 text-slate-800 border border-slate-300 mb-2">
                        {course.duration}
                      </span>
                      <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 leading-snug">
                        {course.name}
                      </h3>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-lg font-extrabold text-slate-900 font-mono">
                        ₹{Number(course.fees).toLocaleString('en-IN')}
                      </div>
                      <span className="text-[11px] text-slate-400">per academic year</span>
                    </div>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {course.description}
                  </p>

                  {/* Highlights Box */}
                  <div className="p-4 bg-slate-50 border border-slate-200 space-y-2 text-xs">
                    <div>
                      <strong className="text-slate-700 block mb-0.5 uppercase tracking-wider text-[11px]">Eligibility Criteria:</strong>
                      <span className="text-slate-600">{course.eligibility}</span>
                    </div>
                    <div className="flex items-center justify-between pt-2 border-t border-slate-200 text-slate-500">
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-amber-600" />
                        <span>Intake Capacity: <strong>{course.available_seats} Seats</strong></span>
                      </span>
                      <span className="text-emerald-700 font-semibold uppercase text-[11px] tracking-wider">Admissions Open</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 py-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between">
                  <span className="text-xs text-slate-500">
                    Hostel & Transport facilities available
                  </span>
                  <button
                    onClick={() => handleApply(course.id)}
                    className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-slate-800 text-white shadow-sm transition-all cursor-pointer"
                  >
                    <span>Apply for this Program</span>
                    <ArrowRight className="w-3.5 h-3.5 text-amber-400" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
};

export default CoursesPage;

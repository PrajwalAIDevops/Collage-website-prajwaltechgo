import React, { useState } from 'react';
import {
  Mail,
  Users,
} from 'lucide-react';

interface FacultyPageProps {
  onNavigate: (path: string) => void;
}

export const FacultyPage: React.FC<FacultyPageProps> = () => {
  const [selectedDept, setSelectedDept] = useState<string>('ALL');

  const facultyList = [
    {
      name: 'Dr. K. S. Venkatesh',
      dept: 'Computer Science & Engineering',
      category: 'TECH',
      designation: 'Principal & Professor',
      qualification: 'Ph.D. (Computer Science), IISc Bangalore',
      specialization: 'Distributed Systems, Cloud Architecture & Machine Learning',
      email: 'principal@prajwaltechgo.edu',
    },
    {
      name: 'Dr. Priya Ramachandran',
      dept: 'Computer Applications (BCA / B.Sc)',
      category: 'TECH',
      designation: 'Professor & Head of Department',
      qualification: 'Ph.D., NIT Karnataka, Surathkal',
      specialization: 'Artificial Intelligence, Natural Language Processing, Web Systems',
      email: 'priya.r@prajwaltechgo.edu',
    },
    {
      name: 'Prof. Ramesh N. Gowda',
      dept: 'Management Studies (BBA)',
      category: 'MGMT',
      designation: 'Associate Professor & HOD',
      qualification: 'MBA (Marketing & Finance), Ph.D. (Pursuing - IIMB)',
      specialization: 'Strategic Management, Startup Incubation, Digital Marketing',
      email: 'ramesh.gowda@prajwaltechgo.edu',
    },
    {
      name: 'Dr. Ananya S. Hegde',
      dept: 'Commerce & Financial Analytics (B.Com)',
      category: 'MGMT',
      designation: 'Professor & HOD',
      qualification: 'Ph.D. (Commerce & Fintech), Bengaluru City University',
      specialization: 'Corporate Taxation, Advanced Auditing, Financial Modeling',
      email: 'ananya.hegde@prajwaltechgo.edu',
    },
    {
      name: 'Prof. Sandeep Kulkarni',
      dept: 'Computer Science & Engineering',
      category: 'TECH',
      designation: 'Assistant Professor',
      qualification: 'M.Tech (Software Engineering), IIT Madras',
      specialization: 'Full Stack Engineering, DevOps, Microservices Architecture',
      email: 'sandeep.k@prajwaltechgo.edu',
    },
    {
      name: 'Prof. Shalini Murthy',
      dept: 'Data Science & Computational Math',
      category: 'TECH',
      designation: 'Assistant Professor',
      qualification: 'M.Sc (Mathematics & Computing), University of Mysore',
      specialization: 'Algorithmic Graph Theory, Applied Statistics, Cryptography',
      email: 'shalini.m@prajwaltechgo.edu',
    },
  ];

  const filteredFaculty = facultyList.filter((f) => {
    if (selectedDept === 'TECH') return f.category === 'TECH';
    if (selectedDept === 'MGMT') return f.category === 'MGMT';
    return true;
  });

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Users className="w-3.5 h-3.5" />
            <span>Distinguished Faculty</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Academic Mentors & Faculty
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Our professors and lecturers bring rich academic pedigree from India's premier institutes (IISc, IITs, NITs) alongside extensive corporate consulting and research experience.
          </p>

          {/* Department Filters */}
          <div className="flex flex-wrap gap-2 pt-4">
            <button
              onClick={() => setSelectedDept('ALL')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedDept === 'ALL'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              All Departments ({facultyList.length})
            </button>
            <button
              onClick={() => setSelectedDept('TECH')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedDept === 'TECH'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Computer Science & Engineering
            </button>
            <button
              onClick={() => setSelectedDept('MGMT')}
              className={`px-4 py-2 text-xs uppercase tracking-wider font-bold transition-all cursor-pointer ${
                selectedDept === 'MGMT'
                  ? 'bg-amber-500 text-slate-950 shadow-xs'
                  : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
              }`}
            >
              Management & Commerce
            </button>
          </div>
        </div>
      </section>

      {/* Faculty Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredFaculty.map((f, idx) => (
            <div
              key={idx}
              className="bg-white border border-slate-200 border-l-4 border-l-slate-900 p-6 space-y-4 hover:border-l-amber-500 hover:shadow-lg transition-all flex flex-col justify-between"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="w-12 h-12 bg-slate-900 text-amber-400 font-bold text-lg flex items-center justify-center rotate-45 shrink-0">
                    <span className="-rotate-45">{f.name.split(' ')[1]?.charAt(0) || f.name.charAt(0)}</span>
                  </div>
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 bg-slate-100 text-slate-800 border border-slate-300">
                    {f.dept.split('(')[0]}
                  </span>
                </div>

                <div>
                  <h3 className="font-bold text-base uppercase tracking-tight text-slate-900">{f.name}</h3>
                  <p className="text-xs font-bold text-amber-600 uppercase tracking-wide">{f.designation}</p>
                  <p className="text-xs text-slate-500 mt-0.5">{f.qualification}</p>
                </div>

                <div className="p-3 bg-slate-50 border border-slate-200 text-xs">
                  <span className="font-bold text-slate-700 block mb-0.5 uppercase tracking-wider text-[11px]">Research & Expertise:</span>
                  <span className="text-slate-600 leading-relaxed">{f.specialization}</span>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center gap-2 text-xs text-slate-500">
                <Mail className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                <span className="truncate">{f.email}</span>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default FacultyPage;

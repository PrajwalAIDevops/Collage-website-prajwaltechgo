import React from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  ShieldCheck,
  Award,
  BookOpen,
} from 'lucide-react';

interface FooterProps {
  onNavigate: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-900 text-slate-400 border-t border-slate-800">
      {/* Geometric Highlights Bar */}
      <div className="border-b border-slate-800 bg-slate-950 py-6 px-6 sm:px-12">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-between items-center gap-6">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 border border-slate-700 flex items-center justify-center rotate-45 shrink-0">
              <Award className="w-5 h-5 text-amber-500 -rotate-45" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white">NAAC A+ Accredited</div>
              <div className="text-[11px] text-slate-400">Highest Category Institutional Grade</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-800" />

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 border border-slate-700 flex items-center justify-center rotate-45 shrink-0">
              <ShieldCheck className="w-5 h-5 text-emerald-400 -rotate-45" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white">AICTE & UGC Recognized</div>
              <div className="text-[11px] text-slate-400">Affiliated to Bengaluru City University</div>
            </div>
          </div>

          <div className="hidden md:block w-px h-10 bg-slate-800" />

          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-slate-900 border border-slate-700 flex items-center justify-center rotate-45 shrink-0">
              <BookOpen className="w-5 h-5 text-amber-500 -rotate-45" />
            </div>
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white">Bangalore Tech Hub</div>
              <div className="text-[11px] text-slate-400">Direct Industry Ecosystem Placements</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="max-w-7xl mx-auto px-6 sm:px-12 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10">
          {/* Brand & Description */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-white flex items-center justify-center rotate-45 shrink-0">
                <span className="text-slate-900 font-bold text-lg -rotate-45">P</span>
              </div>
              <div>
                <div className="text-lg font-extrabold tracking-tight text-white uppercase">
                  Prajwal Tech Go <span className="text-amber-500">College</span>
                </div>
                <div className="text-[10px] text-slate-400 font-bold uppercase tracking-[0.2em]">
                  Bangalore, Karnataka, India
                </div>
              </div>
            </div>
            <p className="text-xs leading-relaxed text-slate-400 max-w-md">
              A premier technological and management institution delivering undergraduate engineering, computer applications, and commercial degrees with cutting-edge laboratories and active research mentors.
            </p>
            <div className="flex items-center gap-2 pt-2">
              <div className="h-px w-6 bg-amber-500" />
              <span className="text-[11px] uppercase tracking-widest text-slate-400 font-semibold">
                Code: PTGC-KA-2026
              </span>
            </div>
          </div>

          {/* Academic Programs */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500" />
              <span>Programs</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button
                  onClick={() => onNavigate('/courses')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  B.Tech Computer Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  BCA Computer Applications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  B.Sc Computer Science
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  BBA Business Administration
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigate('/courses')}
                  className="hover:text-white transition-colors text-left cursor-pointer"
                >
                  B.Com Commerce & Finance
                </button>
              </li>
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500" />
              <span>Navigation</span>
            </h4>
            <ul className="space-y-2.5 text-xs text-slate-400 font-medium">
              <li>
                <button onClick={() => onNavigate('/admissions')} className="hover:text-white transition-colors cursor-pointer">
                  Admission Process
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/campus')} className="hover:text-white transition-colors cursor-pointer">
                  Campus Facilities
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/faculty')} className="hover:text-white transition-colors cursor-pointer">
                  Faculty Members
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/about')} className="hover:text-white transition-colors cursor-pointer">
                  About College
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('/contact')} className="hover:text-white transition-colors cursor-pointer">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Location & Desk */}
          <div>
            <h4 className="font-bold text-white text-xs uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-amber-500" />
              <span>Campus Desk</span>
            </h4>
            <div className="space-y-3 text-xs text-slate-400">
              <div className="flex items-start gap-2.5">
                <MapPin className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
                <span className="leading-relaxed">
                  Prajwal Tech Go Campus, Tech Innovation Corridor, Bangalore, Karnataka - 560038
                </span>
              </div>
              <div className="flex items-center gap-2.5">
                <Phone className="w-4 h-4 text-amber-500 shrink-0" />
                <span>+91 80 2845 6789</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Mail className="w-4 h-4 text-amber-500 shrink-0" />
                <span>info@prajwaltechgo.edu</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Clock className="w-4 h-4 text-amber-500 shrink-0" />
                <span>Mon - Sat: 9:00 AM - 5:00 PM</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Geometric Bar */}
        <div className="mt-12 pt-8 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-slate-500 uppercase tracking-wider">
          <div>
            © {new Date().getFullYear()} Prajwal Tech Go College, Bangalore. All Rights Reserved.
          </div>
          <div className="flex items-center gap-6">
            <span>Affiliated with Bengaluru City University</span>
            <span>•</span>
            <span>Approved by AICTE, New Delhi</span>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

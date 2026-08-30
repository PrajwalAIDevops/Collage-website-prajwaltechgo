import React from 'react';
import {
  Laptop,
  BookOpen,
  Coffee,
  Trophy,
  Compass,
  Building2,
  Sparkles,
} from 'lucide-react';

interface CampusLifePageProps {
  onNavigate: (path: string) => void;
}

export const CampusLifePage: React.FC<CampusLifePageProps> = () => {
  const facilities = [
    {
      title: 'Advanced AI & IoT Sandbox',
      desc: 'Hands-on computing lab with high-speed GPU clusters, edge computing devices, and maker workstations.',
      icon: Laptop,
    },
    {
      title: 'Central Digital Knowledge Hub',
      desc: 'Over 45,000 reference volumes, quiet research carrels, discussion pods, and high-speed digital indexing.',
      icon: BookOpen,
    },
    {
      title: 'Indoor & Outdoor Sports Arena',
      desc: 'Basketball courts, indoor badminton arenas, table tennis lounge, and state-of-the-art student gymnasium.',
      icon: Trophy,
    },
    {
      title: 'Hygienic Multi-Cuisine Cafeteria',
      desc: 'Nutritious South Indian, North Indian, and continental breakfast and lunch options prepared in clean culinary stations.',
      icon: Coffee,
    },
    {
      title: 'Student Innovation & Hackathon Hub',
      desc: 'Active student clubs including Google Developer Student Club, IEEE Chapter, and Entrepreneurship Cell (E-Cell).',
      icon: Sparkles,
    },
    {
      title: 'Secure On-Campus Residences',
      desc: 'Separate residential hostels for boys and girls with 24/7 security, Wi-Fi connectivity, laundry, and medical care.',
      icon: Building2,
    },
  ];

  const festivals = [
    {
      name: 'TechTantra (Annual Tech Fest)',
      desc: '36-Hour National Level Hackathon, Coding Marathons, Robotics Battles, and Project Expos with venture capitalists.',
      badge: 'October',
    },
    {
      name: 'Samskruti (Cultural Extravaganza)',
      desc: 'Celebrating Karnataka heritage, classical dance, battle of the bands, theatre productions, and celebrity musical concerts.',
      badge: 'February',
    },
    {
      name: 'Prajwal Sports League (PSL)',
      desc: 'Inter-college tournaments spanning Cricket, Football, Basketball, Volleyball, Badminton, and Athletics.',
      badge: 'December',
    },
  ];

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <Compass className="w-3.5 h-3.5" />
            <span>Vibrant Student Community</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Campus Life & Facilities
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Experience an invigorating campus life at Prajwal Tech Go College. From high-tech computing labs and athletic competitions to cultural fests, learning extends far beyond lecture halls.
          </p>
        </div>
      </section>

      {/* Facilities Grid */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            World-Class Amenities
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Infrastructure Designed for Growth
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {facilities.map((fac, idx) => {
            const Icon = fac.icon;
            return (
              <div
                key={idx}
                className="bg-white border border-slate-200 border-l-4 border-l-slate-900 p-6 space-y-3 hover:border-l-amber-500 hover:shadow-md transition-all"
              >
                <div className="w-12 h-12 bg-slate-900 text-amber-400 flex items-center justify-center rotate-45 shrink-0">
                  <Icon className="w-6 h-6 -rotate-45" />
                </div>
                <h3 className="font-bold text-slate-900 text-base uppercase tracking-tight">{fac.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{fac.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Annual Festivals */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-amber-600 uppercase tracking-widest">
            Celebrations & Tradition
          </span>
          <h2 className="text-2xl font-bold uppercase tracking-tight text-slate-900">
            Major Events & Festivals
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {festivals.map((fest, idx) => (
            <div
              key={idx}
              className="bg-slate-900 text-white p-6 border-l-4 border-amber-500 space-y-3 flex flex-col justify-between"
            >
              <div className="space-y-2">
                <span className="inline-block px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider bg-amber-500 text-slate-950">
                  {fest.badge}
                </span>
                <h3 className="text-lg font-bold uppercase tracking-tight text-white">{fest.name}</h3>
                <p className="text-xs text-slate-300 leading-relaxed">{fest.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default CampusLifePage;

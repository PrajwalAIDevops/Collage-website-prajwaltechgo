import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle2,
  Navigation,
  Train,
  Plane,
  Building,
} from 'lucide-react';

interface ContactPageProps {
  onNavigate: (path: string) => void;
}

export const ContactPage: React.FC<ContactPageProps> = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: 'Admission Inquiry 2026-27',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="space-y-16 pb-16 bg-white">
      {/* Header */}
      <section className="bg-slate-900 text-white py-14 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-6 sm:px-12 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800 border border-slate-700 text-amber-400 text-xs font-bold uppercase tracking-wider">
            <MapPin className="w-3.5 h-3.5" />
            <span>Bangalore Campus</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold uppercase tracking-tight text-white">
            Contact & Campus Location
          </h1>
          <p className="text-sm sm:text-base text-slate-300 max-w-3xl leading-relaxed">
            Have questions regarding admissions, eligibility, or campus tours? Reach out to our dedicated admissions counselor team or visit our Bangalore campus.
          </p>
        </div>
      </section>

      {/* Main Grid: Contact Info + Inquiry Form */}
      <section className="max-w-7xl mx-auto px-6 sm:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left Col: Contact Information Cards */}
          <div className="lg:col-span-5 space-y-6">
            <div className="bg-white p-6 sm:p-8 border border-slate-200 border-l-4 border-l-slate-900 space-y-6">
              <h3 className="text-lg font-bold uppercase tracking-tight text-slate-900">
                Prajwal Tech Go College Campus
              </h3>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 rotate-45">
                    <MapPin className="w-4 h-4 -rotate-45" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-bold uppercase text-[11px] tracking-wider mb-0.5">Campus Address</strong>
                    <span className="text-slate-600 leading-relaxed">
                      #45 Tech Innovation Corridor, 100ft Road, Indiranagar, Bangalore, Karnataka - 560038, India
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 rotate-45">
                    <Phone className="w-4 h-4 -rotate-45" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-bold uppercase text-[11px] tracking-wider mb-0.5">Helpline Numbers</strong>
                    <div className="text-slate-600">
                      <div>Admissions: +91 80 2845 6789</div>
                      <div>General Desk: +91 80 2845 6790</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 rotate-45">
                    <Mail className="w-4 h-4 -rotate-45" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-bold uppercase text-[11px] tracking-wider mb-0.5">Email Inquiries</strong>
                    <div className="text-slate-600">
                      <div>admissions@prajwaltechgo.edu</div>
                      <div>info@prajwaltechgo.edu</div>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 bg-slate-900 text-amber-400 flex items-center justify-center shrink-0 mt-0.5 rotate-45">
                    <Clock className="w-4 h-4 -rotate-45" />
                  </div>
                  <div>
                    <strong className="block text-slate-800 font-bold uppercase text-[11px] tracking-wider mb-0.5">Office Timings</strong>
                    <span className="text-slate-600">Monday – Saturday: 9:00 AM – 5:00 PM IST</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Transit Route Directions */}
            <div className="bg-slate-900 text-white p-6 border-l-4 border-amber-500 space-y-4">
              <h4 className="font-bold text-sm text-white uppercase tracking-wider flex items-center gap-2">
                <Navigation className="w-4 h-4 text-amber-400" />
                <span>How to Reach Campus</span>
              </h4>
              <div className="space-y-3 text-xs text-slate-300">
                <div className="flex items-start gap-2">
                  <Train className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>By Metro:</strong> 5-minute walk from Indiranagar Metro Station (Purple Line).</span>
                </div>
                <div className="flex items-start gap-2">
                  <Building className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                  <span><strong>From Majestic / City Railway Station:</strong> Direct BMTC buses (333 / 335 series) every 10 mins.</span>
                </div>
                <div className="flex items-start gap-2">
                  <Plane className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span><strong>From Bengaluru Airport (BLR):</strong> Vayu Vajra KIA-7 directly halts at Indiranagar TTMC.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Col: Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white p-6 sm:p-10 border border-slate-200 border-t-4 border-t-amber-500">
              <h3 className="text-xl font-bold uppercase tracking-tight text-slate-900 mb-2">
                Send an Admission Inquiry
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 mb-6">
                Fill out the form below and an admissions officer will connect with you within 24 hours.
              </p>

              {submitted ? (
                <div className="p-6 bg-emerald-50 border border-emerald-200 text-center space-y-3">
                  <CheckCircle2 className="w-12 h-12 text-emerald-600 mx-auto" />
                  <h4 className="font-bold text-slate-900 text-base uppercase">Inquiry Submitted Successfully!</h4>
                  <p className="text-xs text-slate-600 max-w-md mx-auto">
                    Thank you for reaching out to Prajwal Tech Go College. Our admission desk will get in touch with you shortly at <strong>{formData.email}</strong>.
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', phone: '', subject: 'Admission Inquiry', message: '' });
                    }}
                    className="mt-3 px-5 py-2 text-xs font-bold uppercase tracking-wider text-slate-900 bg-amber-500 hover:bg-amber-400 cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Your Full Name *</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Ramesh Kumar"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Email Address *</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="e.g. student@example.com"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Phone Number *</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="e.g. 9876543210"
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Course of Interest</label>
                      <select
                        value={formData.subject}
                        onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                        className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                      >
                        <option>BCA (Computer Applications)</option>
                        <option>B.Tech Computer Science & Engg</option>
                        <option>B.Sc Computer Science</option>
                        <option>BBA (Business Administration)</option>
                        <option>B.Com (Commerce & Finance)</option>
                        <option>General Campus Inquiry</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-slate-700 uppercase tracking-wider text-[11px] mb-1">Message / Specific Questions</label>
                    <textarea
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Please ask about eligibility, fee structures, or hostel accommodations..."
                      className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-300 focus:ring-1 focus:ring-amber-500 focus:border-amber-500"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3.5 text-center font-bold text-xs uppercase tracking-widest text-slate-900 bg-amber-500 hover:bg-amber-400 shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                  >
                    <Send className="w-4 h-4 text-slate-900" />
                    <span>Submit Inquiry</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;

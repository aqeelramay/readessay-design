import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="w-full min-h-[70vh] bg-[#FAFAFA] flex items-center justify-center py-16 px-6">
      <div className="max-w-2xl mx-auto text-center space-y-8 bg-white p-8 sm:p-12 rounded-3xl shadow-sm border border-slate-100">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-[#FFF2EC] text-[#FF641A] mx-auto shadow-sm">
          <span className="material-symbols-outlined text-[44px]">search_off</span>
        </div>

        <div className="space-y-3">
          <span className="text-xs uppercase tracking-wider font-bold text-[#FF641A]">
            Error 404
          </span>
          <h1 className="font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-[#243445] tracking-tight">
            Page Not Found
          </h1>
          <p className="text-slate-600 text-sm sm:text-base max-w-lg mx-auto leading-relaxed">
            The service, academic paper exemplar, or coursework guide you are looking for does not exist or may have been relocated.
          </p>
        </div>

        {/* Quick Links Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-2 text-left">
          <Link
            href="/"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-[#FFF2EC] text-[#243445] hover:text-[#FF641A] transition-colors border border-slate-100 group"
          >
            <span className="material-symbols-outlined text-[#FF641A] text-[24px]">
              home
            </span>
            <div>
              <span className="font-heading font-bold text-sm block">Homepage</span>
              <span className="text-xs text-slate-500">Return to main storefront</span>
            </div>
          </Link>

          <Link
            href="/services"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-[#FFF2EC] text-[#243445] hover:text-[#FF641A] transition-colors border border-slate-100 group"
          >
            <span className="material-symbols-outlined text-[#FF641A] text-[24px]">
              apps
            </span>
            <div>
              <span className="font-heading font-bold text-sm block">Browse Services</span>
              <span className="text-xs text-slate-500">Explore 26+ subject disciplines</span>
            </div>
          </Link>

          <Link
            href="/reviews"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-[#FFF2EC] text-[#243445] hover:text-[#FF641A] transition-colors border border-slate-100 group"
          >
            <span className="material-symbols-outlined text-[#FF641A] text-[24px]">
              star
            </span>
            <div>
              <span className="font-heading font-bold text-sm block">Student Reviews</span>
              <span className="text-xs text-slate-500">Verified feedback and ratings</span>
            </div>
          </Link>

          <Link
            href="/samples"
            className="flex items-center gap-3 p-4 rounded-xl bg-slate-50 hover:bg-[#FFF2EC] text-[#243445] hover:text-[#FF641A] transition-colors border border-slate-100 group"
          >
            <span className="material-symbols-outlined text-[#FF641A] text-[24px]">
              description
            </span>
            <div>
              <span className="font-heading font-bold text-sm block">Academic Samples</span>
              <span className="text-xs text-slate-500">View real exemplar papers</span>
            </div>
          </Link>
        </div>

        {/* Action CTAs */}
        <div className="pt-4 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/services"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#FF641A] hover:bg-[#E8540E] text-white text-sm sm:text-base font-semibold shadow-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">arrow_back</span>
            <span>Browse All Services</span>
          </Link>
          <a
            href="https://wa.me/923138400066"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full bg-[#059669] hover:bg-emerald-600 text-white text-sm sm:text-base font-semibold shadow-md transition-colors"
          >
            <span className="material-symbols-outlined text-[18px]">chat</span>
            <span>WhatsApp Concierge</span>
          </a>
        </div>
      </div>
    </div>
  );
}

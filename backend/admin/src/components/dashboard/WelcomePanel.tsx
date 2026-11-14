export function WelcomePanel() {
  return (
    <section
      aria-label="Welcome and operational status"
      className="bg-surface border border-border rounded-xl shadow-xs p-6 sm:p-7"
    >
      {/* Main Content & Actions Row */}
      <div className="mt-3 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
        <div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-text-primary tracking-tight">
            Welcome to ReadEssay Operations
          </h1>
          <p className="text-sm text-text-secondary max-w-xl mt-1.5 leading-relaxed">
            Centralized administrative hub for managing essays, reviewing submissions,
            moderating client feedback, and directing top academic writers.
          </p>
        </div>
      </div>
    </section>
  );
}


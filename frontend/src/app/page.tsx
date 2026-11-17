export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-8 bg-surface-canvas text-text-primary">
      <div className="max-w-2xl text-center space-y-6">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-subtle text-brand-orange text-sm font-semibold">
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse" />
          ReadEssay Platform
        </div>
        <h1 className="text-4xl sm:text-5xl font-extrabold tracking-tight text-text-primary">
          #1 Academic Support Platform
        </h1>
        <p className="text-lg text-text-secondary">
          Premier academic research assistance, proofreading, essay guidance, and expert support.
          Frontend initialization complete.
        </p>
      </div>
    </main>
  );
}

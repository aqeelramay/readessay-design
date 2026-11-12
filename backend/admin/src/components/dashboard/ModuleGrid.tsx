import { NAVIGATION_ITEMS } from "@/config/navigation";
import { ModuleCard } from "./ModuleCard";

export function ModuleGrid() {
  return (
    <section aria-label="Management Modules">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2 mb-5">
        <div>
          <h2 className="text-lg font-bold text-text-primary tracking-tight">
            Management Modules
          </h2>
          <p className="text-sm text-text-secondary mt-0.5">
            Select any workspace module below to jump directly into full control mode.
          </p>
        </div>
      </div>

      {/* Grid of 9 Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {NAVIGATION_ITEMS.map((item) => (
          <ModuleCard key={item.id} item={item} />
        ))}
      </div>
    </section>
  );
}


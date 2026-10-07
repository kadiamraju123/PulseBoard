import { PreferencesForm } from "@/components/settings/preferences-form";

export default function SettingsPage() {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm uppercase tracking-[0.2em] text-violet-500">Settings</p>
        <h1 className="mt-2 text-3xl font-semibold text-slate-900 dark:text-white">Personalization</h1>
      </div>

      <section className="rounded-3xl border border-slate-200 bg-white p-6 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <PreferencesForm />
      </section>
    </div>
  );
}

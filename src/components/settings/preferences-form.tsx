"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { INTEREST_OPTIONS } from "@/lib/mock-data";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { setPreferences } from "@/store/slices/preferencesSlice";
import type { Interest } from "@/types/content";

const interestEnum = z.enum([
  "Technology",
  "Artificial Intelligence",
  "Business",
  "Finance",
  "Sports",
  "Entertainment",
  "Science",
  "Gaming",
  "Travel",
  "Health",
]);

const preferencesSchema = z.object({
  interests: z.array(interestEnum).min(1, "Select at least one interest"),
});

export function PreferencesForm() {
  const dispatch = useAppDispatch();
  const selected = useAppSelector((state) => state.preferences as Interest[]);

  const form = useForm<{ interests: Interest[] }>({
    resolver: zodResolver(preferencesSchema),
    defaultValues: { interests: selected },
  });

  const submit = (values: { interests: Interest[] }) => {
    dispatch(setPreferences(values.interests));
  };

  const toggle = (interest: Interest) => {
    const next = selected.includes(interest)
      ? selected.filter((item) => item !== interest)
      : [...selected, interest];
    form.setValue("interests", next, { shouldValidate: true });
    dispatch(setPreferences(next));
  };

  return (
    <form onSubmit={form.handleSubmit(submit)} className="space-y-6">
      <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
        {INTEREST_OPTIONS.map((interest) => {
          const active = selected.includes(interest);
          return (
            <button
              key={interest}
              type="button"
              aria-pressed={active}
              onClick={() => toggle(interest)}
              className={`rounded-2xl border px-4 py-3 text-left text-sm font-medium transition ${
                active
                  ? "border-violet-500 bg-violet-500 text-white shadow-sm"
                  : "border-slate-200 bg-white text-slate-700 hover:border-violet-300 hover:bg-violet-50 dark:border-slate-700 dark:bg-slate-900 dark:text-slate-200 dark:hover:bg-slate-800"
              }`}
            >
              {interest}
            </button>
          );
        })}
      </div>

      {form.formState.errors.interests ? (
        <p className="text-sm text-rose-500">{form.formState.errors.interests.message}</p>
      ) : null}

      <div className="flex items-center justify-between border-t border-slate-200 pt-6 dark:border-slate-800">
        <p className="text-sm text-slate-500 dark:text-slate-400">{selected.length} interests selected</p>
        <button
          type="submit"
          className="rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-medium text-white dark:bg-violet-500"
        >
          Save preferences
        </button>
      </div>
    </form>
  );
}

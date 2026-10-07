"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("raju@pulseboard.ai");
  const [password, setPassword] = useState("PulseBoard123");

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    router.push("/dashboard");
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-100 px-4 dark:bg-slate-950">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <p className="text-sm uppercase tracking-[0.2em] text-violet-500">Welcome back</p>
        <h1 className="mt-3 text-3xl font-semibold text-slate-900 dark:text-white">Login to PulseBoard</h1>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Email</label>
            <input value={email} onChange={(event) => setEmail(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
          </div>
          <div>
            <label className="mb-2 block text-sm text-slate-700 dark:text-slate-200">Password</label>
            <input type="password" value={password} onChange={(event) => setPassword(event.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 dark:border-slate-700 dark:bg-slate-800" />
          </div>

          <button type="submit" className="w-full rounded-xl bg-slate-900 px-4 py-3 font-medium text-white dark:bg-violet-500">
            Sign in
          </button>
        </form>

        <p className="mt-4 text-center text-sm text-slate-600 dark:text-slate-300">
          Need an account? <Link href="/signup" className="font-medium text-violet-500">Create one</Link>
        </p>
      </div>
    </div>
  );
}

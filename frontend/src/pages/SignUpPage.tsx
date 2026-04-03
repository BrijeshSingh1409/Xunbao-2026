import {useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function SignUpPage() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const loading = useAuthStore((state) => state.loading);

  const [form, setForm] = useState({
    email: "",
    password: "",
    username: "",
    universityRollNo: "",
    college: "",
    branch: "",
    mobileNumber: "",
  });

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(form);
    navigate("/verify");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6 py-10">
      <form onSubmit={onSubmit} className="glass w-full max-w-2xl rounded-3xl p-8">
        <h1 className="mb-6 text-3xl font-bold">Signup</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Email" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Password" type="password" value={form.password} onChange={(e) => onChange("password", e.target.value)} />
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Username" value={form.username} onChange={(e) => onChange("username", e.target.value)} />
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="University Roll No" value={form.universityRollNo} onChange={(e) => onChange("universityRollNo", e.target.value)} />
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="College" value={form.college} onChange={(e) => onChange("college", e.target.value)} />
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3" placeholder="Branch" value={form.branch} onChange={(e) => onChange("branch", e.target.value)} />
          <input className="rounded-xl border border-white/10 bg-slate-950/50 p-3 md:col-span-2" placeholder="Mobile Number" value={form.mobileNumber} onChange={(e) => onChange("mobileNumber", e.target.value)} />
        </div>
        <button className="mt-6 w-full rounded-xl bg-amber-300 px-4 py-3 font-bold text-slate-950" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p className="mt-5 text-sm text-slate-300">
          Account already exists? <Link to="/sign-in" className="font-semibold text-cyan-300">Sign-in</Link>
        </p>
      </form>
    </main>
  );
}

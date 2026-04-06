import { useState } from "react";
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

  const [showPassword, setShowPassword] = useState(false);

  const onChange = (key: keyof typeof form, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await signUp(form);
    navigate("/verify");
  };

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form onSubmit={onSubmit} className="treasure-shell w-full max-w-2xl rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs">Create Your Explorer</p>
        <h1 className="treasure-title mb-6 text-4xl font-black">Sign Up</h1>
        <div className="grid gap-4 md:grid-cols-2">
          <input className="treasure-field" placeholder="Email" value={form.email} onChange={(e) => onChange("email", e.target.value)} />
          <div className="relative">
            <input
              className="treasure-field pr-20"
              placeholder="Password"
              type={showPassword ? "text" : "password"}
              value={form.password}
              onChange={(e) => onChange("password", e.target.value)}
            />
            <button
              type="button"
              onClick={() => setShowPassword((prev) => !prev)}
              className="treasure-toggle absolute right-3 top-1/2 -translate-y-1/2 text-sm"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>
          <input className="treasure-field" placeholder="Username" value={form.username} onChange={(e) => onChange("username", e.target.value)} />
          <input className="treasure-field" placeholder="University Roll No" value={form.universityRollNo} onChange={(e) => onChange("universityRollNo", e.target.value)} />
          <input className="treasure-field" placeholder="College" value={form.college} onChange={(e) => onChange("college", e.target.value)} />
          <input className="treasure-field" placeholder="Branch" value={form.branch} onChange={(e) => onChange("branch", e.target.value)} />
          <input className="treasure-field md:col-span-2" placeholder="Mobile Number" value={form.mobileNumber} onChange={(e) => onChange("mobileNumber", e.target.value)} />
        </div>
        <button className="treasure-btn mt-8 w-full px-4 py-3.5" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
        <p className="treasure-text mt-5 text-sm">
          Account already exists? <Link to="/sign-in" className="treasure-link">Sign-in</Link>
        </p>
      </form>
    </main>
  );
}

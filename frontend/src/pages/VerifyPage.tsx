import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../store/authStore";

export default function VerifyPage() {
  const navigate = useNavigate();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const loading = useAuthStore((state) => state.loading);
  const [otp, setOtp] = useState("");

  const onSubmit = async (e: React.SyntheticEvent<HTMLFormElement>) => {
    e.preventDefault();
    await verifyOtp(otp);
    navigate("/sign-in");
  };

  return (
    <main className="flex min-h-screen items-center justify-center px-6">
      <form onSubmit={onSubmit} className="glass w-full max-w-md rounded-3xl p-8">
        <h1 className="text-3xl font-bold">Verify</h1>
        <p className="mt-3 text-slate-300">A verification code is sent to your mail.</p>
        <input
          className="mt-6 w-full rounded-xl border border-white/10 bg-slate-950/50 p-3"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="mt-6 w-full rounded-xl bg-cyan-400 px-4 py-3 font-bold text-slate-950" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

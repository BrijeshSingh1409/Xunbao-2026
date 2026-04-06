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
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form onSubmit={onSubmit} className="treasure-shell w-full max-w-md rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs">Email Checkpoint</p>
        <h1 className="treasure-title text-4xl font-black">Verify</h1>
        <p className="treasure-text mt-3">A verification code is sent to your mail.</p>
        <input
          className="treasure-field mt-6"
          placeholder="Enter OTP"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
        />
        <button className="treasure-btn mt-8 w-full px-4 py-3.5" disabled={loading}>
          {loading ? "Please wait..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

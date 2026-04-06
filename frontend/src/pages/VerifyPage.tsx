import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { verifyOtpSchema, type VerifyOtpFormValues } from "../schemas/authSchemas";

export default function VerifyPage() {
  const navigate = useNavigate();
  const verifyOtp = useAuthStore((state) => state.verifyOtp);
  const loading = useAuthStore((state) => state.loading);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<VerifyOtpFormValues>({
    resolver: zodResolver(verifyOtpSchema),
    defaultValues: {
      otp: "",
    },
  });

  const onSubmit = async (values: VerifyOtpFormValues) => {
    await verifyOtp(values.otp);
    navigate("/sign-in");
  };

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="treasure-shell w-full max-w-md rounded-[32px] p-8 md:p-10"
      >
        <p className="treasure-kicker mb-4 text-xs">Email Checkpoint</p>
        <h1 className="treasure-title text-4xl font-black">Verify</h1>
        <p className="treasure-text mt-3">A verification code is sent to your mail.</p>

        <div>
          <input
            className="treasure-field mt-6"
            placeholder="Enter OTP"
            {...register("otp")}
          />
          {errors.otp && (
            <p className="mt-2 text-sm text-red-300">{errors.otp.message}</p>
          )}
        </div>

        <button
          className="treasure-btn mt-8 w-full px-4 py-3.5"
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? "Please wait..." : "Submit"}
        </button>
      </form>
    </main>
  );
}

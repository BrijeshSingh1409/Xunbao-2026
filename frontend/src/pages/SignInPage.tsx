import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { useQuizStore } from "../store/quizStore";
import { signInSchema, type SignInFormValues } from "../schemas/authSchemas";

export default function SignInPage() {
  const navigate = useNavigate();
  const signIn = useAuthStore((state) => state.signIn);
  const loading = useAuthStore((state) => state.loading);
  const fetchStatus = useQuizStore((state) => state.fetchStatus);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignInFormValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = async (values: SignInFormValues) => {
    await signIn(values.email, values.password);
    await fetchStatus();
    navigate(useQuizStore.getState().quizCompleted ? "/leaderboard" : "/quiz");
  };

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="treasure-shell w-full max-w-md rounded-[32px] p-8 md:p-10"
      >
        <p className="treasure-kicker mb-4 text-xs">Enter The Hunt</p>
        <h1 className="treasure-title mb-6 text-4xl font-black">Sign In</h1>

        <div className="space-y-4">
          <div>
            <input
              className="treasure-field"
              placeholder="Email"
              {...register("email")}
            />
            {errors.email && (
              <p className="mt-2 text-sm text-red-300">{errors.email.message}</p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                className="treasure-field pr-20"
                placeholder="Password"
                type={showPassword ? "text" : "password"}
                {...register("password")}
              />
              <button
                type="button"
                onClick={() => setShowPassword((prev) => !prev)}
                className="treasure-toggle absolute right-3 top-1/2 -translate-y-1/2 text-sm"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
            {errors.password && (
              <p className="mt-2 text-sm text-red-300">{errors.password.message}</p>
            )}
          </div>
        </div>

        <button
          className="treasure-btn mt-8 w-full px-4 py-3.5"
          disabled={loading || isSubmitting}
        >
          {loading || isSubmitting ? "Please wait..." : "Submit"}
        </button>

        <p className="treasure-text mt-5 text-sm">
          Don't have an account?{" "}
          <Link to="/sign-up" className="treasure-link">
            Sign-Up
          </Link>
        </p>
      </form>
    </main>
  );
}

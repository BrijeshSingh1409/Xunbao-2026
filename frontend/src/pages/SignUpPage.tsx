import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  completeProfileSchema,
  type CompleteProfileFormValues,
} from "../schemas/authSchemas";
import { useAuthStore } from "../store/authStore";

export default function SignUpPage() {
  const navigate = useNavigate();
  const completeProfile = useAuthStore((state) => state.completeProfile);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CompleteProfileFormValues>({
    resolver: zodResolver(completeProfileSchema),
    defaultValues: {
      username: "",
      universityRollNo: "",
      college: "",
      branch: "",
      mobileNumber: "",
    },
  });

  const onSubmit = async (values: CompleteProfileFormValues) => {
    setError("");

    try {
      await completeProfile(values);
      navigate("/quiz");
    } catch (apiError) {
      setError("Profile save failed. Backend validation ya endpoint check karo.");
      console.error(apiError);
    }
  };

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="treasure-shell w-full max-w-2xl rounded-[32px] p-8 md:p-10"
      >
        <p className="treasure-kicker mb-4 text-xs">Complete Profile</p>
        <h1 className="treasure-title mb-6 text-4xl font-black">Sign Up</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input
              className="treasure-field"
              placeholder="Username"
              {...register("username")}
            />
            {errors.username && (
              <p className="mt-2 text-sm text-red-300">
                {errors.username.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="treasure-field"
              placeholder="University Roll No"
              {...register("universityRollNo")}
            />
            {errors.universityRollNo && (
              <p className="mt-2 text-sm text-red-300">
                {errors.universityRollNo.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="treasure-field"
              placeholder="College"
              {...register("college")}
            />
            {errors.college && (
              <p className="mt-2 text-sm text-red-300">
                {errors.college.message}
              </p>
            )}
          </div>

          <div>
            <input
              className="treasure-field"
              placeholder="Branch"
              {...register("branch")}
            />
            {errors.branch && (
              <p className="mt-2 text-sm text-red-300">
                {errors.branch.message}
              </p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              className="treasure-field"
              placeholder="Mobile Number"
              {...register("mobileNumber")}
            />
            {errors.mobileNumber && (
              <p className="mt-2 text-sm text-red-300">
                {errors.mobileNumber.message}
              </p>
            )}
          </div>
        </div>

        {error ? (
          <p className="mt-4 rounded-2xl border border-red-400/20 bg-red-400/10 px-4 py-3 text-sm text-red-200">
            {error}
          </p>
        ) : null}

        <button
          type="submit"
          className="treasure-btn mt-8 w-full px-4 py-3.5"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Please wait..." : "Submit"}
        </button>

        <p className="treasure-text mt-5 text-sm">
          Need to switch account?{" "}
          <span
            onClick={() => {
            useAuthStore.getState().logout();
            navigate("/sign-in");
            }}
            className="treasure-link cursor-pointer font-semibold"
          >
            Sign-in
          </span>
        </p>
      </form>
    </main>
  );
}

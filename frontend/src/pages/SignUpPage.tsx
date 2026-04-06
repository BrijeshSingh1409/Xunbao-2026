import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuthStore } from "../store/authStore";
import { signUpSchema, type SignUpFormValues } from "../schemas/authSchemas";

export default function SignUpPage() {
  const navigate = useNavigate();
  const signUp = useAuthStore((state) => state.signUp);
  const loading = useAuthStore((state) => state.loading);
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpFormValues>({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      email: "",
      password: "",
      username: "",
      universityRollNo: "",
      college: "",
      branch: "",
      mobileNumber: "",
    },
  });

  const onSubmit = async (values: SignUpFormValues) => {
    await signUp(values);
    navigate("/verify");
  };

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="treasure-shell w-full max-w-2xl rounded-[32px] p-8 md:p-10"
      >
        <p className="treasure-kicker mb-4 text-xs">Create Your Explorer</p>
        <h1 className="treasure-title mb-6 text-4xl font-black">Sign Up</h1>

        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <input className="treasure-field" placeholder="Email" {...register("email")} />
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

          <div>
            <input className="treasure-field" placeholder="Username" {...register("username")} />
            {errors.username && (
              <p className="mt-2 text-sm text-red-300">{errors.username.message}</p>
            )}
          </div>

          <div>
            <input
              className="treasure-field"
              placeholder="University Roll No"
              {...register("universityRollNo")}
            />
            {errors.universityRollNo && (
              <p className="mt-2 text-sm text-red-300">{errors.universityRollNo.message}</p>
            )}
          </div>

          <div>
            <input className="treasure-field" placeholder="College" {...register("college")} />
            {errors.college && (
              <p className="mt-2 text-sm text-red-300">{errors.college.message}</p>
            )}
          </div>

          <div>
            <input className="treasure-field" placeholder="Branch" {...register("branch")} />
            {errors.branch && (
              <p className="mt-2 text-sm text-red-300">{errors.branch.message}</p>
            )}
          </div>

          <div className="md:col-span-2">
            <input
              className="treasure-field"
              placeholder="Mobile Number"
              {...register("mobileNumber")}
            />
            {errors.mobileNumber && (
              <p className="mt-2 text-sm text-red-300">{errors.mobileNumber.message}</p>
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
          Account already exists?{" "}
          <Link to="/sign-in" className="treasure-link">
            Sign-in
          </Link>
        </p>
      </form>
    </main>
  );
}

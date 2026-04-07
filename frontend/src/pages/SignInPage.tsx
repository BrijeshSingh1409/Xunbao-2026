import { useAuthStore } from "../store/authStore";

export default function SignInPage() {
  const signInWithGoogle = useAuthStore((state) => state.signInWithGoogle);
  const loading = useAuthStore((state) => state.loading);

  return (
    <main className="treasure-page flex min-h-screen items-center justify-center px-6 py-10">
      <section className="treasure-shell w-full max-w-md rounded-[32px] p-8 md:p-10">
        <p className="treasure-kicker mb-4 text-xs">Enter The Hunt</p>
        <h1 className="treasure-title mb-6 text-4xl font-black">Sign In</h1>

        <button
          onClick={() => signInWithGoogle()}
          className="treasure-btn mt-4 w-full px-4 py-3.5"
          disabled={loading}
        >
          {loading ? "Please wait..." : "Continue with Google"}
        </button>
      </section>
    </main>
  );
}

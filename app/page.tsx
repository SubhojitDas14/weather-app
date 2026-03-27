import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";
import LoginForm from "@/components/LoginForm";

export default async function LoginPage() {
  const session = await auth();

  if (session) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-900/20 via-transparent to-slate-900/20 blur-3xl" />

      <div className="relative z-10 w-full max-w-md px-4">
        <div className="glassmorphism rounded-3xl p-8 md:p-12 shadow-2xl border border-indigo-500/20">
          <div className="mb-8 text-center">
            <div className="text-5xl mb-4">⛅</div>
            <h1 className="text-4xl font-bold bg-gradient-to-r from-indigo-400 to-blue-400 bg-clip-text text-transparent mb-2">
              Weather
            </h1>
            <p className="text-slate-400 text-sm">
              Know your weather before you go
            </p>
          </div>

          <LoginForm />

          <div className="mt-8 pt-8 border-t border-slate-700/50">
            <p className="text-center text-slate-500 text-sm">
              Real-time weather forecasts powered by advanced meteorology
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-slate-500 text-xs">
          <p>Secure login • Your location • Beautiful forecasts</p>
        </div>
      </div>
    </div>
  );
}

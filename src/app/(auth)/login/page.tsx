"use client"

import Link from "next/link"

export default function LoginPage() {
  return (
      <div
          className="min-h-screen flex items-center justify-center bg-cover bg-center relative"
          style={{ backgroundImage: "url('/_.png')" }}
        >
          {/* overlay */}
          <div className="absolute inset-0 bg-black/20" />
        <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 animate-fade-in">

          {/* Header */}
          <div className="text-center mb-6">
            <div className="text-4xl mb-2"></div>
            <h1 className="text-2xl font-bold text-white">Welcome Back</h1>
            <p className="text-slate-400 text-sm">
              Login to continue your journey
            </p>
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input
              type="email"
              placeholder="Email"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-4 py-3 rounded-lg bg-slate-800 text-white placeholder-slate-400
              focus:outline-none focus:ring-2 focus:ring-green-500"
            />

            <button
              type="submit"
              className="w-full mt-4 py-3 rounded-lg bg-green-500 hover:bg-green-600
              transition font-semibold text-white flex items-center justify-center gap-2"
            >
              Login
            </button>
          </form>

          {/* Footer */}
          <div className="text-center mt-6 space-y-2 text-sm">
            <Link href="/register" className="text-green-400 hover:underline block">
              Create new account
            </Link>
            <Link href="/forgot-password" className="text-slate-400 hover:underline block">
              Forgot password?
            </Link>
          </div>

        </div>
      </div>
  )
}
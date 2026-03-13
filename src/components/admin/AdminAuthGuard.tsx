"use client";

import { useState, useEffect } from "react";
import { Lock } from "lucide-react";

export default function AdminAuthGuard({ children }: { children: React.ReactNode }) {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);

  useEffect(() => {
    // Check session storage on mount
    const auth = sessionStorage.getItem("adminAuth");
    if (auth === "palus999") {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === "palus999") {
      sessionStorage.setItem("adminAuth", "palus999");
      setIsAuthenticated(true);
      setError(false);
    } else {
      setError(true);
      setPassword("");
    }
  };

  // Prevent flash of login screen before mounting checks sessionStorage
  if (isAuthenticated === null) {
    return <div className="min-h-screen bg-gray-50 flex items-center justify-center" />;
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col justify-center items-center px-4 font-sans">
        <div className="max-w-md w-full bg-white p-8 shadow-2xl rounded-sm">
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mb-4">
              <Lock size={32} className="text-gray-400" />
            </div>
            <h1 className="text-2xl font-bold font-serif text-gray-900">PRG Secure Access</h1>
            <p className="text-gray-500 text-sm mt-2 text-center">Restricted area. Please enter your administrator password.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError(false);
                }}
                placeholder="Password"
                className={`w-full px-4 py-3 border ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300 focus:ring-black"} focus:outline-none focus:ring-1 transition-colors`}
                autoFocus
              />
              {error && <p className="text-red-500 text-xs mt-2 uppercase tracking-wide">Incorrect Password</p>}
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white font-bold uppercase tracking-widest text-sm py-4 hover:bg-[var(--color-accent-gold)] transition-colors"
            >
              Enter Dashboard
            </button>
          </form>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}

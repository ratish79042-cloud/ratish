import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from './firebaseConfig';

function Login({ onNavigate }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, password);
      onNavigate('#/dashboard');
    } catch (err) {
      setError('Invalid username or password credentials.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0b061f] flex items-center justify-center px-4">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(139,92,246,0.1),transparent_60%)] pointer-events-none" />
      
      <div className="w-full max-w-md bg-[#130b2e]/60 border border-purple-900/40 backdrop-blur-xl p-8 rounded-2xl shadow-2xl relative z-10">
        <div className="text-center mb-8">
          <div className="inline-block p-3 bg-purple-900/30 rounded-full border border-purple-500/30 mb-3">
            <span className="text-2xl">⚡</span>
          </div>
          <h2 className="text-3xl font-bold tracking-tight bg-gradient-to-r from-white via-purple-300 to-purple-600 bg-clip-text text-transparent">
            Admin Access Portal
          </h2>
          <p className="text-purple-300/60 mt-2 text-sm">Sign in to manage your portfolio records</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-950/40 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-center gap-2">
            <span>⚠️</span> {error}
          </div>
        )}

        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
              Admin Email / Username
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="admin@portfolio.com"
              className="w-full bg-[#0b061f]/80 border border-purple-950 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors placeholder:text-purple-300/20"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider mb-2">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="••••••••"
              className="w-full bg-[#0b061f]/80 border border-purple-950 text-white rounded-xl px-4 py-3 outline-none focus:border-purple-500 transition-colors placeholder:text-purple-300/20"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full mt-4 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 disabled:opacity-50 text-white font-medium py-3 rounded-xl transition-all shadow-lg shadow-purple-500/20 active:scale-[0.99]"
          >
            {loading ? 'Authenticating...' : 'Sign In to Dashboard'}
          </button>
        </form>

        <button 
          onClick={() => onNavigate('#/')}
          className="w-full text-center text-xs text-purple-400/60 hover:text-purple-300 mt-6 block transition-colors"
        >
          ← Return to Public Portfolio
        </button>
      </div>
    </div>
  );
}

export default Login;
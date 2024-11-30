'use client';

import { signIn } from 'next-auth/react';
import { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLocalLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch('/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();
      if (response.ok) {
        console.log('Login successful:', data.message);

        const sessionResponse = await signIn('credentials', {
          email,
          password,
          redirect: false,
        });

        if (sessionResponse?.error) {
          alert('Failed to link login with session.');
        } else {
          alert('Login successful! Redirecting...');
          window.location.href = '/profile';
        }
      } else {
        alert(`Login failed: ${data.error}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      alert('An error occurred. Please try again.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-6">
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Welcome Back!</h2>

        {/* Google Login Button */}
        <div className="mb-6">
          <button
            onClick={() => signIn('google', { callbackUrl: '/profile' })}
            className="flex items-center justify-center w-full bg-yellow-400 hover:bg-yellow-500 text-white font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            <img
              src="/images/google-logo.png" // Assurez-vous d'avoir une image Google logo dans votre dossier public/images/
              alt="Google logo"
              className="w-5 h-5 mr-2"
            />
            Login with Google
          </button>
        </div>

        <div className="relative flex items-center justify-center my-4">
          <span className="absolute bg-white px-3 text-gray-600">or</span>
          <hr className="w-full border-gray-300" />
        </div>

        {/* Local Login Form */}
        <form className="space-y-4" onSubmit={handleLocalLogin}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full px-4 py-2 mt-1 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-400"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-yellow-400 text-white rounded-lg font-medium hover:bg-yellow-500 transition duration-200"
          >
            Login
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Don't have an account?{' '}
            <a href="/signup" className="text-yellow-500 font-medium hover:underline">
              Sign up
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

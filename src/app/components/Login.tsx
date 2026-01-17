import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { LogIn, X } from 'lucide-react';

interface LoginProps {
  onClose: () => void;
  language: 'en' | 'hi';
  type: 'user' | 'owner';
}

export default function Login({ onClose, language, type }: LoginProps) {
  const { login } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const t = {
    en: {
      userTitle: 'User Login',
      ownerTitle: 'Owner Login',
      email: 'Email Address',
      password: 'Password',
      login: 'Login',
      cancel: 'Cancel',
      loading: 'Logging in...',
      error: 'Invalid email or password',
    },
    hi: {
      userTitle: 'उपयोगकर्ता लॉगिन',
      ownerTitle: 'मालिक लॉगिन',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      login: 'लॉगिन करें',
      cancel: 'रद्द करें',
      loading: 'लॉगिन हो रहा है...',
      error: 'अमान्य ईमेल या पासवर्ड',
    },
  };

  const text = t[language];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      await login(email, password);
      onClose();
    } catch (err: any) {
      let errorMessage = text.error;
      
      // Handle rate limit errors
      if (err?.message?.includes('rate limit') || err?.message?.includes('Email rate limit')) {
        errorMessage = language === 'en' 
          ? '⏰ Too many login attempts. Please wait 5-10 minutes before trying again.'
          : '⏰ बहुत सारे लॉगिन प्रयास। कृपया 5-10 मिनट प्रतीक्षा करें।';
      } else if (err?.message?.includes('Invalid login credentials')) {
        errorMessage = text.error;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl max-w-md w-full relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] p-3 rounded-full">
              <LogIn className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent">
              {type === 'user' ? text.userTitle : text.ownerTitle}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                {text.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                {text.password}
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                required
              />
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white py-3 rounded-lg font-semibold hover:from-[#0F2854] hover:to-[#1C4D8D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? text.loading : text.login}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
              >
                {text.cancel}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { UserPlus, X, RefreshCw } from 'lucide-react';

interface UserRegisterProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

export default function UserRegister({ onClose, language }: UserRegisterProps) {
  const { register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    fatherName: '',
    dob: '',
    village: '',
    city: '',
    contactNo: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [captchaInput, setCaptchaInput] = useState('');
  const [captchaValue, setCaptchaValue] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const t = {
    en: {
      title: 'User Registration',
      name: 'Full Name',
      fatherName: "Father's Name",
      dob: 'Date of Birth',
      village: 'Village',
      city: 'City',
      contactNo: 'Contact Number',
      email: 'Email Address',
      password: 'Password',
      confirmPassword: 'Confirm Password',
      captcha: 'Enter Captcha',
      register: 'Register',
      cancel: 'Cancel',
      loading: 'Registering...',
      errorCaptcha: 'Incorrect captcha',
      errorPassword: 'Passwords do not match',
      errorRequired: 'All fields are required',
      success: 'Registration successful!',
    },
    hi: {
      title: 'उपयोगकर्ता पंजीकरण',
      name: 'पूरा नाम',
      fatherName: 'पिता का नाम',
      dob: 'जन्म तिथि',
      village: 'गाँव',
      city: 'शहर',
      contactNo: 'संपर्क नंबर',
      email: 'ईमेल पता',
      password: 'पासवर्ड',
      confirmPassword: 'पासवर्ड की पुष्टि करें',
      captcha: 'कैप्चा दर्ज करें',
      register: 'रजिस्टर करें',
      cancel: 'रद्द करें',
      loading: 'पंजीकरण हो रहा है...',
      errorCaptcha: 'गलत कैप्चा',
      errorPassword: 'पासवर्ड मेल नहीं खाते',
      errorRequired: 'सभी फील्ड आवश्यक हैं',
      success: 'पंजीकरण सफल!',
    },
  };

  const text = t[language];

  // Generate captcha on component mount
  useEffect(() => {
    generateCaptcha();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const generateCaptcha = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let captcha = '';
    for (let i = 0; i < 6; i++) {
      captcha += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    setCaptchaValue(captcha);
    setCaptchaInput('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validation
    if (Object.values(formData).some(val => !val)) {
      setError(text.errorRequired);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError(text.errorPassword);
      return;
    }

    if (captchaInput !== captchaValue) {
      setError(text.errorCaptcha);
      generateCaptcha();
      return;
    }

    // Validate contact number
    if (!/^[0-9]{10}$/.test(formData.contactNo)) {
      setError('Contact number must be exactly 10 digits');
      return;
    }

        // Validate email
        // Validate email
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      setError('Please enter a valid email address');
      return;
    }
    
    
    setLoading(true);
    try {
      console.log('Starting registration...');
      await register(formData);
      alert(text.success);
      onClose();
    } catch (err: any) {
      console.error('Registration error:', err);
      
      // Show user-friendly error messages
      let errorMessage = err.message || 'Registration failed. Please try again.';
      
      if (errorMessage.includes('rate limit') || errorMessage.includes('Too many')) {
        errorMessage = '⏰ Rate limit exceeded: Too many registration attempts. Please wait 5-10 minutes before trying again. If you already have an account, try logging in instead.';
      } else if (errorMessage.includes('already registered') || errorMessage.includes('already exists')) {
        errorMessage = '📧 This email is already registered. Please click "User Login" to sign in instead.';
      } else if (errorMessage.includes('Invalid email')) {
        errorMessage = '📧 Please enter a valid email address (e.g., yourname@gmail.com)';
      } else if (errorMessage.includes('Password')) {
        errorMessage = '🔒 Password must be at least 6 characters long';
      }
      
      setError(errorMessage);
      generateCaptcha();
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-2xl w-full my-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] p-3 rounded-full">
              <UserPlus className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent">
              {text.title}
            </h2>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.name} *
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.fatherName} *
                </label>
                <input
                  type="text"
                  value={formData.fatherName}
                  onChange={(e) => setFormData({ ...formData, fatherName: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.dob} *
                </label>
                <input
                  type="date"
                  value={formData.dob}
                  onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.village} *
                </label>
                <input
                  type="text"
                  value={formData.village}
                  onChange={(e) => setFormData({ ...formData, village: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.city} *
                </label>
                <input
                  type="text"
                  value={formData.city}
                  onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.contactNo} *
                </label>
                <input
                  type="tel"
                  value={formData.contactNo}
                  onChange={(e) => setFormData({ ...formData, contactNo: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                  pattern="[0-9]{10}"
                  title="Please enter a valid 10-digit phone number"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.email} *
                </label>
                <input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                  placeholder="your@email.com or your@gmail.com"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {language === 'en' 
                    ? 'Use a valid email (e.g., yourname@gmail.com)' 
                    : 'वैध ईमेल उपयोग करें (जैसे yourname@gmail.com)'}
                </p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.password} *
                </label>
                <input
                  type="password"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                  minLength={6}
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                  {text.confirmPassword} *
                </label>
                <input
                  type="password"
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  required
                  minLength={6}
                />
              </div>
            </div>

            {/* Captcha */}
            <div className="mt-6">
              <label className="block text-sm font-semibold text-[#0F2854] mb-2">
                {text.captcha} *
              </label>
              <div className="flex gap-4 items-center">
                <div className="bg-gradient-to-r from-[#BDE8F5] to-[#4988C4] px-6 py-3 rounded-lg select-none">
                  <span className="text-2xl font-bold text-[#0F2854] tracking-widest" style={{ fontFamily: 'monospace' }}>
                    {captchaValue}
                  </span>
                </div>
                <button
                  type="button"
                  onClick={generateCaptcha}
                  className="p-2 bg-[#4988C4] hover:bg-[#1C4D8D] text-white rounded-lg transition-colors"
                  title="Refresh Captcha"
                >
                  <RefreshCw className="w-5 h-5" />
                </button>
                <input
                  type="text"
                  value={captchaInput}
                  onChange={(e) => setCaptchaInput(e.target.value)}
                  className="flex-1 px-4 py-2 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
                  placeholder="Enter captcha"
                  required
                />
              </div>
            </div>

            <div className="flex gap-4 mt-6">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white py-3 rounded-lg font-semibold hover:from-[#0F2854] hover:to-[#1C4D8D] transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? text.loading : text.register}
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
import { useState, useEffect } from 'react';
import { X, Copy, Check, AlertCircle } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export default function OwnerSetupGuide() {
  const { user } = useAuth();
  const [showGuide, setShowGuide] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    // Show guide only for owners who just logged in
    if (user?.role === 'owner') {
      const hasSeenGuide = localStorage.getItem('ownerSetupGuideSeen');
      if (!hasSeenGuide) {
        setShowGuide(true);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const handleClose = () => {
    setShowGuide(false);
    localStorage.setItem('ownerSetupGuideSeen', 'true');
  };

  const copyOwnerId = async () => {
    if (user?.id) {
      try {
        await navigator.clipboard.writeText(user.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  if (!showGuide || user?.role !== 'owner') return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[100] p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#0F2854] to-[#1C4D8D] text-white p-6 rounded-t-2xl relative">
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 p-2 hover:bg-white/20 rounded-full transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <h2 className="text-2xl font-bold mb-2">👑 Welcome, Owner!</h2>
          <p className="text-[#BDE8F5]">Important: Complete this one-time setup</p>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Step 1 */}
          <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div className="flex-1">
                <h3 className="font-bold text-amber-900 mb-2">
                  🎯 Final Setup Required
                </h3>
                <p className="text-sm text-amber-800 mb-3">
                  To enable the chat system, you need to update the Owner ID in your code.
                </p>
              </div>
            </div>
          </div>

          {/* Step 2 - Copy Owner ID */}
          <div className="border-2 border-[#4988C4] rounded-lg p-4">
            <h3 className="font-bold text-[#0F2854] mb-3 flex items-center gap-2">
              <span className="bg-[#4988C4] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">1</span>
              Copy Your Owner ID
            </h3>
            <div className="bg-gray-100 p-3 rounded-lg mb-3 relative">
              <div className="text-xs text-gray-600 mb-1">Your Owner ID:</div>
              <code className="text-sm font-mono text-gray-800 break-all block pr-12">
                {user?.id}
              </code>
              <button
                onClick={copyOwnerId}
                className="absolute top-3 right-3 p-2 bg-white hover:bg-gray-200 rounded-lg transition-colors shadow-sm"
                title="Copy to clipboard"
              >
                {copied ? (
                  <Check className="w-4 h-4 text-green-600" />
                ) : (
                  <Copy className="w-4 h-4 text-gray-600" />
                )}
              </button>
            </div>
            {copied && (
              <div className="text-sm text-green-600 font-medium flex items-center gap-1">
                <Check className="w-4 h-4" />
                Copied to clipboard!
              </div>
            )}
          </div>

          {/* Step 3 - Update Code */}
          <div className="border-2 border-[#4988C4] rounded-lg p-4">
            <h3 className="font-bold text-[#0F2854] mb-3 flex items-center gap-2">
              <span className="bg-[#4988C4] text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">2</span>
              Update the Code
            </h3>
            <div className="space-y-3">
              <div className="text-sm text-gray-700">
                <p className="mb-2">1. Open file: <code className="bg-gray-100 px-2 py-1 rounded text-xs">/src/app/App.tsx</code></p>
                <p className="mb-2">2. Find <strong>line 20</strong></p>
                <p className="mb-2">3. Replace this:</p>
                <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-xs mb-2">
                  <span className="text-red-400">const OWNER_ID = 'owner-fixed-id';</span>
                </div>
                <p className="mb-2">4. With this:</p>
                <div className="bg-gray-800 text-gray-100 p-3 rounded font-mono text-xs">
                  <span className="text-green-400">const OWNER_ID = '{user?.id}';</span>
                </div>
                <p className="mt-2">5. <strong>Save the file</strong></p>
              </div>
            </div>
          </div>

          {/* Step 4 - Done */}
          <div className="bg-green-50 border-2 border-green-500 rounded-lg p-4">
            <h3 className="font-bold text-green-900 mb-2 flex items-center gap-2">
              <span className="bg-green-500 text-white w-6 h-6 rounded-full flex items-center justify-center text-sm">3</span>
              You're All Set!
            </h3>
            <p className="text-sm text-green-800">
              After updating the code, your chat system will be fully functional. Users can message you, and you can reply from the Dashboard.
            </p>
          </div>

          {/* Features Overview */}
          <div className="bg-gradient-to-br from-[#BDE8F5] to-white p-4 rounded-lg">
            <h3 className="font-bold text-[#0F2854] mb-3">✨ Your Owner Features:</h3>
            <ul className="space-y-2 text-sm text-gray-700">
              <li className="flex items-start gap-2">
                <span className="text-[#4988C4] font-bold">•</span>
                <span><strong>Dashboard:</strong> View all registered users and their details</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4988C4] font-bold">•</span>
                <span><strong>Chat System:</strong> Real-time messaging with customers</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4988C4] font-bold">•</span>
                <span><strong>User Info:</strong> Access customer contact details directly</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-[#4988C4] font-bold">•</span>
                <span><strong>Bilingual:</strong> Communicate in English or Hindi</span>
              </li>
            </ul>
          </div>

          {/* Close Button */}
          <div className="flex justify-end gap-3 pt-4 border-t">
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white rounded-lg hover:shadow-lg transition-all"
            >
              Got it, thanks! ✓
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
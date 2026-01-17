import { useAuth } from '../contexts/AuthContext';
import { Copy, Check } from 'lucide-react';
import { useState } from 'react';

export default function UserInfo() {
  const { user } = useAuth();
  const [copied, setCopied] = useState(false);

  if (!user) return null;

  const copyToClipboard = async () => {
    if (user.id) {
      try {
        await navigator.clipboard.writeText(user.id);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
      } catch (err) {
        console.error('Failed to copy:', err);
      }
    }
  };

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-3 border-2 border-[#4988C4] z-50 max-w-xs">
      <div className="text-xs">
        <div className="font-semibold text-[#0F2854] mb-1 flex items-center gap-1">
          {user.role === 'owner' ? '👑 Owner' : '👤 User'}
          <span className="ml-auto bg-green-500 w-2 h-2 rounded-full"></span>
        </div>
        <div className="text-gray-600 truncate font-medium">{user.name}</div>
        <div className="text-gray-500 text-[10px] truncate">{user.email}</div>
        {user.role === 'owner' && (
          <div className="mt-2 pt-2 border-t border-gray-200">
            <div className="text-[10px] text-gray-500 mb-1">Owner ID:</div>
            <div className="bg-gray-100 px-2 py-1 rounded relative group">
              <code className="text-[9px] text-gray-700 break-all block pr-6">
                {user.id}
              </code>
              <button
                onClick={copyToClipboard}
                className="absolute top-1 right-1 p-1 hover:bg-gray-200 rounded transition-colors"
                title="Copy Owner ID"
              >
                {copied ? (
                  <Check className="w-3 h-3 text-green-600" />
                ) : (
                  <Copy className="w-3 h-3 text-gray-600" />
                )}
              </button>
            </div>
            <div className="text-[9px] text-amber-600 mt-1 font-medium">
              ⚠️ Copy this ID to App.tsx line 20
            </div>
            <div className="mt-1 text-[9px] text-gray-500">
              const OWNER_ID = '{user.id}';
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
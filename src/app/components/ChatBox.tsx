import { useState, useEffect, useRef } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { projectId } from '../../../utils/supabase/info';
import { Send, X, MessageCircle } from 'lucide-react';

interface Message {
  id: string;
  senderId: string;
  senderName: string;
  recipientId: string;
  message: string;
  timestamp: string;
}

interface ChatBoxProps {
  recipientId: string;
  recipientName: string;
  onClose: () => void;
  language: 'en' | 'hi';
}

export default function ChatBox({ recipientId, recipientName, onClose, language }: ChatBoxProps) {
  const { user, accessToken } = useAuth();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const t = {
    en: {
      title: 'Chat with',
      placeholder: 'Type a message...',
      send: 'Send',
      loading: 'Loading...',
      noMessages: 'No messages yet. Start the conversation!',
    },
    hi: {
      title: 'के साथ चैट',
      placeholder: 'एक संदेश टाइप करें...',
      send: 'भेजें',
      loading: 'लोड हो रहा है...',
      noMessages: 'अभी तक कोई संदेश नहीं। बातचीत शुरू करें!',
    },
  };

  const text = t[language];

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 3000); // Poll every 3 seconds
    return () => clearInterval(interval);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipientId]);

  useEffect(() => {
    scrollToBottom();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const fetchMessages = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6111280c/conversation/${recipientId}`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setMessages(data.messages || []);
      }
    } catch (error) {
      console.error('Error fetching messages:', error);
    }
  };

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    setLoading(true);
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6111280c/send-message`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`,
          },
          body: JSON.stringify({
            message: newMessage,
            recipientId,
          }),
        }
      );

      if (response.ok) {
        setNewMessage('');
        await fetchMessages();
      }
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString(language === 'hi' ? 'hi-IN' : 'en-US', {
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-[60] p-4">
      <div className="bg-white rounded-2xl max-w-2xl w-full h-[600px] flex flex-col shadow-2xl">
        {/* Header */}
        <div className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white px-6 py-4 rounded-t-2xl flex items-center justify-between">
          <div className="flex items-center gap-3">
            <MessageCircle className="w-6 h-6" />
            <div>
              <h3 className="font-semibold">{text.title} {recipientName}</h3>
            </div>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-full p-2 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gradient-to-b from-[#BDE8F5]/10 to-white">
          {messages.length === 0 ? (
            <div className="text-center text-gray-500 py-12">
              {text.noMessages}
            </div>
          ) : (
            messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${msg.senderId === user?.id ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                    msg.senderId === user?.id
                      ? 'bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white'
                      : 'bg-[#BDE8F5] text-[#0F2854]'
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p
                    className={`text-xs mt-1 ${
                      msg.senderId === user?.id ? 'text-white/70' : 'text-gray-600'
                    }`}
                  >
                    {formatTime(msg.timestamp)}
                  </p>
                </div>
              </div>
            ))
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <form onSubmit={sendMessage} className="p-4 border-t border-gray-200">
          <div className="flex gap-2">
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder={text.placeholder}
              className="flex-1 px-4 py-3 border-2 border-[#BDE8F5] rounded-lg focus:border-[#4988C4] focus:outline-none transition-colors"
              disabled={loading}
            />
            <button
              type="submit"
              disabled={loading || !newMessage.trim()}
              className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white px-6 py-3 rounded-lg hover:from-[#0F2854] hover:to-[#1C4D8D] transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
            >
              <Send className="w-5 h-5" />
              {text.send}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
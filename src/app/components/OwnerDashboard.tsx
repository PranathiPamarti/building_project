import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { projectId } from '../../../utils/supabase/info';
import { Users, MessageCircle, X } from 'lucide-react';
import ChatBox from './ChatBox';

interface User {
  id: string;
  email: string;
  name: string;
  fatherName: string;
  dob: string;
  village: string;
  city: string;
  contactNo: string;
  createdAt: string;
}

interface OwnerDashboardProps {
  onClose: () => void;
  language: 'en' | 'hi';
}

export default function OwnerDashboard({ onClose, language }: OwnerDashboardProps) {
  const { accessToken } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  const t = {
    en: {
      title: 'Owner Dashboard',
      users: 'Registered Users',
      noUsers: 'No users registered yet',
      name: 'Name',
      father: 'Father',
      dob: 'DOB',
      village: 'Village',
      city: 'City',
      contact: 'Contact',
      email: 'Email',
      registered: 'Registered',
      chat: 'Chat',
    },
    hi: {
      title: 'मालिक डैशबोर्ड',
      users: 'पंजीकृत उपयोगकर्ता',
      noUsers: 'अभी तक कोई उपयोगकर्ता पंजीकृत नहीं है',
      name: 'नाम',
      father: 'पिता',
      dob: 'जन्म तिथि',
      village: 'गाँव',
      city: 'शहर',
      contact: 'संपर्क',
      email: 'ईमेल',
      registered: 'पंजीकृत',
      chat: 'चैट',
    },
  };

  const text = t[language];

  useEffect(() => {
    fetchUsers();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(
        `https://${projectId}.supabase.co/functions/v1/make-server-6111280c/users`,
        {
          headers: {
            'Authorization': `Bearer ${accessToken}`,
          },
        }
      );

      const data = await response.json();
      if (response.ok) {
        setUsers(data.users || []);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl max-w-6xl w-full my-8 relative shadow-2xl">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700 z-10"
        >
          <X className="w-6 h-6" />
        </button>

        <div className="p-8">
          <div className="flex items-center gap-3 mb-6">
            <div className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] p-3 rounded-full">
              <Users className="w-6 h-6 text-white" />
            </div>
            <h2 className="text-3xl font-bold bg-gradient-to-r from-[#0F2854] to-[#4988C4] bg-clip-text text-transparent">
              {text.title}
            </h2>
          </div>

          {loading ? (
            <div className="text-center py-12">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-[#4988C4]"></div>
            </div>
          ) : users.length === 0 ? (
            <div className="text-center py-12 text-gray-500">
              {text.noUsers}
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gradient-to-r from-[#1C4D8D] to-[#4988C4] text-white">
                  <tr>
                    <th className="px-4 py-3 text-left">{text.name}</th>
                    <th className="px-4 py-3 text-left">{text.father}</th>
                    <th className="px-4 py-3 text-left">{text.village}</th>
                    <th className="px-4 py-3 text-left">{text.city}</th>
                    <th className="px-4 py-3 text-left">{text.contact}</th>
                    <th className="px-4 py-3 text-left">{text.email}</th>
                    <th className="px-4 py-3 text-center">{text.chat}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {users.map((user, index) => (
                    <tr
                      key={user.id}
                      className={index % 2 === 0 ? 'bg-white' : 'bg-[#BDE8F5]/20'}
                    >
                      <td className="px-4 py-3">{user.name}</td>
                      <td className="px-4 py-3">{user.fatherName}</td>
                      <td className="px-4 py-3">{user.village}</td>
                      <td className="px-4 py-3">{user.city}</td>
                      <td className="px-4 py-3">{user.contactNo}</td>
                      <td className="px-4 py-3">{user.email}</td>
                      <td className="px-4 py-3 text-center">
                        <button
                          onClick={() => setSelectedUser(user)}
                          className="bg-gradient-to-r from-[#4988C4] to-[#1C4D8D] text-white px-4 py-2 rounded-lg hover:from-[#1C4D8D] hover:to-[#0F2854] transition-all inline-flex items-center gap-2"
                        >
                          <MessageCircle className="w-4 h-4" />
                          {text.chat}
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {selectedUser && (
        <ChatBox
          recipientId={selectedUser.id}
          recipientName={selectedUser.name}
          onClose={() => setSelectedUser(null)}
          language={language}
        />
      )}
    </div>
  );
}
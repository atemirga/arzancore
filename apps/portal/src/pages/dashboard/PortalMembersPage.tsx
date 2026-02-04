import { useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus, Trash2 } from 'lucide-react';
import { usePortalMembers, useInviteMember } from '../../hooks/usePortals';

export default function PortalMembersPage() {
  const { id } = useParams();
  const { data: members, isLoading } = usePortalMembers(id);
  const inviteMember = useInviteMember();

  const [showInvite, setShowInvite] = useState(false);
  const [email, setEmail] = useState('');
  const [role, setRole] = useState<'admin' | 'member'>('member');

  const handleInvite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!id) return;

    await inviteMember.mutateAsync({ portalId: id, data: { email, role } });
    setEmail('');
    setShowInvite(false);
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Участники</h1>
        <button onClick={() => setShowInvite(true)} className="btn btn-primary">
          <Plus size={20} className="mr-2" />
          Пригласить
        </button>
      </div>

      {/* Invite Modal */}
      {showInvite && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white rounded-xl p-6 w-full max-w-md">
            <h2 className="text-lg font-semibold mb-4">Пригласить участника</h2>
            <form onSubmit={handleInvite} className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-2">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="input"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Роль</label>
                <select
                  value={role}
                  onChange={(e) => setRole(e.target.value as 'admin' | 'member')}
                  className="input"
                >
                  <option value="member">Участник</option>
                  <option value="admin">Администратор</option>
                </select>
              </div>
              <div className="flex gap-4">
                <button type="button" onClick={() => setShowInvite(false)} className="btn btn-secondary flex-1">
                  Отмена
                </button>
                <button type="submit" className="btn btn-primary flex-1">
                  Пригласить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Members List */}
      <div className="card">
        {isLoading ? (
          <div className="py-8 text-center">Загрузка...</div>
        ) : members?.length === 0 ? (
          <div className="py-8 text-center text-gray-500">Нет участников</div>
        ) : (
          <div className="divide-y">
            {members?.map((member: any) => (
              <div key={member.id} className="py-4 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                    {member.name?.[0] || member.email[0].toUpperCase()}
                  </div>
                  <div>
                    <div className="font-medium">{member.name || member.email}</div>
                    <div className="text-sm text-gray-500">{member.email}</div>
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  <span className="px-2 py-1 bg-gray-100 rounded text-sm">
                    {member.role === 'owner' ? 'Владелец' : member.role === 'admin' ? 'Админ' : 'Участник'}
                  </span>
                  {member.role !== 'owner' && (
                    <button className="text-red-500 hover:text-red-700">
                      <Trash2 size={18} />
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

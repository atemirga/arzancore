import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { api, type CreatePortalData } from '../lib/api';

export function usePortals() {
  return useQuery({
    queryKey: ['portals'],
    queryFn: async () => {
      const { portals } = await api.getPortals();
      return portals;
    },
  });
}

export function usePortal(id: string | undefined) {
  return useQuery({
    queryKey: ['portal', id],
    queryFn: async () => {
      if (!id) throw new Error('Portal ID required');
      return api.getPortal(id);
    },
    enabled: !!id,
  });
}

export function useCreatePortal() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreatePortalData) => api.createPortal(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['portals'] });
    },
  });
}

export function usePortalMembers(portalId: string | undefined) {
  return useQuery({
    queryKey: ['portal-members', portalId],
    queryFn: async () => {
      if (!portalId) throw new Error('Portal ID required');
      const { members } = await api.getPortalMembers(portalId);
      return members;
    },
    enabled: !!portalId,
  });
}

export function useInviteMember() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ portalId, data }: { portalId: string; data: { email: string; role?: 'admin' | 'member' } }) =>
      api.inviteMember(portalId, data),
    onSuccess: (_, { portalId }) => {
      queryClient.invalidateQueries({ queryKey: ['portal-members', portalId] });
    },
  });
}

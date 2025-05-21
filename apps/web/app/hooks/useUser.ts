import { getCurrentUser } from '@/utils/supabase/queries';
import { User as SupabaseUser } from '@supabase/supabase-js';
import { useEffect, useState } from 'react';

export function useUser() {
  const [user, setUser] = useState<SupabaseUser | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };

    fetchUser();
  }, []);

  return { user, loading };
}
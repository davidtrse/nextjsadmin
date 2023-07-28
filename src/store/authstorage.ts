import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware'

type TProfile={
    email: string;
}

type TAuthStore = {
    token: string | null | undefined;
    profile: TProfile | null;
    setToken: (token: string | null | undefined, newProfile: TProfile|null) => void; // void is any function
}

const useAuthStore = create(persist<TAuthStore>(
    (set) => ({
        token: null,
        profile: null,
        setToken: (newToken: string | null | undefined, newProfile?: TProfile|null) => 
            set(() => ({ token: newToken, profile: newProfile })),
    }),
    {
        name: 'auth-storage', // unique name
        storage: createJSONStorage(() => sessionStorage), // (optional) by default, 'localStorage' is used
      }
))

export { useAuthStore };
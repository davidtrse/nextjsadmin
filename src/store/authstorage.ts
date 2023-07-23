import { create } from 'zustand';

type TProfile={
    email: string;
}

type TAuthStore = {
    token: string | null;
    profile: TProfile | null;
    setToken: (token: string | null, newProfile: TProfile|null) => void; // void is any function
}

const useAuthStore = create<TAuthStore>((set) => ({
    token: null,
    profile: null,
    setToken: (newToken: string|null, newProfile: TProfile|null) => 
        set(() => ({ token: newToken, profile: newProfile })),
}))

export { useAuthStore };
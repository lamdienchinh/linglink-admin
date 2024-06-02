import { create } from 'zustand';

type Socket = {
  accessToken: string;
  refreshToken: string;
  setToken: (accessToken: string, refreshToken: string) => void;
};

export const useSocketStore = create<Socket>()((set) => ({
  accessToken: '',
  refreshToken: '',
  setToken: (accessToken: string, refreshToken: string) => {
    set(() => ({
      accessToken: accessToken,
      refreshToken: refreshToken
    }));
  }
}));

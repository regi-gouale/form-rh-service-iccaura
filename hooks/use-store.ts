import { create } from "zustand";

interface PersonState {
  personId: string;
  setPersonId: (id: string) => void;
}
export const useStore = create<PersonState>()((set) => ({
  personId: "",
  setPersonId: (id) => set(() => ({ personId: id })),
}));

import { StateCreator } from "zustand";

export interface UserCardModal {
  additionalData: {
    id: string;
  };
  x: number;
  y: number;
}

export interface ModalState {
  userCard: UserCardModal | undefined;
  openUserCardModal: (id: string, x: number, y: number) => void;
  closeUserCardModal: () => void;
}

export const createModalStore: StateCreator<ModalState, [["zustand/immer", never]]> = (set) => ({
  userCard: undefined,
  closeUserCardModal: () =>
    set((state) => {
      state.userCard = undefined;
    }),
  openUserCardModal: (id: string, x: number, y: number) =>
    set((state) => {
      state.userCard = {
        additionalData: {
          id,
        },
        x,
        y,
      };
    }),
});

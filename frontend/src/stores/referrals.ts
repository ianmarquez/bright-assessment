import { create } from "zustand";
import { ReferralShape } from "../types/Referral";

const defaultFormState: ReferralShape = {
  created_at: "",
  updated_at: "",
  id: "",
  name: "",
  surname: "",
  email: "",
  phone: "",
  address: {
    name: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
    country: "",
  },
  avatar: "",
  fileName: "",
};

interface ReferralsStore {
  referrals: ReferralShape[];
  selected: ReferralShape;

  setSelected: (id: string) => void;
  clearSelected: () => void;
  updateSelected: (key: string, value: string) => void;

  setReferrals: (newReferrals: ReferralShape[]) => void;
  deleteReferrals: (id: string) => void;
  addReferrals: (newReferral: ReferralShape) => void;
}

export const useReferralStore = create<ReferralsStore>((set) => ({
  referrals: [],
  selected: defaultFormState,
  setSelected: (id: string) => {
    set((state) => {
      const selected = state.referrals.find((referral) => referral.id === id);
      return { ...state, selected };
    });
  },
  clearSelected: () => {
    set({ selected: defaultFormState });
  },
  updateSelected: (name: string, value: string) => {
    const [main, child] = name.split(".");
    set((state) => {
      const selected = structuredClone(state.selected);
      if (!child && selected.hasOwnProperty(main)) {
        //@ts-ignore
        selected[main] = value;
      } else if (main && child && selected.address.hasOwnProperty(child)) {
        selected.address[child as keyof (typeof defaultFormState)["address"]] =
          value;
      }

      if (state.selected.id) {
        const currentReferralsWithout = state.referrals.filter(
          (referral) => referral.id !== selected.id,
        );
        return {
          ...state,
          selected,
          referrals: [...currentReferralsWithout, selected],
        };
      } else {
        return { ...state, selected };
      }
    });
  },
  setReferrals: (referrals: ReferralShape[]) => {
    set({ referrals });
  },
  deleteReferrals: (id: string) => {
    set((state) => {
      const referralsWithout = state.referrals.filter(
        (referral) => referral.id !== id,
      );
      return { ...state, referrals: referralsWithout };
    });
  },
  addReferrals: (newReferral: ReferralShape) => {
    set((state) => {
      return { ...state, referrals: [...state.referrals, newReferral] };
    });
  },
}));

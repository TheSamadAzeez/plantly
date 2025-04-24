import { create } from "zustand";

type UserStore = {
  hasFinishedOnboarding: boolean;
  toggleHasOnboarded: () => void;
};

/**
 * Creates and exports a Zustand store to manage the user's onboarding status
 * The store provides a boolean state and a function to toggle that state
 * @returns {UserStore} A Zustand store instance with onboarding state management
 */
export const useUserStore = create<UserStore>((set) => {
  return {
    // Initial state: user hasn't completed onboarding
    hasFinishedOnboarding: false,

    /**
     * Toggles the onboarding status between true and false
     * Uses Zustand's set function to update the state immutably
     */
    toggleHasOnboarded: () =>
      set((state) => {
        return {
          ...state,
          hasFinishedOnboarding: !state.hasFinishedOnboarding,
        };
      }),
  };
});

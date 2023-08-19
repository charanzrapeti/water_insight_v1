import { create } from 'zustand';
import { devtools } from 'zustand/middleware';

const useAuthStore = create(devtools((set, get) => ({
  userDetails: {},
  loggedIn: false,
  logIn: (userDetails) => set({ loggedIn: true, userDetails }),
  logOut: () => set({ loggedIn: false, userDetails: {} }),
  updateUserDetails: (newData) => set({
    userDetails: {
      ...get().userDetails,
      ...newData
    },
  })
})))

export default useAuthStore

const { setState } = useAuthStore

export { setState }
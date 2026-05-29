import { create } from "zustand";

const useMyStore = create((set, get) => ({
  status: true,
  count: 1,
  name: "rahim",
  capdecap: "capitalize ",

  increment() {
    set((state) => ({
      count: state.count + 1,
    }));
  },

  capitalize() {
    set((state) => {
      if (state.status == true) {
        return {
          name: state.name.charAt(0).toUpperCase() + state.name.slice(1),
          capdecap: "UnCapitalize",
          status: false,
        };
      } else {
        return {
          name: state.name.charAt(0).toLowerCase() + state.name.slice(1),
          capdecap: "Capitalize",
          status: true,
        };
      }
    });
  },
}));

export default useMyStore;

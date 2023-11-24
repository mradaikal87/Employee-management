import create from 'zustand';

const useStore = create((set) => ({
  employeeData: [],
  setEmployeeData: (data) => set({ employeeData: data }),
}));

export default useStore;

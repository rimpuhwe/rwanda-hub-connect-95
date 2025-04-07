
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ModalState {
  isOpen: boolean;
  modalType: string | null;
  modalProps?: Record<string, any>;
}

interface FilterState {
  service: string;
  priceRange: [number, number];
  rating: number | null;
  amenities: string[];
  location: string | null;
}

export interface UIState {
  darkMode: boolean;
  modal: ModalState;
  filters: FilterState;
  sidebarOpen: boolean;
  searchQuery: string;
  activeTab: string;
}

const initialState: UIState = {
  darkMode: false,
  modal: {
    isOpen: false,
    modalType: null,
    modalProps: {}
  },
  filters: {
    service: 'all',
    priceRange: [0, 1000],
    rating: null,
    amenities: [],
    location: null
  },
  sidebarOpen: false,
  searchQuery: '',
  activeTab: 'overview'
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleDarkMode: (state) => {
      state.darkMode = !state.darkMode;
    },
    openModal: (state, action: PayloadAction<{ modalType: string; modalProps?: Record<string, any> }>) => {
      state.modal.isOpen = true;
      state.modal.modalType = action.payload.modalType;
      state.modal.modalProps = action.payload.modalProps || {};
    },
    closeModal: (state) => {
      state.modal.isOpen = false;
      state.modal.modalType = null;
      state.modal.modalProps = {};
    },
    setFilters: (state, action: PayloadAction<Partial<FilterState>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    resetFilters: (state) => {
      state.filters = initialState.filters;
    },
    toggleSidebar: (state) => {
      state.sidebarOpen = !state.sidebarOpen;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setActiveTab: (state, action: PayloadAction<string>) => {
      state.activeTab = action.payload;
    }
  }
});

export const { 
  toggleDarkMode, 
  openModal, 
  closeModal, 
  setFilters, 
  resetFilters,
  toggleSidebar,
  setSearchQuery,
  setActiveTab
} = uiSlice.actions;

export default uiSlice.reducer;

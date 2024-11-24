import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ProductType, UserType } from "../types/types";
import { Filter, Update } from "@mui/icons-material";

export interface AppSliceType {
  currentUser: UserType | null;
  loading: boolean;
  drawer: boolean;
  products: ProductType[];
}
const initialState: AppSliceType = {
  currentUser: null,
  loading: false,
  drawer: false,
  products: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setLoading: (state: AppSliceType, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setDrawer: (state: AppSliceType, action: PayloadAction<boolean>) => {
      state.drawer = action.payload;
    },
    setCurrentUser: (
      state: AppSliceType,
      action: PayloadAction<UserType | null>
    ) => {
      state.currentUser = action.payload;
    },
    updateBalance: (state: AppSliceType, action: PayloadAction<UserType>) => {
      const user: UserType = {
        ...action.payload,
      };
      state.currentUser = user;
      localStorage.setItem("currentUser", JSON.stringify(state.currentUser));
    },

    setProducts: (
      state: AppSliceType,
      action: PayloadAction<ProductType[]>
    ) => {
      state.products = action.payload;
    },
    filterProducts: (state: AppSliceType, action: PayloadAction<string>) => {
      const templist: ProductType[] = [];
      state.products.map((product: ProductType) => {
        if (
          product.title.toLowerCase().includes(action.payload.toLowerCase())
        ) {
          templist.push(product);
        }
        state.products = [...templist];
      });
    },
  },
});

export const {
  setLoading,
  setDrawer,
  setCurrentUser,
  setProducts,
  filterProducts,
  updateBalance,
} = appSlice.actions;

export default appSlice.reducer;

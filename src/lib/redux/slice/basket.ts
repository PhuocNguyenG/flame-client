import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type BasketItemType = {
  _id: string;
  banner: string;
  enSlug: string;
  vnSlug: string;
  en: {
    name: string;
  };
  vn: {
    name: string;
  };
  price: number;
  quantity: number;
};

const initialState: BasketItemType[] = [];

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItemType>) => {
      if (!state.find((item) => item._id === action.payload._id)) {
        state.push(action.payload);
      }
    },
    updateBasketById: (
      state,
      action: PayloadAction<{
        _id: string;
        quantityType: "INCREASE" | "DECREASE";
      }>
    ) => {
      let index = state.findIndex((item) => (item._id = action.payload._id));
      switch (action.payload.quantityType) {
        case "INCREASE":
          state[index].quantity = state[index].quantity + 1;
          break;
        case "DECREASE":
          if (state[index].quantity <= 1) {
            state.splice(index, 1);
          } else {
            state[index].quantity = state[index].quantity - 1;
          }
          break;
        default:
          break;
      }
    },
    removeFromBasket: (state, action: PayloadAction<BasketItemType["_id"]>) => {
      return state.filter((item) => item._id !== action.payload);
    },
    clearBasket: () => {
      return [];
    },
  },
});

export const { addToBasket, updateBasketById, removeFromBasket, clearBasket } =
  basketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBasket = createSelector(
  (state: RootState) => state.basket, // the first argument accesses relevant data from global state
  (itemsArray) => itemsArray // the second parameter conducts the transformation
);
export const basketReducer = basketSlice.reducer;

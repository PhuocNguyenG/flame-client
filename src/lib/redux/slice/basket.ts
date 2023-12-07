import { PayloadAction, createSelector, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export type BasketItemType = {
  _id: string;
  banner: string;
  en: {
    name: string;
    slug:string;
  };
  vn: {
    name: string;
    slug:string;
  };
  price: number;
  quantity: number;
};

type stateBasket = {
  open: boolean;
  listItem: BasketItemType[];
};

const initialState: stateBasket = {
  open: false,
  listItem: [],
};

export const basketSlice = createSlice({
  name: "basket",
  initialState,
  reducers: {
    addToBasket: (state, action: PayloadAction<BasketItemType>) => {
      const itemIndex = state.listItem.findIndex(
        (item) => item._id === action.payload._id
      );
      if (itemIndex == -1) {
        state.listItem.push(action.payload);
        state.open = true;
        saveBasketProductsToLocalStorage(state.listItem);
      } else {
        state.listItem[itemIndex].quantity =
          state.listItem[itemIndex].quantity + 1;
        saveBasketProductsToLocalStorage(state.listItem);
      }
    },
    updateQuantityBasketById: (
      state,
      action: PayloadAction<{
        _id: string;
        quantityType?: "INCREASE" | "DECREASE";
        quantityNumber?: number;
      }>
    ) => {
      const index = state.listItem.findIndex(
        (item) => item._id == action.payload._id
      );
      if (action.payload.quantityNumber) {
        state.listItem[index].quantity = action.payload.quantityNumber;
      } else {
        switch (action.payload.quantityType) {
          case "INCREASE":
            state.listItem[index].quantity = state.listItem[index].quantity + 1;
            saveBasketProductsToLocalStorage(state.listItem);
            break;
          case "DECREASE":
            if (state.listItem[index].quantity <= 1) {
              state.listItem.splice(index, 1);
              saveBasketProductsToLocalStorage(state.listItem);
            } else {
              state.listItem[index].quantity =
                state.listItem[index].quantity - 1;
              saveBasketProductsToLocalStorage(state.listItem);
            }
            break;
          default:
            break;
        }
      }
    },
    removeFromBasket: (state, action: PayloadAction<BasketItemType["_id"]>) => {
      const index = state.listItem.findIndex(
        (item) => item._id == action.payload
      );
      state.listItem.splice(index, 1);
      saveBasketProductsToLocalStorage(state.listItem);
    },
    clearBasket: (state) => {
      state.listItem = [];
      saveBasketProductsToLocalStorage(state.listItem);
    },
    setBasketFromLocal: (state, action: PayloadAction<BasketItemType[]>) => {
      if ((state.listItem.length == 0))
        return {
          ...state,
          listItem: action.payload,
        };
    },
    openBasketSidebar: (state, action: PayloadAction<stateBasket["open"]>) => {
      state.open = action.payload;
    },
  },
});

const ls = typeof window !== "undefined" ? window.localStorage : null;
function saveBasketProductsToLocalStorage(basketProducts: BasketItemType[]) {
  if (ls) {
    ls.setItem("basket", JSON.stringify(basketProducts));
  }
}

export const {
  addToBasket,
  updateQuantityBasketById,
  removeFromBasket,
  clearBasket,
  openBasketSidebar,
  setBasketFromLocal,
} = basketSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectBasket = createSelector(
  (state: RootState) => state.basket, // the first argument accesses relevant data from global state
  (itemsArray) => itemsArray // the second parameter conducts the transformation
);
export const selectBasketTotalPrice = createSelector(
  (state: RootState) => state.basket,
  (itemsArray) => {
    let total = 0;
    itemsArray.listItem.forEach((item) => {
      total += item.price * item.quantity;
    });
    return total;
  }
);

export const basketReducer = basketSlice.reducer;

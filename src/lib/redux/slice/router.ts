import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

// Define a type for the slice state
interface RouterState {
  slugCategoriesTrans: [
    { en: string; enSlug: string; vn: string; vnSlug: string }
  ];
  slugProductDetailTrans: [
    { en: string; enSlug: string; vn: string; vnSlug: string }
  ];
}

// Define the initial state using that type
const initialState: RouterState = {
  slugCategoriesTrans: [{ en: "", enSlug: "", vn: "", vnSlug: "" }],
  slugProductDetailTrans: [
    {
      en: "",
      enSlug: "",
      vn: "",
      vnSlug: "",
    },
  ],
};

export const routerSlice = createSlice({
  name: "router",
  initialState,
  reducers: {
    // (main): use for trans slug when switching lang
    setSlugCategoriesTrans: (
      state,
      action: PayloadAction<RouterState["slugCategoriesTrans"]>
    ) => {
      state.slugCategoriesTrans = action.payload;
    },
    setSlugProductDetailTrans: (
      state,
      action: PayloadAction<RouterState["slugProductDetailTrans"]>
    ) => {
      state.slugProductDetailTrans = action.payload;
    },
  },
});

export const { setSlugCategoriesTrans, setSlugProductDetailTrans } =
  routerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategoryExportTrans = (state: RootState) =>
  state.router.slugCategoriesTrans;

export default routerSlice.reducer;

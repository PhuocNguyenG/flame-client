import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from "@/lib/redux/store";

// Define a type for the slice state
interface RouterState {
  categoryExportTrans: [
    { en: string; enSlug: string; vn: string; vnSlug: string }
  ];
  slugExportTrans: [{ en: string; enSlug: string; vn: string; vnSlug: string  }];
}

// Define the initial state using that type
const initialState: RouterState = {
  categoryExportTrans: [{ en: "", enSlug: "", vn: "", vnSlug: "" }],
  slugExportTrans: [
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
    setCategoryExportTrans: (
      state,
      action: PayloadAction<RouterState["categoryExportTrans"]>
    ) => {
      state.categoryExportTrans = action.payload;
    },
    setSlugExportTrans: (
      state,
      action: PayloadAction<RouterState["slugExportTrans"]>
    ) => {
      state.slugExportTrans = action.payload;
    },
  },
});

export const { setCategoryExportTrans, setSlugExportTrans } =
  routerSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCategoryExportTrans = (state: RootState) =>
  state.router.categoryExportTrans;

export default routerSlice.reducer;

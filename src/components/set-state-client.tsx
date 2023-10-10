"use client";

import { useAppDispatch } from "@/lib/redux/store";

export const SetStateToClient = ({ dispatch }: { dispatch: any }) => {
  const useDispatch = useAppDispatch();

  useDispatch(dispatch);
  return null;
};

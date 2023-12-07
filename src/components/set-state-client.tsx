"use client";

import { useAppDispatch } from "@/lib/redux/store";
import React from "react";

export const SetStateToClient = React.memo(function SetStateToClient({
  dispatch,
}: {
  dispatch: any;
}) {
  const useDispatch = useAppDispatch();

  const HandleDispatch = () => {
    useDispatch(dispatch);
  };

  React.useEffect(() => {
    HandleDispatch();
  }, []);

  return null;
});

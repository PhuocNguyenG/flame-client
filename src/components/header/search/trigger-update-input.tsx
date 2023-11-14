"use client"
import { useSearchParams } from "next/navigation";
import React from "react";

const UpdateSearchInput = ({
  setInputValue,
}: {
  setInputValue: React.Dispatch<React.SetStateAction<string>>;
}) => {
  const searchParams = useSearchParams();
  const keySearch = searchParams.get("s") || "";
  React.useEffect(() => {
    if (keySearch) {
      setInputValue(keySearch);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return null;
};

export default UpdateSearchInput;

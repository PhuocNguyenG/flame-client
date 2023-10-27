"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { store } from "@/lib/redux/store";
import React, { ReactNode } from "react";
import { Provider as Redux } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

type Props = {
  children?: React.ReactNode;
  session?: Session;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}> {children} </SessionProvider>;
};

type RootProviderType = {
  children: ReactNode;
};
const queryClient = new QueryClient();
function RootProvider({ children }: RootProviderType) {
  return (
    <QueryClientProvider client={queryClient}>
      <Redux store={store}>{children}</Redux>
    </QueryClientProvider>
  );
}

export default RootProvider;

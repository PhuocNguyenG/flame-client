"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { store } from "@/lib/redux/store";
import React, { ReactNode } from "react";
import { Provider as Redux } from "react-redux";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function RootProvider({
  children,
  session,
}: {
  children: ReactNode;
  session?: Session;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      <Redux store={store}>
        <SessionProvider session={session}>{children}</SessionProvider>
      </Redux>
    </QueryClientProvider>
  );
}

export default RootProvider;

"use client";

import { SessionProvider } from "next-auth/react";
import type { Session } from "next-auth";
import { store } from "@/lib/redux/store";
import React, { ReactNode } from "react";
import { Provider } from "react-redux";

type Props = {
  children?: React.ReactNode;
  session?: Session;
};

export const NextAuthProvider = ({ children, session }: Props) => {
  return <SessionProvider session={session}> {children} </SessionProvider>;
};

type ReduxProviderType = {
  children: ReactNode;
};

function ReduxProvider({ children }: ReduxProviderType) {
  return <Provider store={store}>{children}</Provider>;
}

export default ReduxProvider;

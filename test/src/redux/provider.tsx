"use client";
import { store, persistor } from "./store";
import { PersistGate } from "redux-persist/integration/react";

import { Provider } from "react-redux";
import React from "react";

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>{children}</Provider>
    </PersistGate>
  );
}

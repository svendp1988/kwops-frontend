import React, { JSX } from 'react'
import { DockLayoutProvider } from "../provider/DockLayout.Provider";

export const withDockLayoutProvider = (element: JSX.Element): JSX.Element =>
  <DockLayoutProvider>{element}</DockLayoutProvider>

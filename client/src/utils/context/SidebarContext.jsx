import React, { createContext, useState } from 'react';

const SidebarContext = createContext();

const SidebarProvider = ({ children }) => {
  const [sidebarCollapse, setSidebarCollapse] = useState(false);
  return (
    <SidebarContext.Provider value={{ sidebarCollapse, setSidebarCollapse }}>
      {children}
    </SidebarContext.Provider>
  );
};

export { SidebarContext, SidebarProvider };

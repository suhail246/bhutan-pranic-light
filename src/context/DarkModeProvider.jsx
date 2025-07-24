"use client";

import { ThemeProvider } from "next-themes";

const DarkModeProvider = ({ children, ...props }) => {
  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </ThemeProvider>
  );
};

export default DarkModeProvider;

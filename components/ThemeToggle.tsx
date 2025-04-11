"use client";

import { useState, useEffect } from "react";
import { Switch, Flex, Text } from "@radix-ui/themes";
import styles from "./ThemeToggle.module.css";

export default function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">("light");

  // Initialize theme from system preference or localStorage
  useEffect(() => {
    // Check if localStorage is available (client-side)
    if (typeof window !== "undefined") {
      const savedTheme = localStorage.getItem("theme") as
        | "light"
        | "dark"
        | null;

      if (savedTheme) {
        setTheme(savedTheme);
      } else if (
        window.matchMedia &&
        window.matchMedia("(prefers-color-scheme: dark)").matches
      ) {
        setTheme("dark");
      }
    }
  }, []);

  // Update document with theme changes
  useEffect(() => {
    if (typeof document !== "undefined") {
      document.documentElement.setAttribute("data-theme", theme);
      localStorage.setItem("theme", theme);

      // Dispatch a storage event to notify other components
      window.dispatchEvent(
        new StorageEvent("storage", {
          key: "theme",
          newValue: theme,
          storageArea: localStorage,
        })
      );
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <Flex gap="1" align="center" className={styles.themeToggle}>
      <Text>{theme === "light" ? "☀️" : "🌙"}</Text>
      <Switch
        onClick={toggleTheme}
        aria-label={`Alternar para tema ${
          theme === "light" ? "escuro" : "claro"
        }`}
      />
    </Flex>
  );
}

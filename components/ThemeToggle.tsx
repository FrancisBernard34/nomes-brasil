"use client";

import { Flex, Text, Switch } from "@radix-ui/themes";
import styles from "./ThemeToggle.module.css";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <Flex gap="1" align="center" className={styles.themeToggle}>
      <Text>{theme === "light" ? "☀️" : "🌙"}</Text>
      <Switch
        checked={theme === "dark"}
        onClick={toggleTheme}
        aria-label={`Alternar para tema ${
          theme === "light" ? "escuro" : "claro"
        }`}
      />
    </Flex>
  );
}

"use client";

import { Switch } from "@radix-ui/themes";
import styles from "./ThemeToggle.module.css";
import { useTheme } from "@/components/ThemeProvider";

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className={styles.themeToggle} onClick={toggleTheme}>
      <div className={styles.themeIcon}>{theme === "light" ? "☀️" : "🌙"}</div>
      <div className={styles.switchWrapper}>
        <Switch
          size="2"
          radius="full"
          color="blue"
          checked={theme === "dark"}
          aria-label={`Alternar para tema ${
            theme === "light" ? "escuro" : "claro"
          }`}
        />
      </div>
    </div>
  );
}

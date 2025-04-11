"use client";

import { Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Header.module.css";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path ? styles.active : "";
  };

  return (
    <header className={styles.header}>
      {/* Decorative elements */}
      <div className={`${styles.decorativeCircle} ${styles.decorativeCircle1}`}></div>
      <div className={`${styles.decorativeCircle} ${styles.decorativeCircle2}`}></div>

      <div className={styles.headerContent}>
        <Flex direction="column" align="center" gap="2">
          <Heading size="8" className={styles.title}>
            <span className={styles.titleHighlight}>Nomes</span> do Brasil
          </Heading>
          <Text size="2" className={styles.subtitle}>
            Estatísticas e curiosidades sobre os nomes brasileiros baseados nos dados do IBGE
          </Text>
        </Flex>

        <nav className={styles.nav}>
          <div className={styles.navContainer}>
            <Link href="/" className={`${styles.navLink} ${isActive("/")}`}>
              Início
            </Link>
            <Link href="/buscar" className={`${styles.navLink} ${isActive("/buscar")}`}>
              Buscar Nome
            </Link>
            <Link href="/comparar" className={`${styles.navLink} ${isActive("/comparar")}`}>
              Comparar
            </Link>
            <Link href="/curiosidades" className={`${styles.navLink} ${isActive("/curiosidades")}`}>
              Curiosidades
            </Link>
          </div>
        </nav>
      </div>

      <div className={styles.themeToggleWrapper}>
        <ThemeToggle />
      </div>
    </header>
  );
}

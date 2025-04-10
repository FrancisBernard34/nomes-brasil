import { Flex, Heading, Text } from "@radix-ui/themes";
import Link from "next/link";
import styles from "./Header.module.css";
import ThemeToggle from "./ThemeToggle";

export default function Header() {
  return (
    <header className={styles.header}>
      <Flex direction="column" align="center" gap="2">
        <Heading size="8" className={styles.title}>
          Nomes do Brasil
        </Heading>
        <Text size="2" className={styles.subtitle}>
          Estatísticas e curiosidades sobre os nomes brasileiros
        </Text>
      </Flex>
      <Flex justify="center" align="center" width="100%" mb="4">
        <nav className={styles.nav}>
          <Flex gap="4" justify="center">
            <Link href="/" className={styles.navLink}>
              Início
            </Link>
            <Link href="/buscar" className={styles.navLink}>
              Buscar Nome
            </Link>
            <Link href="/comparar" className={styles.navLink}>
              Comparar
            </Link>
            <Link href="/curiosidades" className={styles.navLink}>
              Curiosidades
            </Link>
          </Flex>
        </nav>
      </Flex>
      <Flex justify="end" width="100%">
        <ThemeToggle />
      </Flex>
    </header>
  );
}

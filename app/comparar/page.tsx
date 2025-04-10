import styles from "../page.module.css";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import Header from "@/components/Header";
import CompareClient from "@/components/CompareClient";

export default function ComparePage() {
  return (
    <div className={styles.page}>
      <Header />
      <CompareClient />
    </div>
  );
}

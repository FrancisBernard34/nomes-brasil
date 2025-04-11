import styles from "./page.module.css";
import Header from "@/components/Header";
import HomeClient from "@/components/HomeClient";
import { getMostFrequentNames } from "@/services/ibgeApi";

async function getData() {
  const mostFrequentNames = await getMostFrequentNames(10);
  return {
    mostFrequentNames,
  };
}

export default async function Home() {
  const { mostFrequentNames } = await getData();

  return (
    <div className={styles.page}>
      {/* Background decorations */}
      <div className={styles.pageBackground}></div>
      <div className={`${styles.pageDecoration} ${styles.pageDecoration1}`}></div>
      <div className={`${styles.pageDecoration} ${styles.pageDecoration2}`}></div>

      <Header />
      <HomeClient mostFrequentNames={mostFrequentNames} />
    </div>
  );
}

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
      <Header />
      <HomeClient mostFrequentNames={mostFrequentNames} />
    </div>
  );
}

import styles from "../page.module.css";
import Header from "@/components/Header";
import CuriositiesClient from "@/components/CuriositiesClient";
import { getMostFrequentNames } from "@/services/ibgeApi";

async function getData() {
  const maleNames = await getMostFrequentNames(5, "M");
  const femaleNames = await getMostFrequentNames(5, "F");

  return {
    maleNames,
    femaleNames,
  };
}

export default async function CuriositiesPage() {
  const { maleNames, femaleNames } = await getData();

  return (
    <div className={styles.page}>
      <Header />
      <CuriositiesClient
        maleNames={maleNames}
        femaleNames={femaleNames}
      />
    </div>
  );
}

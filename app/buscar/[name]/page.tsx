import styles from "../../page.module.css";
import Header from "@/components/Header";
import SearchResultsClient from "@/components/SearchResultsClient";
import { getNameDetails } from "@/services/ibgeApi";

type Params = Promise<{ name: string }>;

async function getData(name: string) {
  try {
    const nameDetails = await getNameDetails(name);
    return {
      nameDetails,
      error: null,
    };
  } catch (_) {
    return {
      nameDetails: null,
      error: "Não foi possível encontrar informações para este nome.",
    };
  }
}

export default async function SearchResultsPage({
  params,
}: {
  params: Params;
}) {
  const { name } = await params;
  const decodedName = decodeURIComponent(name);
  const { nameDetails, error } = await getData(decodedName);

  return (
    <div className={styles.page}>
      <Header />
      <SearchResultsClient
        nameDetails={nameDetails}
        error={error}
        decodedName={decodedName}
      />
    </div>
  );
}

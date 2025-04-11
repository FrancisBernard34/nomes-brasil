"use client";

import { Flex, Heading, Text, Card, Box } from "@radix-ui/themes";
import NameFrequencyOverTimeChart from "@/components/NameFrequencyOverTimeChart";
import Link from "next/link";
import styles from "@/app/page.module.css";
import { NameDetailResponse } from "@/services/ibgeApi";

interface SearchResultsClientProps {
  nameDetails: NameDetailResponse | null;
  error: string | null;
  decodedName: string;
}

export default function SearchResultsClient({
  nameDetails,
  error,
  decodedName,
}: SearchResultsClientProps) {
  // Calculate total frequency
  const totalFrequency = nameDetails
    ? nameDetails.res.reduce((sum, item) => sum + item.frequencia, 0)
    : 0;

  // Format large numbers with dots as thousand separators
  const formatNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <main className={styles.main}>
      <Heading size="7" align="center" mb="5">
        Resultados para: {decodedName.toUpperCase()}
      </Heading>

      {error ? (
        <Card>
          <Flex direction="column" gap="3" p="4" align="center">
            <Text color="red" size="4">
              {error}
            </Text>
            <Link href="/buscar">
              <Text color="blue">Voltar para a busca</Text>
            </Link>
          </Flex>
        </Card>
      ) : (
        <Flex direction="column" gap="6">
          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Estatísticas Gerais</Heading>
              <Text as="p">
                O nome <strong>{decodedName.toUpperCase()}</strong> aparece{" "}
                {formatNumber(totalFrequency)} vezes nos registros do IBGE no
                Brasil.
              </Text>
              {nameDetails?.sexo && (
                <Text as="p">
                  Gênero predominante:{" "}
                  <strong>
                    {nameDetails.sexo === "M" ? "Masculino" : "Feminino"}
                  </strong>
                </Text>
              )}
            </Flex>
          </Card>

          {nameDetails && (
            <Box mt="4">
              <NameFrequencyOverTimeChart
                data={nameDetails.res}
                name={decodedName}
              />
            </Box>
          )}

          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Interpretação</Heading>
              <Text as="p">
                O gráfico acima mostra como a popularidade do nome{" "}
                <strong>{decodedName.toUpperCase()}</strong> variou ao longo das
                décadas no Brasil. Cada barra representa o número de pessoas
                registradas com esse nome em um determinado período.
              </Text>
            </Flex>
          </Card>

          <Flex justify="center" mt="4">
            <Link href="/buscar">
              <Text color="blue">Realizar nova busca</Text>
            </Link>
          </Flex>
        </Flex>
      )}
    </main>
  );
}

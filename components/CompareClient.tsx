"use client";

import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import NameComparisonChart from "./NameComparisonChart";
import styles from "@/app/page.module.css";

export default function CompareClient() {
  return (
    <main className={styles.main}>
      <Heading size="7" align="center" mb="5">
        Comparar Nomes
      </Heading>
      
      <Text as="p" size="4" align="center" mb="6">
        Compare a popularidade de diferentes nomes ao longo do tempo no Brasil.
      </Text>
      
      <Flex direction="column" gap="6">
        <NameComparisonChart />
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Como usar</Heading>
            <Text as="p">
              Digite um nome no campo acima e clique em "Adicionar" para incluí-lo no gráfico.
              Você pode adicionar até 6 nomes diferentes para comparar suas frequências ao longo das décadas.
              Para remover um nome, clique no "X" ao lado dele.
            </Text>
          </Flex>
        </Card>
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Interpretação</Heading>
            <Text as="p">
              O gráfico mostra como a popularidade de cada nome variou ao longo das décadas no Brasil.
              Cada linha representa um nome, e os pontos indicam o número de pessoas registradas com esse nome
              em cada período. Isso permite identificar tendências, como nomes que estão se tornando mais populares
              ou aqueles que estão em declínio.
            </Text>
          </Flex>
        </Card>
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Dica</Heading>
            <Text as="p">
              Experimente comparar nomes de diferentes gerações, como "Maria" e "Sophia",
              ou nomes masculinos e femininos com sonoridade similar, como "Gabriel" e "Gabriela".
              Você também pode comparar variações de um mesmo nome, como "Ana", "Anne" e "Anna".
            </Text>
          </Flex>
        </Card>
      </Flex>
    </main>
  );
}

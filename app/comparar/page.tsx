import styles from "../page.module.css";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import Header from "@/components/Header";
import NameComparisonChart from "@/components/NameComparisonChart";

export default function ComparePage() {
  return (
    <div className={styles.page}>
      <Header />

      <main className={styles.main}>
        <Heading size="7" align="center" mb="5">
          Comparar Nomes
        </Heading>

        <Text as="p" size="4" align="center" mb="6">
          Compare a frequência de diferentes nomes ao longo do tempo no Brasil.
        </Text>

        <NameComparisonChart />

        <Flex direction="column" gap="6" mt="6">
          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Como funciona?</Heading>
              <Text as="p">
                Esta ferramenta permite comparar a frequência de até 6 nomes diferentes ao longo das décadas.
                Digite um nome no campo acima e clique em "Adicionar" para incluí-lo no gráfico.
                Você pode remover nomes clicando no "✕" ao lado de cada nome adicionado.
              </Text>
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Dica</Heading>
              <Text as="p">
                Compare nomes semelhantes ou variações de um mesmo nome para ver como sua popularidade
                evoluiu ao longo do tempo. Por exemplo, compare "Carlos" e "Carla", ou "José" e "José Carlos".
              </Text>
            </Flex>
          </Card>

          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Atenção</Heading>
              <Text as="p">
                Não é possível buscar por nomes compostos como Maria Luiza ou José Antonio.
                Por favor, busque cada nome separadamente.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </main>
    </div>
  );
}

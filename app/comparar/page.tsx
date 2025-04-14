import styles from "../page.module.css";
import { Flex, Text, Card, Grid, Badge } from "@radix-ui/themes";
import Header from "@/components/Header";
import NameComparisonChart from "@/components/NameComparisonChart";

export default function ComparePage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}></div>
      <div className={`${styles.pageDecoration} ${styles.pageDecoration1}`}></div>
      <div className={`${styles.pageDecoration} ${styles.pageDecoration2}`}></div>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.sectionTitle}>
          Comparar Nomes
        </h1>

        <Text as="p" size="4" align="center" mb="6" className="animate-fadeIn">
          Compare a frequência de diferentes nomes ao longo do tempo no Brasil.
        </Text>

        <div className="animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <NameComparisonChart />
        </div>

        <Grid columns={{ initial: "1", md: "3" }} gap="6" width="100%" mt="6">
          <Card className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
            <Flex direction="column" gap="3" p="4">
              <Flex align="center" justify="between">
                <h3 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Como funciona?</h3>
                <Badge color="blue" variant="soft" radius="full">Informação</Badge>
              </Flex>
              <Text as="p">
                Esta ferramenta permite comparar a frequência de até 6 nomes diferentes ao longo das décadas.
                Digite um nome no campo acima e clique em &quot;Adicionar&quot; para incluí-lo no gráfico.
                Você pode remover nomes clicando no &quot;✕&quot; ao lado de cada nome adicionado.
              </Text>
            </Flex>
          </Card>

          <Card className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
            <Flex direction="column" gap="3" p="4">
              <Flex align="center" justify="between">
                <h3 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Dica</h3>
                <Badge color="green" variant="soft" radius="full">Sugestão</Badge>
              </Flex>
              <Text as="p">
                Compare nomes semelhantes ou variações de um mesmo nome para ver como sua popularidade
                evoluiu ao longo do tempo. Por exemplo, compare &quot;Carlos&quot; e &quot;Carla&quot;, ou &quot;José&quot; e &quot;José Carlos&quot;.
              </Text>
            </Flex>
          </Card>

          <Card className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
            <Flex direction="column" gap="3" p="4">
              <Flex align="center" justify="between">
                <h3 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Atenção</h3>
                <Badge color="red" variant="soft" radius="full">Importante</Badge>
              </Flex>
              <Text as="p">
                Não é possível buscar por nomes compostos como Maria Luiza ou José Antonio.
                Por favor, busque cada nome separadamente.
              </Text>
            </Flex>
          </Card>
        </Grid>
      </main>
    </div>
  );
}

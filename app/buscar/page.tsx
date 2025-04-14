import styles from "../page.module.css";
import { Flex, Text, Card, Grid, Badge } from "@radix-ui/themes";
import Header from "@/components/Header";
import SearchForm from "./SearchForm";

export default function SearchPage() {
  return (
    <div className={styles.page}>
      <div className={styles.pageBackground}></div>
      <div className={`${styles.pageDecoration} ${styles.pageDecoration1}`}></div>
      <div className={`${styles.pageDecoration} ${styles.pageDecoration2}`}></div>

      <Header />

      <main className={styles.main}>
        <h1 className={styles.sectionTitle}>
          Buscar Nome
        </h1>

        <Text as="p" size="4" align="center" mb="6" className="animate-fadeIn">
          Digite um nome para descobrir sua frequência e evolução ao longo do tempo no Brasil.
        </Text>

        <Card className={`${styles.searchCard} animate-fadeIn`} style={{ animationDelay: "100ms" }}>
          <Flex direction="column" gap="4" p="4">
            <SearchForm />
          </Flex>
        </Card>

        <Grid columns={{ initial: "1", md: "3" }} gap="6" width="100%" mt="6">
          <Card className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
            <Flex direction="column" gap="3" p="4">
              <Flex align="center" justify="between">
                <h3 className="text-gradient" style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>Como funciona?</h3>
                <Badge color="blue" variant="soft" radius="full">Informação</Badge>
              </Flex>
              <Text as="p">
                Esta ferramenta utiliza dados do Censo Demográfico do IBGE para mostrar estatísticas
                sobre os nomes no Brasil. Você pode descobrir a frequência de um nome específico,
                sua evolução ao longo das décadas e comparar com outros nomes.
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
                Experimente buscar por nomes populares como Maria, José, Ana ou João,
                ou tente nomes menos comuns para ver como sua frequência varia ao longo do tempo.
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

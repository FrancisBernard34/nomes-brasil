import styles from "../page.module.css";
import { Flex, Heading, Text, Card } from "@radix-ui/themes";
import Header from "@/components/Header";
import SearchForm from "./SearchForm";

export default function SearchPage() {
  return (
    <div className={styles.page}>
      <Header />
      
      <main className={styles.main}>
        <Heading size="7" align="center" mb="5">
          Buscar Nome
        </Heading>
        
        <Text as="p" size="4" align="center" mb="6">
          Digite um nome para descobrir sua frequência e evolução ao longo do tempo no Brasil.
        </Text>
        
        <Card className={styles.searchCard}>
          <Flex direction="column" gap="4" p="4">
            <SearchForm />
          </Flex>
        </Card>
        
        <Flex direction="column" gap="6" mt="6">
          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Como funciona?</Heading>
              <Text as="p">
                Esta ferramenta utiliza dados do Censo Demográfico do IBGE para mostrar estatísticas
                sobre os nomes no Brasil. Você pode descobrir a frequência de um nome específico,
                sua evolução ao longo das décadas e comparar com outros nomes.
              </Text>
            </Flex>
          </Card>
          
          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Dica</Heading>
              <Text as="p">
                Experimente buscar por nomes populares como Maria, José, Ana ou João,
                ou tente nomes menos comuns para ver como sua frequência varia ao longo do tempo.
              </Text>
            </Flex>
          </Card>
        </Flex>
      </main>
    </div>
  );
}

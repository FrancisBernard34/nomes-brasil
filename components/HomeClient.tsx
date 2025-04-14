"use client";

import { Flex, Text, Heading, Card, Box, Tabs, Grid, Badge } from "@radix-ui/themes";
import MostCommonNamesChart from "@/components/MostCommonNamesChart";
import RegionalDistributionChart from "@/components/RegionalDistributionChart";
import styles from "@/app/page.module.css";
import { NameFrequencyResponse } from "@/services/ibgeApi";
import { useState } from "react";

interface HomeClientProps {
  mostFrequentNames: NameFrequencyResponse;
}

export default function HomeClient({ mostFrequentNames }: HomeClientProps) {
  // State to track active tab for potential future enhancements
  const setActiveTab = useState("ranking")[1]; // Using array destructuring index to avoid unused variable

  return (
    <main className={styles.main}>
      <h1 className={styles.sectionTitle}>
        Descubra Curiosidades sobre os Nomes no Brasil
      </h1>

      <Text as="p" size="4" align="center" mb="6" className="animate-fadeIn">
        Explore estatísticas e curiosidades sobre os nomes mais populares do Brasil,
        com base nos dados do Censo do IBGE.
      </Text>

      <Grid columns={{ initial: "1", md: "2" }} gap="6" width="100%">
        <Card className="animate-fadeIn" style={{ animationDelay: "100ms" }}>
          <Flex direction="column" gap="3" p="4">
            <Flex align="center" justify="between">
              <Heading size="4" className="text-gradient">Você sabia?</Heading>
              <Badge color="blue" variant="soft" radius="full">Destaque</Badge>
            </Flex>
            <Text as="p">
              O nome <strong>MARIA</strong> é o mais comum no Brasil, com mais de 11,7 milhões de pessoas registradas com esse nome.
              Isso representa aproximadamente 5,7% da população brasileira!
            </Text>
          </Flex>
        </Card>

        <Card className="animate-fadeIn" style={{ animationDelay: "200ms" }}>
          <Flex direction="column" gap="3" p="4">
            <Flex align="center" justify="between">
              <Heading size="4" className="text-gradient">Curiosidade</Heading>
              <Badge color="amber" variant="soft" radius="full">Interessante</Badge>
            </Flex>
            <Text as="p">
              Os nomes <strong>JOSÉ</strong> e <strong>MARIA</strong> juntos representam mais de 17,4 milhões de brasileiros.
              Se fossem um país, seria mais populoso que muitas nações!
            </Text>
          </Flex>
        </Card>
      </Grid>

      <Box mt="6" className="animate-fadeIn" style={{ animationDelay: "300ms" }}>
        <Tabs.Root defaultValue="ranking" onValueChange={setActiveTab}>
          <Tabs.List>
            <Tabs.Trigger value="ranking">Ranking Nacional</Tabs.Trigger>
            <Tabs.Trigger value="regional">Distribuição Regional</Tabs.Trigger>
          </Tabs.List>

          <Tabs.Content value="ranking">
            <Box mt="3">
              <MostCommonNamesChart
                data={mostFrequentNames.res}
                title="Os 10 Nomes Mais Comuns no Brasil"
              />
            </Box>
          </Tabs.Content>

          <Tabs.Content value="regional">
            <Box mt="3">
              <RegionalDistributionChart />
            </Box>
          </Tabs.Content>
        </Tabs.Root>
      </Box>

      <Grid columns={{ initial: "1", md: "2" }} gap="6" width="100%" className="animate-fadeIn" style={{ animationDelay: "400ms" }}>
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Flex align="center" justify="between">
              <Heading size="4" className="text-gradient">Tendências de Nomes</Heading>
              <Badge color="green" variant="soft" radius="full">Atualizado</Badge>
            </Flex>
            <Text as="p">
              Nas últimas décadas, observamos uma grande mudança nas escolhas de nomes no Brasil.
              Nomes compostos e internacionais têm se tornado cada vez mais populares, enquanto nomes
              tradicionais como Maria e José têm diminuído em frequência entre os recém-nascidos.
            </Text>
          </Flex>
        </Card>

        <Card>
          <Flex direction="column" gap="3" p="4">
            <Flex align="center" justify="between">
              <Heading size="4" className="text-gradient">Dados do IBGE</Heading>
              <Badge color="purple" variant="soft" radius="full">Fonte Oficial</Badge>
            </Flex>
            <Text as="p">
              Todos os dados apresentados neste site são baseados no Censo Demográfico do IBGE.
              As estatísticas refletem a distribuição de nomes no Brasil ao longo das décadas,
              permitindo análises sobre a evolução e popularidade dos nomes brasileiros.
            </Text>
          </Flex>
        </Card>
      </Grid>
    </main>
  );
}

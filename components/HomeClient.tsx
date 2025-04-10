"use client";

import { Flex, Text, Heading, Card, Box, Tabs } from "@radix-ui/themes";
import MostCommonNamesChart from "@/components/MostCommonNamesChart";
import RegionalDistributionChart from "@/components/RegionalDistributionChart";
import styles from "@/app/page.module.css";
import { NameFrequencyResponse } from "@/services/ibgeApi";

interface HomeClientProps {
  mostFrequentNames: NameFrequencyResponse;
}

export default function HomeClient({ mostFrequentNames }: HomeClientProps) {
  return (
    <main className={styles.main}>
      <Heading size="7" align="center" mb="5">
        Descubra Curiosidades sobre os Nomes no Brasil
      </Heading>

      <Text as="p" size="4" align="center" mb="6">
        Explore estatísticas e curiosidades sobre os nomes mais populares do Brasil,
        com base nos dados do Censo do IBGE.
      </Text>

      <Flex direction="column" gap="6">
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Você sabia?</Heading>
            <Text as="p">
              O nome <strong>MARIA</strong> é o mais comum no Brasil, com mais de 11,7 milhões de pessoas registradas com esse nome.
              Isso representa aproximadamente 5,7% da população brasileira!
            </Text>
          </Flex>
        </Card>

        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Curiosidade</Heading>
            <Text as="p">
              Os nomes <strong>JOSÉ</strong> e <strong>MARIA</strong> juntos representam mais de 17,4 milhões de brasileiros.
              Se fossem um país, seria mais populoso que muitas nações!
            </Text>
          </Flex>
        </Card>

        <Box mt="4">
          <Tabs.Root defaultValue="ranking">
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

        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Tendências de Nomes</Heading>
            <Text as="p">
              Nas últimas décadas, observamos uma grande mudança nas escolhas de nomes no Brasil.
              Nomes compostos e internacionais têm se tornado cada vez mais populares, enquanto nomes
              tradicionais como Maria e José têm diminuído em frequência entre os recém-nascidos.
            </Text>
          </Flex>
        </Card>
      </Flex>
    </main>
  );
}

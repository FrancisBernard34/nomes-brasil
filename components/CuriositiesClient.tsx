"use client";

import { Flex, Heading, Text, Card, Grid } from "@radix-ui/themes";
import styles from "@/app/page.module.css";
import { NameFrequencyResponse } from "@/services/ibgeApi";

interface CuriositiesClientProps {
  maleNames: NameFrequencyResponse;
  femaleNames: NameFrequencyResponse;
}

export default function CuriositiesClient({ maleNames, femaleNames }: CuriositiesClientProps) {
  return (
    <main className={styles.main}>
      <Heading size="7" align="center" mb="5">
        Curiosidades sobre Nomes no Brasil
      </Heading>
      
      <Text as="p" size="4" align="center" mb="6">
        Descubra fatos interessantes sobre os nomes brasileiros e suas origens.
      </Text>
      
      <Flex direction="column" gap="6">
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Os Nomes Mais Populares</Heading>
            <Text as="p">
              O nome <strong>MARIA</strong> é o mais comum no Brasil, com mais de 11,7 milhões de pessoas.
              Isso representa aproximadamente 5,7% da população brasileira! O segundo nome mais comum
              é <strong>JOSÉ</strong>, com cerca de 5,7 milhões de brasileiros.
            </Text>
          </Flex>
        </Card>
        
        <Grid columns={{ initial: "1", md: "2" }} gap="4">
          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Top 20 Nomes Masculinos</Heading>
              <ol className={styles.rankingList}>
                {maleNames.res.map((name) => (
                  <li key={name.nome}>
                    <strong>{name.nome}</strong> - {name.frequencia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} pessoas
                  </li>
                ))}
              </ol>
            </Flex>
          </Card>
          
          <Card>
            <Flex direction="column" gap="3" p="4">
              <Heading size="5">Top 20 Nomes Femininos</Heading>
              <ol className={styles.rankingList}>
                {femaleNames.res.map((name) => (
                  <li key={name.nome}>
                    <strong>{name.nome}</strong> - {name.frequencia.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".")} pessoas
                  </li>
                ))}
              </ol>
            </Flex>
          </Card>
        </Grid>
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Evolução dos Nomes</Heading>
            <Text as="p">
              Nas últimas décadas, observamos uma grande mudança nas escolhas de nomes no Brasil.
              Nomes tradicionais como Maria e José, que dominaram por gerações, têm diminuído em
              frequência entre os recém-nascidos, dando lugar a nomes mais modernos e internacionais.
            </Text>
          </Flex>
        </Card>
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Nomes Compostos</Heading>
            <Text as="p">
              Os nomes compostos têm se tornado cada vez mais populares no Brasil. Combinações como
              Maria Eduarda, João Pedro e Ana Clara estão entre as preferências dos pais brasileiros
              nas últimas décadas.
            </Text>
          </Flex>
        </Card>
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Influências Culturais</Heading>
            <Text as="p">
              A escolha de nomes no Brasil é fortemente influenciada por novelas, filmes, séries e
              personalidades famosas. Após o sucesso de certas produções culturais, é comum observar
              um aumento na frequência de nomes de personagens ou celebridades.
            </Text>
          </Flex>
        </Card>
        
        <Card>
          <Flex direction="column" gap="3" p="4">
            <Heading size="5">Nomes Únicos</Heading>
            <Text as="p">
              O Brasil é conhecido pela criatividade na escolha de nomes. Existem milhares de nomes
              únicos no país, muitos deles combinações ou variações de nomes existentes, ou até mesmo
              palavras de outras línguas adaptadas como nomes próprios.
            </Text>
          </Flex>
        </Card>
      </Flex>
    </main>
  );
}

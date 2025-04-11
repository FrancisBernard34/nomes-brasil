"use client";

import { useState } from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { Flex, Text, Card, Button, TextField, Select } from '@radix-ui/themes';
import { getNameRegionalDistribution, NameDetailResponse } from '@/services/ibgeApi';
import { regions, Region, State } from '@/services/regionsData';
import styles from './Charts.module.css';

export default function RegionalDistributionChart() {
  const [name, setName] = useState("");
  const [selectedRegion, setSelectedRegion] = useState<Region>(regions[0]);
  const [distributionData, setDistributionData] = useState<{[key: string]: NameDetailResponse} | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format large numbers with dots as thousand separators
  const formatNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const fetchDistribution = async () => {
    if (!name.trim()) {
      setError("Por favor, digite um nome para buscar.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const stateCodes = selectedRegion.states.map(state => state.code);
      const data = await getNameRegionalDistribution(name.trim(), stateCodes);
      setDistributionData(data);
    } catch (err) {
      setError(`Erro ao buscar dados para o nome ${name}.`);
    } finally {
      setLoading(false);
    }
  };

  // Calculate total frequency for each state
  const calculateTotalFrequency = (data: NameDetailResponse) => {
    return data.res.reduce((sum, item) => sum + item.frequencia, 0);
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    if (!distributionData) return [];

    return selectedRegion.states.map(state => {
      const stateData = distributionData[state.code];
      const frequency = stateData ? calculateTotalFrequency(stateData) : 0;

      return {
        state: state.name,
        frequency,
      };
    }).sort((a, b) => b.frequency - a.frequency); // Sort by frequency in descending order
  };

  const chartData = prepareChartData();

  return (
    <Card className={styles.chartCard}>
      <Flex direction="column" gap="3">
        <Text as="h3" size="5" weight="bold" className={styles.chartTitle}>
          Distribuição Regional de Nomes
        </Text>

        <Flex gap="2" align="end">
          <Flex direction="column" gap="1" style={{ flexGrow: 1 }}>
            <Text as="label" size="2" weight="bold" htmlFor="name-input">
              Nome
            </Text>
            <TextField.Root size="2">
              <TextField.Input
                id="name-input"
                placeholder="Digite um nome (ex: Maria, José, Ana...)"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  setError("");
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    fetchDistribution();
                  }
                }}
              />
            </TextField.Root>
          </Flex>

          <Flex direction="column" gap="1" style={{ width: '150px' }}>
            <Text as="label" size="2" weight="bold" htmlFor="region-select">
              Região
            </Text>
            <Select.Root
              value={selectedRegion.id}
              onValueChange={(value) => {
                const region = regions.find(r => r.id === value);
                if (region) {
                  setSelectedRegion(region);
                }
              }}
            >
              <Select.Trigger id="region-select" />
              <Select.Content>
                {regions.map((region) => (
                  <Select.Item key={region.id} value={region.id}>
                    {region.name}
                  </Select.Item>
                ))}
              </Select.Content>
            </Select.Root>
          </Flex>

          <Button onClick={fetchDistribution} disabled={loading}>
            {loading ? "Buscando..." : "Buscar"}
          </Button>
        </Flex>

        {error && (
          <Text color="red" size="2">
            {error}
          </Text>
        )}

        {chartData.length > 0 ? (
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart
                data={chartData}
                layout="vertical"
                margin={{
                  top: 20,
                  right: 30,
                  left: 100,
                  bottom: 20,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis type="number" tickFormatter={formatNumber} />
                <YAxis
                  type="category"
                  dataKey="state"
                  width={100}
                />
                <Tooltip
                  formatter={(value) => [formatNumber(value as number), "Frequência"]}
                  labelFormatter={(label) => `Estado: ${label}`}
                />
                <Bar
                  dataKey="frequency"
                  fill="#8884d8"
                  name={`Frequência de ${name.toUpperCase()}`}
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <Flex
            direction="column"
            align="center"
            justify="center"
            style={{ height: '200px', backgroundColor: 'var(--gray-alpha-100)', borderRadius: '8px' }}
          >
            <Text size="3" style={{ opacity: 0.7 }}>
              {loading
                ? "Carregando dados..."
                : "Digite um nome e selecione uma região para visualizar a distribuição"}
            </Text>
          </Flex>
        )}

        {chartData.length > 0 && (
          <Text size="2" style={{ opacity: 0.8 }}>
            O gráfico mostra a frequência do nome {name.toUpperCase()} em cada estado da região {selectedRegion.name}.
          </Text>
        )}
      </Flex>
    </Card>
  );
}

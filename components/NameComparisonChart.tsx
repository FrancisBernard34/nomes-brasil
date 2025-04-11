"use client";

import { useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Legend, Tooltip, ResponsiveContainer } from 'recharts';
import { Flex, Text, Card, Button, TextField } from '@radix-ui/themes';
import { getNameDetails, NameDetailResponse } from '@/services/ibgeApi';
import styles from './Charts.module.css';

const COLORS = ['#8884d8', '#82ca9d', '#ffc658', '#ff8042', '#0088fe', '#00C49F'];

export default function NameComparisonChart() {
  const [names, setNames] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [nameData, setNameData] = useState<{[key: string]: NameDetailResponse | null}>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format period labels for better display
  const formatPeriod = (period: string) => {
    return period
      .replace('[', '')
      .replace(']', '')
      .replace(',', '-')
      .replace('[', 'Antes de ')
      .replace('\[', 'Após ');
  };

  // Format large numbers with dots as thousand separators
  const formatNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  const addName = async () => {
    if (!nameInput.trim()) {
      setError("Por favor, digite um nome para adicionar.");
      return;
    }

    const formattedName = nameInput.trim().toUpperCase();

    if (names.includes(formattedName)) {
      setError("Este nome já foi adicionado.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getNameDetails(formattedName);
      setNames([...names, formattedName]);
      setNameData({
        ...nameData,
        [formattedName]: data
      });
      setNameInput("");
    } catch (err) {
      setError(`Erro ao buscar dados para o nome ${formattedName}.`);
    } finally {
      setLoading(false);
    }
  };

  const removeName = (name: string) => {
    const updatedNames = names.filter(n => n !== name);
    const updatedData = { ...nameData };
    delete updatedData[name];

    setNames(updatedNames);
    setNameData(updatedData);
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    if (names.length === 0) return [];

    // Get all periods from all names
    const allPeriods = new Set<string>();
    names.forEach(name => {
      const data = nameData[name];
      if (data) {
        data.res.forEach(item => {
          allPeriods.add(item.periodo);
        });
      }
    });

    // Sort periods chronologically
    const sortedPeriods = Array.from(allPeriods).sort();

    // Create chart data with all names and periods
    return sortedPeriods.map(period => {
      const dataPoint: {[key: string]: any} = {
        periodo: formatPeriod(period)
      };

      names.forEach(name => {
        const data = nameData[name];
        if (data) {
          const periodData = data.res.find(item => item.periodo === period);
          dataPoint[name] = periodData ? periodData.frequencia : 0;
        }
      });

      return dataPoint;
    });
  };

  const chartData = prepareChartData();

  return (
    <Card className={styles.chartCard}>
      <Flex direction="column" gap="3">
        <Text as="h3" size="5" weight="bold" className={styles.chartTitle}>
          Comparação de Nomes ao Longo do Tempo
        </Text>

        <Flex gap="2" align="center">
          <TextField.Root size="2" style={{ flexGrow: 1 }}>
            <TextField.Input
              placeholder="Digite um nome para adicionar à comparação"
              value={nameInput}
              onChange={(e) => {
                setNameInput(e.target.value);
                setError("");
              }}
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  addName();
                }
              }}
            />
          </TextField.Root>
          <Button onClick={addName} disabled={loading}>
            {loading ? "Adicionando..." : "Adicionar"}
          </Button>
        </Flex>

        {error && (
          <Text color="red" size="2">
            {error}
          </Text>
        )}

        {names.length > 0 && (
          <Flex wrap="wrap" gap="2">
            {names.map((name, index) => (
              <Flex
                key={name}
                align="center"
                gap="1"
                style={{
                  padding: '4px 8px',
                  borderRadius: '4px',
                  backgroundColor: 'var(--gray-alpha-100)',
                  color: COLORS[index % COLORS.length]
                }}
              >
                <Text size="2" style={{ fontWeight: 'bold' }}>{name}</Text>
                <Button
                  size="1"
                  variant="ghost"
                  onClick={() => removeName(name)}
                  style={{ padding: '2px', minWidth: 'auto' }}
                >
                  ✕
                </Button>
              </Flex>
            ))}
          </Flex>
        )}

        {names.length > 0 ? (
          <div className={styles.chartContainer}>
            <ResponsiveContainer width="100%" height={400}>
              <LineChart
                data={chartData}
                margin={{
                  top: 20,
                  right: 30,
                  left: 20,
                  bottom: 70,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
                <XAxis
                  dataKey="periodo"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  width={80}
                />
                <Tooltip
                  formatter={(value) => [formatNumber(value as number), "Frequência"]}
                />
                <Legend />
                {names.map((name, index) => (
                  <Line
                    key={name}
                    type="monotone"
                    dataKey={name}
                    name={name}
                    stroke={COLORS[index % COLORS.length]}
                    activeDot={{ r: 8 }}
                  />
                ))}
              </LineChart>
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
              Adicione nomes para visualizar a comparação
            </Text>
          </Flex>
        )}

        {names.length > 0 && (
          <Text size="2" style={{ opacity: 0.8 }}>
            O gráfico mostra a frequência de cada nome ao longo das décadas. Você pode adicionar até 6 nomes para comparar.
          </Text>
        )}
      </Flex>
    </Card>
  );
}

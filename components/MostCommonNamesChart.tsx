"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Flex, Text, Card } from '@radix-ui/themes';
import { NameFrequency } from '@/services/ibgeApi';
import styles from './Charts.module.css';

interface MostCommonNamesChartProps {
  data: NameFrequency[];
  title: string;
}

export default function MostCommonNamesChart({ data, title }: MostCommonNamesChartProps) {
  // Prepare data for the chart
  const chartData = data.map(item => ({
    nome: item.nome,
    frequencia: item.frequencia,
  }));

  // Format large numbers with dots as thousand separators
  const formatNumber = (value: number) => {
    return value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  };

  return (
    <Card className={styles.chartCard}>
      <Flex direction="column" gap="3">
        <Text as="h3" size="5" weight="bold" className={styles.chartTitle}>
          {title}
        </Text>
        <div className={styles.chartContainer}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 70,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis
                dataKey="nome"
                angle={-45}
                textAnchor="end"
                height={70}
              />
              <YAxis
                tickFormatter={formatNumber}
                width={80}
              />
              <RechartsTooltip
                formatter={(value) => [formatNumber(value as number), "Frequência"]}
                labelFormatter={(label) => `Nome: ${label}`}
              />
              <Bar dataKey="frequencia" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Flex>
    </Card>
  );
}

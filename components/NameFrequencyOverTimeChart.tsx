"use client";

import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';
import { Flex, Text, Card } from '@radix-ui/themes';
import { NamePeriodFrequency } from '@/services/ibgeApi';
import styles from './Charts.module.css';

interface NameFrequencyOverTimeChartProps {
  data: NamePeriodFrequency[];
  name: string;
}

export default function NameFrequencyOverTimeChart({ data, name }: NameFrequencyOverTimeChartProps) {
  // Format period labels for better display
  const formatPeriod = (period: string) => {
    return period
      .replace('[', '')
      .replace(']', '')
      .replace(',', '-')
      .replace('[', '')
  };

  // Prepare data for the chart
  const chartData = data.map(item => ({
    periodo: formatPeriod(item.periodo),
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
          Frequência do nome {name.toUpperCase()} ao longo do tempo
        </Text>
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
              <RechartsTooltip
                formatter={(value) => [formatNumber(value as number), "Frequência"]}
                labelFormatter={(label) => `Período: ${label}`}
              />
              <Line
                type="monotone"
                dataKey="frequencia"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </Flex>
    </Card>
  );
}

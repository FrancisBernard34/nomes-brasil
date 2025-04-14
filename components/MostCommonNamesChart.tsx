"use client";

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, Cell } from 'recharts';
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

  // Custom colors for bars
  const COLORS = [
    'var(--chart-colors-1)',
    'var(--chart-colors-2)',
    'var(--chart-colors-3)',
    'var(--chart-colors-4)',
    'var(--chart-colors-5)',
    'var(--chart-colors-6)',
  ];

  // Custom tooltip styles
  interface TooltipProps {
    active?: boolean;
    payload?: Array<{ value: number; color: string }>;
    label?: string;
  }

  const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
    if (active && payload && payload.length) {
      return (
        <div style={{
          backgroundColor: 'var(--chart-tooltip)',
          padding: '10px 14px',
          border: '1px solid var(--card-border)',
          borderRadius: 'var(--radius-md)',
          boxShadow: 'var(--card-shadow)',
        }}>
          <p style={{
            fontWeight: 'bold',
            marginBottom: '5px',
            color: 'var(--chart-tooltip-text)'
          }}>
            Nome: {label}
          </p>
          <p style={{
            color: payload[0].color,
            margin: 0
          }}>
            Frequência: {formatNumber(payload[0].value)}
          </p>
        </div>
      );
    }
    return null;
  };

  return (
    <Card className={styles.chartCard}>
      <Flex direction="column" gap="3">
        <Text size="5" weight="bold" className={styles.chartTitle}>
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
              barSize={36}
            >
              <CartesianGrid strokeDasharray="3 3" stroke="var(--chart-grid)" />
              <XAxis
                dataKey="nome"
                angle={-45}
                textAnchor="end"
                height={70}
                tick={{ fill: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--chart-grid)' }}
              />
              <YAxis
                tickFormatter={formatNumber}
                width={80}
                tick={{ fill: 'var(--foreground)' }}
                axisLine={{ stroke: 'var(--chart-grid)' }}
              />
              <RechartsTooltip content={<CustomTooltip />} />
              <Bar
                dataKey="frequencia"
                radius={[6, 6, 0, 0]}
                animationDuration={1500}
                animationEasing="ease-out"
              >
                {chartData.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </Flex>
    </Card>
  );
}

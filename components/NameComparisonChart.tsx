"use client";

import { useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import { Flex, Text, Card, Button, TextField } from "@radix-ui/themes";
import { getNameDetails, NameDetailResponse } from "@/services/ibgeApi";
import styles from "./Charts.module.css";
import React from "react";

const COLORS = [
  "#8884d8",
  "#82ca9d",
  "#ffc658",
  "#ff8042",
  "#0088fe",
  "#00C49F",
];

export default function NameComparisonChart() {
  const [names, setNames] = useState<string[]>([]);
  const [nameInput, setNameInput] = useState("");
  const [nameData, setNameData] = useState<{
    [key: string]: NameDetailResponse | null;
  }>({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Format period labels for better display
  const formatPeriod = (period: string) => {
    return period.replaceAll("[", "").replaceAll("]", "").replaceAll(",", "-");
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

    if (names.length >= 6) {
      setError("Você já adicionou o número máximo de 6 nomes.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const data = await getNameDetails(formattedName);
      setNames([...names, formattedName]);
      setNameData({
        ...nameData,
        [formattedName]: data,
      });
      setNameInput("");
    } catch (err) {
      setError(`Erro ao buscar dados para o nome ${formattedName}.`);
    } finally {
      setLoading(false);
    }
  };

  const removeName = (name: string) => {
    const updatedNames = names.filter((n) => n !== name);
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
    names.forEach((name) => {
      const data = nameData[name];
      if (data) {
        data.res.forEach((item) => {
          allPeriods.add(item.periodo);
        });
      }
    });

    // Sort periods chronologically
    const sortedPeriods = Array.from(allPeriods).sort();

    // Create chart data with all names and periods
    return sortedPeriods.map((period) => {
      const dataPoint: { [key: string]: any } = {
        periodo: formatPeriod(period),
      };

      names.forEach((name) => {
        const data = nameData[name];
        if (data) {
          const periodData = data.res.find((item) => item.periodo === period);
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
        <Text size="5" weight="bold" className={styles.chartTitle}>
          Comparação de Nomes ao Longo do Tempo
        </Text>

        <div className={styles.chartControls}>
          <TextField.Root
            size="3"
            placeholder="Digite um nome para adicionar à comparação"
            value={nameInput}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setNameInput(e.target.value);
              setError("");
            }}
            onKeyDown={(e: React.KeyboardEvent<HTMLInputElement>) => {
              if (e.key === "Enter") {
                addName();
              }
            }}
            style={{
              flexGrow: 1,
              width: "100%",
              padding: "8px 12px",
              border: "none",
              outline: "none",
              background: "transparent",
              fontSize: "16px",
              color: "var(--foreground)",
            }}
          >
            <TextField.Slot>
              <svg
                width="16"
                height="16"
                viewBox="0 0 15 15"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10 6.5C10 8.433 8.433 10 6.5 10C4.567 10 3 8.433 3 6.5C3 4.567 4.567 3 6.5 3C8.433 3 10 4.567 10 6.5ZM9.30884 10.0159C8.53901 10.6318 7.56251 11 6.5 11C4.01472 11 2 8.98528 2 6.5C2 4.01472 4.01472 2 6.5 2C8.98528 2 11 4.01472 11 6.5C11 7.56251 10.6318 8.53901 10.0159 9.30884L12.8536 12.1464C13.0488 12.3417 13.0488 12.6583 12.8536 12.8536C12.6583 13.0488 12.3417 13.0488 12.1464 12.8536L9.30884 10.0159Z"
                  fill="currentColor"
                  fillRule="evenodd"
                  clipRule="evenodd"
                ></path>
              </svg>
            </TextField.Slot>
          </TextField.Root>
          <Button size="3" onClick={addName} disabled={loading} variant="solid">
            {loading ? (
              <>
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    animation: "spin 1s linear infinite",
                    marginRight: "8px",
                  }}
                >
                  <path
                    d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z"
                    fill="currentColor"
                    opacity="0.25"
                  />
                  <path
                    d="M12,4a8,8,0,0,1,7.89,6.7A1.53,1.53,0,0,0,21.38,12h0a1.5,1.5,0,0,0,1.48-1.75,11,11,0,0,0-21.72,0A1.5,1.5,0,0,0,2.62,12h0a1.53,1.53,0,0,0,1.49-1.3A8,8,0,0,1,12,4Z"
                    fill="currentColor"
                  />
                </svg>
                Adicionando...
              </>
            ) : (
              <>Adicionar</>
            )}
          </Button>
        </div>

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
                gap="3"
                style={{
                  padding: "4px 8px",
                  borderRadius: "4px",
                  backgroundColor: "var(--gray-alpha-100)",
                  color: COLORS[index % COLORS.length],
                }}
              >
                <Text size="2" style={{ fontWeight: "bold" }}>
                  {name}
                </Text>
                <Button
                  size="1"
                  variant="ghost"
                  onClick={() => removeName(name)}
                  style={{ paddingRight: "10px", minWidth: "auto" }}
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
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="var(--chart-grid)"
                />
                <XAxis
                  dataKey="periodo"
                  angle={-45}
                  textAnchor="end"
                  height={70}
                  tick={{ fill: "var(--foreground)" }}
                  axisLine={{ stroke: "var(--chart-grid)" }}
                />
                <YAxis
                  tickFormatter={formatNumber}
                  width={80}
                  tick={{ fill: "var(--foreground)" }}
                  axisLine={{ stroke: "var(--chart-grid)" }}
                />
                <Tooltip
                  formatter={(value) => [
                    formatNumber(value as number),
                    "Frequência",
                  ]}
                  contentStyle={{
                    backgroundColor: "var(--chart-tooltip)",
                    border: "1px solid var(--card-border)",
                    borderRadius: "var(--radius-md)",
                    boxShadow: "var(--card-shadow)",
                    color: "var(--chart-tooltip-text)",
                  }}
                  itemStyle={{ padding: "4px 0" }}
                  labelStyle={{ fontWeight: "bold", marginBottom: "5px" }}
                />
                <Legend
                  wrapperStyle={{ paddingTop: "20px" }}
                  formatter={(value) => (
                    <span
                      style={{ color: "var(--foreground)", fontWeight: "bold" }}
                    >
                      {value}
                    </span>
                  )}
                />
                {names.map((name, index) => (
                  <Line
                    key={name}
                    type="monotone"
                    dataKey={name}
                    name={name}
                    stroke={COLORS[index % COLORS.length]}
                    strokeWidth={3}
                    dot={{ r: 4, strokeWidth: 2 }}
                    activeDot={{ r: 8, strokeWidth: 0 }}
                    animationDuration={1500}
                    animationEasing="ease-out"
                  />
                ))}
              </LineChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className={styles.emptyState}>
            <div className={styles.emptyStateIcon}>📊</div>
            <Text size="3" style={{ opacity: 0.7 }}>
              Adicione nomes para visualizar a comparação
            </Text>
            <Text
              size="2"
              style={{ opacity: 0.5, maxWidth: "400px", textAlign: "center" }}
            >
              Você pode adicionar até 6 nomes diferentes para comparar suas
              frequências ao longo do tempo
            </Text>
          </div>
        )}

        {names.length > 0 && (
          <Text size="2" style={{ opacity: 0.8 }}>
            O gráfico mostra a frequência de cada nome ao longo das décadas.
            Você pode adicionar até 6 nomes para comparar.
          </Text>
        )}
      </Flex>
    </Card>
  );
}

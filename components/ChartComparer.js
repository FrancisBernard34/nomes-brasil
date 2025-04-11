"use client";

import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Sample data for demonstration
const sampleData = {
  "MARIA": 100,
  "JOSÉ": 80,
  "ANA": 60,
  "JOÃO": 50,
  "ANTÔNIO": 40,
  "FRANCISCO": 30
};

export default function ChartComparer() {
  const [selectedNames, setSelectedNames] = useState([]);
  const [nameInput, setNameInput] = useState("");
  const [error, setError] = useState("");

  const addName = () => {
    if (!nameInput.trim()) {
      setError("Por favor, digite um nome para adicionar.");
      return;
    }

    const formattedName = nameInput.trim().toUpperCase();
    
    if (selectedNames.includes(formattedName)) {
      setError("Este nome já foi adicionado.");
      return;
    }

    if (!sampleData[formattedName]) {
      setError(`Não temos dados para o nome ${formattedName}.`);
      return;
    }

    setSelectedNames([...selectedNames, formattedName]);
    setNameInput("");
    setError("");
  };

  const removeName = (name) => {
    setSelectedNames(selectedNames.filter(n => n !== name));
  };

  // Prepare data for the chart
  const prepareChartData = () => {
    return selectedNames.map(name => ({
      name,
      value: sampleData[name]
    }));
  };

  const chartData = prepareChartData();

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
      <h3 style={{ textAlign: 'center', marginBottom: '16px' }}>
        Comparação de Nomes
      </h3>

      <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Digite um nome para adicionar à comparação (MARIA, JOSÉ, ANA, JOÃO, ANTÔNIO, FRANCISCO)"
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
          style={{ flexGrow: 1, padding: '8px', borderRadius: '4px', border: '1px solid #ccc' }}
        />
        <button 
          onClick={addName}
          style={{ padding: '8px 16px', borderRadius: '4px', backgroundColor: '#8884d8', color: 'white', border: 'none', cursor: 'pointer' }}
        >
          Adicionar
        </button>
      </div>

      {error && (
        <p style={{ color: 'red', fontSize: '14px', margin: '4px 0' }}>
          {error}
        </p>
      )}

      {selectedNames.length > 0 && (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
          {selectedNames.map((name) => (
            <div 
              key={name} 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '4px', 
                padding: '4px 8px', 
                borderRadius: '4px', 
                backgroundColor: '#f0f0f0' 
              }}
            >
              <span style={{ fontWeight: 'bold', fontSize: '14px' }}>{name}</span>
              <button 
                onClick={() => removeName(name)}
                style={{ 
                  padding: '2px 6px', 
                  backgroundColor: 'transparent', 
                  border: 'none', 
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                ✕
              </button>
            </div>
          ))}
        </div>
      )}

      {selectedNames.length > 0 ? (
        <div style={{ width: "100%", height: "400px", marginTop: "16px" }}>
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={chartData}
              margin={{
                top: 20,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div style={{ 
          height: '200px', 
          backgroundColor: '#f0f0f0', 
          borderRadius: '8px', 
          marginTop: "16px",
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <p style={{ opacity: 0.7 }}>
            Adicione nomes para visualizar a comparação
          </p>
        </div>
      )}

      {selectedNames.length > 0 && (
        <p style={{ fontSize: '14px', opacity: 0.8 }}>
          O gráfico mostra a frequência relativa de cada nome. Você pode adicionar até 6 nomes para comparar.
        </p>
      )}
    </div>
  );
}

"use client";

import React from 'react';
import styles from "../page.module.css";
import Header from "@/components/Header";
import BasicComparer from "@/components/BasicComparer";

export default function CompararBasicoHtmlPage() {
  return (
    <div className={styles.page}>
      <Header />
      <main className={styles.main}>
        <h1 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '2rem' }}>
          Comparar Nomes
        </h1>
        
        <p style={{ textAlign: 'center', marginBottom: '40px', fontSize: '1.2rem' }}>
          Compare a popularidade de diferentes nomes ao longo do tempo no Brasil.
        </p>
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <BasicComparer />
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Como usar</h2>
            <p>
              Digite um nome no campo acima e clique em "Adicionar" para incluí-lo na lista.
              Você pode adicionar até 6 nomes diferentes para comparar.
              Para remover um nome, clique no "X" ao lado dele.
            </p>
          </div>
          
          <div style={{ 
            backgroundColor: 'white', 
            borderRadius: '8px', 
            padding: '16px',
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
          }}>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '12px' }}>Dica</h2>
            <p>
              Experimente comparar nomes de diferentes gerações, como "MARIA" e "ANA",
              ou nomes masculinos e femininos com sonoridade similar, como "JOÃO" e "JOSÉ".
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}

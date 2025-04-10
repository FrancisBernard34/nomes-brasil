"use client";

import { useState } from "react";
import { Flex, Text, TextField, Button } from "@radix-ui/themes";
import { useRouter } from "next/navigation";
import styles from "./SearchForm.module.css";

export default function SearchForm() {
  const [name, setName] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name.trim()) {
      setError("Por favor, digite um nome para buscar.");
      return;
    }
    
    // Redirect to the results page with the name as a query parameter
    router.push(`/buscar/${encodeURIComponent(name.trim())}`);
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <Flex direction="column" gap="2" width="100%">
        <Text as="label" size="2" weight="bold" htmlFor="name-input">
          Nome
        </Text>
        <TextField.Root size="3">
          <TextField.Input
            id="name-input"
            placeholder="Digite um nome (ex: Maria, José, Ana...)"
            value={name}
            onChange={(e) => {
              setName(e.target.value);
              setError("");
            }}
          />
        </TextField.Root>
        
        {error && (
          <Text color="red" size="2">
            {error}
          </Text>
        )}
        
        <Button type="submit" size="3" mt="4">
          Buscar
        </Button>
      </Flex>
    </form>
  );
}

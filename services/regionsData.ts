// Brazilian regions and states data

export interface Region {
  id: string;
  name: string;
  states: State[];
}

export interface State {
  id: string;
  code: string;
  name: string;
}

export const regions: Region[] = [
  {
    id: "norte",
    name: "Norte",
    states: [
      { id: "ac", code: "12", name: "Acre" },
      { id: "am", code: "13", name: "Amazonas" },
      { id: "ap", code: "16", name: "Amapá" },
      { id: "pa", code: "15", name: "Pará" },
      { id: "ro", code: "11", name: "Rondônia" },
      { id: "rr", code: "14", name: "Roraima" },
      { id: "to", code: "17", name: "Tocantins" }
    ]
  },
  {
    id: "nordeste",
    name: "Nordeste",
    states: [
      { id: "al", code: "27", name: "Alagoas" },
      { id: "ba", code: "29", name: "Bahia" },
      { id: "ce", code: "23", name: "Ceará" },
      { id: "ma", code: "21", name: "Maranhão" },
      { id: "pb", code: "25", name: "Paraíba" },
      { id: "pe", code: "26", name: "Pernambuco" },
      { id: "pi", code: "22", name: "Piauí" },
      { id: "rn", code: "24", name: "Rio Grande do Norte" },
      { id: "se", code: "28", name: "Sergipe" }
    ]
  },
  {
    id: "centro-oeste",
    name: "Centro-Oeste",
    states: [
      { id: "df", code: "53", name: "Distrito Federal" },
      { id: "go", code: "52", name: "Goiás" },
      { id: "mt", code: "51", name: "Mato Grosso" },
      { id: "ms", code: "50", name: "Mato Grosso do Sul" }
    ]
  },
  {
    id: "sudeste",
    name: "Sudeste",
    states: [
      { id: "es", code: "32", name: "Espírito Santo" },
      { id: "mg", code: "31", name: "Minas Gerais" },
      { id: "rj", code: "33", name: "Rio de Janeiro" },
      { id: "sp", code: "35", name: "São Paulo" }
    ]
  },
  {
    id: "sul",
    name: "Sul",
    states: [
      { id: "pr", code: "41", name: "Paraná" },
      { id: "rs", code: "43", name: "Rio Grande do Sul" },
      { id: "sc", code: "42", name: "Santa Catarina" }
    ]
  }
];

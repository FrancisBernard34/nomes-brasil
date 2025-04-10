// IBGE API Service
// Documentation: https://servicodados.ibge.gov.br/api/docs/

const BASE_URL = 'https://servicodados.ibge.gov.br/api/v2/censos/nomes';

export interface NameFrequency {
  nome: string;
  frequencia: number;
  ranking: number;
}

export interface NameFrequencyResponse {
  localidade: string;
  sexo: string | null;
  res: NameFrequency[];
}

export interface NamePeriodFrequency {
  periodo: string;
  frequencia: number;
}

export interface NameDetailResponse {
  nome: string;
  sexo: string | null;
  localidade: string;
  res: NamePeriodFrequency[];
}

/**
 * Busca o ranking dos nomes mais frequentes no Brasil
 * @param quantity Quantidade de nomes para retornar (padrão: 20)
 * @param gender Filtro por gênero: 'M' para masculino, 'F' para feminino, null para ambos
 * @returns Lista de nomes mais frequentes
 */
export async function getMostFrequentNames(quantity: number = 20, gender: string | null = null): Promise<NameFrequencyResponse> {
  let url = `${BASE_URL}/ranking?qtd=${quantity}`;

  if (gender) {
    url += `&sexo=${gender}`;
  }

  const response = await fetch(url);
  const data = await response.json();
  return data[0];
}

/**
 * Busca detalhes de um nome específico
 * @param name Nome a ser pesquisado
 * @returns Detalhes do nome, incluindo frequência por período
 */
export async function getNameDetails(name: string): Promise<NameDetailResponse> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(name)}`);
  const data = await response.json();
  return data[0];
}

/**
 * Busca nomes por frequência mínima
 * @param minFrequency Frequência mínima
 * @param maxResults Número máximo de resultados (padrão: 20)
 * @returns Lista de nomes com frequência maior ou igual à especificada
 */
export async function getNamesByFrequency(minFrequency: number, maxResults: number = 20): Promise<NameFrequencyResponse> {
  const response = await fetch(`${BASE_URL}?qtd=${maxResults}`);
  const data = await response.json();

  // Filtra os nomes com frequência maior ou igual à especificada
  const filteredData = {
    ...data[0],
    res: data[0].res.filter((item: NameFrequency) => item.frequencia >= minFrequency)
  };

  return filteredData;
}

/**
 * Busca nomes por região do Brasil
 * @param regionCode Código da região (UF)
 * @param quantity Quantidade de nomes para retornar (padrão: 20)
 * @returns Lista de nomes mais frequentes na região especificada
 */
export async function getNamesByRegion(regionCode: string, quantity: number = 20): Promise<NameFrequencyResponse> {
  const response = await fetch(`${BASE_URL}/ranking?localidade=${regionCode}&qtd=${quantity}`);
  const data = await response.json();
  return data[0];
}

/**
 * Busca detalhes de um nome específico por região
 * @param name Nome a ser pesquisado
 * @param regionCode Código da região (UF)
 * @returns Detalhes do nome na região especificada
 */
export async function getNameDetailsByRegion(name: string, regionCode: string): Promise<NameDetailResponse> {
  const response = await fetch(`${BASE_URL}/${encodeURIComponent(name)}?localidade=${regionCode}`);
  const data = await response.json();
  return data[0];
}

/**
 * Busca a distribuição regional de um nome
 * @param name Nome a ser pesquisado
 * @param regionCodes Lista de códigos de regiões (UFs)
 * @returns Objeto com a frequência do nome em cada região
 */
export async function getNameRegionalDistribution(name: string, regionCodes: string[]): Promise<{[key: string]: NameDetailResponse}> {
  const distribution: {[key: string]: NameDetailResponse} = {};

  // Fetch data for each region in parallel
  const promises = regionCodes.map(async (code) => {
    try {
      const data = await getNameDetailsByRegion(name, code);
      distribution[code] = data;
    } catch (error) {
      console.error(`Error fetching data for region ${code}:`, error);
    }
  });

  await Promise.all(promises);
  return distribution;
}

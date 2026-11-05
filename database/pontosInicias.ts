export type PontoInicial = {
  nome: string;
  bairro: string;
  categoria: string;
  endereco: string;
  descricao: string;
};

export const pontosIniciais: PontoInicial[] = [
  {
    nome: 'Mercado Central',
    bairro: 'Centro',
    categoria: 'Gastronomia',
    endereco: 'Av. Augusto de Lima, 744',
    descricao: 'Inaugurado em 1929, reúne centenas de lojas de queijos, cachaças, temperos e comidas típicas. É um dos lugares mais tradicionais de Belo Horizonte.',
  },
  {
    nome: 'Praça da Liberdade',
    bairro: 'Funcionários',
    categoria: 'Cultura',
    endereco: 'Praça da Liberdade, s/nº',
    descricao: 'Cercada por museus e centros culturais, abriga o Palácio da Liberdade e é um dos cartões-postais da cidade.',
  },
  {
    nome: 'Mineirão',
    bairro: 'Pampulha',
    categoria: 'Esporte',
    endereco: 'Av. Antônio Abrahão Caram, 1001',
    descricao: 'Um dos estádios mais conhecidos do país, palco de grandes jogos de futebol e shows na região da Pampulha.',
  },
  {
    nome: 'Igrejinha da Pampulha',
    bairro: 'Pampulha',
    categoria: 'Arquitetura',
    endereco: 'Av. Otacílio Negrão de Lima, 3000',
    descricao: 'A Igreja de São Francisco de Assis foi projetada por Oscar Niemeyer e faz parte do Conjunto Moderno da Pampulha, reconhecido como Patrimônio Mundial pela UNESCO.',
  },
  {
    nome: 'Praça do Papa',
    bairro: 'Mangabeiras',
    categoria: 'Mirante',
    endereco: 'Av. Agulhas Negras, s/nº',
    descricao: 'Oficialmente Praça Governador Israel Pinheiro, ganhou o nome popular em 1980, após a visita do Papa João Paulo II. Fica a mais de 1.100 metros de altitude e tem uma das vistas mais famosas da cidade.',
  },
  {
    nome: 'Parque Municipal',
    bairro: 'Centro',
    categoria: 'Natureza',
    endereco: 'Av. Afonso Pena, 1377',
    descricao: 'Área verde no coração do Centro, com bosques, lago e espaços de lazer, ótima para uma pausa no meio da cidade.',
  },
];
import { Enquete } from '../components/CardEnquete';

export const enquetes: Enquete[] = [
  {
    id: '1',
    title: 'Qual a melhor praia de Florianópolis?',
    scope: 'LOCAL',
    options: [
      { id: '1-1', text: 'Jurerê Internacional', votes: 120 },
      { id: '1-2', text: 'Praia Mole', votes: 95 },
      { id: '1-3', text: 'Lagoinha do Leste', votes: 88 },
    ],
  },
  {
    id: '2',
    title: 'Melhor série de fantasia de todos os tempos?',
    scope: 'MUNDO',
    options: [
      { id: '2-1', text: 'Game of Thrones', votes: 350 },
      { id: '2-2', text: 'O Senhor dos Anéis: Anéis de Poder', votes: 210 },
      { id: '2-3', text: 'The Witcher', votes: 180 },
      { id: '2-4', text: 'A Casa do Dragão', votes: 250 },
    ],
  },
  {
    id: '3',
    title: 'Onde tomar o melhor café do centro da cidade?',
    scope: 'LOCAL',
    options: [
        { id: '3-1', text: 'Café Cultura', votes: 75 },
        { id: '3-2', text: 'François Café', votes: 60 },
        { id: '3-3', text: 'The Coffee', votes: 90 },
    ],
  },
  {
    id: '4',
    title: 'Qual o melhor filme de super-herói de 2025?',
    scope: 'ROLE',
    options: [
        { id: '4-1', text: 'Superman: Legacy', votes: 400 },
        { id: '4-2', text: 'Vingadores: Dinastia Kang', votes: 550 },
        { id: '4-3', text: 'The Batman Part II', votes: 480 },
    ],
  }
];

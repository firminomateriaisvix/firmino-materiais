export type Category = {
  id: string;
  number: string;
  name: string;
  shortName: string;
  description: string;
  image: string;
  icon: string;
};

export type CatalogItem = {
  id: string;
  name: string;
  categoryId: string;
  description: string;
  detail: string;
  featured?: boolean;
};

export const categories: Category[] = [
  { id: "tubos", number: "01", name: "Tubos, válvulas e conexões", shortName: "Tubos e conexões", description: "Soluções para condução de fluidos e gases em diferentes aplicações industriais.", image: "/catalog/tubos.jpg", icon: "pipes" },
  { id: "ferramentas", number: "02", name: "Ferramentas", shortName: "Ferramentas", description: "Ferramentas manuais, elétricas e pneumáticas para o trabalho do dia a dia.", image: "/catalog/ferramentas.jpg", icon: "tools" },
  { id: "epis", number: "03", name: "EPIs e EPCs", shortName: "EPIs e EPCs", description: "Equipamentos de proteção individual e coletiva para apoiar a segurança da operação.", image: "/catalog/epis.jpg", icon: "shield" },
  { id: "consumiveis", number: "04", name: "Consumíveis", shortName: "Consumíveis", description: "Materiais de consumo para manutenção, produção e acabamento.", image: "/catalog/consumiveis.jpg", icon: "sparkles" },
  { id: "eletrica", number: "05", name: "Elétrica e instrumentação", shortName: "Elétrica", description: "Componentes e instrumentos para instalações, medição e controle.", image: "/catalog/eletrica.jpg", icon: "zap" },
  { id: "higiene", number: "06", name: "Higiene, limpeza e descartáveis", shortName: "Higiene e limpeza", description: "Produtos para conservação, higiene e limpeza em ambientes de trabalho.", image: "/catalog/higiene.jpg", icon: "droplet" },
  { id: "escritorio", number: "07", name: "Escritório e papelaria", shortName: "Escritório", description: "Materiais e suprimentos para a rotina administrativa e de escritório.", image: "/catalog/escritorio.jpg", icon: "briefcase" },
  { id: "incendio", number: "08", name: "Combate a incêndio e segurança", shortName: "Incêndio e segurança", description: "Equipamentos e acessórios voltados à prevenção e à resposta a emergências.", image: "/catalog/incendio.jpg", icon: "flame" },
  { id: "locacoes", number: "09", name: "Locações e serviços", shortName: "Locações e serviços", description: "Consulta de locação de equipamentos e serviços técnicos especializados.", image: "/catalog/locacoes.jpg", icon: "factory" },
];

export const items: CatalogItem[] = [
  // 01
  {
    id: "tubos-conexoes-valvulas",
    name: "Conexões, flanges e tubos de aço carbono e inox, e válvulas industriais",
    categoryId: "tubos",
    description: "Linha completa de conexões, flanges, uniões, tubos de aço carbono e inox, e válvulas industriais para condução e controle de fluidos.",
    detail: "Consulte materiais, dimensões, conexões e especificações técnicas adequadas à sua aplicação com a nossa equipe.",
    featured: true,
  },

  // 02
  { id: "manuais", name: "Ferramentas manuais", categoryId: "ferramentas", description: "Chaves, alicates e acessórios para manutenção.", detail: "Conte à equipe quais ferramentas você procura e em que tipo de serviço serão utilizadas." },
  { id: "eletricas", name: "Ferramentas elétricas", categoryId: "ferramentas", description: "Equipamentos elétricos para diferentes tarefas de oficina e obra.", detail: "Consulte modelos e especificações disponíveis para a sua necessidade." },
  { id: "pneumaticas", name: "Ferramentas pneumáticas", categoryId: "ferramentas", description: "Equipamentos e acessórios para aplicações pneumáticas.", detail: "Para agilizar a consulta, informe a aplicação e os requisitos do equipamento." },

  // 03
  {
    id: "epis-epcs",
    name: "Epi's e EPC's",
    categoryId: "epis",
    description: "Equipamentos de proteção individual e coletiva para garantir a segurança, proteção e conformidade da sua operação.",
    detail: "Capacetes, óculos, calçados, luvas, proteção auditiva, proteção respiratória e itens de proteção coletiva.",
    featured: true,
  },

  // 04
  {
    id: "consumiveis-solda-eletrica-pintura",
    name: "Consumíveis de solda, elétrica, pintura",
    categoryId: "consumiveis",
    description: "Materiais e insumos de consumo para manutenção e produção: processos de solda e corte, elétrica, fixação, pintura e acabamento.",
    detail: "Eletrodos, discos de corte, materiais de fixação, insumos para pintura industrial e suprimentos elétricos.",
    featured: true,
  },

  // 05
  { id: "materiais-eletricos", name: "Materiais elétricos", categoryId: "eletrica", description: "Componentes para instalações e manutenção elétrica.", detail: "Compartilhe tensão, aplicação e especificações para direcionar sua consulta.", featured: true },
  { id: "automacao", name: "Automação e controle", categoryId: "eletrica", description: "Componentes de comando e controle para sistemas elétricos.", detail: "A equipe pode receber sua lista de materiais e consultar os itens solicitados." },
  { id: "medicao", name: "Instrumentos de medição", categoryId: "eletrica", description: "Instrumentos para medição e acompanhamento de processos.", detail: "Informe a grandeza e faixa de medição desejadas para solicitar uma cotação." },

  // 06
  {
    id: "higiene-limpeza",
    name: "Produtos de higiene e limpeza em geral",
    categoryId: "higiene",
    description: "Linha completa de produtos para conservação, desinfecção, higiene corporativa e suprimentos descartáveis.",
    detail: "Produtos químicos de limpeza, sabonetes, papéis toalha, sacos de lixo e descartáveis corporativos e industriais.",
  },

  // 07
  {
    id: "escritorio-papelaria-informatica",
    name: "Materiais de escritório, papelaria, informática",
    categoryId: "escritorio",
    description: "Suprimentos e materiais para abastecer sua rotina administrativa, organização, papelaria e informática.",
    detail: "Papéis, pastas, toners, suprimentos para impressão, periféricos e organização de escritório.",
  },

  // 08
  {
    id: "incendio-seguranca",
    name: "Extintores, acessórios e sinalização de segurança",
    categoryId: "incendio",
    description: "Equipamentos, mangueiras, conexões e sinalização voltados à prevenção e ao combate a emergências e incêndios.",
    detail: "Extintores, mangueiras de incêndio, acessórios de segurança e placas de sinalização fotoluminescentes.",
    featured: true,
  },

  // 09
  { id: "locacao-equipamentos", name: "Locação de equipamentos", categoryId: "locacoes", description: "Consulte a equipe sobre a locação de equipamentos para sua operação.", detail: "Envie o equipamento pretendido, período e local de uso para consultar condições.", featured: true },
  { id: "manutencao", name: "Manutenção e montagem", categoryId: "locacoes", description: "Consulta de serviços especializados de manutenção e montagem.", detail: "Conte à equipe sobre o serviço, escopo e local para iniciar uma consulta." },
];

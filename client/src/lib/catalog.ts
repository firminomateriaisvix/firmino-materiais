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
  { id: "tubo-aco", name: "Tubos de aço carbono e inox", categoryId: "tubos", description: "Opções para linhas e instalações industriais.", detail: "Consulte a equipe sobre materiais, dimensões e especificações adequadas à sua aplicação.", featured: true },
  { id: "valvulas", name: "Válvulas industriais", categoryId: "tubos", description: "Componentes para controle e condução de fluidos.", detail: "Informe tipo de fluido, conexão e especificação desejada para solicitar uma cotação.", featured: true },
  { id: "conexoes", name: "Conexões, flanges e uniões", categoryId: "tubos", description: "Acessórios para montagem e integração de tubulações.", detail: "Nossa equipe pode orientar sua consulta conforme a aplicação e o padrão da instalação." },
  { id: "manuais", name: "Ferramentas manuais", categoryId: "ferramentas", description: "Chaves, alicates e acessórios para manutenção.", detail: "Conte à equipe quais ferramentas você procura e em que tipo de serviço serão utilizadas." },
  { id: "eletricas", name: "Ferramentas elétricas", categoryId: "ferramentas", description: "Equipamentos elétricos para diferentes tarefas de oficina e obra.", detail: "Consulte modelos e especificações disponíveis para a sua necessidade." },
  { id: "pneumaticas", name: "Ferramentas pneumáticas", categoryId: "ferramentas", description: "Equipamentos e acessórios para aplicações pneumáticas.", detail: "Para agilizar a consulta, informe a aplicação e os requisitos do equipamento." },
  { id: "protecao-cabeca", name: "Proteção da cabeça", categoryId: "epis", description: "Capacetes e acessórios de proteção.", detail: "Consulte a equipe para verificar opções conforme o ambiente e a atividade." },
  { id: "protecao-auditiva", name: "Proteção auditiva", categoryId: "epis", description: "Protetores auriculares e abafadores.", detail: "Descreva a atividade e as condições de uso ao solicitar sua cotação." },
  { id: "protecao-respiratoria", name: "Proteção respiratória", categoryId: "epis", description: "Máscaras e equipamentos de proteção respiratória.", detail: "Consulte orientação sobre especificações compatíveis com a aplicação." },
  { id: "solda-corte", name: "Solda e corte", categoryId: "consumiveis", description: "Materiais e acessórios para atividades de soldagem e corte.", detail: "Informe o processo e a aplicação para receber uma cotação mais precisa.", featured: true },
  { id: "pintura", name: "Pintura e acabamento", categoryId: "consumiveis", description: "Itens para preparação, pintura e finalização de superfícies.", detail: "Consulte alternativas e informações de aplicação junto à equipe." },
  { id: "fixacao", name: "Materiais de fixação", categoryId: "consumiveis", description: "Itens de fixação para diferentes montagens e reparos.", detail: "Envie medidas, material e quantidade desejada ao pedir seu orçamento." },
  { id: "materiais-eletricos", name: "Materiais elétricos", categoryId: "eletrica", description: "Componentes para instalações e manutenção elétrica.", detail: "Compartilhe tensão, aplicação e especificações para direcionar sua consulta.", featured: true },
  { id: "automacao", name: "Automação e controle", categoryId: "eletrica", description: "Componentes de comando e controle para sistemas elétricos.", detail: "A equipe pode receber sua lista de materiais e consultar os itens solicitados." },
  { id: "medicao", name: "Instrumentos de medição", categoryId: "eletrica", description: "Instrumentos para medição e acompanhamento de processos.", detail: "Informe a grandeza e faixa de medição desejadas para solicitar uma cotação." },
  { id: "limpeza", name: "Produtos de limpeza", categoryId: "higiene", description: "Itens para conservação e limpeza de ambientes.", detail: "Consulte opções para a rotina de limpeza da sua empresa." },
  { id: "higiene-pessoal", name: "Higiene pessoal", categoryId: "higiene", description: "Materiais de higiene para ambientes corporativos e industriais.", detail: "Informe os itens e quantidades de interesse para receber uma cotação." },
  { id: "descartaveis", name: "Descartáveis", categoryId: "higiene", description: "Suprimentos descartáveis para uso cotidiano.", detail: "Consulte formatos, tamanhos e quantidades com a equipe Firmino." },
  { id: "papelaria", name: "Papelaria", categoryId: "escritorio", description: "Materiais de papelaria para abastecer seu escritório.", detail: "Envie sua relação de materiais para consultar as opções de fornecimento." },
  { id: "organizacao", name: "Suprimentos e organização", categoryId: "escritorio", description: "Itens de apoio à organização e ao arquivo administrativo.", detail: "A equipe pode ajudar a cotar a lista de suprimentos do seu escritório." },
  { id: "informatica", name: "Impressão e informática", categoryId: "escritorio", description: "Suprimentos e acessórios para a rotina de impressão e informática.", detail: "Descreva o equipamento e os suprimentos necessários ao pedir seu orçamento." },
  { id: "extintores", name: "Extintores", categoryId: "incendio", description: "Equipamentos e acessórios para prevenção e combate a incêndios.", detail: "Consulte a equipe sobre o tipo de equipamento apropriado para sua necessidade.", featured: true },
  { id: "mangueiras", name: "Mangueiras e acessórios", categoryId: "incendio", description: "Mangueiras, conexões e acessórios de segurança.", detail: "Informe o uso pretendido e as especificações desejadas para uma cotação." },
  { id: "sinalizacao", name: "Sinalização de segurança", categoryId: "incendio", description: "Itens de sinalização para ambientes e operações.", detail: "Consulte itens de sinalização adequados à sua aplicação." },
  { id: "locacao-equipamentos", name: "Locação de equipamentos", categoryId: "locacoes", description: "Consulte a equipe sobre a locação de equipamentos para sua operação.", detail: "Envie o equipamento pretendido, período e local de uso para consultar condições.", featured: true },
  { id: "manutencao", name: "Manutenção e montagem", categoryId: "locacoes", description: "Consulta de serviços especializados de manutenção e montagem.", detail: "Conte à equipe sobre o serviço, escopo e local para iniciar uma consulta." },
];

# Firmino Materiais — V2

Versão **2.1.0** — repositório: https://github.com/ramonpmendesx1707/firmino-materiais-v2

Versão independente de apresentação e consulta comercial para a Firmino Materiais, em Serra/ES. A implementação parte do repositório `https://github.com/firminomateriaisvix/firmino-materiais`, commit `c11feb7f2e068bdd53fdb0b0cc4aa31633e6dfc8`, preservando os **26 itens e nove categorias** publicados nessa origem. Desenvolvimento na branch local `v2`; o repositório original não recebe alterações automaticamente.

## O que esta versão entrega

- Identidade industrial em azul escuro e dourado, hierarquia de leitura e navegação responsiva.
- Categorias em faixa horizontal com controles e gesto de deslizar.
- Busca tolerante a acentos, filtros de categoria, paginação progressiva e filtro de itens salvos.
- Lista de orçamento persistente neste navegador, quantidades inteiras, especificações por item e dados opcionais do solicitante.
- WhatsApp e e-mail preparados com a lista completa e quebras de linha. O usuário revisa e envia no aplicativo de destino; não existe envio automático.
- Download da solicitação em texto UTF-8.
- Comparativo de até três itens com informações reais disponíveis; cards verticais em telas menores.
- Mapa do Brasil com o Espírito Santo e a sede em Serra destacados, endereço consultável e destino informado transferido para a cotação.
- Animações de entrada, marcador animado, estados de interação, foco visível, modais com contenção de foco, Escape e respeito à preferência de movimento reduzido.

## Dados e limites

Prévia atualizada: https://firmino-materiais-v2.safc-conceicao87.chatgpt.site

Domínio de destino definido pelo cliente: **firminomateriais.com.br**. A publicação de prévia não altera DNS, registro do domínio ou serviço de e-mail.

| Finalidade | Contato |
| --- | --- |
| Cotações | cotacao@firminomateriais.com.br |
| Financeiro | financeiro@firminomateriais.com.br |
| Anderson | anderson@rpmintegra.com.br |
| WhatsApp | +55 (27) 98122-4105 |
| Endereço informado | Rua Camburi, 608 — Serra/ES — CEP 29176-300 |

Os links de e-mail foram incluídos conforme solicitado. O funcionamento/ativação das caixas depende do provedor de e-mail e não foi comprovado por envio. Não foram acrescentados preços, marcas, estoque, prazos, certificações, história ou abrangência geográfica sem dados. As imagens existentes são **ilustrativas por categoria**, não fotografias individuais de cada produto. Frete, área de atendimento, unidade de venda e especificações são confirmados pela equipe.

O catálogo é editado no arquivo `client/src/lib/catalog.ts`. Não existe painel administrador, autenticação, banco de pedidos, checkout ou integração com ERP nesta V2. A lista é salva no `localStorage` deste navegador; dados pessoais dos campos opcionais ficam apenas em memória e no texto que o visitante decide enviar. Não são compartilhados entre dispositivos.

## Ambiente e execução

Validado com Node.js **24.13.0** e pnpm **10.18.0**. React **19.2.1**, Vite **7.1.9**, TypeScript **5.9.3**, Tailwind CSS **4.1.14**, Radix Dialog e Lucide React. As versões completas, inclusive transitivas, estão no `pnpm-lock.yaml`. Preserve esse lockfile e o patch de Wouter em `patches/`. `.npmrc` utiliza instalação hoisted para resolução consistente no Windows.

```sh
corepack enable
corepack prepare pnpm@10.18.0 --activate
pnpm install --frozen-lockfile
pnpm check
pnpm build:static
pnpm dev:static
```

Desenvolvimento: `http://127.0.0.1:4180`. Prévia da compilação: `pnpm preview`. Saída de produção: **dist/**. Publique o conteúdo dessa pasta na raiz do domínio, usando fallback de SPA para `index.html`. Não publique `node_modules`, `.git`, arquivos de ambiente ou o código do servidor legado.

O clone conserva arquivos do servidor e componentes do template original para rastreabilidade. **Eles não são utilizados nem necessários pela aplicação estática V2.** Os comandos recomendados são `dev:static`, `build:static`, `check` e `preview`. O `tsconfig.json` verifica a árvore efetivamente importada pela entrada e a configuração de build. Os scripts legados de servidor/banco não fazem parte desta publicação.

## Organização

- `client/src/pages/Home.tsx`: página, busca, categorias, produtos e contatos.
- `client/src/components/Commerce.tsx`: seleção, comparação, orçamento e composição de mensagens.
- `client/src/components/ServiceMap.tsx`: localização e consulta de destino.
- `client/src/lib/map-data.ts`: malha dos 27 estados projetada e ponto aproximado de Serra.
- `client/public/maps/`: malhas originais do IBGE.
- `client/public/catalog/`: imagens originais locais.
- `client/src/index.css`: estilos originais; `v2.css`: refinamentos e componentes da V2.
- `client/public/favicon.svg` e `manifest.webmanifest`: identidade da aba e aplicação.
- `.openai/hosting.json`: identidade da publicação de prévia isolada. Não reutilizar esse ID em outro projeto.
- `docs/PUBLICACAO.md`: entrega, domínio e manutenção.
- `scripts/verify-v2.mjs`: cenários de verificação do navegador.

## Verificação no navegador

Instale Playwright em um ambiente de QA (não necessário ao site publicado) ou informe seu módulo existente com `PLAYWRIGHT_MODULE`. `CHROME_PATH` permite usar um Chrome instalado e `QA_URL` altera o endereço testado. Crie a pasta ignorada `work/` para capturas.

```sh
pnpm add -D playwright  # apenas no ambiente de QA
pnpm exec playwright install chromium
node scripts/verify-v2.mjs
```

O roteiro verifica seleção persistente, composição de mensagens, download, comparação e limite de três, layout vertical, busca, filtros, menu mobile, destino, imagens e larguras 320/390/768/1440 px. Não dispara mensagens ou pedidos.

## Fonte geográfica

Malha estadual simplificada do IBGE: `https://servicodados.ibge.gov.br/api/v3/malhas/estados/32?formato=application/vnd.geo+json&qualidade=minima`. O marcador representa Serra de forma aproximada; não representa geocodificação do endereço comercial nem cobertura de entrega.

As migrações e o schema do template original foram preservados em `legacy-drizzle/` para referência; não são migrações desta aplicação estática e não são empacotados para produção.

## Atualização 2.1.0

Busca por dados do item, sem correspondência automática com o nome da categoria. Termos separados por espaço são combinados: `tubo inox` encontra o item de tubos, sem listar toda a categoria. Trocar de categoria limpa busca e filtro de salvos, e o botão Limpar filtros restaura a lista completa.

O fundo novo em `client/public/brand/hero-industrial.webp` foi gerado por IA sem textos ou marcas, em 1672 × 941 px. O original PNG está em `assets/masters/hero-industrial.png`. É uma composição ilustrativa, não prova de estoque ou fotografia da empresa. Prompt e diretrizes da copy estão em `docs/IDENTIDADE-E-COPY.md`. O movimento do fundo acompanha a rolagem e respeita movimento reduzido.

O GitHub contém código, lockfile, imagens, malhas geográficas, testes e documentação. Não é necessário versionar dependências instaladas ou a pasta de build: `pnpm install --frozen-lockfile` e `pnpm build:static` recriam o site. A automação em `.github/workflows/build-v2.yml` verifica tipos, compila e disponibiliza o build como artefato.

Malha de estados do Brasil: https://servicodados.ibge.gov.br/api/v3/malhas/paises/BR?formato=application/vnd.geo%2Bjson&qualidade=minima&intrarregiao=UF . O mapa identifica a sede; não afirma cobertura nacional de entrega.

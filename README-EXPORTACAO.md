# Exportação — Firmino Materiais

Este pacote contém o código-fonte completo do aplicativo, os nove arquivos de imagem usados no catálogo, a versão web já compilada e o manifesto de rota. O produto “Inspeções e testes” foi removido.

## Usar a versão pronta

A pasta `dist/public/` contém o site estático compilado. Para servi-lo na rede local com Python instalado:

```bash
python3 -m http.server 8000 --directory dist/public
```

Depois, abra `http://localhost:8000` no navegador.

## Reinstalar dependências e trabalhar no código

Requisitos: Node.js 22 e pnpm 10.18.0. Na pasta do projeto, execute:

```bash
pnpm install --frozen-lockfile
pnpm check
pnpm build:static
pnpm dev:static
```

O `package.json`, o `pnpm-lock.yaml` e `pnpm-workspace.yaml` listam e fixam as dependências transitivas e diretas. O arquivo `patches/wouter@3.7.1.patch` também é incluído e aplicado pelo workspace.

## Estrutura principal

- `client/src/`: interface React, estilos e dados do catálogo.
- `client/public/catalog/`: imagens locais do catálogo, necessárias para operar offline em relação ao armazenamento Manus.
- `client/public/manus-routes.json`: declaração da rota pública.
- `server/`, `shared/` e `drizzle/`: base completa do starter e schema/migração inicial.
- `dist/public/`: versão pronta para servir.
- `package.json` e `pnpm-lock.yaml`: dependências e scripts reproduzíveis.

## Configuração e conteúdo

O aplicativo é uma vitrine estática: não usa banco de dados, cadastro, checkout ou preços cadastrados. Os botões de orçamento direcionam ao WhatsApp **(27) 98122-4105**, e o contato de e-mail é **firmino.servicos.adm1@hotmail.com**. Não há arquivo `.env` ou credenciais pessoais no pacote. Imagens e conteúdo podem ser editados em `client/src/lib/catalog.ts` e `client/public/catalog/`.

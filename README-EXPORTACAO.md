# Exportação da V2

As instruções atualizadas estão em `README.md` e `docs/PUBLICACAO.md`.

Use Node.js 24 e pnpm 10.18.0, preserve `pnpm-lock.yaml`, execute `pnpm install --frozen-lockfile`, `pnpm check` e `pnpm build:static`. A pasta gerada `dist/public` é o artefato de produção. Ela não precisa estar versionada: é reconstruída a partir do código-fonte. O site não exige servidor Express, banco de dados, login ou variáveis secretas.

Os nove arquivos de imagem originais ficam em `client/public/catalog/`. O catálogo mantém os 26 itens da origem, sem o item Inspeções e testes. Os contatos da V2 substituem referências antigas: cotação e financeiro em firminomateriais.com.br, contato direto em anderson@rpmintegra.com.br. O domínio principal definido é firminomateriais.com.br.

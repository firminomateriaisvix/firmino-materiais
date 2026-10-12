# Firmino Materiais V2 — versão 2.2

- Busca instantânea no início e no catálogo, com miniaturas, resultados por nome, aplicação e descrição, navegação por setas, Enter e Escape.
- Incluir na Cotação mantém itens, quantidades e especificações neste navegador. O contador indica itens distintos.
- Todos os atalhos de WhatsApp do site passam pela revisão da cotação. O item consultado é acrescentado à seleção, sem duplicação.
- Nome, telefone, empresa, destino e necessidade são opcionais. WhatsApp usa quebras e títulos em negrito; e-mail e download usam texto simples organizado.
- A referência é gerada localmente por sessão de página e não registra pedido em servidor. O envio só ocorre no aplicativo escolhido, por ação do visitante.
- Mapa em fundo claro, limites estaduais com contraste e sede em Serra / Espírito Santo destacada.
- Entrada do hero, transições e imagens com movimento, respeitando a preferência de movimento reduzido.
- Contato de Anderson: anderson@firminomateriais.com.br.

## Verificação

`pnpm check` e `pnpm build:static`. O roteiro `scripts/verify-v2.mjs` verifica busca, teclado, cotação, formatação, persistência, comparação, mapa, contatos e larguras de 320 a 1440 px. Configure PLAYWRIGHT_MODULE e CHROME_PATH se necessário.

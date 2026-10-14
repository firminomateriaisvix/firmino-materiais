# Publicação e manutenção — Firmino Materiais V2

## Entrega isolada

O código da V2 conserva a origem e seu histórico Git. Trabalhe na pasta `firmino-materiais-v2` e na branch `v2`. O remote `origin` aponta para a origem apenas para consulta: **não publicar sobre o site atual nem enviar mudanças para esse remote sem instrução expressa**. A prévia Sites possui repositório e identidade próprios em `.openai/hosting.json`.

## Domínio oficial

Destino escolhido: **firminomateriais.com.br**. Conectar o domínio após aprovação desta versão e autorização para alterar a hospedagem/DNS. Esta etapa ainda não foi executada.

1. Aprovar conteúdo, direção visual, endereço comercial e contatos.
2. Definir a hospedagem estática e registrar sua configuração de build: `pnpm install --frozen-lockfile`, `pnpm build:static`, saída `dist`.
3. Adicionar o domínio no painel da hospedagem e seguir os registros DNS que ela fornecer. Não inventar IPs ou destinos.
4. Preservar MX, SPF, DKIM e DMARC do serviço de e-mail ao alterar os registros do site. Não remover registros de outros serviços.
5. Validar domínio raiz, `www`, HTTPS e redirecionamento para a variante principal escolhida.
6. Confirmar caixas de cotação, financeiro e contato direto com teste real autorizado. A prévia usa apenas `mailto:` e não precisa de credenciais SMTP.
7. Após ativação, configurar canonical, sitemap e propriedades de busca com o endereço definitivo.
8. Revisar armazenamento de seleção, imagens, acessibilidade e composição de orçamento no domínio novo.

Não há taxa de hospedagem, API paga ou dependência de autenticação no funcionamento desta aplicação estática. O custo do domínio e do e-mail é contratado separadamente com seus provedores. Fontes Google podem ser hospedadas localmente em uma futura revisão; a página possui fontes de fallback.

## Conteúdo e imagens

Os 26 itens descrevem grupos de materiais/serviços existentes. Atualize `catalog.ts` ao receber modelos, especificações e fotos reais. Cada item referencia uma categoria existente; IDs devem ser únicos e estáveis. O armazenamento local utiliza esses IDs e descarta IDs que deixem de existir. Não apresentar imagens por categoria como modelos exatos ou pressupor disponibilidade em estoque.

## Dados e segurança

Não há senha administrativa, token privado, atendimento automatizado, banco de pedidos ou coleta em servidor. Nenhuma mensagem é enviada sem ação no aplicativo WhatsApp/e-mail do próprio visitante. Não incluir credenciais no código, Git ou documentação. A integração futura de CRM, formulários em servidor, analytics ou atendimento precisa de escopo próprio e definição de privacidade.

## Manutenção e reversão

Antes de atualizar, registrar o commit publicado e manter uma cópia do build. Executar `pnpm check`, `pnpm build:static` e os testes de navegação apropriados. Para reverter, reconstruir o commit anterior e republicar seus arquivos na mesma hospedagem. Não reutilizar a identidade de outra publicação. Não incluir `work/`, logs, dependências instaladas ou arquivos temporários no repositório.

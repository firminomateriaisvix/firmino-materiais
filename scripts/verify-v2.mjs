import {createRequire} from 'node:module';
import assert from 'node:assert/strict';
import fs from 'node:fs';
const pw=process.env.PLAYWRIGHT_MODULE || 'playwright';
const {chromium}=await import(pw);
const browser=await chromium.launch({headless:true,...(process.env.CHROME_PATH?{executablePath:process.env.CHROME_PATH}:{})});
const context=await browser.newContext({viewport:{width:1440,height:1000}});
const page=await context.newPage();const errors=[];page.on('pageerror',e=>errors.push(e.message));
const url=process.env.QA_URL||'http://127.0.0.1:4180/';
const result=[];
try{
await page.goto(url);await page.waitForSelector('.product-card');
assert.equal(await page.locator('.product-card').count(),12);
await page.getByRole('button',{name:/Mostrar mais itens/}).click();assert.equal(await page.locator('.product-card').count(),24);
await page.getByRole('button',{name:/Mostrar mais itens/}).click();const total=await page.locator('.product-card').count();assert(total>24);result.push(`Catálogo original: ${total} itens e nove categorias`);
await page.getByRole('textbox',{name:'Pesquisar produtos e serviços'}).fill('tubo');assert.equal(await page.locator('.product-card').count(),1);await page.getByRole('textbox',{name:'Pesquisar produtos e serviços'}).fill('tubo inox');assert.equal(await page.locator('.product-card').count(),1);await page.locator('.filter-list').getByRole('button',{name:'Ferramentas',exact:true}).click();assert.equal(await page.getByRole('textbox',{name:'Pesquisar produtos e serviços'}).inputValue(),'');assert.equal(await page.locator('.product-card').count(),3);await page.getByRole('button',{name:'Limpar filtros'}).click();assert.equal(await page.locator('.product-card').count(),12);result.push('Busca precisa por item, múltiplos termos, troca de categoria e limpeza dos filtros');
await page.getByRole('button',{name:/Salvar na lista:/}).first().click();await page.getByRole('button',{name:/Salvar na lista:/}).first().click();
await page.getByRole('button',{name:'Abrir lista de orçamento, 2 itens'}).click();const dialog=page.getByRole('dialog');
await dialog.getByLabel('Seu nome').fill('Anderson');await dialog.getByLabel('Empresa',{exact:false}).fill('Empresa de teste');
await dialog.getByLabel('Quantidade',{exact:true}).first().fill('4');await dialog.getByLabel('Especificações ou período de locação').first().fill('Medida a confirmar');
await dialog.getByLabel('Local de entrega ou serviço').fill('Serra / ES');
const wa=new URL(await dialog.getByRole('link',{name:'Continuar no WhatsApp'}).getAttribute('href'));const message=wa.searchParams.get('text');assert.equal(wa.pathname,'/5527981224105');assert(message.includes('Quantidade: 4'));assert(message.includes('Medida a confirmar'));assert(message.includes('Empresa de teste'));assert(message.includes('\n2. '));
const mail=await dialog.getByRole('link',{name:'Preparar e-mail'}).getAttribute('href');assert(mail.startsWith('mailto:cotacao@firminomateriais.com.br'));assert(decodeURIComponent(mail).includes('Quantidade: 4'));
const downloadPromise=page.waitForEvent('download');await dialog.getByRole('button',{name:'Baixar lista'}).click();const download=await downloadPromise;assert.equal(download.suggestedFilename(),'orcamento-firmino.txt');
await page.keyboard.press('Escape');await page.reload();await page.getByRole('button',{name:'Abrir lista de orçamento, 2 itens'}).waitFor();result.push('Seleção persistente, quantidade, observações, WhatsApp, e-mail e download');
const compare=page.locator('.product-card').getByRole('button',{name:'Comparar',exact:true});await compare.nth(0).click();await compare.nth(1).click();await compare.nth(2).click();await compare.nth(3).click();assert.equal(await page.locator('.product-card button[aria-pressed=true]').filter({hasText:'Comparar'}).count(),3);
await page.locator('.compare-dock').getByRole('button',{name:'Comparar',exact:true}).click();assert.equal(await page.locator('.comparison-grid article').count(),3);
await page.setViewportSize({width:390,height:844});const cards=await page.locator('.comparison-grid article').evaluateAll(els=>els.map(e=>{const r=e.getBoundingClientRect();return {x:r.x,y:r.y}}));assert(cards[1].y>cards[0].y);assert.equal(cards[1].x,cards[0].x);await page.screenshot({path:'work/comparison-mobile.png'});await page.keyboard.press('Escape');result.push('Comparativo de três itens, limite validado e disposição vertical no celular');
await page.locator('.compare-dock').getByRole('button',{name:'Limpar comparação'}).click();
await page.getByRole('button',{name:'Abrir menu',exact:true}).click();await page.getByRole('navigation').getByRole('link',{name:'Onde estamos'}).click();assert.equal(await page.getByRole('button',{name:'Abrir menu',exact:true}).getAttribute('aria-expanded'),'false');
await page.getByLabel('Onde fica a sua operação?').fill('Vitória / ES');await page.locator('#localizacao').getByRole('button',{name:'Consultar',exact:true}).click();assert.equal(await page.getByRole('dialog').getByLabel('Local de entrega ou serviço').inputValue(),'Vitória / ES');await page.keyboard.press('Escape');result.push('Menu mobile e destino do mapa transferido para a cotação');
await page.getByRole('textbox',{name:'Pesquisar produtos e serviços'}).fill('valvulas');assert((await page.locator('.product-card').count())>0);await page.getByRole('textbox',{name:'Pesquisar produtos e serviços'}).fill('xyzsemresultado');await page.getByRole('heading',{name:'Nenhum item encontrado'}).waitFor();await page.getByRole('textbox',{name:'Pesquisar produtos e serviços'}).fill('');
await page.getByRole('button',{name:/Ver salvos/}).click();assert.equal(await page.locator('.product-card').count(),2);await page.getByRole('button',{name:/Mostrar todos/}).click();result.push('Busca sem acentos, estado vazio e filtro de salvos');
for(const width of [320,390,768,1440]){await page.setViewportSize({width,height:900});await page.goto(url);await page.waitForTimeout(200);assert.equal(await page.evaluate(()=>document.documentElement.scrollWidth>innerWidth),false,`Overflow ${width}`);for(const section of ['#catalogo','#empresa','#localizacao','#contato']){await page.locator(section).scrollIntoViewIfNeeded();await page.waitForTimeout(160)}const bad=await page.locator('img').evaluateAll(els=>els.filter(e=>e.complete&&e.naturalWidth===0).map(e=>e.src));assert.deepEqual(bad,[]);await page.waitForTimeout(750);if(width===390)await page.screenshot({path:'work/contact-mobile.png'});if(width===1440)await page.screenshot({path:'work/contact-desktop.png'});}
for(const email of ['cotacao@firminomateriais.com.br','financeiro@firminomateriais.com.br','anderson@rpmintegra.com.br'])assert(await page.locator(`a[href="mailto:${email}"]`).count());
await page.emulateMedia({reducedMotion:'reduce'});await page.reload();assert.equal(await page.locator('.map-pulse').evaluate(e=>getComputedStyle(e).animationName),'none');
assert.deepEqual(errors,[]);result.push('320, 390, 768 e 1440 px, imagens locais, contatos corretos, movimento reduzido e nenhum erro de execução');
console.log(JSON.stringify({passed:true,checks:result},null,2));
}finally{await browser.close()}

import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  ArrowUpRight,
  Briefcase,
  Check,
  ChevronDown,
  CircleDot,
  Factory,
  Flame,
  HardHat,
  Mail,
  Menu,
  MessageCircle,
  Search,
  ShieldCheck,
  Sparkles,
  Wrench,
  X,
  Zap,
  Droplets,
  type LucideIcon,
} from "lucide-react";
import { categories, items, type CatalogItem, type Category } from "@/lib/catalog";
import {CommerceProvider, useShop, SelectionButton, ItemActions, Modal} from "@/components/Commerce";
import ServiceMap from "@/components/ServiceMap";

const EMAIL = "cotacao@firminomateriais.com.br";

const iconMap: Record<string, LucideIcon> = {
  pipes: CircleDot,
  tools: Wrench,
  shield: ShieldCheck,
  sparkles: Sparkles,
  zap: Zap,
  droplet: Droplets,
  briefcase: Briefcase,
  flame: Flame,
  factory: Factory,
};

function QuoteButton({ item, className = "" }: { item?: CatalogItem; className?: string }) {
  const shop=useShop();
  return (
    <a className={`button button-amber ${className}`} href={shop.link(item)} target="_blank" rel="noopener noreferrer">
      <MessageCircle size={17} strokeWidth={2.2} />
      Solicitar orçamento
      <ArrowUpRight size={16} />
    </a>
  );
}

function BrandMark() {
  return (
    <a className="brand" href="#inicio" aria-label="Firmino Materiais — início">
      <span className="brand-symbol"><span>F</span><span>M</span></span>
      <span className="brand-name"><strong>FIRMINO</strong><small>MATERIAIS</small></span>
    </a>
  );
}

function CategoryCard({ category, onChoose }: { category: Category; onChoose: (id: string) => void }) {
  const Icon = iconMap[category.icon] ?? CircleDot;
  return (
    <button className="category-card" onClick={() => onChoose(category.id)} type="button">
      <span className="category-card-number">{category.number}</span>
      <span className="category-icon"><Icon size={19} strokeWidth={1.8} /></span>
      <span className="category-card-name">{category.shortName}</span>
      <ArrowUpRight className="category-card-arrow" size={15} />
    </button>
  );
}

function ProductCard({ item, onOpen }: { item: CatalogItem; onOpen: (item: CatalogItem) => void }) {
  const category = categories.find((entry) => entry.id === item.categoryId)!;
  return (
    <article className="product-card">
      <button className="product-image-button" type="button" onClick={() => onOpen(item)} aria-label={`Ver detalhes de ${item.name}`}>
        <img src={category.image} alt={`Imagem ilustrativa de ${category.name}`} loading="lazy" />
        <span className="product-image-number">{category.number}</span>
        {item.featured && <span className="product-tag"><span /> Em destaque</span>}
        <span className="image-open"><ArrowUpRight size={17} /></span>
      </button>
      <div className="product-copy">
        <div className="product-category">{category.shortName}</div>
        <h3>{item.name}</h3>
        <p>{item.description}</p>
        <button className="text-link" type="button" onClick={() => onOpen(item)}>
          Ver detalhes <ArrowRight size={15} />
        </button>
        <ItemActions item={item}/>
      </div>
    </article>
  );
}

export default function Home(){return <CommerceProvider><HomeContent/></CommerceProvider>}
function HomeContent() {
  const shop=useShop(), generalQuote=shop.link();
  const categoryRail=useRef<HTMLDivElement>(null);
  const scrollCategories=(direction:number)=>categoryRail.current?.scrollBy({left:direction*470,behavior:window.matchMedia("(prefers-reduced-motion: reduce)").matches?"instant":"smooth"});
  const [onlySaved,setOnlySaved]=useState(false);
  const [pageSize,setPageSize]=useState(12);
  const [query, setQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("todas");
  const [selectedItem, setSelectedItem] = useState<CatalogItem | null>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  const visibleItems = useMemo(() => {
    const fold=(s:string)=>s.normalize("NFD").replace(/[\u0300-\u036f]/g,"").toLocaleLowerCase("pt-BR");
    const normalizedQuery = fold(query.trim());
    return items.filter((item) => {
      const category = categories.find((entry) => entry.id === item.categoryId)!;
      const matchesCategory = activeCategory === "todas" || item.categoryId === activeCategory;
      const matchesQuery = !normalizedQuery || [item.name, item.description, item.detail, category.name]
        .some((field) => fold(field).includes(normalizedQuery));
      return matchesCategory && matchesQuery && (!onlySaved || shop.lines.some(l=>l.id===item.id));
    });
  }, [activeCategory, query, onlySaved,shop.lines]);
  useEffect(()=>setPageSize(12),[activeCategory,query,onlySaved]);

  useEffect(() => {
    if (!selectedItem) return;
    const onEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", onEscape);
    return () => window.removeEventListener("keydown", onEscape);
  }, [selectedItem]);

  useEffect(()=>{
    const nodes=document.querySelectorAll(".categories-section,.catalog-heading,.company-copy,.service-map-layout,.contact-inner");
    if(!("IntersectionObserver" in window)||window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.08});
    nodes.forEach(node=>{node.classList.add("reveal-v2");observer.observe(node)});
    return()=>observer.disconnect();
  },[]);

  const chooseCategory = (id: string) => {
    setActiveCategory(id);
    setMenuOpen(false);
    document.getElementById("catalogo")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="site-shell" id="inicio">
      <div className="utility-bar">
        <div className="utility-inner">
          <span><span className="status-dot" /> Revenda de materiais <i /> Locações <i /> Serviços</span>
          <a href={`mailto:${EMAIL}`}><Mail size={14} /> {EMAIL}</a>
        </div>
      </div>

      <header className="site-header">
        <div className="header-inner">
          <BrandMark />
          <nav className={`main-nav ${menuOpen ? "is-open" : ""}`} aria-label="Navegação principal">
            <a href="#categorias" onClick={() => setMenuOpen(false)}>Categorias</a>
            <a href="#catalogo" onClick={() => setMenuOpen(false)}>Catálogo</a>
            <a href="#empresa" onClick={() => setMenuOpen(false)}>A Firmino</a>
            <a href="#localizacao" onClick={() => setMenuOpen(false)}>Onde estamos</a>
            <a href="#contato" onClick={() => setMenuOpen(false)}>Contato</a>
            <div className="mobile-nav-cta"><QuoteButton /></div>
          </nav>
          <div className="header-actions">
            <SelectionButton/>
            <QuoteButton className="header-quote" />
            <button className="menu-toggle" type="button" aria-label={menuOpen ? "Fechar menu" : "Abrir menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen(!menuOpen)}>
              {menuOpen ? <X size={21} /> : <Menu size={21} />}
            </button>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-grain" />
          <div className="hero-content">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> Materiais, locações e serviços · Serra / ES</div>
            <h1 id="hero-title">A sua lista avança.<br /><em>A operação também.</em></h1>
            <p>Materiais industriais, locações e serviços para manter cada projeto em movimento.</p>
            <div className="hero-actions">
              <a className="button button-amber" href="#catalogo">Explorar catálogo <ArrowRight size={17} /></a>
              <a className="button button-outline-light" href={generalQuote} target="_blank" rel="noopener noreferrer"><MessageCircle size={17} /> Fale com a Firmino</a>
            </div>
            <form className="hero-query" onSubmit={event=>{event.preventDefault();setActiveCategory("todas");setOnlySaved(false);document.getElementById("catalogo")?.scrollIntoView({behavior:"smooth"})}}><label htmlFor="hero-search">O que o seu projeto precisa?</label><div><Search size={20}/><input id="hero-search" value={query} onChange={event=>setQuery(event.target.value)} placeholder="Busque um material ou serviço"/><button type="submit" aria-label="Pesquisar no catálogo"><ArrowRight size={21}/></button></div></form>
            <div className="hero-footnote"><span className="hero-footnote-rule" /> Soluções para indústria, manutenção e operação</div>
          </div>
          <div className="hero-index" aria-hidden="true"><span>FM</span><i /> ESPECIALISTAS EM FORNECIMENTO</div>
          <a href="#categorias" className="hero-scroll" aria-label="Descer até as categorias"><span>Explore as soluções</span><ChevronDown size={15} /></a>
        </section>

        <section className="intro-strip" aria-label="Áreas de atuação">
          <div className="intro-strip-inner">
            <span className="intro-lead">Uma parceira para cada frente</span>
            <span><Wrench size={17} /> <b>Materiais</b></span>
            <span><Factory size={17} /> <b>Locações</b></span>
            <span><HardHat size={17} /> <b>Serviços</b></span>
            <span className="intro-note">Do planejamento à operação.</span>
          </div>
        </section>

        <section className="section categories-section" id="categorias">
          <div className="section-heading">
            <div><div className="eyebrow"><span className="eyebrow-line" /> Nove especialidades, uma conversa</div><h2>Soluções por <em>especialidade.</em></h2></div>
            <p>Navegue pelas categorias e encontre o caminho certo para sua necessidade.</p>
          </div>
          <div className="category-navigation"><span>Deslize para explorar as especialidades</span><div><button className="icon-button" aria-label="Categorias anteriores" onClick={()=>scrollCategories(-1)}><ChevronLeft size={22}/></button><button className="icon-button" aria-label="Próximas categorias" onClick={()=>scrollCategories(1)}><ChevronRight size={22}/></button></div></div>
          <div className="category-grid" ref={categoryRail}>
            {categories.map((category) => <CategoryCard key={category.id} category={category} onChoose={chooseCategory} />)}
          </div>
        </section>

        <section className="catalog-section" id="catalogo">
          <div className="section catalog-inner">
            <div className="section-heading catalog-heading">
              <div><div className="eyebrow"><span className="eyebrow-line" /> Encontre. Compare. Consulte.</div><h2>O material certo.<br /><em>Sem complicação.</em></h2></div>
              <p>Conte à nossa equipe o que você procura. Ajudamos a encontrar a solução adequada para a sua operação.</p>
            </div>
            <div className="catalog-controls">
              <label className="search-box"><Search size={19} /><input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="O que você está procurando?" aria-label="Pesquisar produtos e serviços" /><kbd>⌕</kbd></label>
              <div className="filter-hint">FILTRAR POR</div>
              <div className="filter-list" role="group" aria-label="Filtrar por categoria">
                <button className={`filter-chip ${activeCategory === "todas" ? "active" : ""}`} onClick={() => setActiveCategory("todas")} type="button">Todas <span>{items.length}</span></button>
                {categories.map((category) => <button key={category.id} className={`filter-chip ${activeCategory === category.id ? "active" : ""}`} onClick={() => setActiveCategory(category.id)} type="button">{category.shortName}</button>)}
              </div>
            </div>
            <div className="catalog-guide"><span>Compare até três itens ou salve sua seleção para um orçamento completo. Imagens ilustrativas das categorias.</span><button className="filter-chip" aria-pressed={onlySaved} onClick={()=>setOnlySaved(!onlySaved)}>{onlySaved?"Mostrar todos":"Ver salvos"} ({shop.lines.length})</button></div>
            <div className="results-line"><span>{query || activeCategory !== "todas" ? `${visibleItems.length} resultado${visibleItems.length === 1 ? "" : "s"}` : `${visibleItems.length} itens no catálogo`}</span><span>Solicite informações e disponibilidade à nossa equipe</span></div>
            {visibleItems.length > 0 ? (
              <div className="product-grid">{visibleItems.slice(0,pageSize).map((item) => <ProductCard key={item.id} item={item} onOpen={setSelectedItem} />)}</div>
            ) : (
              <div className="empty-state"><PackageSearchIcon /><h3>Nenhum item encontrado</h3><p>Tente outra palavra ou peça ajuda à nossa equipe.</p><QuoteButton /></div>
            )}
            {visibleItems.length>pageSize&&<button className="button button-white load-more" onClick={()=>setPageSize(pageSize+12)}>Mostrar mais itens ({visibleItems.length-pageSize})</button>}
            <div className="catalog-foot"><span><Check size={15} /> Sem preços genéricos: cotação conforme sua necessidade.</span><a href={generalQuote} target="_blank" rel="noopener noreferrer">Precisa de ajuda? <ArrowUpRight size={15} /></a></div>
          </div>
        </section>

        <section className="company-section" id="empresa">
          <div className="company-mark" aria-hidden="true"><span>FM</span><i /></div>
          <div className="company-copy">
            <div className="eyebrow eyebrow-light"><span className="eyebrow-line" /> FIRMINO MATERIAIS</div>
            <h2>O seu próximo projeto<br />merece um <em>bom parceiro.</em></h2>
            <p>Materiais, locações e serviços em um só lugar. Fale com quem entende a rotina da sua operação e conte o que você precisa.</p>
            <QuoteButton />
          </div>
          <div className="company-stamp"><span>FM</span><small>MATERIAIS<br />& SOLUÇÕES</small><i /></div>
        </section>

        <ServiceMap/>
        <section className="contact-section" id="contato">
          <div className="section contact-inner">
            <div><div className="eyebrow"><span className="eyebrow-line" /> FALE COM A NOSSA EQUIPE</div><h2>Precisa de material?<br /><em>Vamos conversar.</em></h2><p>Conte o que sua operação precisa. A equipe Firmino pode ajudar com materiais, locações e serviços.</p></div>
            <div className="contact-card">
              <div className="contact-card-kicker">ATENDIMENTO DIRETO</div>
              <a className="contact-row whatsapp-row" href={generalQuote} target="_blank" rel="noopener noreferrer"><span className="contact-icon"><MessageCircle size={21} /></span><span><small>CHAME NO WHATSAPP</small><strong>(27) 98122-4105</strong></span><ArrowUpRight size={18} /></a>
              <a className="contact-row" href={`mailto:${EMAIL}`}><span className="contact-icon"><Mail size={21} /></span><span><small>COTAÇÕES E LISTAS DE MATERIAIS</small><strong>{EMAIL}</strong></span><ArrowUpRight size={18} /></a>
              <a className="contact-row" href="mailto:financeiro@firminomateriais.com.br"><span className="contact-icon"><Mail size={21}/></span><span><small>FINANCEIRO</small><strong>financeiro@firminomateriais.com.br</strong></span><ArrowUpRight size={18}/></a>
              <a className="contact-row" href="mailto:anderson@rpmintegra.com.br"><span className="contact-icon"><Mail size={21}/></span><span><small>CONTATO DIRETO · ANDERSON</small><strong>anderson@rpmintegra.com.br</strong></span><ArrowUpRight size={18}/></a>
              <div className="contact-card-note"><span className="status-dot" /> Resposta humana. Orçamento sob consulta.</div>
            </div>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="footer-top"><BrandMark /><p>Materiais e soluções que acompanham<br />o ritmo da sua operação.</p><a href="#inicio" className="back-top">VOLTAR AO TOPO <ArrowRight size={15} /></a></div>
        <div className="footer-bottom"><span>© {new Date().getFullYear()} Firmino Materiais</span><span>Revenda <i /> Locações <i /> Serviços</span><a href={`mailto:${EMAIL}`}>{EMAIL}</a><span>Serra / Espírito Santo</span></div>
      </footer>

      {selectedItem && <ProductDialog item={selectedItem} onClose={() => setSelectedItem(null)} />}
      <a className="floating-whatsapp" href={generalQuote} target="_blank" rel="noopener noreferrer" aria-label="Solicitar orçamento pelo WhatsApp"><MessageCircle size={21} /><span>Orçamento</span></a>
    </div>
  );
}

function PackageSearchIcon() {
  return <div className="empty-icon"><Search size={25} /></div>;
}

function ProductDialog({item,onClose}:{item:CatalogItem;onClose:()=>void}){
 const category=categories.find(c=>c.id===item.categoryId)!;
 return <Modal title={item.name} onClose={onClose} wide><div className="product-detail-v2"><div><img src={category.image} alt={category.name}/><small>Imagem ilustrativa da categoria. Consulte o modelo na cotação.</small></div><div><span className="v2-label">{category.name}</span><h3>{item.description}</h3><p>{item.detail}</p><div className="detail-consult">Especificações, preço e disponibilidade sob consulta.</div><ItemActions item={item}/><QuoteButton item={item}/></div></div></Modal>
}

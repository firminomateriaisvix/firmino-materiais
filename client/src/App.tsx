import {Route,Switch} from "wouter";
import Home from "./pages/Home";
export default function App(){return <Switch><Route path="/" component={Home}/><Route><main className="not-found-v2"><p>Firmino Materiais</p><h1>Esse caminho não está no catálogo.</h1><p>Volte ao início para explorar os materiais, locações e serviços.</p><a href="/" className="button button-amber">Voltar ao início</a></main></Route></Switch>}

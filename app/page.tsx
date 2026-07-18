"use client";

import { useMemo, useState } from "react";

type City = {
  id: string;
  name: string;
  short: string;
  focus: string;
  rating: string;
  reviews: number;
  routes: number;
  points: number;
  size: string;
  route: string;
  mode: string;
  distance: string;
  climb: string;
  time: string;
  terrain: string;
};

const cities: City[] = [
  { id: "nova", name: "Nova Petrópolis", short: "Nova Petrópolis", focus: "Cicloturismo & natureza", rating: "4,8", reviews: 126, routes: 5, points: 18, size: "42 MB", route: "Rota Malakoff", mode: "Cicloturismo · dificuldade baixa", distance: "21,71 km", climb: "+414 m", time: "2h00", terrain: "Estrada de terra · acesso público" },
  { id: "nove", name: "Nova Petrópolis", short: "9 Colônias", focus: "Carro & cicloturismo", rating: "4,9", reviews: 48, routes: 1, points: 12, size: "64 MB", route: "Rota 9 Colônias", mode: "Carro · Bike difícil", distance: "38,98 km", climb: "+1.010 m", time: "3h bike", terrain: "75% terra · 25% asfalto" },
  { id: "canela", name: "Canela", short: "Canela", focus: "Natureza & aventura", rating: "4,9", reviews: 204, routes: 19, points: 54, size: "72 MB", route: "Volta dos Vales", mode: "Bike · moderada", distance: "32,4 km", climb: "+640 m", time: "3h05", terrain: "Terra compactada e asfalto" },
  { id: "gramado", name: "Gramado", short: "Gramado", focus: "Sabores & experiências", rating: "4,8", reviews: 312, routes: 16, points: 72, size: "61 MB", route: "Rota dos Pinheiros", mode: "Caminhada · leve", distance: "12,2 km", climb: "+230 m", time: "2h40", terrain: "Parques e estradas locais" },
  { id: "sao-chico", name: "São Francisco de Paula", short: "São Chico", focus: "Campos & estradas livres", rating: "4,9", reviews: 96, routes: 27, points: 49, size: "83 MB", route: "Campos de Cima", mode: "Gravel · desafiadora", distance: "58,8 km", climb: "+1.020 m", time: "5h20", terrain: "Campos, pedra e estradas rurais" },
  { id: "bento", name: "Bento Gonçalves", short: "Bento", focus: "Vinhos & paisagens", rating: "4,8", reviews: 281, routes: 18, points: 67, size: "69 MB", route: "Caminhos do Vinho", mode: "Bike · moderada", distance: "41,8 km", climb: "+690 m", time: "4h10", terrain: "Paralelepípedo e interior" },
  { id: "cambara", name: "Cambará do Sul", short: "Cambará", focus: "Cânions & travessias", rating: "4,9", reviews: 154, routes: 21, points: 43, size: "92 MB", route: "Travessia dos Cânions", mode: "Trekking · desafiadora", distance: "18,7 km", climb: "+510 m", time: "6h00", terrain: "Campos de altitude e trilha" },
];

type Tab = "home" | "map" | "explore" | "social" | "trips" | "profile";
type Quiz = { activity: string; level: string; time: string; vibe: string };

function Brand() {
  return (
    <div className="brand brandOfficial" aria-label="Achei Aventura">
      <img src="/achei-aventura-logo.png" alt="Achei Aventura" />
      <span>Aventura sem achismo.</span>
    </div>
  );
}

function Seal({ children = "Em campo" }: { children?: React.ReactNode }) {
  return <span className="seal"><i />{children}</span>;
}

function Header({ eyebrow, title, copy }: { eyebrow: string; title: React.ReactNode; copy: string }) {
  return (
    <header className="sectionHeader">
      <Brand />
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{copy}</p>
    </header>
  );
}

export default function Home() {
  const [started, setStarted] = useState(false);
  const [tab, setTab] = useState<Tab>("home");
  const [cityId, setCityId] = useState("nova");
  const [routeOpen, setRouteOpen] = useState(false);
  const [ratingOpen, setRatingOpen] = useState(false);
  const [stars, setStars] = useState(0);
  const [downloaded, setDownloaded] = useState(true);
  const [finderOpen, setFinderOpen] = useState(false);
  const [points, setPoints] = useState(680);
  const [completed, setCompleted] = useState(4);
  const [recentRoute, setRecentRoute] = useState<string | null>(null);
  const [hubOpen, setHubOpen] = useState(false);
  const city = useMemo(() => cities.find((item) => item.id === cityId) ?? cities[0], [cityId]);

  const go = (next: Tab) => {
    setRouteOpen(false);
    setTab(next);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (!started) {
    return (
      <main className="appShell cover">
        <div className="topography" />
        <Brand />
        <div className="coverSpacer" />
        <span className="coverKicker">Serra Gaúcha · informação em campo</span>
        <h1>Aventura<br />sem achismo.</h1>
        <p>Expedições reais e informação confiável: rotas, GPX, custos, riscos e melhores épocas.</p>
        <div className="cityPills">{cities.map((item) => <span key={item.id}>{item.short}</span>)}</div>
        <button className="mainButton" onClick={() => setStarted(true)}>ENCONTRAR SUA AVENTURA <b>→</b></button>
        <small className="coverFoot">rotas offline · informação verificada · experiências reais</small>
      </main>
    );
  }

  return (
    <main className="appShell">
      {routeOpen ? (
        <Route city={city} onBack={() => setRouteOpen(false)} onRate={() => setRatingOpen(true)} downloaded={downloaded} setDownloaded={setDownloaded} onComplete={() => { if (recentRoute !== city.route) { setPoints(points + 100); setCompleted(completed + 1); setRecentRoute(city.route); } }} />
      ) : (
        <>
          {tab === "home" && <HomeTab city={city} setCityId={setCityId} onMap={() => go("map")} onTrips={() => go("trips")} onExplore={() => go("explore")} onRoute={() => setRouteOpen(true)} onFinder={() => setFinderOpen(true)} onHub={() => setHubOpen(true)} />}
          {tab === "map" && <MapTab city={city} onRoute={() => setRouteOpen(true)} downloaded={downloaded} setDownloaded={setDownloaded} />}
          {tab === "explore" && <ExploreTab city={city} onRate={() => setRatingOpen(true)} />}
          {tab === "social" && <SocialTab recentRoute={recentRoute} points={points} />}
          {tab === "trips" && <TripsTab />}
          {tab === "profile" && <ProfileTab onExplore={() => go("home")} points={points} completed={completed} recentRoute={recentRoute} />}
        </>
      )}

      {!routeOpen && <BottomNav active={tab} onGo={go} />}

      {ratingOpen && (
        <div className="modalShade" onClick={() => setRatingOpen(false)}>
          <section className="ratingModal" onClick={(event) => event.stopPropagation()}>
            <button className="modalClose" onClick={() => setRatingOpen(false)}>×</button>
            <span className="eyebrow dark">Avaliação em campo</span>
            <h2>Como foi sua experiência?</h2>
            <p>Sua opinião ajuda outros aventureiros a decidirem melhor antes de ir.</p>
            <div className="stars">{[1, 2, 3, 4, 5].map((value) => <button className={value <= stars ? "chosen" : ""} key={value} onClick={() => setStars(value)}>★</button>)}</div>
            <button className="solidButton" onClick={() => setRatingOpen(false)} disabled={!stars}>ENVIAR AVALIAÇÃO</button>
          </section>
        </div>
      )}
      {finderOpen && <RouteFinder onClose={() => setFinderOpen(false)} onChoose={(id) => { setCityId(id); setFinderOpen(false); setTab("map"); }} />}
      {hubOpen && <EcosystemHub onClose={() => setHubOpen(false)} />}
    </main>
  );
}

function HomeTab({ city, setCityId, onMap, onTrips, onExplore, onRoute, onFinder, onHub }: { city: City; setCityId: (id: string) => void; onMap: () => void; onTrips: () => void; onExplore: () => void; onRoute: () => void; onFinder: () => void; onHub: () => void }) {
  return <div className="tabPage">
    <Header eyebrow="Seu próximo destino" title={<>Planeje certo.<br />Vá mais longe.</>} copy="Informação de campo para escolher a aventura antes de sair de casa." />
    <div className="pageContent">
      <section className="finderCard"><span>RECOMENDAÇÃO PERSONALIZADA</span><h2>Qual aventura combina com você?</h2><p>Responda 4 perguntas rápidas e receba rotas adequadas ao seu perfil.</p><button onClick={onFinder}>DESCOBRIR MINHA ROTA <b>→</b></button></section>
      <section className="ecosystemBanner"><div><span>NOVO · ECOSSISTEMA ACHEI</span><h2>Mais segurança. Mais benefícios.</h2><p>Guardião, Copiloto, desafios e vantagens exclusivas.</p></div><button onClick={onHub}>CONHECER</button></section>
      <TitleRow title="Aventuras na Serra" detail="Arraste e escolha" />
      <div className="cityScroller">{cities.map((item) => <button key={item.id} className={`cityCard city-${item.id} ${item.id === city.id ? "selected" : ""}`} onClick={() => setCityId(item.id)}><div className="landscape"><i /><b /></div><div className="cityInfo"><Seal /><h3>{item.name}</h3><p>{item.focus}</p><span>★ {item.rating} · {item.reviews} avaliações</span></div></button>)}</div>
      <TitleRow title="Pronto para partir" />
      <section className="readyCard"><div><h3>{city.name} offline</h3><p>{city.routes} rotas com terreno, logística e pontos de apoio.</p></div><button onClick={onMap}>ABRIR MAPA</button></section>
      <TitleRow title="Encontre seu caminho" />
      <div className="quickGrid"><button className="quick blue" onClick={onRoute}><small>GPX e rotas reais</small><strong>Pedale</strong></button><button className="quick purple" onClick={onExplore}><small>Informação de campo</small><strong>Explore</strong></button><button className="quick terracotta" onClick={onExplore}><small>Paradas certas</small><strong>Saboreie</strong></button><button className="quick gold" onClick={onTrips}><small>Expedições guiadas</small><strong>Vá junto</strong></button></div>
    </div>
  </div>;
}

function MapGraphic({ city }: { city: City }) {
  const nove = city.id === "nove";
  return <><div className={`mapGraphic ${city.id === "nova" ? "malakoffMap" : nove ? "noveMap" : ""}`}><div className="contours" /><span className="routeLine" /><i className="pin start" /><i className="pin end" /><span className="mapChip">⌖ GPS ATIVO</span><div className="mapName"><strong>{city.route}</strong><small>{city.mode} · {city.distance}</small></div></div>{city.id === "nova" && <div className="routePhotoStrip"><img src="/malakoff/araucarias.jpeg" alt="Araucárias na Rota Malakoff"/><img src="/malakoff/paredao.jpg" alt="Paredão Malakoff"/><img src="/malakoff/vista.jpg" alt="Vista da Malakoff"/></div>}{nove && <div className="routePhotoStrip"><img src="/nove-colonias/linha-imperial.jpg" alt="Linha Imperial"/><img src="/nove-colonias/casa.jpg" alt="Arquitetura rural"/><img src="/nove-colonias/vinhedo.jpg" alt="Vinhedos da rota"/></div>}</>;
}

function MapTab({ city, onRoute, downloaded, setDownloaded }: { city: City; onRoute: () => void; downloaded: boolean; setDownloaded: (value: boolean) => void }) {
  const nove = city.id === "nove";
  return <div className="tabPage"><Header eyebrow={downloaded ? "Mapa disponível offline" : "Mapa online"} title={<>{city.route},<br />mesmo sem sinal.</>} copy="Rotas reais do piloto Achei Aventura em Nova Petrópolis." /><div className="pageContent"><MapGraphic city={city} />
    {city.id === "nova" && <><section className="realRouteBadge"><span>GPX REAL VALIDADO</span><strong>503 pontos registrados</strong><small>Partida: Mukli Alfajores</small></section><TitleRow title="Ficha operacional" detail="Piloto"/><section className="dataCard"><DataRow label="Piso" value="Estrada de terra"/><DataRow label="Dificuldade" value="Baixa"/><DataRow label="Tempo em movimento" value="2 horas"/><DataRow label="Acesso" value="100% público"/><DataRow label="Apoio oficial" value="Pedras do Silêncio · km 4"/><DataRow label="Cobertura celular" value="Menos de 50%"/><DataRow label="Melhor época" value="Ano todo"/></section><div className="fogAlert"><b>☁ ALERTA DE NEBLINA</b><p>A região pode fechar rapidamente. Consulte o clima e evite iniciar sem visibilidade adequada.</p></div><a className="gpxDownload" href="/routes/malakoff.gpx" download>↓ BAIXAR GPX ORIGINAL</a></>}
    {nove && <><section className="realRouteBadge"><span>MULTIMODAL</span><strong>876 pontos registrados</strong><small>Partida: Sociedade Concórdia</small></section><TitleRow title="Ficha operacional" detail="Carro + bike"/><section className="dataCard"><DataRow label="Piso" value="75% terra · 25% asfalto"/><DataRow label="Bike" value="Difícil · cerca de 3 horas"/><DataRow label="Carro" value="Cerca de 1h30"/><DataRow label="Acesso" value="100% público"/><DataRow label="Apoio 1" value="Casa Sander · 9 Colônias"/><DataRow label="Apoio 2" value="Mercado Cisne · Pinhal Alto"/><DataRow label="Cobertura celular" value="Cerca de 60%"/><DataRow label="Melhor época" value="Ano todo"/></section><div className="fogAlert"><b>☁ ATENÇÃO AO CLIMA</b><p>Consulte as condições antes de sair. Chuva e neblina podem alterar visibilidade e piso nas estradas rurais.</p></div><a className="gpxDownload" href="/routes/rota-9-colonias.gpx" download>↓ BAIXAR GPX ORIGINAL</a></>}
    <button className="routeButton" onClick={onRoute}>VER DETALHES E NAVEGAR <b>→</b></button><TitleRow title="Pacote offline" detail={downloaded ? "Baixado" : "Pendente"} /><section className="dataCard"><DataRow label={city.route} value={city.size} /><DataRow label="Inclui" value="Mapa · GPX · alertas · apoio" /><DataRow label="Última revisão" value="Julho de 2026" /></section><button className={downloaded ? "outlineButton" : "solidButton"} onClick={() => setDownloaded(!downloaded)}>{downloaded ? "✓ MAPA DISPONÍVEL OFFLINE" : "↓ BAIXAR MAPA DA ROTA"}</button></div></div>;
}

function Route({ city, onBack, onRate, downloaded, setDownloaded, onComplete }: { city: City; onBack: () => void; onRate: () => void; downloaded: boolean; setDownloaded: (value: boolean) => void; onComplete: () => void }) {
  const [navigating, setNavigating] = useState(false); const [step, setStep] = useState(0);
  const [voice, setVoice] = useState(true); const [recalculating, setRecalculating] = useState(false);
  const points = city.id === "nova" ? ["Saída · Mukli Alfajores", "Pedras do Silêncio · km 4", "Estradas rurais da Malakoff", "Trecho de baixa cobertura", "Chegada · Mukli Alfajores"] : city.id === "nove" ? ["Saída · Sociedade Concórdia", "Casa Sander · 9 Colônias", "Estradas rurais", "Mercado Cisne · Pinhal Alto", "Chegada · Sociedade Concórdia"] : ["Saída · Praça das Flores", "Estrada da Linha Imperial", "Mirante das Araucárias", "Casa do Colono", "Chegada · Centro"];
  const routeKm = Number(city.distance.replace(",", ".").replace(/[^0-9.]/g, "")); const distance = Math.max(0, routeKm - step * (routeKm/4)); const instructions = ["Siga em frente", "Vire à direita", "Mantenha-se à esquerda", "Na bifurcação, siga o GPX", "Você chegou"];
  const advance = () => { if (step === 2 && !recalculating) { setRecalculating(true); setTimeout(() => { setRecalculating(false); setStep(3); }, 900); } else if (step < 4) setStep(step + 1); else { onComplete(); setNavigating(false); } };
  return <div className={`routePage route-${city.id} ${navigating ? "driving" : ""}`}>
    {!navigating && <header className="routeHeader"><button className="backButton" onClick={onBack}>‹</button><span className="eyebrow">Informação verificada · em campo</span><h1>{city.route}</h1><p>{city.name} · {city.mode}</p><div className="routeStats"><div><strong>{city.distance}</strong><small>Distância</small></div><div><strong>{city.climb}</strong><small>Elevação</small></div><div><strong>{city.time}</strong><small>Estimativa</small></div></div></header>}
    <div className={navigating ? "gpsScreen" : "pageContent"}>{navigating ? <section className="vehicleGps">
      <div className="gpsInstruction"><b>{step === 0 ? "↑" : step === 1 ? "↱" : step === 2 ? "↖" : step === 3 ? "⟳" : "✓"}</b><div><span>{step < 4 ? `${Math.max(120, 800-step*170)} m` : "Destino"}</span><strong>{recalculating ? "Recalculando rota…" : instructions[step]}</strong><small>{points[Math.min(step + 1, 4)]}</small></div><button onClick={() => setVoice(!voice)} aria-label="Som">{voice ? "🔊" : "🔇"}</button></div>
      <div className={`perspectiveMap stage-${step}`}><div className="mapTerrain"/><div className="road roadA"/><div className="road roadB"/><div className="gpsRoute"/><div className="carMarker">▲<i/></div><span className="poi fuel">☕</span><span className="poi view">♧</span><button className="compass">N</button><button className="recenter">⌖</button>{recalculating && <div className="recalc"><i/>Buscando novo caminho offline</div>}</div>
      <div className="gpsFooter"><button className="gpsExit" onClick={() => setNavigating(false)}>×</button><div><strong>{distance.toFixed(1)} km</strong><small>restantes</small></div><div><strong>{Math.max(0, 48-step*10)} min</strong><small>chegada {14+Math.floor((48-step*10)/60)}:{String((48-step*10)%60).padStart(2,"0")}</small></div><div><strong>{step ? 31+step*3 : 0}</strong><small>km/h</small></div><button className="gpsMore">•••</button></div>
      <button className="simulateDrive" onClick={advance} disabled={recalculating}>{step < 4 ? "SIMULAR DESLOCAMENTO" : "FINALIZAR ROTA"}</button><div className="offlinePill">✓ MAPA OFFLINE · GPS ATIVO</div>
    </section> : <><section className="trustCard"><div className="trustScore"><strong>92</strong><small>/100</small></div><div><span>ÍNDICE ACHEI DE CONFIABILIDADE</span><h3>Excelente para explorar</h3><p>Verificada há 8 dias · 94% de conclusão</p></div></section><div className="trustMetrics"><span><b>✓</b>Sinalização</span><span><b>✓</b>Segurança</span><span><b>!</b>Sinal baixo</span></div><div className="warning">Rota revisada pela Achei Aventura. Confira riscos, condições locais e equipamentos recomendados antes de sair.</div><section className="copilotCard"><span>✦ COPILOTO ACHEI</span><h3>Seu briefing está pronto</h3><div><p><b>Clima</b> 16–22 °C · sem chuva</p><p><b>Saída ideal</b> entre 7h e 9h</p><p><b>Levar</b> 1,5 L de água, corta-vento e kit reparo</p></div><button onClick={() => alert("Checklist salvo no Passaporte. O Copiloto acompanhará horário, clima e saída da rota.")}>SALVAR CHECKLIST</button></section><button className="mainButton routeStart" onClick={() => {setStep(0);setNavigating(true)}}>ABRIR GPS VEICULAR <b>⌖</b></button><button className="outlineButton" onClick={() => setDownloaded(!downloaded)}>{downloaded ? "✓ ROTA E MAPA BAIXADOS" : "↓ BAIXAR ROTA E MAPA"}</button><TitleRow title="Informações essenciais" /><section className="dataCard"><DataRow label="Terreno" value={city.terrain} /><DataRow label="Melhor período" value="Abril a novembro" /><DataRow label="Pontos de apoio" value="3 parceiros" /><DataRow label="Sinal de celular" value="Baixo em 42%" /></section><TitleRow title="Roteiro demonstrativo"/><div className="timeline">{points.map((p,i)=><div key={p}><i>{i+1}</i><span><strong>{p}</strong><small>{i===0?"Briefing e checagem":i===2?"Vista panorâmica e água":i===3?"Apoio, banheiro e produtos locais":"Trecho sinalizado no mapa"}</small></span></div>)}</div><button className="solidButton" onClick={onRate}>AVALIAR ESTA ROTA</button></>}</div>
  </div>;
}

function RouteFinder({onClose,onChoose}:{onClose:()=>void;onChoose:(id:string)=>void}) {
  const [step,setStep]=useState(0); const [answers,setAnswers]=useState<Quiz>({activity:"",level:"",time:"",vibe:""});
  const questions=[{key:"activity",title:"Como você quer explorar?",opts:[["bike","Pedalando"],["walk","Caminhando"],["either","Tanto faz"]]},{key:"level",title:"Como está seu preparo?",opts:[["easy","Quero algo tranquilo"],["medium","Tenho bom preparo"],["hard","Quero desafio"]]},{key:"time",title:"Quanto tempo você tem?",opts:[["short","Até 3 horas"],["day","Meio dia"],["long","Dia inteiro"]]},{key:"vibe",title:"O que mais importa?",opts:[["nature","Natureza e paisagem"],["food","Cultura e gastronomia"],["wild","Aventura e isolamento"]]}] as const;
  const recommend=()=> answers.vibe==="wild"||answers.level==="hard" ? "cambara" : answers.vibe==="food" ? "bento" : answers.activity==="walk" ? "gramado" : "nova";
  const result=cities.find(c=>c.id===recommend())!; const q=questions[Math.min(step,3)];
  const pick=(value:string)=>{setAnswers({...answers,[q.key]:value});setStep(step+1)};
  return <div className="finderShade"><section className="finderFlow"><button className="modalClose" onClick={onClose}>×</button>{step<4?<><span className="eyebrow dark">Seu perfil · {step+1} de 4</span><div className="quizProgress"><i style={{width:`${(step+1)*25}%`}}/></div><h2>{q.title}</h2><div className="answerList">{q.opts.map(([v,l])=><button key={v} onClick={()=>pick(v)}>{l}<b>→</b></button>)}</div>{step>0&&<button className="quizBack" onClick={()=>setStep(step-1)}>‹ Voltar</button>}</>:<><span className="match">92% COMPATÍVEL</span><h2>Encontramos sua próxima aventura.</h2><div className="resultRoute"><Seal>Recomendado para você</Seal><h3>{result.route}</h3><p>{result.name} · {result.mode}</p><div><strong>{result.distance}</strong><strong>{result.climb}</strong><strong>{result.time}</strong></div></div><p className="why"><b>Por que combina:</b> seu perfil indica preferência por {answers.vibe==="food"?"cultura e sabores":answers.vibe==="wild"?"desafio e natureza preservada":"paisagens, ritmo equilibrado e boa estrutura"}.</p><button className="solidButton" onClick={()=>onChoose(result.id)}>VER ROTA RECOMENDADA</button><button className="quizBack" onClick={()=>setStep(0)}>Refazer respostas</button></>}</section></div>
}

function ExploreTab({ city, onRate }: { city: City; onRate: () => void }) {
  const partners = [
    ["⌂", "Bike Friendly", "Hotel Petrópolis", "Bicicletário seguro e café cedo", "4,9"],
    ["☕", "Gastronomia Local", "Casa do Colono", "Produtos regionais e apoio de rota", "4,8"],
    ["♧", "Experiência Real", "Sítio da Montanha", "Visita guiada e produção local", "4,7"],
  ];
  return <div className="tabPage"><Header eyebrow={`${city.name} em campo`} title={<>Mais certeza.<br />Melhor aventura.</>} copy="Parceiros com Selo Achei e avaliações de quem realmente viveu a experiência." /><div className="pageContent"><TitleRow title="Onde parar bem" detail="Filtros" /><div className="partnerList">{partners.map((partner) => <article key={partner[2]} className="partner"><span className="partnerIcon">{partner[0]}</span><div><Seal>{partner[1]}</Seal><h3>{partner[2]}</h3><p>{partner[3]}</p></div><strong>★ {partner[4]}</strong></article>)}</div><div className="warning">O Selo Achei segue critérios técnicos. Avaliações são liberadas após check-in, compra, reserva ou conclusão de uma rota.</div><button className="solidButton" onClick={onRate}>AVALIAR {city.name.toUpperCase()}</button></div></div>;
}

function TripsTab() {
  return <div className="tabPage"><Header eyebrow="Expedições Achei Aventura" title={<>Vá com quem<br />conhece o caminho.</>} copy="Grupos pequenos, logística acertada e informação real para viver a jornada com segurança." /><div className="pageContent"><article className="tripCard"><div className="tripVisual"><span>EXPEDIÇÃO · SERRA GAÚCHA</span><i /><b /></div><div className="tripCopy"><small>12 a 14 de setembro · 12 pessoas</small><h2>Serra em Movimento</h2><p>Dois dias entre Nova Petrópolis, Canela e Gramado: estradas, sabores e hospedagens que valem a viagem.</p><div><strong>A partir de R$ 1.490</strong><button onClick={() => alert("Fluxo de reserva demonstrativo. O pagamento será integrado na versão beta.")}>VER EXPEDIÇÃO</button></div></div></article><TitleRow title="O que está incluído" /><section className="dataCard"><DataRow label="Grupo" value="Até 12 pessoas" /><DataRow label="Hospedagem" value="Parceiros verificados" /><DataRow label="Navegação" value="Mapas offline" /><DataRow label="Suporte" value="Equipe Achei" /></section></div></div>;
}

function SocialTab({ recentRoute, points }: { recentRoute: string | null; points: number }) {
  const [view,setView]=useState<"feed"|"ranking">("feed"); const [liked,setLiked]=useState<string[]>([]); const [following,setFollowing]=useState(false);
  const posts=[{id:"ana",initials:"AM",name:"Ana Martins",level:"Desbravadora · Nv. 18",place:"Cambará do Sul",route:"Travessia dos Cânions",text:"Vento forte no trecho final, mas a sinalização estava perfeita. Água no km 11.",stats:"18,7 km · +510 m · 5h48",likes:128},{id:"leo",initials:"LR",name:"Leonardo Reis",level:"Explorador · Nv. 9",place:"Nova Petrópolis",route:"Rota das Araucárias",text:"Primeiro pedal longo concluído! O ponto de apoio da Linha Imperial salvou o dia.",stats:"39,6 km · +780 m · 3h36",likes:74}];
  const toggle=(id:string)=>setLiked(liked.includes(id)?liked.filter(x=>x!==id):[...liked,id]);
  return <div className="tabPage socialPage"><Header eyebrow="Comunidade Achei" title={<>A aventura<br/>continua aqui.</>} copy="Rotas reais, relatos úteis e conquistas verificadas por GPS."/><div className="socialTabs"><button className={view==="feed"?"active":""} onClick={()=>setView("feed")}>COMUNIDADE</button><button className={view==="ranking"?"active":""} onClick={()=>setView("ranking")}>RANKINGS</button></div><div className="pageContent socialContent">{view==="feed"?<><div className="stories">{[["FS","Você"],["AM","Ana"],["LR","Leo"],["CM","Clara"],["RB","Rafael"]].map((s,i)=><div key={s[1]}><i className={i===0?"you":""}>{s[0]}</i><small>{s[1]}</small></div>)}</div>{recentRoute&&<article className="newAchievement"><span>+100 PONTOS</span><h3>Nova conquista desbloqueada!</h3><p>Você concluiu {recentRoute}. A atividade foi adicionada ao seu Passaporte.</p></article>}<button className="shareBox">＋ Compartilhe uma rota, foto ou dica</button>{posts.map(p=><article className="socialPost" key={p.id}><header><i>{p.initials}</i><div><strong>{p.name}</strong><small>{p.level} · {p.place}</small></div>{p.id==="ana"&&<button onClick={()=>setFollowing(!following)}>{following?"Seguindo":"Seguir"}</button>}</header><div className={`postPhoto photo-${p.id}`}><span>✓ ATIVIDADE VERIFICADA</span><b>{p.route}</b></div><div className="postBody"><div className="postStats">⌖ {p.stats}</div><p><strong>{p.name.split(" ")[0]}</strong> {p.text}</p><div className="postActions"><button className={liked.includes(p.id)?"liked":""} onClick={()=>toggle(p.id)}>♥ {p.likes+(liked.includes(p.id)?1:0)}</button><button>◯ {p.id==="ana"?18:9}</button><button>↗ Compartilhar</button></div></div></article>)}</>:<Ranking points={points}/>}</div></div>;
}

function Ranking({points}:{points:number}) {
 const [kind,setKind]=useState<"sport"|"community"|"experience">("sport"); const lists={sport:[["1","AM","Ana Martins","1.842 km"],["2","RB","Rafael Bittencourt","1.506 km"],["12","FS","Fabiano","486 km"]],community:[["1","CM","Clara Melo","238 contribuições"],["2","AM","Ana Martins","194 contribuições"],["8","FS","Fabiano","72 contribuições"]],experience:[["1","LR","Leonardo Reis","28 destinos"],["2","CM","Clara Melo","24 destinos"],["15","FS","Fabiano","6 destinos"]]} as const;
 return <><div className="rankKinds"><button className={kind==="sport"?"active":""} onClick={()=>setKind("sport")}>ESPORTIVO</button><button className={kind==="community"?"active":""} onClick={()=>setKind("community")}>COMUNIDADE</button><button className={kind==="experience"?"active":""} onClick={()=>setKind("experience")}>EXPERIÊNCIAS</button></div><div className="rankHero"><small>SUA TEMPORADA</small><strong>{points} pontos</strong><p>Você está entre os 18% mais ativos da Serra Gaúcha.</p></div><div className="rankList">{lists[kind].map((u,i)=><div className={u[1]==="FS"?"me":""} key={u[1]}><b>{u[0]}</b><i>{u[1]}</i><span><strong>{u[2]}</strong><small>{i===0?"Lenda Achei":"Explorador em campo"}</small></span><em>{u[3]}</em></div>)}</div><p className="rankRule">Rankings contabilizam somente rotas por GPS, avaliações verificadas, reservas e check-ins confirmados.</p></>;
}

function ProfileTab({ onExplore, points, completed, recentRoute }: { onExplore: () => void; points:number; completed:number; recentRoute:string|null }) {
  const pct=Math.min(100,Math.round((points%1000)/10));
  return <div className="tabPage"><Header eyebrow="Passaporte Achei" title={<>Sua história,<br />em movimento.</>} copy="Tudo que você explorou, avaliou e viveu fica registrado aqui." /><div className="pageContent"><div className="passport"><div className="profileAvatar">FS<i>✓</i></div><div><h2>Fabiano</h2><p>@fabianoemcampo · desde 2026</p><Seal>Explorador em campo</Seal></div></div><div className="level"><strong>{points} pontos</strong><span>Próximo nível: Aventureiro</span><div><i style={{ width: `${pct}%` }} /></div><small>{1000-(points%1000)} pontos para o próximo nível</small></div><div className="profileNumbers"><div><strong>{completed}</strong><small>rotas</small></div><div><strong>486</strong><small>km</small></div><div><strong>6</strong><small>destinos</small></div><div><strong>7</strong><small>selos</small></div></div><TitleRow title="Seus selos" detail="Ver todos"/><div className="badges">{[["⌖","Primeira Rota"],["△","Serra Gaúcha"],["♧","Natureza"],["★","Avaliador"]].map(b=><div key={b[1]}><i>{b[0]}</i><small>{b[1]}</small></div>)}</div><TitleRow title="Histórico verificado" detail="Passaporte"/><div className="history"><article><i>✓</i><div><strong>{recentRoute||"Rota das Araucárias"}</strong><small>{recentRoute?"Concluída agora":"12 jul 2026"} · GPS verificado</small></div><b>+100</b></article><article><i>⌂</i><div><strong>Hotel Petrópolis</strong><small>Check-in confirmado · Nova Petrópolis</small></div><b>+30</b></article><article><i>★</i><div><strong>Casa do Colono</strong><small>Avaliação útil · 4,8 estrelas</small></div><b>+20</b></article></div><button className="solidButton" onClick={onExplore}>ENCONTRAR NOVAS AVENTURAS</button></div></div>;
}

function EcosystemHub({onClose}:{onClose:()=>void}) {
  const [area,setArea]=useState<"premium"|"guardian"|"challenge"|"business">("premium"); const [guardian,setGuardian]=useState(false); const [joined,setJoined]=useState(false);
  return <div className="hubShade"><section className="hub"><header><button onClick={onClose}>‹</button><Brand/><span>ECOSSISTEMA</span></header><nav>{[["premium","Premium"],["guardian","Guardião"],["challenge","Desafios"],["business","Negócios"]].map(x=><button key={x[0]} className={area===x[0]?"active":""} onClick={()=>setArea(x[0] as typeof area)}>{x[1]}</button>)}</nav><div className="hubBody">
    {area==="premium"&&<><span className="hubKicker">ACHEI PREMIUM</span><h1>Aventura completa,<br/>dentro e fora do sinal.</h1><p className="hubLead">Rotas offline, GPS veicular, Copiloto, Guardião e vantagens em parceiros.</p><div className="price"><strong>R$ 19,90</strong><small>/mês</small><span>ou R$ 179/ano</span></div><div className="benefits">{["Mapas e rotas offline ilimitados","Copiloto com briefing e checklist","Modo Guardião para familiares","Descontos em parceiros verificados","Histórico e Passaporte completos"].map(x=><p key={x}><b>✓</b>{x}</p>)}</div><button className="hubPrimary" onClick={()=>alert("Fluxo de assinatura demonstrativo.")}>TESTAR 7 DIAS GRÁTIS</button><button className="dayPass">PASSE DE VIAGEM · 7 DIAS · R$ 29,90</button></>}
    {area==="guardian"&&<><span className="hubKicker">MODO GUARDIÃO</span><h1>Alguém acompanha.<br/>Você explora.</h1><p className="hubLead">Compartilhe o plano, horário de retorno e último ponto sincronizado.</p><div className={`guardianMap ${guardian?"active":""}`}><i>▲</i><span>Rota das Araucárias</span><b>{guardian?"COMPARTILHAMENTO ATIVO":"PRONTO PARA ATIVAR"}</b></div><section className="guardianInfo"><DataRow label="Guardião" value="Cristiane · WhatsApp"/><DataRow label="Saída prevista" value="08:00"/><DataRow label="Retorno previsto" value="12:30"/><DataRow label="Alerta de atraso" value="30 minutos"/></section><button className="hubPrimary" onClick={()=>setGuardian(!guardian)}>{guardian?"✓ GUARDIÃO ATIVADO":"ATIVAR E COMPARTILHAR"}</button><small className="safetyCopy">Recurso de apoio. Não substitui serviços profissionais de emergência.</small></>}
    {area==="challenge"&&<><span className="hubKicker">TEMPORADA DE INVERNO</span><h1>Explore. Complete.<br/>Desbloqueie.</h1><p className="hubLead">Desafios transformam destinos em jornadas e geram benefícios reais.</p><article className="challengeCard"><span>DESAFIO PATROCINADO</span><h2>Circuito das Araucárias</h2><p>Complete 3 rotas em Nova Petrópolis até 30 de setembro.</p><div className="challengeProgress"><i style={{width:joined?"34%":"0%"}}/></div><small>{joined?"1 de 3 rotas concluídas":"Prêmio: selo + café colonial para 2"}</small></article><div className="rewardGrid"><div><b>500</b><small>pontos extras</small></div><div><b>12</b><small>parceiros</small></div><div><b>286</b><small>participantes</small></div></div><button className="hubPrimary" onClick={()=>setJoined(true)}>{joined?"✓ DESAFIO INICIADO":"PARTICIPAR DO DESAFIO"}</button></>}
    {area==="business"&&<><span className="hubKicker">DESTINO INTELIGENTE</span><h1>O turismo visto<br/>em movimento.</h1><p className="hubLead">Demonstração do painel para parceiros, associações e gestores públicos.</p><div className="dashNumbers"><div><small>AVENTUREIROS</small><strong>1.284</strong><span>+18% no mês</span></div><div><small>CHECK-INS</small><strong>836</strong><span>65% conversão</span></div></div><div className="flowChart"><span>Fluxo semanal</span>{[42,58,47,76,91,84,64].map((h,i)=><i key={i} style={{height:`${h}%`}}/>)}</div><section className="guardianInfo"><DataRow label="Rota mais acessada" value="Araucárias"/><DataRow label="Permanência média" value="2,4 dias"/><DataRow label="Avaliação do destino" value="4,8 ★"/><DataRow label="Receita atribuída" value="R$ 86 mil"/></section><button className="hubPrimary" onClick={()=>alert("Solicitação de demonstração registrada.")}>SOLICITAR APRESENTAÇÃO B2B</button></>}
  </div></section></div>;
}

function TitleRow({ title, detail }: { title: string; detail?: string }) { return <div className="titleRow"><h2>{title}</h2>{detail && <span>{detail}</span>}</div>; }
function DataRow({ label, value }: { label: string; value: string }) { return <div className="dataRow"><span>{label}</span><strong>{value}</strong></div>; }

function BottomNav({ active, onGo }: { active: Tab; onGo: (tab: Tab) => void }) {
  const items: [Tab, string, string][] = [["home", "⌂", "Início"], ["map", "⌖", "Mapa"], ["explore", "◇", "Explorar"], ["social", "♧", "Social"], ["trips", "✦", "Trips"], ["profile", "◉", "Perfil"]];
  return <nav className="bottomNav" aria-label="Navegação principal">{items.map(([id, icon, label]) => <button key={id} className={active === id ? "active" : ""} onClick={() => onGo(id)}><span>{icon}</span><small>{label}</small></button>)}</nav>;
}

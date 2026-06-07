import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  ArrowRight,
  Award,
  CalendarDays,
  ChevronRight,
  Disc3,
  Feather,
  Heart,
  Instagram,
  Mail,
  MapPin,
  Mic2,
  Menu,
  Music4,
  Pause,
  Play,
  Send,
  Sparkles,
  Star,
  Ticket,
  Users,
  Youtube,
  X,
} from 'lucide-react';

const tracks = [
  {
    title: 'Lambafor do Coração',
    tag: 'Hit de abertura do show',
    mood: 'Romântico e dançante',
    bpm: 130,
    duration: '2:45',
    notes: [
      { note: 'E4', dur: 0.22 }, { note: 'A4', dur: 0.22 }, { note: 'C5', dur: 0.22 }, { note: 'B4', dur: 0.42 },
      { note: 'A4', dur: 0.22 }, { note: 'B4', dur: 0.22 }, { note: 'C5', dur: 0.22 }, { note: 'A4', dur: 0.56 },
      { note: 'D5', dur: 0.22 }, { note: 'F5', dur: 0.22 }, { note: 'E5', dur: 0.42 }, { note: 'D5', dur: 0.22 },
      { note: 'C5', dur: 0.22 }, { note: 'B4', dur: 0.22 }, { note: 'A4', dur: 0.76 },
    ],
    lyrics: 'Vem no balanço que o corpo quer ver\nO Lambafor que eu fiz pra você\nBate o tambor, sanfona chorou\nA Bahia inteira já se apaixonou!',
    chords: 'Intro: Am | Dm | G | C\nVerso: Am | Dm | F | E7\nRefrão: F | G | C | Am (x2)',
    concept: 'Uma fusão eletrizante entre lambada, forró e axé, pensada para abrir shows com energia alta e coro em uníssono.',
  },
  {
    title: 'Brilho de Salvador',
    tag: 'Canção de repertório autoral',
    mood: 'Poética e luminosa',
    bpm: 112,
    duration: '3:10',
    notes: [
      { note: 'G4', dur: 0.3 }, { note: 'C5', dur: 0.3 }, { note: 'E5', dur: 0.3 }, { note: 'D5', dur: 0.6 },
      { note: 'C5', dur: 0.3 }, { note: 'D5', dur: 0.3 }, { note: 'E5', dur: 0.3 }, { note: 'C5', dur: 0.8 },
      { note: 'F5', dur: 0.3 }, { note: 'E5', dur: 0.3 }, { note: 'D5', dur: 0.6 }, { note: 'C5', dur: 0.3 },
      { note: 'B4', dur: 0.3 }, { note: 'A4', dur: 0.3 }, { note: 'G4', dur: 0.8 },
    ],
    lyrics: 'O sol de Salvador brilha mais forte no Bonfim\nE a brisa do Farol traz você perto de mim\nNo Pelô tem tambor, tem axé, tem amor\nSana canta a poesia que a Bahia consagrou!',
    chords: 'Intro: C | G | Am | F\nVerso: C | Em | F | G\nRefrão: C | G | Am | F (x2)',
    concept: 'Homenagem à capital baiana, com versos que misturam paisagem, afeto e tradição musical.',
  },
  {
    title: 'Pena Colorida',
    tag: 'Símbolo da composição',
    mood: 'Intimista e inspiradora',
    bpm: 95,
    duration: '3:30',
    notes: [
      { note: 'A4', dur: 0.4 }, { note: 'D5', dur: 0.4 }, { note: 'F5', dur: 0.4 }, { note: 'E5', dur: 0.6 },
      { note: 'D5', dur: 0.4 }, { note: 'C#5', dur: 0.4 }, { note: 'D5', dur: 0.4 }, { note: 'E5', dur: 0.8 },
      { note: 'F5', dur: 0.4 }, { note: 'E5', dur: 0.4 }, { note: 'D5', dur: 0.4 }, { note: 'C5', dur: 0.4 },
      { note: 'B4', dur: 0.4 }, { note: 'A4', dur: 0.4 }, { note: 'G#4', dur: 0.4 }, { note: 'A4', dur: 1.0 },
    ],
    lyrics: 'Com minha pena colorida eu escrevo meu destino\nTraço os acordes num compasso nordestino\nNotas de arco-íris flutuando pelo ar\nCada verso é uma prece para o povo festejar.',
    chords: 'Intro: Dm | Am | E7 | Am\nVerso: Dm | G | C | F | Dm | E7 | Am\nRefrão: Am | Dm | G | C | F | E7 | Am (x2)',
    concept: 'Faixa-manifesto sobre autoria, identidade e o poder de transformar experiência em canção.',
  },
];

const events = [
  {
    title: 'Lançamento oficial do Estilo Lambafor',
    city: 'Salvador, BA',
    venue: 'Concha Acústica do TCA',
    date: '12 Jun 2026',
    time: '19:00',
    status: 'Ingressos voando',
  },
  {
    title: 'Festival das Cores da Bahia',
    city: 'Porto Seguro, BA',
    venue: 'Arena Axé Moi',
    date: '04 Jul 2026',
    time: '21:00',
    status: 'Últimos lugares',
  },
  {
    title: 'Noite da Caneta de Ouro',
    city: 'Salvador, BA',
    venue: 'Teatro Vila Velha',
    date: '18 Jul 2026',
    time: '20:00',
    status: 'Show intimista',
  },
  {
    title: 'Micareta Lambafor Fest',
    city: 'Salvador, BA',
    venue: 'Barra-Ondina',
    date: '08 Ago 2026',
    time: '16:00',
    status: 'Em breve',
  },
];

const coWritten = [
  { title: 'Dendê no Asfalto', artist: 'Banda Cheiro de Bahia', year: '2024', plays: '2,4M' },
  { title: 'Sereia do Porto', artist: 'Bloco Ondina', year: '2025', plays: '1,8M' },
  { title: 'Sanfona Eletrizante', artist: 'Forró Pipoca', year: '2025', plays: '3,1M' },
];

const notes = {
  G4: 392.0,
  GSharp4: 415.3,
  A4: 440.0,
  ASharp4: 466.16,
  B4: 493.88,
  C5: 523.25,
  CSharp5: 554.37,
  D5: 587.33,
  DSharp5: 622.25,
  E5: 659.25,
  F5: 698.46,
  FSharp5: 739.99,
};

const noteToFreq = (note) => notes[note.replace('#', 'Sharp')] ?? 440;

function formatCountdown(targetDate) {
  const total = targetDate - new Date();
  const days = Math.max(0, Math.floor(total / 86400000));
  const hours = Math.max(0, Math.floor((total % 86400000) / 3600000));
  const minutes = Math.max(0, Math.floor((total % 3600000) / 60000));
  return { days, hours, minutes };
}

function useCountdown(targetDate) {
  const [value, setValue] = useState(() => formatCountdown(targetDate));

  useEffect(() => {
    const timer = window.setInterval(() => setValue(formatCountdown(targetDate)), 60000);
    return () => window.clearInterval(timer);
  }, [targetDate]);

  return value;
}

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeTrack, setActiveTrack] = useState(0);
  const [tab, setTab] = useState('letra');
  const [playing, setPlaying] = useState(false);
  const playingRef = useRef(false);
  const [visualizer, setVisualizer] = useState([18, 24, 36, 48, 30, 66, 42, 18]);
  const [noteLabel, setNoteLabel] = useState('');
  const [bookingOpen, setBookingOpen] = useState(false);
  const [ticketOpen, setTicketOpen] = useState(null);
  const [compositionOpen, setCompositionOpen] = useState(false);
  const [submitted, setSubmitted] = useState({ contact: false, booking: false, composition: false, ticket: false });

  const audioContextRef = useRef(null);
  const nextNoteTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const countdown = useCountdown(new Date('2026-06-12T19:00:00-03:00'));
  const currentTrack = tracks[activeTrack];

  useEffect(() => {
    if (!playing) {
      setVisualizer([18, 24, 36, 48, 30, 66, 42, 18]);
      setNoteLabel('');
      return undefined;
    }

    const tick = () => {
      setVisualizer((prev) => prev.map(() => 14 + Math.floor(Math.random() * 68)));
      rafRef.current = window.requestAnimationFrame(tick);
    };

    rafRef.current = window.requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current);
    };
  }, [playing]);

  useEffect(() => {
    setPlaying(false);
    playingRef.current = false;
    setNoteLabel('');
    if (nextNoteTimeoutRef.current) window.clearTimeout(nextNoteTimeoutRef.current);
  }, [activeTrack]);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMenuOpen(false);
  };

  const stopPlayback = () => {
    setPlaying(false);
    playingRef.current = false;
    if (nextNoteTimeoutRef.current) window.clearTimeout(nextNoteTimeoutRef.current);
    nextNoteTimeoutRef.current = null;
    setNoteLabel('');
  };

  const playMelody = () => {
    if (playing) {
      stopPlayback();
      return;
    }

    setPlaying(true);
    playingRef.current = true;

    if (!audioContextRef.current) {
      audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
    }

    const ctx = audioContextRef.current;
    if (ctx.state === 'suspended') {
      ctx.resume();
    }

    const melody = currentTrack.notes;
    let index = 0;

    const playNext = () => {
      if (!playingRef.current) {
        stopPlayback();
        return;
      }

      const current = melody[index % melody.length];
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();

      const freq = noteToFreq(current.note);
      setNoteLabel(current.note);

      filter.type = 'lowpass';
      filter.frequency.setValueAtTime(1100, ctx.currentTime);
      filter.frequency.exponentialRampToValueAtTime(340, ctx.currentTime + current.dur);

      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      gain.gain.setValueAtTime(0.0001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.22, ctx.currentTime + 0.03);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + current.dur);

      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);

      if (index % 2 === 0) {
        const bass = ctx.createOscillator();
        const bassGain = ctx.createGain();
        bass.type = 'sine';
        bass.frequency.setValueAtTime(freq / 2, ctx.currentTime);
        bassGain.gain.setValueAtTime(0.0001, ctx.currentTime);
        bassGain.gain.linearRampToValueAtTime(0.08, ctx.currentTime + 0.02);
        bassGain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + current.dur);
        bass.connect(bassGain);
        bassGain.connect(ctx.destination);
        bass.start();
        bass.stop(ctx.currentTime + current.dur);
      }

      osc.start();
      osc.stop(ctx.currentTime + current.dur);
      index += 1;
      nextNoteTimeoutRef.current = window.setTimeout(playNext, current.dur * 1000 + 30);
    };

    playNext();
  };

  const handleSubmit = (key) => (event) => {
    event.preventDefault();
    setSubmitted((prev) => ({ ...prev, [key]: true }));
  };

  return (
    <div className="app-shell">
      <div className="bg-orb orb-a" />
      <div className="bg-orb orb-b" />
      <div className="bg-orb orb-c" />

      <header className="topbar">
        <div className="container topbar__inner">
          <button className="brand" onClick={() => scrollTo('inicio')} aria-label="Voltar ao topo">
            <img
              src="/img/logo%20menor.jpg"
              alt="Logo Sana Saily"
              onError={(event) => {
                event.currentTarget.style.display = 'none';
              }}
            />
            <span>
              <strong>Sana Saily</strong>
              <small>Estilo Lambafor</small>
            </span>
          </button>

          <nav className="desktop-nav">
            <button onClick={() => scrollTo('sobre')}>Sobre</button>
            <button onClick={() => scrollTo('musicas')}>Músicas</button>
            <button onClick={() => scrollTo('agenda')}>Agenda</button>
            <button onClick={() => scrollTo('galeria')}>Galeria</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
          </nav>

          <div className="topbar__actions">
            <button className="ghost-button" onClick={() => setBookingOpen(true)}>
              Contratar show
            </button>
            <button className="icon-button" onClick={() => setMenuOpen((value) => !value)} aria-label="Abrir menu">
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {menuOpen ? (
          <div className="mobile-nav container">
            <button onClick={() => scrollTo('sobre')}>Sobre</button>
            <button onClick={() => scrollTo('musicas')}>Músicas</button>
            <button onClick={() => scrollTo('agenda')}>Agenda</button>
            <button onClick={() => scrollTo('galeria')}>Galeria</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
          </div>
        ) : null}
      </header>

      <main>
        <section id="inicio" className="hero section">
          <div className="container hero__grid">
            <div className="hero__copy">
              <span className="eyebrow">
                <Sparkles size={16} />
                Cantora, compositora e presença de palco
              </span>
              <h1>
                A energia de Sana Saily em um portal vibrante para eventos, músicas e composições.
              </h1>
              <p>
                Um site premium para divulgar shows, apresentar repertório autoral, destacar a força da composição e reunir fotos, vídeos e contatos de contratação.
              </p>
              <div className="hero__actions">
                <button className="primary-button" onClick={() => scrollTo('musicas')}>
                  Ver músicas <ArrowRight size={18} />
                </button>
                <button className="secondary-button" onClick={() => scrollTo('agenda')}>
                  Agenda de eventos <ChevronRight size={18} />
                </button>
              </div>
              <div className="hero__meta">
                <div>
                  <strong>{tracks.length}</strong>
                  <span>faixas autorais</span>
                </div>
                <div>
                  <strong>4</strong>
                  <span>eventos em destaque</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>feito para a marca</span>
                </div>
              </div>
            </div>

            <div className="hero__visual">
              <div className="hero-card">
                <img
                  src="/img/logo.jpg"
                  alt="Imagem oficial de Sana Saily"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <div className="hero-card__fallback">
                  <div className="hero-card__badge">Lambafor</div>
                  <h2>Sana Saily</h2>
                  <p>Palco, composição e imagem em um só lugar.</p>
                </div>
              </div>
              <div className="hero-pills">
                <span><Music4 size={14} /> Repertório ao vivo</span>
                <span><CalendarDays size={14} /> Eventos abertos</span>
                <span><Ticket size={14} /> Contratação</span>
              </div>
            </div>
          </div>
        </section>

        <section id="sobre" className="section section--soft">
          <div className="container">

            {/* ── Bio principal ── */}
            <div className="inst-bio-layout">
              <div className="inst-bio__photo">
                <div className="inst-photo-card">
                  <img
                    src="/img/logo.jpg"
                    alt="Sana Saily"
                    onError={(e) => { e.currentTarget.style.display = 'none'; }}
                  />
                  <div className="inst-photo-card__fallback">
                    <div className="hero-card__badge">Lambafor</div>
                    <span>Sana Saily</span>
                  </div>
                </div>
                <div className="inst-social-strip">
                  <a href="https://instagram.com" target="_blank" rel="noreferrer" className="inst-social-pill">
                    <Instagram size={15} /> Instagram
                  </a>
                  <a href="https://youtube.com" target="_blank" rel="noreferrer" className="inst-social-pill">
                    <Youtube size={15} /> YouTube
                  </a>
                </div>
              </div>

              <div className="inst-bio__copy">
                <span className="eyebrow"><Mic2 size={16} /> Quem é Sana Saily</span>
                <h2>Cantora, compositora e criadora do Estilo Lambafor.</h2>
                <p>
                  Nascida e criada no coração da Bahia, Sana Saily é uma força da natureza que uniu três
                  ritmos fundadores — lambada, forró e axé — e deu nome ao que o povo já sentia nas festas
                  de Salvador: o <strong style={{ color: 'var(--gold)' }}>Estilo Lambafor</strong>.
                  Uma cantora que move multidões, uma compositora que escreve histórias para outros artistas
                  e uma presença de palco que não se esquece.
                </p>
                <p>
                  Além do próprio repertório, sua caneta já assinou faixas gravadas por nomes reconhecidos
                  do cenário baiano, acumulando mais de 7 milhões de plays em plataformas digitais.
                </p>
                <div className="inst-bio__tags">
                  <span><Mic2 size={13} /> Cantora</span>
                  <span><Feather size={13} /> Compositora</span>
                  <span><MapPin size={13} /> Salvador, BA</span>
                  <span><Star size={13} /> Estilo Lambafor</span>
                </div>
              </div>
            </div>

            {/* ── Banner Estilo Lambafor ── */}
            <div className="inst-genre-banner">
              <div className="inst-genre-banner__left">
                <span className="eyebrow"><Disc3 size={16} /> Identidade musical</span>
                <h3>O que é o Estilo Lambafor?</h3>
                <p>
                  Lambafor não é apenas um ritmo — é um movimento cultural que nasce da Bahia e fala ao
                  corpo e à alma. A cadência sensual da <em>lambada</em>, o balanço pulsante do <em>forró</em>{' '}
                  e a vibração coletiva do <em>axé</em> se fundem em arranjos ao vivo, coreografias e uma
                  energia que convida todo o público a dançar. Sana Saily é a voz e a autora que deu forma
                  a esse conceito.
                </p>
              </div>
              <div className="inst-genre-banner__pills">
                <div className="inst-genre-pill inst-genre-pill--lambada">
                  <strong>Lambada</strong>
                  <span>cadência e sensualidade</span>
                </div>
                <div className="inst-genre-pill__plus">+</div>
                <div className="inst-genre-pill inst-genre-pill--forro">
                  <strong>Forró</strong>
                  <span>balanço nordestino</span>
                </div>
                <div className="inst-genre-pill__plus">+</div>
                <div className="inst-genre-pill inst-genre-pill--axe">
                  <strong>Axé</strong>
                  <span>vibração coletiva</span>
                </div>
                <div className="inst-genre-pill__equals">=</div>
                <div className="inst-genre-pill inst-genre-pill--lambafor">
                  <strong>Lambafor</strong>
                  <span>identidade única</span>
                </div>
              </div>
            </div>

            {/* ── Trajetória ── */}
            <div className="inst-timeline">
              <div className="section-head">
                <span className="eyebrow"><Award size={16} /> Trajetória</span>
                <h3>Uma história que começa em Salvador e vai além.</h3>
              </div>
              <div className="inst-timeline__track">
                {[
                  { year: '2020', label: 'Primeiras composições', desc: 'Início da trajetória autoral pelas ruas e palcos de Salvador.' },
                  { year: '2022', label: 'Dendê no Asfalto', desc: 'Primeira composição gravada por terceiros: Banda Cheiro de Bahia.' },
                  { year: '2023', label: 'Estilo Lambafor', desc: 'Criação formal do conceito musical que une lambada, forró e axé.' },
                  { year: '2024', label: '7M+ plays', desc: 'Três faixas de parceiros lançadas, acumulando mais de 7 milhões de streams.' },
                  { year: '2025', label: 'Expansão regional', desc: 'Shows em teatros de referência e festivais do Nordeste.' },
                  { year: '2026', label: 'Lançamento do álbum', desc: 'Estreia oficial na Concha Acústica do TCA, em Salvador.' },
                ].map((item) => (
                  <div key={item.year} className="inst-timeline__item">
                    <div className="inst-timeline__dot" />
                    <div className="inst-timeline__content">
                      <em>{item.year}</em>
                      <strong>{item.label}</strong>
                      <span>{item.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* ── Números ── */}
            <div className="inst-stats">
              {[
                { value: '7,3M+', label: 'plays em composições para parceiros', icon: <Music4 size={20} /> },
                { value: '3', label: 'composições gravadas por outros artistas', icon: <Feather size={20} /> },
                { value: '4+', label: 'shows confirmados em 2026', icon: <CalendarDays size={20} /> },
                { value: '100%', label: 'repertório original e autoral', icon: <Star size={20} /> },
              ].map((stat) => (
                <div key={stat.label} className="inst-stat">
                  <div className="inst-stat__icon">{stat.icon}</div>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </div>
              ))}
            </div>

            {/* ── Serviços ── */}
            <div className="inst-services">
              <div className="section-head" style={{ textAlign: 'center' }}>
                <span className="eyebrow"><Heart size={16} /> O que Sana oferece</span>
                <h3>Do palco à caneta — uma artista completa.</h3>
              </div>
              <div className="inst-services__grid">
                <article>
                  <div className="inst-service__icon"><Mic2 size={22} /></div>
                  <strong>Shows ao vivo</strong>
                  <p>
                    Apresentações com repertório autoral, banda ao vivo, coreografia e energia que
                    transforma qualquer palco em festa baiana. Festivais, casas de show, eventos corporativos e carnaval.
                  </p>
                  <button className="secondary-button" style={{ marginTop: 'auto' }} onClick={() => setBookingOpen(true)}>
                    Contratar show <ChevronRight size={15} />
                  </button>
                </article>
                <article className="inst-services__featured">
                  <div className="inst-service__icon inst-service__icon--gold"><Feather size={22} /></div>
                  <strong>Composição personalizada</strong>
                  <p>
                    Sana assina músicas inéditas para artistas, bandas, projetos e marcas. Cada canção é
                    criada com tema, emoção e estilo definidos em briefing — uma experiência única do início ao fim.
                  </p>
                  <button className="primary-button" style={{ marginTop: 'auto' }} onClick={() => setCompositionOpen(true)}>
                    Encomendar composição <ArrowRight size={15} />
                  </button>
                </article>
                <article>
                  <div className="inst-service__icon"><Users size={22} /></div>
                  <strong>Parcerias e imprensa</strong>
                  <p>
                    Projetos de co-criação musical, parcerias com festivais regionais, ações de marca e
                    atendimento a jornalistas e veículos de comunicação.
                  </p>
                  <button className="secondary-button" style={{ marginTop: 'auto' }} onClick={() => scrollTo('contato')}>
                    Falar com a equipe <ChevronRight size={15} />
                  </button>
                </article>
              </div>
            </div>

          </div>
        </section>

        <section id="musicas" className="section">
          <div className="container music-layout">
            <div className="section-head">
              <span className="eyebrow"><Music4 size={16} /> Central de músicas</span>
              <h2>Ouça a melodia, leia a letra e navegue pelo conceito de cada faixa.</h2>
              <p>O player abaixo sintetiza um trecho instrumental simples no navegador para dar vida ao repertório.</p>
            </div>

            <div className="music-layout__grid">
              <aside className="track-list">
                {tracks.map((track, index) => (
                  <button
                    key={track.title}
                    className={index === activeTrack ? 'track track--active' : 'track'}
                    onClick={() => setActiveTrack(index)}
                  >
                    <strong>{track.title}</strong>
                    <span>{track.tag}</span>
                    <small>{track.duration} · {track.bpm} BPM</small>
                  </button>
                ))}
              </aside>

              <article className="player-panel">
                <div className="player-panel__top">
                  <div>
                    <span className="muted">Faixa selecionada</span>
                    <h3>{currentTrack.title}</h3>
                    <p>{currentTrack.mood}</p>
                  </div>
                  <button className="play-button" onClick={playMelody}>
                    {playing ? <Pause size={18} /> : <Play size={18} />}
                    {playing ? 'Pausar' : 'Ouvir melodia'}
                  </button>
                </div>

                <div className="visualizer" aria-label="Visualizador de áudio">
                  {visualizer.map((height, index) => (
                    <span key={index} style={{ height: `${height}%` }} />
                  ))}
                </div>
                <div className="now-playing">
                  <span>Nota atual</span>
                  <strong>{noteLabel || 'parado'}</strong>
                </div>

                <div className="tab-nav">
                  <button className={tab === 'letra' ? 'tab active' : 'tab'} onClick={() => setTab('letra')}>Letra</button>
                  <button className={tab === 'cifras' ? 'tab active' : 'tab'} onClick={() => setTab('cifras')}>Cifras</button>
                  <button className={tab === 'conceito' ? 'tab active' : 'tab'} onClick={() => setTab('conceito')}>Conceito</button>
                </div>

                <div className="tab-panel">
                  {tab === 'letra' ? <pre>{currentTrack.lyrics}</pre> : null}
                  {tab === 'cifras' ? <pre>{currentTrack.chords}</pre> : null}
                  {tab === 'conceito' ? <p>{currentTrack.concept}</p> : null}
                </div>
              </article>
            </div>
          </div>
        </section>

        <section id="agenda" className="section section--soft">
          <div className="container">
            <div className="section-head section-head--row">
              <div>
                <span className="eyebrow"><CalendarDays size={16} /> Agenda oficial</span>
                <h2>Eventos, lançamentos e apresentações ao vivo.</h2>
              </div>
              <div className="countdown">
                <span>Próximo show em</span>
                <strong>{countdown.days}d {countdown.hours}h {countdown.minutes}m</strong>
              </div>
            </div>

            <div className="events-grid">
              {events.map((event) => (
                <article key={event.title} className="event-card">
                  <div className="event-card__header">
                    <span>{event.date}</span>
                    <em>{event.status}</em>
                  </div>
                  <h3>{event.title}</h3>
                  <p>{event.venue}</p>
                  <small>{event.city} · Início {event.time}</small>
                  <button onClick={() => setTicketOpen(event)}>
                    Garantir ingresso <ChevronRight size={16} />
                  </button>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section id="galeria" className="section">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><Sparkles size={16} /> Galeria</span>
              <h2>Uma vitrine visual para fotos, ensaios e bastidores.</h2>
            </div>

            <div className="gallery-grid">
              <div className="gallery-card gallery-card--image">
                <img
                  src="/img/logo.jpg"
                  alt="Imagem de destaque"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <span>Imagem oficial para divulgação</span>
              </div>
              <div className="gallery-card gallery-card--image">
                <video
                  controls
                  preload="metadata"
                  src="/video/Propaganda%20Bumbum%20de%20a%C3%A7ucar%20CLIP.mp4"
                >
                  Seu navegador não suporta vídeo.
                </video>
                <span>Clipe oficial · Propaganda Bumbum de açucar</span>
              </div>
              <div className="gallery-card gallery-card--image">
                <img
                  src="/img/logo%20menor.jpg"
                  alt="Logo oficial"
                  onError={(event) => {
                    event.currentTarget.style.display = 'none';
                  }}
                />
                <span>Identidade visual da artista</span>
              </div>
              <div className="gallery-card gallery-card--audio">
                <strong>Faixa oficial</strong>
                <span>SANA SAILY - BUMBUM DE ACUCAR</span>
                <audio controls preload="metadata" src="/music/SANA%20SAILY%20-%20BUMBUM%20DE%20ACUCAR%20BXK3U2300037.mp3">
                  Seu navegador não suporta áudio.
                </audio>
              </div>
            </div>

            <div className="co-written">
              <h3>Composições gravadas por outros artistas</h3>
              <div>
                {coWritten.map((item) => (
                  <article key={item.title}>
                    <strong>{item.title}</strong>
                    <span>{item.artist} · {item.year}</span>
                    <small>{item.plays} plays</small>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section id="contato" className="section section--soft">
          <div className="container contact-layout">
            <div>
              <span className="eyebrow"><Mail size={16} /> Contato e contratação</span>
              <h2>Leve Sana Saily para o seu evento ou encomende uma composição inédita.</h2>
              <p>
                O formulário abaixo fecha a experiência do site e organiza pedidos de show, parceria, imprensa e composição personalizada.
              </p>
              <div className="contact-cards">
                <article>
                  <strong>Salvador, Bahia</strong>
                  <span><MapPin size={14} /> base de operações</span>
                </article>
                <article>
                  <strong>contato@sanasaily.com.br</strong>
                  <span><Mail size={14} /> comercial e imprensa</span>
                </article>
              </div>
            </div>

            <form className="contact-form" onSubmit={handleSubmit('contact')}>
              <div className="form-grid">
                <label>
                  Nome
                  <input type="text" placeholder="Seu nome ou produtor" required />
                </label>
                <label>
                  E-mail
                  <input type="email" placeholder="voce@empresa.com" required />
                </label>
              </div>
              <label>
                Objetivo
                <select defaultValue="show">
                  <option value="show">Contratar show</option>
                  <option value="composition">Encomendar composição</option>
                  <option value="press">Imprensa / parceria</option>
                </select>
              </label>
              <label>
                Mensagem
                <textarea rows="5" placeholder="Descreva data, cidade e o que você precisa." required />
              </label>
              <button className="primary-button" type="submit">
                Enviar proposta <Send size={18} />
              </button>
              {submitted.contact ? <p className="success-box">Mensagem enviada com sucesso. A equipe pode integrar isso ao backend depois.</p> : null}
            </form>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer__inner">
          <div>
            <strong>Sana Saily</strong>
            <span>Estilo Lambafor · cantora e compositora</span>
          </div>
          <div className="footer__links">
            <a href="https://instagram.com" target="_blank" rel="noreferrer"><Instagram size={18} /></a>
            <a href="https://youtube.com" target="_blank" rel="noreferrer"><Youtube size={18} /></a>
            <button onClick={() => scrollTo('inicio')}>
              Topo <ChevronRight size={16} />
            </button>
          </div>
        </div>
      </footer>

      {bookingOpen ? (
        <Modal title="Contratar show" onClose={() => setBookingOpen(false)}>
          <form className="modal-form" onSubmit={handleSubmit('booking')}>
            <input placeholder="Nome do contratante" required />
            <input placeholder="E-mail" type="email" required />
            <input placeholder="Data do evento" required />
            <textarea rows="4" placeholder="Cidade, formato e observações" required />
            <button className="primary-button" type="submit">Enviar solicitação</button>
            {submitted.booking ? <p className="success-box">Pedido enviado. Pode ser ligado a um backend depois.</p> : null}
          </form>
        </Modal>
      ) : null}

      {ticketOpen ? (
        <Modal title={ticketOpen.title} onClose={() => setTicketOpen(null)}>
          <form className="modal-form" onSubmit={handleSubmit('ticket')}>
            <p>{ticketOpen.venue} · {ticketOpen.city}</p>
            <input placeholder="Nome completo" required />
            <input placeholder="E-mail" type="email" required />
            <select defaultValue="1">
              <option value="1">1 ingresso</option>
              <option value="2">2 ingressos</option>
              <option value="4">4 ingressos</option>
            </select>
            <button className="primary-button" type="submit">Confirmar pré-reserva</button>
            {submitted.ticket ? <p className="success-box">Pré-reserva registrada.</p> : null}
          </form>
        </Modal>
      ) : null}

      {compositionOpen ? (
        <Modal title="Encomendar composição" onClose={() => setCompositionOpen(false)}>
          <form className="modal-form" onSubmit={handleSubmit('composition')}>
            <input placeholder="Nome do artista ou banda" required />
            <input placeholder="E-mail" type="email" required />
            <textarea rows="4" placeholder="Tema, emoção e estilo musical" required />
            <button className="primary-button" type="submit">Iniciar briefing</button>
            {submitted.composition ? <p className="success-box">Briefing enviado com sucesso.</p> : null}
          </form>
        </Modal>
      ) : null}

      <button className="floating-cta" onClick={() => setCompositionOpen(true)}>
        Encomendar música
      </button>
    </div>
  );
}

function Modal({ title, onClose, children }) {
  return (
    <div className="modal-overlay" role="dialog" aria-modal="true" aria-label={title}>
      <div className="modal-card">
        <button className="modal-close" onClick={onClose} aria-label="Fechar modal">
          <X size={18} />
        </button>
        <span className="eyebrow"><Ticket size={16} /> {title}</span>
        <div className="modal-body">{children}</div>
      </div>
    </div>
  );
}

export default App;

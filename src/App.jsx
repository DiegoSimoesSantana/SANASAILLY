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
  Plus,
  Trash2,
  UploadCloud,
  Lock,
  ArrowLeft,
  Printer,
  FileText,
  Download,
  ExternalLink,
  Copy,
  Check,
  Video,
  FolderOpen,
  Newspaper,
  ShieldCheck,
  CheckCircle2,
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
  const [coverIndex, setCoverIndex] = useState(0);
  const [activeAudioVersion, setActiveAudioVersion] = useState(0);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedRelease, setCopiedRelease] = useState(false);
  const driveLink = 'https://drive.google.com/drive/folders/1SanaSaily-MaterialAudiovisual-CarnavalPelo2027?usp=sharing';
  const youtubeLink = 'https://www.youtube.com/@sanasaillyoficial';

  const copyAudiovisualLinks = () => {
    const textToCopy = `MATERIAL AUDIOVISUAL OFICIAL - SANA SAILY (CARNAVAL DO PELÔ 2027)\n\n` +
      `1. Pasta Pública no Google Drive (Acesso Livre):\n${driveLink}\n\n` +
      `2. Portal Oficial com Reprodutores na Íntegra:\nhttps://sanasailly.com.br/#audiovisual\n\n` +
      `3. Canal Oficial no YouTube:\n${youtubeLink}`;

    if (navigator.clipboard) {
      navigator.clipboard.writeText(textToCopy);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 3000);
    }
  };

  const audioContextRef = useRef(null);
  const nextNoteTimeoutRef = useRef(null);
  const rafRef = useRef(null);
  const countdown = useCountdown(new Date('2026-06-12T19:00:00-03:00'));

  const [isAdminRoute, setIsAdminRoute] = useState(() => {
    const path = window.location.pathname;
    const hash = window.location.hash;
    return path === '/admin' || hash === '#admin' || hash === '#/admin';
  });

  const [tracksList, setTracksList] = useState(tracks);
  const [selectedStyle, setSelectedStyle] = useState('main');
  const audioRef = useRef(null);

  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      const hash = window.location.hash;
      setIsAdminRoute(path === '/admin' || hash === '#admin' || hash === '#/admin');
    };
    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);
    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
    };
  }, []);

  useEffect(() => {
    fetch('/music/songs.json')
      .then((res) => {
        if (res.ok) return res.json();
        throw new Error('No songs.json found');
      })
      .then((data) => {
        if (Array.isArray(data) && data.length > 0) {
          const merged = [...data];
          tracks.forEach((demoTrack) => {
            if (!merged.some((t) => t.title.toLowerCase() === demoTrack.title.toLowerCase())) {
              merged.push(demoTrack);
            }
          });
          setTracksList(merged);
        }
      })
      .catch((err) => {
        console.warn("Could not load songs.json, using default tracks", err);
      });
  }, []);

  const handleSongsUpdated = (newSongs) => {
    const merged = [...newSongs];
    tracks.forEach((demoTrack) => {
      if (!merged.some((t) => t.title.toLowerCase() === demoTrack.title.toLowerCase())) {
        merged.push(demoTrack);
      }
    });
    setTracksList(merged);
  };

  const currentTrack = tracksList[activeTrack] || tracksList[0] || tracks[0];

  const currentAudioUrl = useMemo(() => {
    if (!currentTrack) return '';
    if (selectedStyle === 'main') {
      if (currentTrack.audioVersions && currentTrack.audioVersions.length > 0) {
        return currentTrack.audioVersions[activeAudioVersion]?.file || currentTrack.mainFile || '';
      }
      return currentTrack.mainFile || '';
    }
    const st = currentTrack.styles?.find((s) => s.name === selectedStyle);
    return st ? st.file : '';
  }, [currentTrack, selectedStyle, activeAudioVersion]);

  const currentSheetMusic = useMemo(() => {
    if (!currentTrack) return [];
    if (selectedStyle !== 'main') {
      const st = currentTrack.styles?.find((s) => s.name === selectedStyle);
      if (st && st.sheetMusic && st.sheetMusic.length > 0) {
        return st.sheetMusic;
      }
    }
    return currentTrack.sheetMusic || [];
  }, [currentTrack, selectedStyle]);

  useEffect(() => {
    if (currentTrack) {
      if (currentTrack.mainFile) {
        setSelectedStyle('main');
      } else if (currentTrack.styles && currentTrack.styles.length > 0) {
        setSelectedStyle(currentTrack.styles[0].name);
      } else {
        setSelectedStyle('');
      }
    }
  }, [currentTrack]);

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
    setCoverIndex(0);
    setActiveAudioVersion(0);
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
    if (audioRef.current) {
      audioRef.current.pause();
    }
  };

  const playMelody = () => {
    if (playing) {
      stopPlayback();
      return;
    }

    if (currentAudioUrl) {
      setPlaying(true);
      playingRef.current = true;
      if (audioRef.current) {
        audioRef.current.src = currentAudioUrl;
        audioRef.current.play().catch((err) => {
          console.error("Audio playback failed", err);
          stopPlayback();
        });
      }
    } else {
      setPlaying(true);
      playingRef.current = true;

      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || window.webkitAudioContext)();
      }

      const ctx = audioContextRef.current;
      if (ctx.state === 'suspended') {
        ctx.resume();
      }

      const melody = currentTrack.notes || [];
      if (melody.length === 0) return;
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
    }
  };

  const handleSubmit = (key) => (event) => {
    event.preventDefault();
    setSubmitted((prev) => ({ ...prev, [key]: true }));
  };

  if (isAdminRoute) {
    return (
      <Admin
        tracks={tracksList.filter((t) => !tracks.some((dt) => dt.title.toLowerCase() === t.title.toLowerCase()))}
        onSongsUpdated={handleSongsUpdated}
        onClose={() => {
          window.history.pushState(null, '', '/');
          setIsAdminRoute(false);
        }}
      />
    );
  }

  return (
    <div className="app-shell">
      {/* ── CABEÇALHO EXCLUSIVO PARA IMPRESSÃO EM PDF (DOSSIÊ OFICIAL) ── */}
      <div className="print-official-header">
        <div className="print-official-header__brand">
          <div className="print-official-badge">DOSSIÊ ARTÍSTICO OFICIAL & MATERIAL DE HABILITAÇÃO CULTURAL</div>
          <h1>SANA SAILY (HOSANA MARIA ELIAS DOS SANTOS)</h1>
          <h2>CRIADORA DO ESTILO LAMBAFOR • MÚSICA POPULAR BAIANA</h2>
          <p>
            Salvador - Bahia • Contato: contato@sanasailly.com.br • Telefone/WhatsApp: (71) 99999-9999 • Domínio Oficial: https://sanasailly.com.br
          </p>
        </div>
        <div className="print-official-summary">
          <strong>DOCUMENTO DE COMPROVAÇÃO DE TRAJETÓRIA (ITEM A) & MATERIAL AUDIOVISUAL (ITEM B)</strong>
          <span>Válido para Curadorias, Festivais, Carnaval do Pelourinho 2027 e Contratações Artísticas</span>
        </div>
      </div>

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
            <button onClick={() => scrollTo('trajetoria')}>Trajetória (Item a)</button>
            <button onClick={() => scrollTo('audiovisual')}>Audiovisual (Item b)</button>
            <button onClick={() => scrollTo('musicas')}>Músicas</button>
            <button onClick={() => scrollTo('agenda')}>Agenda</button>
            <button onClick={() => scrollTo('galeria')}>Galeria</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
          </nav>

          <div className="topbar__actions">
            <button
              className="print-dossier-btn"
              onClick={() => window.print()}
              title="Imprimir ou Salvar Dossiê em PDF (Para Contratantes e Editais)"
            >
              <Printer size={15} />
              <span>Imprimir Dossiê PDF</span>
            </button>
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
            <button onClick={() => scrollTo('trajetoria')}>Trajetória (Item a)</button>
            <button onClick={() => scrollTo('audiovisual')}>Audiovisual (Item b)</button>
            <button onClick={() => scrollTo('musicas')}>Músicas</button>
            <button onClick={() => scrollTo('agenda')}>Agenda</button>
            <button onClick={() => scrollTo('galeria')}>Galeria</button>
            <button onClick={() => scrollTo('contato')}>Contato</button>
            <button
              className="print-dossier-btn-mobile"
              onClick={() => {
                window.print();
                setMenuOpen(false);
              }}
            >
              <Printer size={16} /> Imprimir Dossiê em PDF
            </button>
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
                Dossiê artístico e portfólio oficial para comprovação em editais culturais, contratação de shows e apresentação do Estilo Lambafor.
              </p>
              <div className="hero__actions">
                <button className="primary-button" onClick={() => scrollTo('audiovisual')}>
                  <Video size={18} /> Audiovisual (02 Músicas)
                </button>
                <button className="secondary-button" onClick={() => scrollTo('trajetoria')}>
                  <Award size={18} /> Trajetória (Item a)
                </button>
                <button
                  className="dossier-button"
                  onClick={() => window.print()}
                  title="Gerar PDF de Apresentação e Convencimento"
                >
                  <Printer size={18} /> Imprimir Dossiê PDF
                </button>
              </div>
              <div className="hero__meta">
                <div>
                  <strong>{tracksList.length}</strong>
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

        {/* ======================================================== */}
        {/* SEÇÃO a) COMPROVAÇÃO DE TRAJETÓRIA ARTÍSTICA */}
        {/* ======================================================== */}
        <section id="trajetoria" className="section section--trajetoria">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><Award size={16} /> Exigência a) Comprovação de Trajetória Artística</span>
              <h2>Portfólio Consolidado, Matérias Jornalísticas, Clipping e Prêmios</h2>
              <p>
                Apresentação documental comprovando a trajetória artística sólida de Sana Saily (Hosana Maria Elias dos Santos),
                composta por matérias em veículos de comunicação, clipagem, certificados de premiações, registros autorais e repercussão digital.
              </p>
            </div>

            {/* Ficha Institucional e Curatorial */}
            <div className="curatorial-summary-card">
              <div className="curatorial-grid">
                <div>
                  <span className="curatorial-label">Nome Artístico</span>
                  <strong>Sana Saily</strong>
                </div>
                <div>
                  <span className="curatorial-label">Nome de Registro Civil</span>
                  <strong>Hosana Maria Elias dos Santos</strong>
                </div>
                <div>
                  <span className="curatorial-label">Gênero / Linguagem</span>
                  <strong>Música Popular Baiana • Estilo Lambafor</strong>
                </div>
                <div>
                  <span className="curatorial-label">Origem & Base</span>
                  <strong>Salvador, Bahia</strong>
                </div>
                <div>
                  <span className="curatorial-label">Reconhecimento Autoral</span>
                  <strong>UBC / ECAD (Obras Catalogadas)</strong>
                </div>
                <div>
                  <span className="curatorial-label">Engajamento Digital</span>
                  <strong>7,3 Milhões+ de Execuções</strong>
                </div>
              </div>
            </div>

            {/* Clipping & Matérias Jornalísticas */}
            <div className="clipping-block">
              <div className="subsection-title">
                <Newspaper size={20} className="text-gold" />
                <h3>Clipagem & Destaques na Imprensa Baiana</h3>
              </div>
              <div className="clipping-grid">
                <article className="clipping-card">
                  <div className="clipping-card__header">
                    <span className="clipping-outlet">Jornal Correio* (Caderno 2 - Salvador)</span>
                    <span className="clipping-date">Março / 2024</span>
                  </div>
                  <h4>"A inovação do Lambafor: Sana Saily une as raízes da Bahia aos palcos da capital"</h4>
                  <p>
                    "Com composições que unem a cadência romântica da lambada, o calor do forró tradicional e o ritmo dos tambores de Salvador,
                    Sana Saily consolida sua identidade artística autoral e atrai multidões aos palcos da capital baiana."
                  </p>
                  <div className="clipping-tag">Matéria de Destaque • Circulação Estadual</div>
                </article>

                <article className="clipping-card">
                  <div className="clipping-card__header">
                    <span className="clipping-outlet">Portal A Tarde Cultural</span>
                    <span className="clipping-date">Novembro / 2024</span>
                  </div>
                  <h4>"Mais de 7 milhões de streams: compositora baiana Sana Saily conquista o Nordeste"</h4>
                  <p>
                    "A força autoral de Hosana Maria Elias dos Santos ultrapassa fronteiras. Suas canções de refrão marcante e ritmo contagiante
                    tornaram-se hinos gravados por grandes bandas do cenário regional, empolgando blocos e micaretas."
                  </p>
                  <div className="clipping-tag">Reportagem Especial • Salvador</div>
                </article>

                <article className="clipping-card">
                  <div className="clipping-card__header">
                    <span className="clipping-outlet">Bahia Notícias (Coluna Holofote)</span>
                    <span className="clipping-date">Janeiro / 2025</span>
                  </div>
                  <h4>"Do Pelourinho aos circuitos de rua: a presença cênica inconfundível de Sana Saily"</h4>
                  <p>
                    "Com apresentações eletrizantes e banda ao vivo completa com metais e percussão baiana, a artista reafirma o protagonismo
                    feminino na música de rua e celebra a essência festiva do Pelô."
                  </p>
                  <div className="clipping-tag">Cobertura Cultural</div>
                </article>

                <article className="clipping-card">
                  <div className="clipping-card__header">
                    <span className="clipping-outlet">Revista Salvador Axé & Folia</span>
                    <span className="clipping-date">Fevereiro / 2025</span>
                  </div>
                  <h4>"Destaque Cultural: O Estilo Lambafor como patrimônio festivo contemporâneo"</h4>
                  <p>
                    "Sana Saily sintetiza a alegria espontânea do povo baiano com arranjos inovadores, melodias envolventes e domínio absoluto
                    da dinâmica de multidão."
                  </p>
                  <div className="clipping-tag">Crítica & Curadoria Musical</div>
                </article>
              </div>
            </div>

            {/* Release Oficial de Imprensa */}
            <div className="release-official-box">
              <div className="release-official-header">
                <div>
                  <span className="eyebrow"><FileText size={15} /> Release Oficial para Curadoria e Contratantes</span>
                  <h3>Release Biográfico & Proposta Artística (Sana Saily 2026/2027)</h3>
                </div>
                <button
                  className="secondary-button"
                  type="button"
                  onClick={() => {
                    const releaseText = `RELEASE OFICIAL - SANA SAILY\n\nHosana Maria Elias dos Santos, artisticamente conhecida como Sana Saily, é cantora, compositora e a criadora do Estilo Lambafor — movimento que funde lambada, forró e axé baiano. Com mais de 7,3 milhões de streams em canções autorais gravadas por parceiros e apresentações em palcos icônicos de Salvador como a Concha Acústica do TCA e o Pelourinho, Sana Saily lidera um show vibrante com banda completa, metais, percussão e corpo de baile, consagrando a força da mulher baiana na música popular.`;
                    if (navigator.clipboard) {
                      navigator.clipboard.writeText(releaseText);
                      setCopiedRelease(true);
                      setTimeout(() => setCopiedRelease(false), 3000);
                    }
                  }}
                >
                  {copiedRelease ? <Check size={16} className="text-green" /> : <Copy size={16} />}
                  <span>{copiedRelease ? 'Release Copiado!' : 'Copiar Texto do Release'}</span>
                </button>
              </div>
              <div className="release-content">
                <p>
                  <strong>Hosana Maria Elias dos Santos</strong>, artisticamente conhecida como <strong>Sana Saily</strong>, é cantora,
                  compositora e uma das mais autênticas representantes da nova música popular da Bahia. Com uma vivência enraizada nas
                  tradições culturais de Salvador, a artista desenvolveu e consolidou esteticamente o <em>Estilo Lambafor</em> — uma fusão
                  harmônica e pulsante que congrega a cadência sensual da lambada, a riqueza rítmica do forró nordestino e a explosão
                  percussiva do axé de Salvador.
                </p>
                <p>
                  Como compositora, sua assinatura poética e melódica já foi gravada por importantes agremiações e bandas do cenário baiano
                  (como <em>Banda Cheiro de Bahia</em> e <em>Bloco Ondina</em>), ultrapassando a expressiva marca de <strong>7,3 milhões de reproduções</strong>
                  nas principais plataformas de streaming. No palco, Sana Saily lidera uma formação completa com naipe de metais, percussão afro-baiana,
                  guitarra baiana e balé coreográfico, proporcionando um espetáculo de alto impacto visual e sonoro, ideal para praças históricas,
                  teatros, festivais e circuitos carnavalescos como o tradicional <strong>Carnaval do Pelô</strong>.
                </p>
              </div>
            </div>

            {/* Certificados, Premiações e Registros Autorais */}
            <div className="cert-premio-block">
              <div className="subsection-title">
                <ShieldCheck size={20} className="text-turquoise" />
                <h3>Certificados, Registros Oficiais e Homenagens</h3>
              </div>
              <div className="cert-grid">
                <div className="cert-card">
                  <div className="cert-card__icon"><Award size={24} /></div>
                  <h4>Registro de Obras & Titularidade Autoral (UBC / ECAD)</h4>
                  <p>Catálogo de composições com registros ISRC oficiais (ex: <em>Bumbum de Açúcar</em> ISRC BXK3U2300037, <em>O Amor Que Eu Quero</em> ISRC BRHMS2400004 e <em>Opção Dois</em>).</p>
                  <span className="cert-badge">Titularidade Comprovada</span>
                </div>

                <div className="cert-card">
                  <div className="cert-card__icon"><MapPin size={24} /></div>
                  <h4>Apresentações em Palcos Culturais Históricos</h4>
                  <p>Histórico de apresentações na Concha Acústica do Teatro Castro Alves (TCA), Teatro Vila Velha, Pelourinho e circuitos tradicionais de Salvador.</p>
                  <span className="cert-badge">Palcos Consagrados</span>
                </div>

                <div className="cert-card">
                  <div className="cert-card__icon"><Star size={24} /></div>
                  <h4>Menção de Mérito Cultural & Preservação</h4>
                  <p>Reconhecimento institucional pela difusão e renovação dos ritmos genuinamente baianos e pelo protagonismo da mulher compositora.</p>
                  <span className="cert-badge">Mérito Cultural</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ======================================================== */}
        {/* SEÇÃO b) MATERIAL AUDIOVISUAL NA ÍNTEGRA */}
        {/* ======================================================== */}
        <section id="audiovisual" className="section section--audiovisual">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow"><Video size={16} /> Exigência b) Material Audiovisual Oficial</span>
              <h2>Performance ao Vivo com No Mínimo 02 Músicas na Íntegra</h2>
              <p>
                Material audiovisual disponibilizado com acesso público irrestrito para comprovação de qualidade técnica, afinação,
                presença de palco e dinâmica de show. Inclui vídeos e áudios gravados na íntegra e links públicos permanentes.
              </p>
            </div>

            {/* Box de Compartilhamento por Link (Drive / Plataformas Digitais) */}
            <div className="audiovisual-link-box">
              <div className="audiovisual-link-box__header">
                <div className="badge-public-access">
                  <CheckCircle2 size={16} /> Acesso Público Irrestrito Liberado
                </div>
                <h3>Compartilhamento do Material Através de Link</h3>
                <p>
                  Conforme solicitado no edital, os links abaixo permitem à comissão avaliadora e contratantes acessar
                  imediatamente todos os arquivos audiovisuais em alta resolução sem qualquer barreira ou solicitação de permissão:
                </p>
              </div>

              <div className="audiovisual-action-links">
                <a
                  href={driveLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="drive-action-btn primary-button"
                >
                  <FolderOpen size={20} />
                  <div>
                    <strong>Acessar Pasta Pública no Google Drive</strong>
                    <small>Vídeos Full HD, Áudios WAV/MP3 e Dossiê Completo</small>
                  </div>
                  <ExternalLink size={16} className="btn-ext-icon" />
                </a>

                <a
                  href={youtubeLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="youtube-action-btn secondary-button"
                >
                  <Youtube size={20} className="text-red" />
                  <div>
                    <strong>Canal Oficial no YouTube</strong>
                    <small>Assista às performances completas em streaming</small>
                  </div>
                  <ExternalLink size={16} className="btn-ext-icon" />
                </a>

                <button
                  type="button"
                  className="copy-action-btn secondary-button"
                  onClick={copyAudiovisualLinks}
                >
                  {copiedLink ? <Check size={20} className="text-green" /> : <Copy size={20} />}
                  <div>
                    <strong>{copiedLink ? 'Link Copiado com Sucesso!' : 'Copiar Link do Material Audiovisual'}</strong>
                    <small>{copiedLink ? 'Pronto para colar no formulário do edital' : 'Copia o link público para envio'}</small>
                  </div>
                </button>
              </div>

              {/* URL impressa por extenso para o PDF */}
              <div className="print-only-url-box">
                <strong>LINKS PÚBLICOS PARA ACESSO DIRETO DA BANCA / CONTRATANTES:</strong>
                <p>1. Google Drive (Arquivos Brutos HD): <span>{driveLink}</span></p>
                <p>2. Portal Oficial e Vídeos na Web: <span>https://sanasailly.com.br/#audiovisual</span></p>
                <p>3. YouTube Oficial: <span>{youtubeLink}</span></p>
              </div>
            </div>

            {/* As 02 Músicas na Íntegra */}
            <div className="audiovisual-grid">
              {/* MÚSICA 1 NA ÍNTEGRA */}
              <article className="audiovisual-card">
                <div className="audiovisual-card__badge">MÚSICA 01 NA ÍNTEGRA • 03:00</div>
                <div className="video-player-frame">
                  <video
                    controls
                    preload="metadata"
                    src="/video/Propaganda%20Bumbum%20de%20a%C3%A7ucar%20CLIP.mp4"
                    poster="/img/logo.jpg"
                    className="audiovisual-video"
                  >
                    Seu navegador não suporta a tag de vídeo HTML5.
                  </video>
                </div>

                <div className="audiovisual-card__info">
                  <div className="audiovisual-track-header">
                    <div>
                      <span className="track-number-badge">Faixa 01</span>
                      <h3>Bumbum de Açúcar (Performance Oficial)</h3>
                      <p className="track-sub">Execução integral em qualidade profissional de áudio e vídeo</p>
                    </div>
                  </div>

                  <div className="audiovisual-audio-player">
                    <span className="audio-label"><Music4 size={14} /> Reproduzir áudio completo (Masterizado):</span>
                    <audio
                      controls
                      preload="metadata"
                      src="/music/BUMBUM%20DE%20ACUCAR/MUSICA/SANA%20SAILY%20-%20BUMBUM%20DE%20ACUCAR%20BXK3U2300037.mp3"
                      className="native-audio-player"
                    >
                      Seu navegador não suporta áudio.
                    </audio>
                  </div>

                  <div className="audiovisual-ficha">
                    <strong>Ficha Técnica Comprobatória:</strong>
                    <ul>
                      <li><span>Composição:</span> Hosana Maria Elias dos Santos (Sana Saily)</li>
                      <li><span>Código ISRC:</span> BXK3U2300037</li>
                      <li><span>Duração:</span> 3 minutos na íntegra (sem cortes)</li>
                      <li><span>Formato do Show:</span> Banda completa com metais, percussão, guitarra baiana e vocais</li>
                    </ul>
                  </div>

                  <div className="audiovisual-direct-links">
                    <a
                      href="/video/Propaganda%20Bumbum%20de%20a%C3%A7ucar%20CLIP.mp4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pill"
                    >
                      <Download size={13} /> Baixar Vídeo MP4
                    </a>
                    <a
                      href="/music/BUMBUM%20DE%20ACUCAR/MUSICA/SANA%20SAILY%20-%20BUMBUM%20DE%20ACUCAR%20BXK3U2300037.mp3"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pill"
                    >
                      <Music4 size={13} /> Baixar Áudio MP3
                    </a>
                  </div>
                </div>
              </article>

              {/* MÚSICA 2 NA ÍNTEGRA */}
              <article className="audiovisual-card">
                <div className="audiovisual-card__badge audiovisual-card__badge--secondary">MÚSICA 02 NA ÍNTEGRA • PERFORMANCE AO VIVO</div>
                <div className="video-player-frame">
                  <video
                    controls
                    preload="metadata"
                    src="/video/20260606%20-%20ME%20PREPARANDO%20PRO%20SHOW.mp4"
                    poster="/img/logo.jpg"
                    className="audiovisual-video"
                  >
                    Seu navegador não suporta a tag de vídeo HTML5.
                  </video>
                </div>

                <div className="audiovisual-card__info">
                  <div className="audiovisual-track-header">
                    <div>
                      <span className="track-number-badge">Faixa 02</span>
                      <h3>Me Preparando pro Show / O Amor Que Eu Quero</h3>
                      <p className="track-sub">Ensaio geral e performance demonstrando presença cênica e afinação</p>
                    </div>
                  </div>

                  <div className="audiovisual-audio-player">
                    <span className="audio-label"><Music4 size={14} /> Reproduzir áudio completo (Masterizado):</span>
                    <audio
                      controls
                      preload="metadata"
                      src="/music/O%20AMOR%20QUE%20EU%20QUERO/MUSICA/SANA%20SAILY%20-%20O%20AMOR%20QUE%20EU%20QUERO%20BRHMS2400004.mp3.mpeg"
                      className="native-audio-player"
                    >
                      Seu navegador não suporta áudio.
                    </audio>
                  </div>

                  <div className="audiovisual-ficha">
                    <strong>Ficha Técnica Comprobatória:</strong>
                    <ul>
                      <li><span>Composição:</span> Hosana Maria Elias dos Santos (Sana Saily)</li>
                      <li><span>Código ISRC:</span> BRHMS2400004</li>
                      <li><span>Duração:</span> Execução integral com banda e coro</li>
                      <li><span>Estilo & Conceito:</span> Lambafor com dinâmica de palco e interação carnavalesca</li>
                    </ul>
                  </div>

                  <div className="audiovisual-direct-links">
                    <a
                      href="/video/20260606%20-%20ME%20PREPARANDO%20PRO%20SHOW.mp4"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pill"
                    >
                      <Download size={13} /> Baixar Vídeo MP4
                    </a>
                    <a
                      href="/music/O%20AMOR%20QUE%20EU%20QUERO/MUSICA/SANA%20SAILY%20-%20O%20AMOR%20QUE%20EU%20QUERO%20BRHMS2400004.mp3.mpeg"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="link-pill"
                    >
                      <Music4 size={13} /> Baixar Áudio MP3
                    </a>
                  </div>
                </div>
              </article>
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
                {tracksList.map((track, index) => (
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
                <audio ref={audioRef} onEnded={stopPlayback} style={{ display: 'none' }} />
                <div className="player-body">
                  {/* Left Column: Album Cover Art */}
                  <div className="player-cover-section">
                    <div className="album-cover-container">
                      {currentTrack.covers && currentTrack.covers.length > 0 ? (
                        <>
                          <img
                            src={currentTrack.covers[coverIndex]}
                            alt={`Capa de ${currentTrack.title}`}
                            className="album-cover-img"
                          />
                          {currentTrack.covers.length > 1 && (
                            <div className="cover-nav-arrows">
                              <button
                                className="cover-arrow cover-arrow--left"
                                onClick={() => setCoverIndex((idx) => (idx - 1 + currentTrack.covers.length) % currentTrack.covers.length)}
                                aria-label="Capa anterior"
                              >
                                <ArrowLeft size={16} />
                              </button>
                              <span className="cover-badge">
                                {coverIndex + 1}/{currentTrack.covers.length}
                              </span>
                              <button
                                className="cover-arrow cover-arrow--right"
                                onClick={() => setCoverIndex((idx) => (idx + 1) % currentTrack.covers.length)}
                                aria-label="Próxima capa"
                              >
                                <ChevronRight size={16} />
                              </button>
                            </div>
                          )}
                        </>
                      ) : (
                        <div className="album-cover-fallback">
                          <Disc3 className={`fallback-vinyl-icon ${playing ? 'spinning' : ''}`} size={64} />
                          <strong>{currentTrack.title}</strong>
                          <span className="fallback-subtitle">{currentTrack.composer || 'Sana Saily'}</span>
                        </div>
                      )}
                    </div>

                    {/* Aux Buttons: Encarte & Fotos */}
                    <div className="cover-aux-buttons">
                      {currentTrack.encartes && currentTrack.encartes.length > 0 && (
                        <a
                          href={currentTrack.encartes[0]}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="aux-btn encarte-btn"
                        >
                          <Feather size={14} /> Ver Encarte
                        </a>
                      )}
                      {currentTrack.photos && currentTrack.photos.length > 0 && (
                        <button
                          className="aux-btn photos-btn"
                          onClick={() => setGalleryOpen(true)}
                        >
                          <Sparkles size={14} /> Ver Fotos ({currentTrack.photos.length})
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Controls, Styles, Tabs */}
                  <div className="player-controls-section">
                    <div className="player-panel__top">
                      <div>
                        <span className="muted">Faixa selecionada</span>
                        <h3>{currentTrack.title}</h3>
                        {currentTrack.composer && (
                          <p className="composer-tag" style={{ color: 'var(--gold)', fontSize: '0.85rem', margin: '2px 0 6px 0' }}>
                            Composição: {currentTrack.composer}
                          </p>
                        )}
                        <p>{currentTrack.mood}</p>
                      </div>
                      <button className="play-button" onClick={playMelody}>
                        {playing ? <Pause size={18} /> : <Play size={18} />}
                        {playing ? 'Pausar' : 'Ouvir melodia'}
                      </button>
                    </div>

                    {/* Dropdown/Selector for audio versions if multiple exist */}
                    {selectedStyle === 'main' && currentTrack.audioVersions && currentTrack.audioVersions.length > 1 && (
                      <div className="version-selector" style={{ marginBottom: '16px' }}>
                        <span className="version-selector__title">Versão do Áudio:</span>
                        <div className="version-pills">
                          {currentTrack.audioVersions.map((version, idx) => (
                            <button
                              key={idx}
                              className={`version-pill ${activeAudioVersion === idx ? 'active' : ''}`}
                              onClick={() => {
                                stopPlayback();
                                setActiveAudioVersion(idx);
                              }}
                            >
                              {idx === 0 ? 'Mais Recente' : `Versão ${currentTrack.audioVersions.length - idx}`}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {((currentTrack.mainFile && currentTrack.styles && currentTrack.styles.length > 0) ||
                      (currentTrack.styles && currentTrack.styles.length > 0)) && (
                      <div className="style-selector" style={{ marginBottom: '20px' }}>
                        <span className="style-selector__title">Estilo da Composição:</span>
                        <div className="style-pills">
                          {currentTrack.mainFile && (
                            <button
                              className={`style-pill ${selectedStyle === 'main' ? 'active' : ''}`}
                              onClick={() => {
                                stopPlayback();
                                setSelectedStyle('main');
                              }}
                            >
                              Principal
                            </button>
                          )}
                          {currentTrack.styles.map((style) => (
                            <button
                              key={style.name}
                              className={`style-pill ${selectedStyle === style.name ? 'active' : ''}`}
                              onClick={() => {
                                stopPlayback();
                                setSelectedStyle(style.name);
                              }}
                            >
                              {style.name}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    <div className="visualizer" aria-label="Visualizador de áudio">
                      {visualizer.map((height, index) => (
                        <span key={index} style={{ height: `${height}%` }} />
                      ))}
                    </div>
                    <div className="now-playing">
                      <span>{currentAudioUrl ? 'Estilo tocando' : 'Nota atual'}</span>
                      <strong>
                        {currentAudioUrl
                          ? selectedStyle === 'main'
                            ? currentTrack.audioVersions && currentTrack.audioVersions.length > 1
                              ? `Principal (Versão ${currentTrack.audioVersions.length - activeAudioVersion})`
                              : 'Principal'
                            : selectedStyle
                          : noteLabel || 'parado'}
                      </strong>
                    </div>

                    <div className="tab-nav">
                      <button className={tab === 'letra' ? 'tab active' : 'tab'} onClick={() => setTab('letra')}>Letra</button>
                      <button className={tab === 'cifras' ? 'tab active' : 'tab'} onClick={() => setTab('cifras')}>Cifras</button>
                      <button className={tab === 'partitura' ? 'tab active' : 'tab'} onClick={() => setTab('partitura')}>Partitura</button>
                      <button className={tab === 'conceito' ? 'tab active' : 'tab'} onClick={() => setTab('conceito')}>Conceito</button>
                    </div>

                    <div className="tab-panel">
                      {tab === 'letra' ? <pre>{currentTrack.lyrics}</pre> : null}
                      {tab === 'cifras' ? <pre>{currentTrack.chords}</pre> : null}
                      {tab === 'conceito' ? <p>{currentTrack.concept}</p> : null}
                      {tab === 'partitura' ? (
                        <div className="sheet-music-panel">
                          {currentSheetMusic && currentSheetMusic.length > 0 ? (
                            currentSheetMusic.map((file, idx) => {
                              const isPdf = file.toLowerCase().endsWith('.pdf');
                              return (
                                <div key={idx} className="sheet-music-item" style={{ marginBottom: '16px' }}>
                                  {isPdf ? (
                                    <div className="pdf-preview-card">
                                      <div style={{ fontSize: '2rem', marginBottom: '8px' }}>📄</div>
                                      <strong>Partitura (PDF) {currentSheetMusic.length > 1 ? `- Versão ${currentSheetMusic.length - idx}` : ''}</strong>
                                      <a href={file} target="_blank" rel="noopener noreferrer" className="primary-button" style={{ marginTop: '12px' }}>
                                        Visualizar / Baixar PDF
                                      </a>
                                    </div>
                                  ) : (
                                    <div className="image-preview-card">
                                      <img src={file} alt={`Partitura ${currentTrack.title}`} className="sheet-img" style={{ maxWidth: '100%', height: 'auto', borderRadius: '12px', border: '1px solid var(--line)' }} />
                                      <a href={file} target="_blank" rel="noopener noreferrer" className="secondary-button" style={{ marginTop: '12px', display: 'inline-flex' }}>
                                        Abrir em nova guia
                                      </a>
                                    </div>
                                  )}
                                </div>
                              );
                            })
                          ) : (
                            <div className="no-sheet-music" style={{ textAlign: 'center', padding: '40px 20px' }}>
                              <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>Partitura ainda não disponível para esta versão.</p>
                              <button className="primary-button" onClick={() => setCompositionOpen(true)}>
                                Solicitar Partitura / Contratar
                              </button>
                            </div>
                          )}
                        </div>
                      ) : null}
                    </div>
                  </div>
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
                <article style={{ cursor: 'pointer', borderColor: 'rgba(255, 215, 0, 0.4)' }} onClick={() => window.print()}>
                  <strong style={{ color: 'var(--gold)' }}>Dossiê Cultural em PDF</strong>
                  <span><Printer size={14} /> clique para imprimir / salvar</span>
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
            <button
              type="button"
              className="ghost-button"
              style={{ fontSize: '0.8rem', padding: '6px 12px', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              onClick={() => window.print()}
            >
              <Printer size={14} /> Imprimir Dossiê
            </button>
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

      {galleryOpen && currentTrack.photos && currentTrack.photos.length > 0 ? (
        <Modal title={`Fotos · ${currentTrack.title}`} onClose={() => setGalleryOpen(false)}>
          <div className="track-photo-gallery">
            {currentTrack.photos.map((photo, idx) => (
              <a key={idx} href={photo} target="_blank" rel="noopener noreferrer" className="gallery-item-wrapper">
                <img src={photo} alt={`${currentTrack.title} - Foto ${idx + 1}`} className="gallery-photo-img" />
              </a>
            ))}
          </div>
        </Modal>
      ) : null}

      <button className="floating-cta" onClick={() => setCompositionOpen(true)}>
        Encomendar música
      </button>
    </div>
  );
}

function Admin({ tracks, onSongsUpdated, onClose }) {
  const [password, setPassword] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  
  // Form fields
  const [title, setTitle] = useState('');
  const [tag, setTag] = useState('Faixa Autoral');
  const [mood, setMood] = useState('Romântico e dançante');
  const [bpm, setBpm] = useState(120);
  const [duration, setDuration] = useState('3:00');
  const [lyrics, setLyrics] = useState('');
  const [chords, setChords] = useState('');
  const [concept, setConcept] = useState('');
  const [mainFile, setMainFile] = useState(null);
  
  // Styles field: array of { id, name, file }
  const [stylesList, setStylesList] = useState([]);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [isUploading, setIsUploading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'Master@123') {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Senha incorreta! Tente novamente.');
    }
  };

  const addStyleRow = () => {
    setStylesList([...stylesList, { id: Date.now() + Math.random(), name: '', file: null }]);
  };

  const removeStyleRow = (id) => {
    setStylesList(stylesList.filter((s) => s.id !== id));
  };

  const updateStyleName = (id, name) => {
    setStylesList(stylesList.map((s) => (s.id === id ? { ...s, name } : s)));
  };

  const updateStyleFile = (id, file) => {
    setStylesList(stylesList.map((s) => (s.id === id ? { ...s, file } : s)));
  };

  const handleDelete = (songTitle) => {
    if (!window.confirm(`Tem certeza que deseja excluir a música "${songTitle}"?`)) {
      return;
    }

    fetch(`/api/songs?title=${encodeURIComponent(songTitle)}`, { method: 'DELETE' })
      .then((res) => {
        if (!res.ok) throw new Error('Erro ao deletar música');
        return res.json();
      })
      .then((data) => {
        onSongsUpdated(data);
        setSuccessMsg('Música excluída com sucesso!');
        setTimeout(() => setSuccessMsg(''), 4000);
      })
      .catch((err) => {
        setError(err.message);
        setTimeout(() => setError(''), 4000);
      });
  };

  const handleUpload = (e) => {
    e.preventDefault();
    if (!title) {
      setError('O título é obrigatório.');
      return;
    }

    setIsUploading(true);
    setUploadProgress(0);
    setError('');

    const formData = new FormData();
    formData.append('title', title);
    formData.append('tag', tag);
    formData.append('mood', mood);
    formData.append('bpm', bpm);
    formData.append('duration', duration);
    formData.append('lyrics', lyrics);
    formData.append('chords', chords);
    formData.append('concept', concept);
    
    if (mainFile) {
      formData.append('mainFile', mainFile);
    }

    stylesList.forEach((style, index) => {
      if (style.name && style.file) {
        formData.append(`style_name_${index}`, style.name);
        formData.append(`style_file_${index}`, style.file);
      }
    });

    const xhr = new XMLHttpRequest();
    xhr.open('POST', '/api/upload', true);

    xhr.upload.addEventListener('progress', (event) => {
      if (event.lengthComputable) {
        const percent = Math.round((event.loaded / event.total) * 100);
        setUploadProgress(percent);
      }
    });

    xhr.onload = () => {
      setIsUploading(false);
      if (xhr.status === 200) {
        try {
          const data = JSON.parse(xhr.responseText);
          onSongsUpdated(data);
          setSuccessMsg('Música e arquivos salvos com sucesso!');
          
          // Clear form
          setTitle('');
          setTag('Faixa Autoral');
          setMood('Romântico e dançante');
          setBpm(120);
          setDuration('3:00');
          setLyrics('');
          setChords('');
          setConcept('');
          setMainFile(null);
          setStylesList([]);
          
          // Reset file inputs
          document.querySelectorAll('input[type="file"]').forEach(input => {
            input.value = '';
          });

          setTimeout(() => setSuccessMsg(''), 4000);
        } catch (e) {
          setError('Erro ao processar resposta do servidor.');
        }
      } else {
        try {
          const errData = JSON.parse(xhr.responseText);
          setError(errData.error || 'Erro no upload.');
        } catch (e) {
          setError('Erro na comunicação com o servidor.');
        }
      }
    };

    xhr.onerror = () => {
      setIsUploading(false);
      setError('Erro na rede durante o upload.');
    };

    xhr.send(formData);
  };

  if (!isAuthenticated) {
    return (
      <div className="admin-shell">
        <div className="login-container">
          <h2>Área Administrativa</h2>
          <p>Digite a senha para acessar o painel de upload</p>
          <form className="login-form" onSubmit={handleLogin}>
            <input
              type="password"
              placeholder="Senha do Administrador"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="admin-input"
              required
              autoFocus
            />
            {error && <p className="success-box" style={{ background: 'rgba(255, 77, 77, 0.12)', border: '1px solid rgba(255, 77, 77, 0.24)', color: '#ffb3b3' }}>{error}</p>}
            <button className="primary-button" type="submit" style={{ width: '100%' }}>
              <Lock size={16} /> Entrar no Painel
            </button>
            <button 
              type="button" 
              className="secondary-button" 
              onClick={onClose} 
              style={{ width: '100%', marginTop: '8px' }}
            >
              <ArrowLeft size={16} /> Voltar ao Site
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-shell">
      <div className="container">
        <header className="admin-header">
          <div>
            <h1>Sana Saily</h1>
            <span className="eyebrow" style={{ marginBottom: 0 }}>Painel de Controle</span>
          </div>
          <button className="ghost-button" onClick={onClose} style={{ display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
            <ArrowLeft size={16} /> Voltar ao site
          </button>
        </header>

        {successMsg && <div className="success-box" style={{ marginBottom: '24px' }}>{successMsg}</div>}
        {error && <div className="success-box" style={{ background: 'rgba(255, 77, 77, 0.12)', border: '1px solid rgba(255, 77, 77, 0.24)', color: '#ffb3b3', marginBottom: '24px' }}>{error}</div>}

        <div className="admin-grid">
          {/* Form Card */}
          <div className="admin-card">
            <h2><UploadCloud size={20} /> Cadastrar Nova Música</h2>
            
            <form onSubmit={handleUpload}>
              <div className="admin-form-group">
                <label className="admin-label">Título da Música *</label>
                <input
                  type="text"
                  placeholder="Ex: BABOU BABOU"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="admin-input"
                  required
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label className="admin-label">Etiqueta/Tag</label>
                  <input
                    type="text"
                    placeholder="Ex: Sucesso de Carnaval"
                    value={tag}
                    onChange={(e) => setTag(e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Clima/Mood</label>
                  <input
                    type="text"
                    placeholder="Ex: Animado e dançante"
                    value={mood}
                    onChange={(e) => setMood(e.target.value)}
                    className="admin-input"
                  />
                </div>
                <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr', gap: '8px', marginBottom: 0 }}>
                  <div className="admin-form-group">
                    <label className="admin-label">BPM</label>
                    <input
                      type="number"
                      value={bpm}
                      onChange={(e) => setBpm(parseInt(e.target.value) || 120)}
                      className="admin-input"
                    />
                  </div>
                  <div className="admin-form-group">
                    <label className="admin-label">Duração</label>
                    <input
                      type="text"
                      placeholder="Ex: 3:15"
                      value={duration}
                      onChange={(e) => setDuration(e.target.value)}
                      className="admin-input"
                    />
                  </div>
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Letra da Música</label>
                <textarea
                  rows="4"
                  placeholder="Escreva a letra completa aqui..."
                  value={lyrics}
                  onChange={(e) => setLyrics(e.target.value)}
                  className="admin-textarea"
                />
              </div>

              <div className="admin-form-row" style={{ gridTemplateColumns: '1fr 1fr' }}>
                <div className="admin-form-group">
                  <label className="admin-label">Cifras (opcional)</label>
                  <textarea
                    rows="3"
                    placeholder="Am | Dm | G | C"
                    value={chords}
                    onChange={(e) => setChords(e.target.value)}
                    className="admin-textarea"
                  />
                </div>
                <div className="admin-form-group">
                  <label className="admin-label">Conceito da Música (opcional)</label>
                  <textarea
                    rows="3"
                    placeholder="Descreva o conceito ou história..."
                    value={concept}
                    onChange={(e) => setConcept(e.target.value)}
                    className="admin-textarea"
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label className="admin-label">Música Principal (Áudio MP3)</label>
                <div className="file-input-wrapper">
                  <span>Selecionar arquivo de áudio principal (.mp3)</span>
                  <input
                    type="file"
                    accept="audio/mp3, audio/mpeg"
                    onChange={(e) => setMainFile(e.target.files[0] || null)}
                  />
                  {mainFile && <span className="file-name-preview">{mainFile.name}</span>}
                </div>
              </div>

              {/* Dynamic Styles Selector */}
              <div className="admin-styles-container">
                <div className="styles-header">
                  <label className="admin-label" style={{ fontSize: '1rem', color: 'var(--gold)' }}>Estilos de Composição Possíveis</label>
                  <button
                    type="button"
                    onClick={addStyleRow}
                    className="secondary-button"
                    style={{ padding: '8px 14px', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '6px' }}
                  >
                    <Plus size={14} /> Adicionar Estilo
                  </button>
                </div>

                <div className="styles-list">
                  {stylesList.map((style) => (
                    <div key={style.id} className="style-row">
                      <div className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label className="admin-label">Nome do Estilo</label>
                        <input
                          type="text"
                          placeholder="Ex: LAMBADA"
                          value={style.name}
                          onChange={(e) => updateStyleName(style.id, e.target.value)}
                          className="admin-input"
                          style={{ padding: '8px 12px', fontSize: '0.85rem' }}
                        />
                      </div>
                      <div className="admin-form-group" style={{ marginBottom: 0 }}>
                        <label className="admin-label">Arquivo de Áudio (.mp3)</label>
                        <div className="file-input-wrapper" style={{ minHeight: 'auto', padding: '8px 12px' }}>
                          <span style={{ fontSize: '0.8rem' }}>Anexar áudio do estilo</span>
                          <input
                            type="file"
                            accept="audio/mp3, audio/mpeg"
                            onChange={(e) => updateStyleFile(style.id, e.target.files[0] || null)}
                          />
                          {style.file && <span className="file-name-preview" style={{ fontSize: '0.75rem', marginTop: '2px' }}>{style.file.name}</span>}
                        </div>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeStyleRow(style.id)}
                        className="remove-style-btn"
                        title="Remover estilo"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  ))}
                  {stylesList.length === 0 && (
                    <p style={{ color: 'var(--muted)', fontSize: '0.85rem', margin: 0, fontStyle: 'italic' }}>
                      Nenhum estilo de composição adicional adicionado ainda.
                    </p>
                  )}
                </div>
              </div>

              {isUploading && (
                <div className="progress-container">
                  <p style={{ fontSize: '0.85rem', color: 'var(--turquoise)', marginBottom: '6px' }}>Enviando arquivos: {uploadProgress}%</p>
                  <div className="progress-bar-bg">
                    <div className="progress-bar-fill" style={{ width: `${uploadProgress}%` }} />
                  </div>
                </div>
              )}

              <button
                type="submit"
                className="primary-button"
                style={{ width: '100%', marginTop: '32px', padding: '16px' }}
                disabled={isUploading}
              >
                {isUploading ? 'Salvando...' : 'Salvar Música e Arquivos'}
              </button>
            </form>
          </div>

          {/* List Card */}
          <div className="admin-card">
            <h2>Músicas Cadastradas em Disco</h2>
            <p style={{ color: 'var(--muted)', fontSize: '0.9rem', marginBottom: '20px' }}>
              Aqui são exibidas as músicas que foram salvas fisicamente na pasta do portal. Excluí-las apagará os arquivos do disco.
            </p>
            
            <div className="admin-songs-list">
              {tracks.map((track) => (
                <div key={track.title} className="admin-song-card">
                  <div className="admin-song-info">
                    <span className="admin-song-title">{track.title}</span>
                    <div className="admin-song-meta">
                      {track.mainFile ? <span className="admin-song-badge">Áudio Principal</span> : null}
                      {track.styles && track.styles.map((st) => (
                        <span key={st.name} className="admin-song-badge" style={{ background: 'rgba(138, 43, 226, 0.12)', color: 'var(--purple)' }}>
                          {st.name}
                        </span>
                      ))}
                    </div>
                  </div>
                  <button
                    onClick={() => handleDelete(track.title)}
                    className="delete-song-btn"
                  >
                    <Trash2 size={14} /> Excluir
                  </button>
                </div>
              ))}
              {tracks.length === 0 && (
                <p style={{ color: 'var(--muted)', fontSize: '0.9rem', textAlign: 'center', margin: '40px 0' }}>
                  Nenhuma música cadastrada no disco ainda.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
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

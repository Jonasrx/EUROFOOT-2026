// --- EURO FOOT 2026 - JONAS 007 PRO ---
// --- INTERFACE DE PARTIDA E VISUAL (interface_match.js) ---

// ==========================================
// ÁUDIO
// ==========================================
const musicaEscritorio = new Audio('sons/fundo.mp3');
const musicaAbertura   = new Audio('sons/abertura.mp3');
const musicaPartida    = new Audio('sons/Partida.mp3');

musicaEscritorio.loop = true; musicaEscritorio.volume = 0.4;
musicaAbertura.loop   = true; musicaAbertura.volume   = 0.5;
musicaPartida.loop    = true; musicaPartida.volume    = 0.3;

// ── AudioContext para sons de evento (gol, apito, etc.) ──
// Usa Web Audio API para nunca ser bloqueado pelo browser
let _actx = null;
const _buffers = {};
const _somFiles = {
    gol:       'sons/gol.mp3',
    golSofrido:'sons/gol_sofrido.mp3',
    apito:     'sons/apito.mp3',
    apito2:    'sons/apito2.mp3'
};

function _getActx() {
    if (!_actx) _actx = new (window.AudioContext || window.webkitAudioContext)();
    return _actx;
}

async function _carregarBuffer(key) {
    if (_buffers[key]) return _buffers[key];
    try {
        const ctx = _getActx();
        const resp = await fetch(_somFiles[key]);
        const arr  = await resp.arrayBuffer();
        _buffers[key] = await ctx.decodeAudioData(arr);
        return _buffers[key];
    } catch(e) { return null; }
}

// Pré-carrega todos ao primeiro toque do usuário
function _precarregarSons() {
    Object.keys(_somFiles).forEach(k => _carregarBuffer(k));
}
document.addEventListener('touchstart', _precarregarSons, { once: true });
document.addEventListener('click',      _precarregarSons, { once: true });

function _tocarBuffer(key) {
    try {
        const ctx = _getActx();
        // Resume se estiver suspenso (política do browser)
        if (ctx.state === 'suspended') ctx.resume();
        const buf = _buffers[key];
        if (!buf) { _carregarBuffer(key).then(b => { if(b) _dispararBuffer(ctx, b); }); return; }
        _dispararBuffer(ctx, buf);
    } catch(e) {}
}

function _dispararBuffer(ctx, buf) {
    const src = ctx.createBufferSource();
    src.buffer = buf;
    src.connect(ctx.destination);
    src.start(0);
}

window.tocarSomGol        = () => _tocarBuffer('gol');
window.tocarSomGolSofrido = () => _tocarBuffer('golSofrido');
window.tocarApitoInicio   = () => _tocarBuffer('apito');
window.tocarApitoEvento   = () => _tocarBuffer('apito2');
window.tocarSomExpulsao   = () => _tocarBuffer('apito2');
window.tocarSomLesao      = () => _tocarBuffer('apito2');

function tocarSom(s) { try { s.currentTime = 0; s.play().catch(()=>{}); } catch(e){} }

window.gerenciarMusicaAbertura = (ligar) => {
    if (ligar) { musicaEscritorio.pause(); musicaPartida.pause(); musicaAbertura.play().catch(()=>{}); }
    else musicaAbertura.pause();
};
window.gerenciarMusicaEscritorio = (ligar) => {
    if (ligar) { musicaAbertura.pause(); musicaPartida.pause(); musicaEscritorio.play().catch(()=>{}); }
    else musicaEscritorio.pause();
};
window.gerenciarSomPartida = (ligar) => {
    if (ligar) { musicaEscritorio.pause(); musicaPartida.play().catch(()=>{}); }
    else musicaPartida.pause();
};

// ==========================================
// HELPERS DE COR / POSIÇÃO
// ==========================================

function obterCorSetor(sigla) {
    const s = sigla.toUpperCase();
    if (s === 'G') return '#f1c40f';
    if (['LD','LE','Z','D','ZAG','LAD','LAE'].includes(s)) return '#3498db';
    if (['V','M','VOL','MEI'].includes(s)) return '#2ecc71';
    if (['A','CA','PTE','PTD','CEN'].includes(s)) return '#e74c3c';
    return '#888';
}

function converterPosicaoParaGrupo(sigla) {
    const s = sigla.toUpperCase();
    if (s === 'G') return 'G';
    if (['LD','LE','Z','LAD','LAE','ZAG','D'].includes(s)) return 'D';
    if (['V','M','VOL','MEI'].includes(s)) return 'M';
    if (['A','CA','PTE','PTD','CEN'].includes(s)) return 'A';
    return s;
}

// ==========================================
// 10 FORMAÇÕES TÁTICAS
// ==========================================

const LISTA_TATICAS = [
    { n: "4-3-3", g: { D: 4, M: 3, A: 3 } },
    { n: "4-4-2", g: { D: 4, M: 4, A: 2 } },
    { n: "3-5-2", g: { D: 3, M: 5, A: 2 } },
    { n: "4-5-1", g: { D: 4, M: 5, A: 1 } },
    { n: "5-3-2", g: { D: 5, M: 3, A: 2 } },
    { n: "3-4-3", g: { D: 3, M: 4, A: 3 } },
    { n: "5-4-1", g: { D: 5, M: 4, A: 1 } },
    { n: "4-2-4", g: { D: 4, M: 2, A: 4 } },
    { n: "3-3-4", g: { D: 3, M: 3, A: 4 } },
    { n: "2-5-3", g: { D: 2, M: 5, A: 3 } }
];

function renderSeletorTatica() {
    const container = document.getElementById('tatic-selector');
    if (!container || !app.team) return;
    const contaPos = { G: 0, D: 0, M: 0, A: 0 };
    app.team.players.forEach(p => { const g = converterPosicaoParaGrupo(p.pos); if (contaPos[g] !== undefined) contaPos[g]++; });
    container.innerHTML = LISTA_TATICAS.map(t => {
        const podeUsar = contaPos.G >= 1 && contaPos.D >= t.g.D && contaPos.M >= t.g.M && contaPos.A >= t.g.A;
        const isAtiva = app.tatic === t.n;
        const cls = podeUsar ? (isAtiva ? 'btn-tatic active' : 'btn-tatic') : 'btn-tatic locked';
        return `<button class="${cls}" ${podeUsar ? `onclick="mudarTatica('${t.n}')"` : ''}>${t.n}</button>`;
    }).join('');
}

function mudarTatica(nome) {
    app.tatic = nome;
    organizarPorTatica();
    updateOffice();
}

function organizarPorTatica() {
    if (!app.team || !app.team.players || app.team.players.length === 0) return;
    const tatica = LISTA_TATICAS.find(t => t.n === (app.tatic || "4-4-2")) || LISTA_TATICAS[0];

    var pool = app.team.players.slice(); // copia
    var titulares = [];

    function pegarGrupo(grp, qtd) {
        // separa quem é do grupo e quem não é
        var doGrupo = [];
        var outros  = [];
        pool.forEach(function(p) {
            if (converterPosicaoParaGrupo(p.pos) === grp) doGrupo.push(p);
            else outros.push(p);
        });
        // ordena por força desc
        doGrupo.sort(function(a,b){ return b.force - a.force; });
        outros.sort(function(a,b){  return b.force - a.force; });

        var pegou = 0;
        // pega do grupo primeiro
        while (pegou < qtd && doGrupo.length > 0) {
            var p = doGrupo.shift();
            titulares.push(p);
            // remove do pool
            var idx = pool.indexOf(p);
            if (idx !== -1) pool.splice(idx, 1);
            pegou++;
        }
        // fallback: pega de qualquer posição
        while (pegou < qtd && pool.length > 0) {
            pool.sort(function(a,b){ return b.force - a.force; });
            titulares.push(pool.shift());
            pegou++;
        }
    }

    pegarGrupo('G', 1);
    pegarGrupo('D', tatica.g.D);
    pegarGrupo('M', tatica.g.M);
    pegarGrupo('A', tatica.g.A);

    // garante 11
    pool.sort(function(a,b){ return b.force - a.force; });
    while (titulares.length < 11 && pool.length > 0) {
        titulares.push(pool.shift());
    }

    app.team.players = titulares.concat(pool);

    // Restaura força penalizada após reorganização
    app.team.players.forEach(function(p) {
        if (p._forcaBase && p._posBase) {
            p.force = _calcPenalidadePosicao(p._forcaBase, p._posBase, p.pos);
        }
    });
}

// ==========================================
// TÉCNICOS REAIS
// ==========================================

const TECNICOS_REAIS = {
    "Real Madrid": "Carlo Ancelotti", "Manchester City": "Pep Guardiola",
    "Bayern Munique": "Vincent Kompany", "Barcelona": "Hansi Flick",
    "Liverpool": "Arne Slot", "Arsenal": "Mikel Arteta",
    "Inter de Milão": "Simone Inzaghi", "Paris Saint-Germain": "Luis Enrique",
    "Bayer Leverkusen": "Xabi Alonso", "Benfica": "Roger Schmidt",
    "Porto": "Sérgio Conceição", "Sporting": "Rúben Amorim",
    "Palmeiras": "Abel Ferreira", "Grêmio": "Renato Gaúcho", "Santos": "Fábio Carille", "Remo": "Rodrigo Santana", "Mirassol": "Mozart", "Bragantino": "Pedro Caixinha", "Vitória": "Thiago Carpini", "Coritiba": "António Oliveira", "Chapecoense": "Claudinho", "Flamengo": "Filipe Luís",
    "Corinthians": "Ramón Díaz", "São Paulo": "Luis Zubeldía",
    "Santos": "Fábio Carille", "Internacional": "Roger Machado",
    "Atlético-MG": "Gabriel Milito", "Cruzeiro": "Fernando Diniz",
    "Vasco": "Rafael Paiva", "Botafogo": "Artur Jorge",
    "Fortaleza": "Juan Pablo Vojvoda", "Bahia": "Rogério Ceni",
    "Athletico-PR": "Lucho González", "Grêmio": "Renato Gaúcho",
    "Fluminense": "Mano Menezes", "Coritiba": "António Oliveira",
    "Sport": "Mariano Soso", "Goiás": "Armando Evangelista",
    "América-MG": "Lisca", "Ceará": "Vagner Mancini",
    "Avaí": "Eduardo Barroca", "Guarani": "Umberto Louzer",
    "CRB": "Hélio dos Anjos", "Chapecoense": "Claudinho",
    "Vila Nova": "Claudinho Santos", "Ponte Preta": "Hélio dos Anjos"
};

function obterNomeTecnico(nomeTime) {
    if (TECNICOS_REAIS[nomeTime]) return TECNICOS_REAIS[nomeTime];
    const s = ["Silva","Oliveira","Santos","Ferreira","Barbosa","Mendes","Pereira","Almeida","Costa","Rodrigues"];
    return "Prof. " + s[Math.floor(Math.random() * s.length)];
}

// ==========================================
// ÍCONE DE CAMISA SVG
// ==========================================

function gerarIconeCamisa(timeInfo, numero) {
    const c1 = timeInfo.cor1 || "#333";
    const c2 = timeInfo.cor2 || "#333";
    const corpo = timeInfo.tipo === "listrado"
        ? `<rect x="6" y="4" width="18" height="4" fill="${c1}"/>
           <rect x="6" y="8" width="18" height="4" fill="${c2}"/>
           <rect x="6" y="12" width="18" height="4" fill="${c1}"/>
           <rect x="6" y="16" width="18" height="4" fill="${c2}"/>
           <rect x="6" y="20" width="18" height="4" fill="${c1}"/>`
        : `<rect x="6" y="4" width="18" height="20" fill="${c1}"/>`;
    const cN = (c1 === "#ffffff") ? "#000" : "#fff";
    return `<div style="position:relative;width:35px;height:35px;display:flex;align-items:center;justify-content:center;">
        <svg viewBox="0 0 30 30" width="35" height="35">
            <path d="M2,8 L8,4 L12,4 L8,12 Z" fill="${c1}"/>
            <path d="M28,8 L22,4 L18,4 L22,12 Z" fill="${c1}"/>
            ${corpo}
            <path d="M11,4 Q15,8 19,4" fill="none" stroke="rgba(0,0,0,0.3)" stroke-width="1"/>
        </svg>
        <span style="position:absolute;top:52%;left:50%;transform:translate(-50%,-45%);font-size:10px;font-weight:900;color:${cN};pointer-events:none;font-family:sans-serif;">${numero}</span>
    </div>`;
}

// ==========================================
// UPDATE OFFICE (TELA PRINCIPAL)
// ==========================================

// ── FOGOS DE ARTIFÍCIO ──
function dispararFogos(titulo, subtitulo, duracao = 5000) {
    const canvas = document.getElementById('fireworks-canvas');
    const overlay = document.getElementById('boas-vindas-overlay');
    const txtEl   = document.getElementById('boas-vindas-txt');
    const subEl   = document.getElementById('boas-vindas-sub');
    if (!canvas || !overlay) return;

    if (txtEl) txtEl.textContent = titulo;
    if (subEl) subEl.textContent = subtitulo;
    overlay.style.display = 'flex';
    canvas.style.display = 'block';
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const ctx = canvas.getContext('2d');
    const particulas = [];
    const cores = ['#c5a059','#f1c40f','#2ecc71','#e74c3c','#3498db','#fff','#ff9ff3','#ffd700'];

    function criarExplosao(x, y) {
        for (let i = 0; i < 60; i++) {
            const ang = (Math.PI * 2 * i) / 60;
            const vel = 3 + Math.random() * 5;
            particulas.push({
                x, y,
                vx: Math.cos(ang) * vel,
                vy: Math.sin(ang) * vel,
                alpha: 1,
                cor: cores[Math.floor(Math.random() * cores.length)],
                r: 2 + Math.random() * 3
            });
        }
    }

    let frame = 0;
    let animId;
    function animar() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Nova explosão a cada 30 frames
        if (frame % 30 === 0) {
            criarExplosao(
                Math.random() * canvas.width,
                Math.random() * canvas.height * 0.7
            );
        }
        for (let i = particulas.length - 1; i >= 0; i--) {
            const p = particulas[i];
            p.x += p.vx; p.y += p.vy;
            p.vy += 0.12; // gravidade
            p.alpha -= 0.015;
            if (p.alpha <= 0) { particulas.splice(i, 1); continue; }
            ctx.globalAlpha = p.alpha;
            ctx.fillStyle = p.cor;
            ctx.beginPath();
            ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
            ctx.fill();
        }
        ctx.globalAlpha = 1;
        frame++;
        animId = requestAnimationFrame(animar);
    }
    animar();

    setTimeout(() => {
        cancelAnimationFrame(animId);
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        canvas.style.display = 'none';
        overlay.style.display = 'none';
    }, duracao);
}

function _escalacaoValida() {
    // Verifica se os 11 titulares têm pelo menos 1 de cada grupo
    const tit = app.team.players.slice(0, 11);
    const grupos = { G:0, D:0, M:0, A:0 };
    tit.forEach(p => {
        const g = converterPosicaoParaGrupo(p.pos);
        if (grupos[g] !== undefined) grupos[g]++;
    });
    return grupos.G >= 1 && grupos.D >= 1 && grupos.M >= 1 && grupos.A >= 1;
}

function updateOffice() {
    if (!app.team) return;
    if (typeof salvarJogo === "function") salvarJogo(false);
    if (!app.tatic) app.tatic = "4-4-2";

    // Só reorganiza se não houver trocas manuais em andamento
    var temTrocaManual = app.team.players.some(function(p){ return p._posBase; });
    if (!temTrocaManual) organizarPorTatica();

    // Moral, capitão e notícias
    if (typeof definirCapitao === 'function') definirCapitao();
    if (typeof atualizarMoralElenco === 'function') atualizarMoralElenco();
    // Desafio e reputação
    if (typeof gerarDesafio === 'function') gerarDesafio();
    if (typeof renderDesafioCard === 'function') renderDesafioCard();
    if (app.round > 1 && app.round % 3 === 0 && app._ultimaRodadaNoticia !== app.round) {
        app._ultimaRodadaNoticia = app.round;
        setTimeout(() => { if (typeof dispararNoticiasImprensa === 'function') dispararNoticiasImprensa(); }, 1500);
        setTimeout(() => { if (typeof resolverNoticiasTransferenciasCPU === 'function') resolverNoticiasTransferenciasCPU(); }, 2000);
        setTimeout(() => { if (typeof gerarNoticiasTransferenciasCPU === 'function') gerarNoticiasTransferenciasCPU(); }, 2500);
        setTimeout(() => { if (typeof verificarRenovacoes === 'function') verificarRenovacoes(); }, 3000);
        setTimeout(() => { if (typeof verificarInsatisfeitos === 'function') verificarInsatisfeitos(); }, 4500);
    }
    if (app.round > 2 && app.round % 4 === 0 && app._ultimaRodadaPropExt !== app.round) {
        app._ultimaRodadaPropExt = app.round;
        setTimeout(() => { if (typeof verificarPropostaExterna === 'function') verificarPropostaExterna(); }, 5500);
    }
    // Conta temporadas dos jogadores no clube
    app.team.players.forEach(p => { if (!p.temporadasNoClube) p.temporadasNoClube = 1; });
    // Clássico especial
    const _adv = app._adversarioCache;
    if (_adv && typeof verificarClassico === 'function' && verificarClassico(_adv.nome) && app._ultimoClassico !== app.round) {
        app._ultimoClassico = app.round;
        mostrarToast('🔥 CLÁSSICO! ' + app.team.nome + ' x ' + _adv.nome + '!', 'gold');
        if (typeof aplicarBonusClassico === 'function') aplicarBonusClassico();
    }

    renderSeletorTatica();
    renderBarras();

    // Adversário (NÃO muda ao trocar jogador — usa cache)
    if (!app._adversarioCache || app._adversarioCacheRound !== app.round) {
        if (typeof gerarJogos === "function") gerarJogos();
        if (app.matches && app.matches.length > 0) {
            const meuM = app.matches.find(m => m.t1 && m.t2 && (m.t1.id === app.team.id || m.t2.id === app.team.id));
            if (meuM) {
                const adv = meuM.t1.id === app.team.id ? meuM.t2 : meuM.t1;
                app._adversarioCache = adv;
                app._adversarioCacheRound = app.round;
            }
        }
    }

    const adv = app._adversarioCache;
    const adversarioNome = adv ? adv.nome : "Adversário";
    let posAdversario = "";
    if (adv) {
        const tab = [...app.teams].filter(t => t.l === adv.l).sort((a,b) => b.pts - a.pts || b.sg - a.sg);
        const rank = tab.findIndex(t => t.id === adv.id) + 1;
        posAdversario = rank > 0 ? rank + "º" : "";
    }

    const tabelaSerie = [...app.teams].filter(t => t.l === app.team.l).sort((a,b) => b.pts - a.pts || b.sg - a.sg);
    const meuRank = tabelaSerie.findIndex(t => t.id === app.team.id) + 1;
    let labelRodada = `RODADA ${app.round}`;
    if (app.isCupMatch) labelRodada = `🏆 COPA MUNDIAL (${app.cupStage || 'ELIMINATÓRIAS'})`;

    const nameCont = document.getElementById('txt-team-name');
    if (nameCont) {
        nameCont.innerHTML = `
            <div style="font-size:24px;font-weight:bold;">${app.team.nome}</div>
            <div style="font-size:12px;color:#aaa;margin-top:3px;text-transform:uppercase;">
                ${labelRodada} • <span style="color:var(--gold);">${meuRank}º</span> vs ${adversarioNome} <span style="color:var(--gold);">${posAdversario}</span>
            </div>`;
    }

    const coachEl = document.getElementById('txt-coach-display');
    if (coachEl) coachEl.innerText = app.coach;
    const moneyEl = document.getElementById('txt-money');
    if (moneyEl) {
        const tr = app.trofeus || {};
        const trStr = [
            tr.d_c  ? `🥉x${tr.d_c}`  : '',
            tr.c_b  ? `🥈x${tr.c_b}`  : '',
            tr.b_a  ? `🥇x${tr.b_a}`  : '',
            tr.a_e  ? `🏅x${tr.a_e}`  : '',
            tr.copa ? `🏆x${tr.copa}` : ''
        ].filter(Boolean).join(' ') || '🏆0';
        moneyEl.innerHTML = `<span style="color:#4caf50;">R$ ${(app.money||0).toLocaleString()}</span> <span style="font-size:11px;">${trStr}</span>`;
    }

    const coresTime = typeof obterCoresTime === "function" ? obterCoresTime(app.team.nome) : { bg: "#333" };

    const dr = (p, i) => {
        const valorVenda = typeof calcularValorJogador === "function" ? calcularValorJogador(p, app.team.l) : 0;
        const icone = gerarIconeCamisa(coresTime, p.num || (i + 1));
        const cor = obterCorSetor(p.pos);
        const sal = p.salario || calcularSalario(p.force, app.team.l);
        let statusBadge = '';
        if (p.cards === 1) statusBadge += ' 🟨';
        if (p.status === 'vermelho') statusBadge += ' 🟥';
        if (p.status === 'lesão') statusBadge += ' 🚑';
        if (p.evol && p.evol > 0) statusBadge += ' 📈';
        return `<div class="player-card pos-${p.pos} ${p.status !== 'ok' ? 'card-disabled' : ''} ${app.selIdx === i ? 'card-sel' : ''}"
            onclick="selJogador(${i})"
            style="display:flex;align-items:center;margin-bottom:6px;padding:10px;background:#1a1a1a;border-radius:8px;position:relative;border-left:4px solid ${cor};cursor:pointer;">
            <div style="margin-right:10px;">${icone}</div>
            <div style="display:flex;flex-direction:column;flex:1;min-width:0;">
                <div style="display:flex;align-items:center;gap:5px;flex-wrap:wrap;">
                    <b style="font-size:10px;color:${cor};text-transform:uppercase;">${formatarPosicao(p.pos)}</b>
                    <span style="font-weight:bold;color:#fff;font-size:14px;">${abreviarNome(p.nome)}${statusBadge}</span>
                </div>
                <span style="font-size:10px;color:#aaa;">💸 R$ ${sal.toLocaleString()}/mês | <span style="color:${p._forcaBase && p.force < p._forcaBase ? '#e74c3c' : '#aaa'};font-weight:${p._forcaBase && p.force < p._forcaBase ? 'bold' : 'normal'};">F:${Math.floor(p.force)}</span>${p.capitao ? ' 🅒' : ''} ${typeof getMoralEmoji === 'function' ? getMoralEmoji(p.moral||70) : ''}</span>
                <div style="display:flex;align-items:center;gap:6px;margin-top:3px;">
                    <div style="width:55px;height:4px;background:rgba(255,255,255,0.1);border-radius:2px;overflow:hidden;">
                        <div style="width:${p.energy}%;height:100%;background:${p.energy > 70 ? '#2ecc71' : p.energy > 40 ? '#f1c40f' : '#e74c3c'};"></div>
                    </div>
                    <span style="font-size:9px;color:#888;">${Math.floor(p.energy)}%</span>
                </div>
            </div>
            <div style="display:flex;flex-direction:column;align-items:center;gap:4px;margin-left:8px;flex-shrink:0;">
                ${(p.gols && p.gols > 0) ? `<span style="font-size:11px;color:#fff;font-weight:bold;">${p.gols}⚽</span>` : ''}
                <button onclick="event.stopPropagation();venderJogador(${i})" style="background:#f44336;color:#fff;border:none;padding:6px 10px;border-radius:5px;font-size:10px;font-weight:bold;cursor:pointer;">VENDER</button>
            </div>
        </div>`;
    };

    const titEl = document.getElementById('player-list-titulares');
    const resEl = document.getElementById('player-list-reservas');
    if (titEl) titEl.innerHTML = app.team.players.slice(0, 11).map((p, i) => dr(p, i)).join('');
    if (resEl) resEl.innerHTML = app.team.players.slice(11).map((p, i) => dr(p, i + 11)).join('');
}

// ==========================================
// VENDA POR LEILÃO (JOGADOR DO USUÁRIO)
// ==========================================

let jogadorEmLeilaoSaida = null;

function venderJogador(idx) {
    if (app.team.players.length <= 11) { mostrarToast('❌ Mínimo 11 jogadores!', 'danger'); return; }
    const p = app.team.players[idx];
    const val = calcularValorJogador(p, app.team.l);
    if (confirm(`Colocar ${p.nome} no leilão de transferência?`)) {
        jogadorEmLeilaoSaida = { dados: p, valorBase: val };
        app.team.players.splice(idx, 1);
        mostrarToast(`📢 ${p.nome} foi para o leilão! Ele será vendido após a partida.`, 'gold');
        updateOffice();
    }
}

function processarVendaPendente() {
    if (!jogadorEmLeilaoSaida) return;
    const p = jogadorEmLeilaoSaida.dados;
    const valFinal = Math.floor(jogadorEmLeilaoSaida.valorBase * (0.9 + Math.random() * 0.5));
    const compradores = ["Palmeiras","Flamengo","São Paulo","Atlético-MG","Real Madrid","Manchester City","PSG","Barcelona","Chelsea","Liverpool"];
    const comprador = compradores[Math.floor(Math.random() * compradores.length)];
    app.money += valFinal;
    const timeC = app.teams.find(t => t.nome === comprador);
    if (timeC) timeC.players.push({ ...p });
    mostrarToast(`💰 LEILÃO: ${comprador} pagou R$ ${valFinal.toLocaleString()} por ${p.nome}!`, 'success');
    jogadorEmLeilaoSaida = null;
    updateOffice();
}

// ==========================================
// PRÉ-JOGO
// ==========================================

function abrirPreJogo() {
    try {
        app.minute = 0; app.halfTimeReached = false;
        app._adversarioCache = null;

        // Decide: copa ou liga?
        if (typeof deveJogarCopa === "function" && deveJogarCopa()) {
            app.isCupMatch = true;
            // Marca quando começou esta copa (só na IDA, não na VOLTA)
            if (app.cupLeg !== 2) {
                app.ligaRoundUltimaCopa = app.ligaRound || 0;
            }
            if (typeof gerarJogosCopa === "function") gerarJogosCopa();
        } else {
            app.isCupMatch = false;
            if (typeof gerarJogos === "function") gerarJogos();
        }

        document.getElementById('m-home-name').innerText = "Casa";
        document.getElementById('m-away-name').innerText = "Fora";
        document.getElementById('s-box-color').innerText = "0 - 0";
        document.getElementById('m-half-txt').innerText = "1º TEMPO | 0'";

        document.getElementById('screen-office').style.display = 'none';
        document.getElementById('screen-match').style.display = 'flex';
        document.getElementById('subs-screen').style.display = 'block';
        document.getElementById('round-wrap-games').style.display = 'none';

        document.getElementById('btn-continue').innerText = "APITAR INÍCIO ▶";
        document.getElementById('btn-continue').style.display = 'block';
        document.getElementById('btn-end').style.display = 'none';
        document.getElementById('match-log').innerHTML = "";

        app.teams.forEach(t => t.players.forEach(p => p.scored = false));
        gerenciarMusicaEscritorio(false);
        renderMatchSubs();
    } catch (e) {
        console.error("Erro Partida:", e);
        alert("Erro ao iniciar rodada.");
    }
}

function voltarAoEscritorio() {
    document.getElementById('screen-match').style.display = 'none';
    document.getElementById('screen-office').style.display = 'flex';
    gerenciarMusicaEscritorio(true);
}

// ==========================================
// RENDER SUBSTITUIÇÕES
// ==========================================

function renderMatchSubs() {
    const dr = (p, i) => {
        let statusIcon = p.scored ? " ⚽" : "";
        if (p.cards === 1) statusIcon += " 🟨";
        if (p.status === 'vermelho') statusIcon += " 🟥";
        if (p.status === 'lesão') statusIcon += " 🚑";
        const susp = p.suspJogos > 0;
        const indisponivel = p.status === 'lesão' || p.status === 'vermelho' || susp;
        const coresTime = obterCoresTime(app.team.nome);
        const cor = obterCorSetor(p.pos);
        const icone = gerarIconeCamisa(coresTime, p.num || (i + 1));
        let badge = '';
        if (p.status === 'lesão') badge = '<span style="background:#e74c3c;color:#fff;font-size:9px;padding:2px 6px;border-radius:4px;margin-left:4px;">🚑 LESÃO</span>';
        else if (susp) badge = `<span style="background:#e67e22;color:#fff;font-size:9px;padding:2px 6px;border-radius:4px;margin-left:4px;">🟥 SUSP ${p.suspJogos}j</span>`;
        return `<div class="sub-item ${app.selIdx === i ? 'card-sel' : ''} ${indisponivel ? 'card-disabled' : ''}"
            onclick="selJogador(${i})"
            style="padding:10px;border-bottom:1px solid #222;display:flex;align-items:center;background:var(--card);margin-bottom:4px;border-radius:5px;cursor:pointer;border-left:4px solid ${cor};${indisponivel?'opacity:0.45;':''}">
            <div style="margin-right:10px;">${icone}</div>
            <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:4px;flex-wrap:wrap;">
                    <b style="font-size:10px;color:${cor};">${formatarPosicao(p.pos)}</b>
                    <span style="font-weight:bold;color:#fff;font-size:13px;">${abreviarNome(p.nome)}${statusIcon}</span>
                    ${badge}
                </div>
                <div style="font-size:9px;color:#aaa;margin-top:2px;">Energia: ${Math.floor(p.energy)}%</div>
            </div>
            <b style="margin-left:auto;color:var(--gold);font-size:13px;">${Math.floor(p.force)}</b>
        </div>`;
    };

    // Limpa subs-screen completamente e reconstrói
    const subsScreen = document.getElementById('subs-screen');
    subsScreen.innerHTML = '';

    // Cria novo grid limpo
    const grid = document.createElement('div');
    grid.className = 'subs-grid';
    grid.innerHTML = '<div class="sub-col"><div class="col-title">TITULARES</div><div id="list-titulares-m"></div></div>' +
        '<div class="sub-col" style="border-left:1px solid #222;"><div class="col-title">RESERVAS</div><div id="list-reservas-m"></div></div>';
    subsScreen.appendChild(grid);

    let bVoltar = (app.minute === 0)
        ? '<button onclick="voltarAoEscritorio()" style="width:100%;background:#444;color:#fff;border:none;padding:10px;border-radius:8px;font-weight:bold;margin-bottom:8px;cursor:pointer;">⬅ VOLTAR AO ESCRITÓRIO</button>'
        : "";
    document.getElementById('list-titulares-m').innerHTML = bVoltar + app.team.players.slice(0, 11).map((p, i) => dr(p, i)).join('');
    document.getElementById('list-reservas-m').innerHTML = app.team.players.slice(11).map((p, i) => dr(p, i + 11)).join('');
}

// Grupo de posição para penalidade de força
var _GORD = {G:0, ZAG:1, LD:1, LE:1, VOL:2, MEI:2, PTE:3, PTD:3, CA:3};

function selJogador(i) {
    if (!app.team || !app.team.players[i]) return;
    var noEscritorio = document.getElementById('screen-office').style.display !== 'none';
    if (!noEscritorio && app.team.players[i].status === 'vermelho') return;

    if (app.selIdx === null) {
        app.selIdx = i;
    } else if (app.selIdx === i) {
        app.selIdx = null;
    } else {
        var p1 = app.team.players[app.selIdx];
        var p2 = app.team.players[i];

        // Guarda força e posição originais
        if (!p1._forcaBase) p1._forcaBase = p1.force;
        if (!p2._forcaBase) p2._forcaBase = p2.force;
        if (!p1._posBase) p1._posBase = p1.pos;
        if (!p2._posBase) p2._posBase = p2.pos;

        // Penalidade: baseada na posição ORIGINAL do jogador vs a posição do slot de destino
        // p1 vai para o slot de p2 (cujo pos base é p2._posBase)
        // p2 vai para o slot de p1 (cujo pos base é p1._posBase)
        var dist1 = Math.abs((_GORD[p1._posBase]||0) - (_GORD[p2._posBase]||0));
        var dist2 = Math.abs((_GORD[p2._posBase]||0) - (_GORD[p1._posBase]||0));
        var mult1 = dist1===0?1.0:dist1===1?0.95:dist1===2?0.88:0.80;
        var mult2 = dist2===0?1.0:dist2===1?0.95:dist2===2?0.88:0.80;

        p1.force = Math.max(1, Math.round(p1._forcaBase * mult1));
        p2.force = Math.max(1, Math.round(p2._forcaBase * mult2));

        // NÃO troca o pos — jogador mantém sua posição original (CEN fica CEN)
        // O F: fica vermelho se _posBase != _posBase do slot onde está

        app.team.players[app.selIdx] = p2;
        app.team.players[i] = p1;
        app.selIdx = null;
    }

    if (noEscritorio) updateOffice();
    else renderMatchSubs();
}

function pausarParaAlteracoes() {
    if (app.gameTimeout) clearTimeout(app.gameTimeout);
    app.isPaused = true;
    document.getElementById('subs-screen').style.display = 'block';
    document.getElementById('round-wrap-games').style.display = 'none';
    const btnCont = document.getElementById('btn-continue');
    if (btnCont) { btnCont.innerText = "RETOMAR PARTIDA ▶"; btnCont.style.display = 'block'; }
    renderMatchSubs();
    // Mostra seletor de formação no intervalo / pausa
    _renderSeletorTaticaPartida();
}

function _renderSeletorTaticaPartida() {
    var fixo = document.getElementById('seletor-tatica-fixo');
    var grid = document.getElementById('grid-taticas-fixo');
    if (!fixo || !grid) return;

    fixo.style.display = 'block';
    grid.innerHTML = ''; // limpa e reconstrói só os botões

    var taticas = ["4-3-3","4-4-2","3-5-2","5-4-1","4-5-1","5-3-2","3-4-3","4-2-4","3-4-3","3-3-4"];
    var unicas = taticas.filter(function(v,i,a){ return a.indexOf(v)===i; });

    unicas.forEach(function(t) {
        var btn = document.createElement('button');
        btn.textContent = t;
        var ativa = (app.tatic === t);
        btn.style.cssText = ativa
            ? 'background:#c5a059;color:#000;border:none;padding:12px 2px;border-radius:6px;font-size:11px;font-weight:900;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:rgba(0,0,0,0.2);'
            : 'background:#1a1a1a;color:#aaa;border:1px solid #444;padding:12px 2px;border-radius:6px;font-size:11px;font-weight:bold;cursor:pointer;touch-action:manipulation;-webkit-tap-highlight-color:rgba(0,0,0,0.2);';
        btn.addEventListener('touchend', function(e){ e.preventDefault(); mudarTaticaPartida(t); });
        btn.addEventListener('click', function(){ mudarTaticaPartida(t); });
        grid.appendChild(btn);
    });
}

function _esconderSeletorTatica() {
    var fixo = document.getElementById('seletor-tatica-fixo');
    if (fixo) fixo.style.display = 'none';
}

function mudarTaticaPartida(nome) {
    app.tatic = nome;
    // Limpa trocas manuais para permitir reorganização
    app.team.players.forEach(function(p) {
        delete p._posBase;
        delete p._forcaBase;
    });
    organizarPorTatica();
    renderMatchSubs();
    _renderSeletorTaticaPartida();
    mostrarToast('📋 ' + nome, 'gold');
}

function goToMatch() {
    _esconderSeletorTatica();
    document.getElementById('subs-screen').style.display = 'none';
    document.getElementById('round-wrap-games').style.display = 'block';
    document.getElementById('btn-continue').style.display = 'none';
    tocarApitoInicio();
    startTimer();
}

// ==========================================
// VER ESCALAÇÃO DO ADVERSÁRIO
// ==========================================

let idTimeSelecionado = null;

function verEscalacaoTime(idTime) {
    const time = app.teams.find(t => t.id === idTime);
    if (!time) return;
    idTimeSelecionado = idTime;

    // Reorganiza jogadores do time pelo DB antes de mostrar
    const dbTime = DB.find(d => d.n === time.nome);
    if (dbTime) {
        time.players = dbTime.j.map((x, idx) => {
            const d = x.split(':');
            const force = parseInt(d[2]) || 50;
            const existing = time.players.find(p => p.nome === d[1]);
            return existing ? {...existing, pos:d[0], force:force, num:idx+1} :
                { pos:d[0], nome:d[1], force:force, energy:100, status:'ok', cards:0, scored:false, num:idx+1, salario:calcularSalario(force, time.l), evol:0, gols:0 };
        });
    }

    renderLive();
    if (!app.isPaused && app.minute > 0 && app.minute < 90) pausarParaAlteracoes();
    const cores = obterCoresTime(time.nome);
    const container = document.getElementById('subs-screen');
    container.innerHTML = "";
    const tecnico = obterNomeTecnico(time.nome);
    const fms = ["4-3-3","4-4-2","3-5-2","5-4-1","4-5-1","5-3-2","3-4-3"];
    time.formacao = time.formacao || fms[Math.floor(Math.random() * fms.length)];
    let html = `<div style="padding:15px;background:#000;min-height:100vh;overflow-y:auto;width:100%;">
        <button onclick="voltarParaOsJogos()" style="width:100%;background:#444;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;margin-bottom:12px;cursor:pointer;">⬅ VOLTAR AOS JOGOS</button>
        <h2 style="text-align:center;color:var(--gold);margin-bottom:4px;">${time.nome.toUpperCase()}</h2>
        <div style="text-align:center;font-size:12px;color:#fff;margin-bottom:3px;">👤 Técnico: <b>${tecnico}</b></div>
        <div style="text-align:center;font-size:12px;color:var(--gold);margin-bottom:12px;">📋 ${time.formacao}</div>
        <div class="col-title" style="color:var(--gold);border-bottom:1px solid #333;padding-bottom:4px;margin-bottom:8px;">TITULARES</div>`;
    time.players.forEach((p, i) => {
        if (i === 11) html += `<div class="col-title" style="color:var(--gold);border-bottom:1px solid #333;padding-bottom:4px;margin-top:16px;margin-bottom:8px;">RESERVAS</div>`;
        const icone = gerarIconeCamisa(cores, p.num || (i + 1));
        const cor = obterCorSetor(p.pos);
        const corE = p.energy > 70 ? '#2ecc71' : p.energy > 40 ? '#f1c40f' : '#e74c3c';
        let sta = p.scored ? " ⚽" : "";
        if (p.status === 'vermelho') sta += " 🟥";
        if (p.status === 'lesão') sta += " 🚑";
        html += `<div style="display:flex;align-items:center;background:#111;padding:8px;border-radius:8px;margin-bottom:5px;border-left:4px solid ${cor};">
            <div style="margin-right:10px;">${icone}</div>
            <div style="flex:1;">
                <div style="display:flex;align-items:center;gap:4px;">
                    <b style="font-size:10px;color:${cor};">${formatarPosicao(p.pos)}</b>
                    <span style="font-weight:bold;color:#fff;font-size:13px;">${abreviarNome(p.nome)}${sta}</span>
                </div>
                <div style="font-size:10px;color:#666;margin-top:2px;">F:${Math.floor(p.force)} | E:<span style="color:${corE}">${Math.floor(p.energy)}%</span></div>
            </div>
        </div>`;
    });
    html += `</div>`;
    container.innerHTML = html;
    container.style.display = 'block';
    document.getElementById('round-wrap-games').style.display = 'none';
}

function voltarParaOsJogos() {
    idTimeSelecionado = null;
    document.getElementById('subs-screen').style.display = 'none';
    document.getElementById('round-wrap-games').style.display = 'block';
    renderLive();
    if (app.isPaused || app.minute === 0) {
        document.getElementById('subs-screen').style.display = 'block';
        document.getElementById('round-wrap-games').style.display = 'none';
        renderMatchSubs();
    }
}

window.verEscalacaoTime = verEscalacaoTime;

// ==========================================
// RENDER LIVE
// ==========================================

function renderLive() {
    if (!app.matches) return;
    const idFoco = idTimeSelecionado || app.team.id;
    const jogoFocado = app.matches.find(m => m.t1.id === idFoco || m.t2.id === idFoco);
    if (jogoFocado) {
        document.getElementById('m-home-name').innerText = jogoFocado.t1.nome;
        document.getElementById('m-away-name').innerText = jogoFocado.t2.nome;
        let placar = `${jogoFocado.g1} - ${jogoFocado.g2}`;
        if (app.isCupMatch && app.cupLeg === 2) {
            placar += ` (${jogoFocado.g1 + (jogoFocado.t1.golsIda||0)}-${jogoFocado.g2 + (jogoFocado.t2.golsIda||0)})`;
        }
        document.getElementById('s-box-color').innerText = placar;
    }
    let html = "";
    if (app.isCupMatch) {
        html += `<div class="div-header">🏆 COPA MUNDIAL (${app.cupStage || 'ELIMINATÓRIAS'})</div>`;
        app.matches.forEach(m => html += renderLinhaJogo(m, true));
    } else {
        ["E","1","2","3","4"].forEach(dv => {
            const jogos = app.matches.filter(m => m.l === dv);
            if (jogos.length > 0) {
                html += `<div class="div-header">${dv === "E" ? "🌍 LIGA EUROPA" : "SÉRIE " + dv}</div>`;
                jogos.forEach(m => html += renderLinhaJogo(m, false));
            }
        });
    }
    document.getElementById('live-round-list').innerHTML = html;
}

function renderLinhaJogo(m, isCup) {
    const isU = (m.t1.id === app.team.id || m.t2.id === app.team.id);
    let pLive = `${m.g1} x ${m.g2}`;
    if (isCup && app.cupLeg === 2) pLive = `${m.g1} (${m.g1 + (m.t1.golsIda||0)}) x (${m.g2 + (m.t2.golsIda||0)}) ${m.g2}`;
    const sel1 = idTimeSelecionado === m.t1.id ? 'background:rgba(197,160,89,0.25);border-radius:4px;' : '';
    const sel2 = idTimeSelecionado === m.t2.id ? 'background:rgba(197,160,89,0.25);border-radius:4px;' : '';
    return `<div class="match-line-j" style="background:${isU ? 'rgba(197,160,89,0.08)' : 'transparent'}">
        <span onclick="verEscalacaoTime(${m.t1.id})" style="flex:1;color:${m.t1.id===app.team.id?'#28a745':'#fff'};cursor:pointer;padding:4px;${sel1}">${m.t1.nome}</span>
        <b style="color:var(--gold);min-width:80px;text-align:center;">${pLive}</b>
        <span onclick="verEscalacaoTime(${m.t2.id})" style="flex:1;text-align:right;color:${m.t2.id===app.team.id?'#28a745':'#fff'};cursor:pointer;padding:4px;${sel2}">${m.t2.nome}</span>
    </div>`;
}

function _animacaoGol(nomeTime, nomeAutor, éMeu) {
    // Só pisca o placar — sem flash de tela
    const scoreBox = document.getElementById('s-box-color');
    if (scoreBox) {
        let pisca = 0;
        const cor = éMeu ? '#2ecc71' : '#e74c3c';
        const intervalo = setInterval(() => {
            pisca++;
            scoreBox.style.background = pisca % 2 === 0 ? '' : cor;
            scoreBox.style.color = pisca % 2 === 0 ? '' : '#fff';
            if (pisca >= 6) { clearInterval(intervalo); scoreBox.style.background=''; scoreBox.style.color=''; }
        }, 150);
    }
}

function addLog(t, pos) {
    const logCont = document.getElementById('match-log');
    if (!logCont) return;
    let cor = pos ? '#4caf50' : '#ffffff';
    if (t.includes("⚽")) cor = '#f1c40f';
    if (t.includes("🟥") || t.includes("🚑") || t.includes("🟨🟥")) cor = '#e74c3c';
    if (t.includes("🟨")) cor = '#ffeb3b';
    logCont.innerHTML = `<div style="color:${cor};margin-bottom:5px;font-weight:bold;font-size:12px;border-left:3px solid ${cor};padding-left:4px;">[${app.minute}'] ${t}</div>` + logCont.innerHTML;
}

// ==========================================
// IA SUBSTITUIÇÃO
// ==========================================

function executarIASubstituicao(time) {
    if (time.id === app.team.id) return;
    const titulares = time.players.slice(0, 11);
    const reservas  = time.players.slice(11);
    for (let i = 0; i < 11; i++) {
        const p = titulares[i];
        if (p.energy < 60 || p.status !== 'ok') {
            const sub = reservas.filter(r => converterPosicaoParaGrupo(r.pos) === converterPosicaoParaGrupo(p.pos) && r.status === 'ok' && r.energy > 80)
                .sort((a, b) => b.force - a.force)[0];
            if (sub) {
                const idxR = time.players.indexOf(sub);
                time.players[i] = sub; time.players[idxR] = p; break;
            }
        }
    }
}

// ==========================================
// PENALIDADE POR POSIÇÃO ERRADA
// ==========================================

function calcularPenalidadePosicao(time, tatica) {
    const taticaObj = LISTA_TATICAS.find(t => t.n === tatica) || LISTA_TATICAS[0];
    const tit = time.players.slice(0, 11);
    let penalidade = 0;
    const contaPos = { G: 0, D: 0, M: 0, A: 0 };
    tit.forEach(p => { const g = converterPosicaoParaGrupo(p.pos); if (contaPos[g] !== undefined) contaPos[g]++; });
    // Diferença de goleiros
    if (contaPos.G < 1) penalidade += 20;
    // Diferença de defensores
    penalidade += Math.max(0, taticaObj.g.D - contaPos.D) * 3;
    // Diferença de meias
    penalidade += Math.max(0, taticaObj.g.M - contaPos.M) * 2;
    // Diferença de atacantes
    penalidade += Math.max(0, taticaObj.g.A - contaPos.A) * 2;
    return penalidade;
}

// ==========================================
// VANTAGEM EM CASA
// ==========================================

function calcularVantagemCasa(jogo, time) {
    // t1 = mandante sempre tem +8% de bônus
    if (jogo.t1.id === time.id) return 1.08;
    // t2 = visitante tem -3% (pressão da torcida adversária)
    return 0.97;
}

// ==========================================
// CARTÕES, LESÕES E GOLEIRO EXPULSO
// ==========================================

function processarEventosEspeciais(match, time, isHome) {
    const tit = time.players.slice(0, 11).filter(p => p.status === 'ok');
    if (tit.length === 0) return;
    const p = tit[Math.floor(Math.random() * tit.length)];
    const isNossaPartida = (match.t1.id === app.team.id || match.t2.id === app.team.id);
    const isPlayerDoNossoTime = (time.id === app.team.id);

    // Chance de cartão amarelo (1.5% por minuto)
    if (Math.random() < 0.015) {
        p.cards = (p.cards || 0) + 1;
        if (p.cards >= 2) {
            // 2 amarelos = vermelho
            p.status = 'vermelho';
            p.cards = 0;
            if (isNossaPartida) {
                addLog(`🟨🟥 ${p.nome} (${time.nome}) EXPULSO por 2 cartões amarelos!`, isPlayerDoNossoTime);
                tocarSomExpulsao();
            }
            // Se for goleiro do nosso time, avisa que precisa tirar um de linha
            if (p.pos === 'G' && isPlayerDoNossoTime) {
                const reservas = app.team.players.slice(11);
                const golRes = reservas.find(r => r.pos === 'G' && r.status === 'ok');
                if (golRes) {
                    // Auto-coloca o goleiro reserva
                    const idxGol = app.team.players.indexOf(p);
                    const idxRes = app.team.players.indexOf(golRes);
                    app.team.players[idxGol] = golRes;
                    app.team.players[idxRes] = p;
                    addLog(`🧤 ${golRes.nome} entra como goleiro substituto!`, true);
                } else {
                    addLog(`⚠️ GOLEIRO EXPULSO! Você deve tirar um jogador de linha para colocar um reserva na posição!`, true);
                    setTimeout(() => mostrarToast('⚠️ Goleiro expulso! Faça uma substituição de emergência!', 'danger'), 300);
                }
            }
        } else {
            if (isNossaPartida) addLog(`🟨 ${p.nome} (${time.nome}) recebeu cartão amarelo!`, isPlayerDoNossoTime);
        }
    }

    // Chance de lesão (0.8% por minuto)
    if (Math.random() < 0.008 && p.status === 'ok') {
        p.status = 'lesão';
        if (isNossaPartida) {
            addLog(`🚑 ${p.nome} (${time.nome}) sofreu lesão e saiu de campo!`, isPlayerDoNossoTime);
            tocarSomLesao();
        }
        // IA auto-substitui
        if (time.id !== app.team.id) {
            const sub = time.players.slice(11).find(r => r.status === 'ok' && r.energy > 30);
            if (sub) {
                const idxP = time.players.indexOf(p);
                const idxS = time.players.indexOf(sub);
                time.players[idxP] = sub; time.players[idxS] = p;
            }
        }
    }
}

// ==========================================
// PÊNALTIS (COPA, EMPATE NO AGREGADO)
// ==========================================

function disputarPenaltis(t1, t2) {
    let g1 = 0, g2 = 0;
    for (let i = 0; i < 5; i++) {
        if (Math.random() > 0.25) g1++;
        if (Math.random() > 0.25) g2++;
    }
    while (g1 === g2) {
        if (Math.random() > 0.25) g1++;
        if (Math.random() > 0.25) g2++;
    }
    const vencedor = g1 > g2 ? t1 : t2;
    addLog(`⚽ PÊNALTIS: ${t1.nome} ${g1} x ${g2} ${t2.nome} — ${vencedor.nome} AVANÇA!`, vencedor.id === app.team.id);
    return { vencedor, placar: `${g1}-${g2}` };
}

// ==========================================
// PÊNALTI INTERATIVO (USUÁRIO ESCOLHE COBRADOR)
// ==========================================

function abrirEscolhaPenalti(match, timeAtacante, timeDefensor) {
    const tit = app.team.players.slice(0, 11).filter(p => p.status === 'ok' && p.pos !== 'G');
    if (tit.length === 0) { resolverPenaltiIA(match, timeAtacante, true); return; }

    // Usa modal dedicado para pênalti — não interfere na tela de substituição
    let modal = document.getElementById('modal-penalti');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-penalti';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);z-index:50000;display:flex;flex-direction:column;overflow-y:auto;';
        document.body.appendChild(modal);
    }

    let html = `<div style="padding:20px;padding-bottom:40px;">
        <div style="text-align:center;margin-bottom:15px;">
            <div style="font-size:36px;">🟡</div>
            <div style="color:#f1c40f;font-size:20px;font-weight:900;margin-top:5px;">PÊNALTI!</div>
            <div style="color:#fff;font-size:13px;margin-top:5px;">O juiz marcou pênalti para o <b>${timeAtacante.nome}</b>!</div>
            <div style="color:#aaa;font-size:12px;margin-top:3px;">Escolha o cobrador:</div>
        </div>`;

    tit.sort((a,b) => b.force - a.force).forEach((p) => {
        const cor = obterCorSetor(p.pos);
        const chance = Math.min(95, 60 + Math.floor(p.force * 0.4));
        const idx = app.team.players.indexOf(p);
        html += `<div onclick="baterPenalti(${idx})"
            style="display:flex;align-items:center;padding:14px;background:#1a1a1a;border-radius:10px;margin-bottom:10px;border-left:4px solid ${cor};cursor:pointer;active:opacity:0.7;">
            <div style="flex:1;">
                <b style="color:#fff;font-size:15px;">${abreviarNome(p.nome)}</b>
                <span style="color:${cor};font-size:11px;margin-left:6px;">${formatarPosicao(p.pos)}</span><br>
                <span style="color:#aaa;font-size:12px;">Força: ${Math.floor(p.force)} | Conversão: ~${chance}%</span>
            </div>
            <div style="background:var(--gold);color:#000;padding:10px 16px;border-radius:8px;font-weight:900;font-size:14px;">BATER ⚽</div>
        </div>`;
    });

    html += `<button onclick="baterPenaltiAleatorio()"
        style="width:100%;background:#222;color:#aaa;border:1px solid #333;padding:14px;border-radius:10px;margin-top:5px;font-size:13px;font-weight:bold;cursor:pointer;">
        🎲 Deixar o time escolher
    </button></div>`;

    modal.innerHTML = html;
    modal.style.display = 'flex';
}

function baterPenaltiAleatorio() {
    const tit = app.team.players.slice(0, 11).filter(p => p.status === 'ok' && p.pos !== 'G');
    if (tit.length === 0) return;
    const p = tit[Math.floor(Math.random() * tit.length)];
    baterPenalti(app.team.players.indexOf(p));
}

function baterPenalti(idx) {
    if (!app._penaltiPendente) return;
    const p = app.team.players[idx];
    if (!p) return;
    const match = app._penaltiPendente.match;
    const isHome = match.t1.id === app.team.id;
    const chance = Math.min(0.95, 0.60 + p.force * 0.004);
    const converteu = Math.random() < chance;

    // Fecha modal de pênalti
    const modal = document.getElementById('modal-penalti');
    if (modal) modal.style.display = 'none';

    app._penaltiPendente = null;
    app.isPaused = false;

    if (converteu) {
        if (isHome) match.g1++; else match.g2++;
        p.scored = true;
        addLog(`⚽ GOLAÇO de pênalti! ${p.nome} converte para o ${app.team.nome}!`, true);
        tocarSomGol();
    } else {
        addLog(`❌ ${p.nome} bateu... DEFENDIDO! O goleiro salvou!`, false);
        tocarApitoEvento();
    }

    // Volta para tela de jogos
    const subs = document.getElementById('subs-screen');
    const roundWrap = document.getElementById('round-wrap-games');
    if (subs) subs.style.display = 'none';
    if (roundWrap) roundWrap.style.display = 'block';

    renderLive();
    // Retoma o jogo
    app.gameTimeout = setTimeout(processarMinuto, app.configTimer || 300);
}

function resolverPenaltiIA(match, timeAtacante, isHome) {
    const tit = (isHome ? match.t1 : match.t2).players.slice(0,11)
        .filter(p => p.status==='ok' && p.pos!=='G')
        .sort((a,b)=>b.force-a.force);
    const batedor = tit[0];
    const converte = Math.random() > 0.25;
    if (converte) {
        if (isHome) match.g1++; else match.g2++;
        if (batedor) batedor.scored = true;
        addLog(`⚽ Pênalti convertido por ${batedor ? batedor.nome : '?'} (${timeAtacante.nome})!`, timeAtacante.id === app.team.id);
    } else {
        addLog(`❌ Pênalti defendido contra ${timeAtacante.nome}!`, timeAtacante.id !== app.team.id);
    }
}

// ==========================================
// LOOP PRINCIPAL DA PARTIDA
// ==========================================

function processarMinuto() {
    if (app.minute >= 90 || app.isPaused) return;
    if (app.minute === 1) { gerenciarMusicaEscritorio(false); gerenciarSomPartida(true); }
    app.minute++;

    const elMin = document.getElementById('m-half-txt');
    if (elMin) {
        const tempo = app.minute <= 45 ? `1º TEMPO | ${app.minute}'` : `2º TEMPO | ${app.minute}'`;
        elMin.innerText = tempo;
    }

    app.matches.forEach(m => {
        executarIASubstituicao(m.t1);
        executarIASubstituicao(m.t2);

        // Eventos especiais (cartões, lesões) — apenas para alguns jogos a cada minuto
        if (Math.random() < 0.3) processarEventosEspeciais(m, m.t1, true);
        if (Math.random() < 0.3) processarEventosEspeciais(m, m.t2, false);

        const tit1 = m.t1.players.slice(0, 11);
        const tit2 = m.t2.players.slice(0, 11);

        let f1 = 0, f2 = 0;
        tit1.forEach(p => { if (p && p.status === 'ok') f1 += p.force * (p.energy / 100); });
        tit2.forEach(p => { if (p && p.status === 'ok') f2 += p.force * (p.energy / 100); });

        // Bônus por divisão — times europeus são muito mais fortes
        const _bonusDiv = function(liga) {
            if (liga === 'E') return 1.35;  // Europa +35% vs qualquer time
            if (liga === '1') return 1.10;  // Série A +10%
            if (liga === '2') return 1.0;
            if (liga === '3') return 0.92;
            return 0.85; // Série D -15%
        };
        f1 *= _bonusDiv(m.t1.l || '4');
        f2 *= _bonusDiv(m.t2.l || '4');

        // Penalidade por posição errada (apenas para o time do usuário)
        if (m.t1.id === app.team.id) {
            const pen = calcularPenalidadePosicao(m.t1, app.tatic || "4-4-2");
            f1 = Math.max(f1 - pen, 1);
        }

        // Vantagem em casa
        f1 *= calcularVantagemCasa(m, m.t1);
        f2 *= calcularVantagemCasa(m, m.t2);
        const dif = Math.abs(f1 - f2);
        let fat = (m.l === "4") ? 850 : 2100;
        fat += dif * 3;

        const idFoco = idTimeSelecionado || app.team.id;
        const jogoVisto = (m.t1.id === idFoco || m.t2.id === idFoco);

        if (Math.random() * fat < (f1 / 8)) {
            m.g1++;
            const autor = tit1.filter(p => p.status === 'ok' && p.pos !== 'G')[Math.floor(Math.random() * 10)] || tit1[10];
            if (autor) autor.scored = true;
            if (jogoVisto) {
                const isMe = (m.t1.id === app.team.id);
                addLog(`⚽ GOL do ${m.t1.nome}! (${autor ? autor.nome : '?'})`, isMe);
                isMe ? tocarSomGol() : tocarSomGolSofrido();
                _animacaoGol(m.t1.nome, autor ? autor.nome : '?', isMe);
            }
        }
        if (Math.random() * fat < (f2 / 8)) {
            m.g2++;
            const autor = tit2.filter(p => p.status === 'ok' && p.pos !== 'G')[Math.floor(Math.random() * 10)] || tit2[10];
            if (autor) autor.scored = true;
            if (jogoVisto) {
                const isMe = (m.t2.id === app.team.id);
                addLog(`⚽ GOL do ${m.t2.nome}! (${autor ? autor.nome : '?'})`, isMe);
                isMe ? tocarSomGol() : tocarSomGolSofrido();
                _animacaoGol(m.t2.nome, autor ? autor.nome : '?', isMe);
            }
        }

        // ── PÊNALTI DURANTE O JOGO (1.5% de chance por minuto, por partida) ──
        if (!app._penaltiPendente && Math.random() < 0.015) {
            const isNossaPartida = (m.t1.id === app.team.id || m.t2.id === app.team.id);
            const penTimeHome = Math.random() > 0.5; // true = pênalti pro time da casa
            const timeQueGanha = penTimeHome ? m.t1 : m.t2;
            const timeQueDefende = penTimeHome ? m.t2 : m.t1;

            if (isNossaPartida && timeQueGanha.id === app.team.id) {
                // Pênalti PARA o nosso time → jogador escolhe
                app._penaltiPendente = { match: m, paraTime: timeQueGanha, contra: timeQueDefende };
                clearTimeout(app.gameTimeout);
                app.isPaused = true;
                addLog(`🟡 PÊNALTI para o ${timeQueGanha.nome}! Escolha o cobrador!`, true);
                tocarApitoEvento();
                setTimeout(() => abrirEscolhaPenalti(m, timeQueGanha, timeQueDefende), 400);
            } else {
                // Pênalti da IA
                const batedor = (penTimeHome ? tit1 : tit2).filter(p => p.status === 'ok' && p.pos !== 'G').sort((a,b)=>b.force-a.force)[0];
                const converte = Math.random() > 0.25;
                if (converte) {
                    if (penTimeHome) { m.g1++; if (batedor) batedor.scored = true; }
                    else             { m.g2++; if (batedor) batedor.scored = true; }
                    if (jogoVisto) {
                        addLog(`🟡 PÊNALTI convertido por ${batedor ? batedor.nome : '?'} (${timeQueGanha.nome})!`, timeQueGanha.id === app.team.id);
                        tocarSomGol();
                    }
                } else {
                    if (jogoVisto) addLog(`❌ Pênalti defendido! ${timeQueDefende.nome} salva!`, timeQueDefende.id === app.team.id);
                }
            }
        }

        // Desgaste de energia
        tit1.forEach(p => { if (p && p.status === 'ok') p.energy = Math.max(0, p.energy - 0.3); });
        tit2.forEach(p => { if (p && p.status === 'ok') p.energy = Math.max(0, p.energy - 0.3); });
    });

    renderLive();

    if (app.minute === 45 && !app.halfTimeReached) {
        app.halfTimeReached = true; app.isPaused = true;
        tocarApitoEvento();
        pausarParaAlteracoes();
        return;
    }
    if (app.minute >= 90) {
        const bE = document.getElementById('btn-end');
        if (bE) bE.style.display = 'block';
        tocarApitoEvento();
        finalizeStats();
        return;
    }
    app.gameTimeout = setTimeout(processarMinuto, app.configTimer || 300);
}

function startTimer() {
    if (app.gameTimeout) clearTimeout(app.gameTimeout);
    app.isPaused = false;
    processarMinuto();
}

// ==========================================
// FINALIZAR ESTATÍSTICAS
// ==========================================

// Prêmios por divisão (vitória / empate / derrota)
const PREMIOS_DIVISAO = {
    "E": { v: 5000000,  e: 1000000,  d: -2000000 },
    "1": { v: 800000,   e: 200000,   d: -300000  },
    "2": { v: 200000,   e: 50000,    d: -80000   },
    "3": { v: 50000,    e: 10000,    d: -20000   },
    "4": { v: 10000,    e: 2000,     d: -5000    }
};

function finalizeStats() {
    if (!app.matches) return;
    app.matches.forEach(m => {
        if (app.isCupMatch) {
            if (app.cupLeg === 1) { m.t1.golsIda = m.g1; m.t2.golsIda = m.g2; }
        } else {
            m.t1.j++; m.t2.j++;
            // V/E/D
            if (m.g1 > m.g2)      { m.t1.pts += 3; m.t1.v = (m.t1.v||0)+1; m.t2.d = (m.t2.d||0)+1; }
            else if (m.g1===m.g2) { m.t1.pts += 1; m.t2.pts += 1; m.t1.e=(m.t1.e||0)+1; m.t2.e=(m.t2.e||0)+1; }
            else                   { m.t2.pts += 3; m.t2.v = (m.t2.v||0)+1; m.t1.d = (m.t1.d||0)+1; }
            m.t1.sg += (m.g1 - m.g2); m.t2.sg += (m.g2 - m.g1);
            // Gols marcados
            m.t1.gm = (m.t1.gm||0) + m.g1; m.t2.gm = (m.t2.gm||0) + m.g2;
            // Artilharia acumulada
            const _reg = (time) => time.players.filter(p=>p.scored).forEach(p => {
                app.artilharia[p.nome] = (app.artilharia[p.nome]||0) + 1;
                p.gols = (p.gols||0) + 1;
            });
            _reg(m.t1); _reg(m.t2);
        }
    });

    // Atualizar barras + dinheiro para o jogo do usuário
    const meuJogo = app.matches.find(m => m.t1.id === app.team.id || m.t2.id === app.team.id);
    if (meuJogo) {
        const isHome = meuJogo.t1.id === app.team.id;
        if (typeof verificarDesafio === 'function') verificarDesafio(meuJogo, isHome);
        const meuGol = isHome ? meuJogo.g1 : meuJogo.g2;
        const advGol = isHome ? meuJogo.g2 : meuJogo.g1;
        const premio = PREMIOS_DIVISAO[app.team.l] || PREMIOS_DIVISAO["4"];

        if (meuGol > advGol) {
            atualizarBarras('vitoria');
            app.money += premio.v;
            mostrarToastRapido(`✅ VITÓRIA! +R$ ${premio.v.toLocaleString()}`, 'success');
        } else if (meuGol === advGol) {
            atualizarBarras('empate');
            app.money += premio.e;
            mostrarToastRapido(`🤝 Empate. +R$ ${premio.e.toLocaleString()}`, 'info');
        } else {
            atualizarBarras('derrota');
            app.money += premio.d;
            mostrarToastRapido(`❌ Derrota. -R$ ${Math.abs(premio.d).toLocaleString()}`, 'danger');
        }
    }
}

// ==========================================
// LEILÃO RELÂMPAGO (a cada 2~3 partidas)
// ==========================================

let leilaoAtivo = false;
let dadosLeilao = { jogador: null, lanceAtual: 0, donoLance: "", tempo: 10, timerId: null };

const BANCO_DADOS_CRAQUES = {
    "Mbappé":        { clube: "Real Madrid",     pos: "CA" },
    "Vini Jr":       { clube: "Real Madrid",     pos: "PTE" },
    "Haaland":       { clube: "Manchester City", pos: "CA" },
    "Rodrygo":       { clube: "Real Madrid",     pos: "PTD" },
    "Bellingham":    { clube: "Real Madrid",     pos: "MEI" },
    "De Bruyne":     { clube: "Manchester City", pos: "MEI" },
    "Salah":         { clube: "Liverpool",       pos: "PTD" },
    "Harry Kane":    { clube: "Bayern Munique",  pos: "CA" },
    "Lewandowski":   { clube: "Barcelona",       pos: "CA" },
    "Lamine Yamal":  { clube: "Barcelona",       pos: "PTD" },
    "Musiala":       { clube: "Bayern Munique",  pos: "MEI" },
    "Raphael Veiga": { clube: "Palmeiras",       pos: "MEI" },
    "Arrascaeta":    { clube: "Flamengo",        pos: "MEI" },
    "Pedro":         { clube: "Flamengo",        pos: "CA" },
    "Hulk":          { clube: "Atlético-MG",     pos: "PTD" },
    "Calleri":       { clube: "São Paulo",       pos: "CA" },
    "Payet":         { clube: "Vasco",           pos: "MEI" },
    "Cazares":       { clube: "Paysandu",        pos: "MEI" },
};

const TIMES_ELITE = ["Real Madrid","Manchester City","Bayern Munique","Barcelona","PSG","Chelsea","Liverpool","Arsenal","Inter de Milão","Paris Saint-Germain"];

const LIMITES_SERIE_LEILAO = {
    "1": { min: 10000000,  max: 80000000 },
    "2": { min: 2000000,   max: 10000000 },
    "3": { min: 500000,    max: 2000000 },
    "4": { min: 100000,    max: 500000 },
    "E": { min: 80000000,  max: 250000000 }
};

function checarChanceLeilao() {
    app.leilaoRodada = (app.leilaoRodada || 0) + 1;
    const intervalo = 2 + Math.floor(Math.random() * 2); // a cada 2 ou 3 partidas
    if (app.leilaoRodada >= intervalo) {
        app.leilaoRodada = 0;
        setTimeout(() => {
            const modal = document.getElementById('modal-leilao');
            if (modal) {
                // Fecha toast pendente antes de abrir leilão
                var gt = document.getElementById('gtoast');
                if (gt && gt.parentNode) gt.parentNode.removeChild(gt);
                modal.style.display = 'flex';
                iniciarLeilao();
            }
        }, 1800);
    }
}

function iniciarLeilao() {
    leilaoAtivo = true;
    const nomesExtra = ["Cauã","Rayan","Tiquinho","Galarza","Bentancur","Zaracho","Dudu","Jonas Craque","Gabriel","Everton","Renato","Adriano","Pablo"];
    const isCraque = Math.random() > 0.35;
    const nomesCraques = Object.keys(BANCO_DADOS_CRAQUES);
    const nomeSorteado = isCraque
        ? nomesCraques[Math.floor(Math.random() * nomesCraques.length)]
        : nomesExtra[Math.floor(Math.random() * nomesExtra.length)];

    let timeOrigem, posicao, forca, valorBase;

    // Busca o jogador nos times
    let found = null, foundTeam = null;
    app.teams.forEach(t => {
        const pf = t.players.find(p => p.nome === nomeSorteado);
        if (pf) { found = pf; foundTeam = t; }
    });

    if (found) {
        timeOrigem = foundTeam.nome; posicao = found.pos; forca = Math.floor(found.force);
    } else if (isCraque && BANCO_DADOS_CRAQUES[nomeSorteado]) {
        timeOrigem = BANCO_DADOS_CRAQUES[nomeSorteado].clube;
        posicao = BANCO_DADOS_CRAQUES[nomeSorteado].pos;
        forca = Math.floor(Math.random() * (99 - 88 + 1)) + 88;
    } else {
        const tsMen = ["Bragantino","Fortaleza","Bahia","Vitória","Cuiabá","Ituano","Ponte Preta","Mirassol"];
        timeOrigem = tsMen[Math.floor(Math.random() * tsMen.length)];
        posicao = ["G","ZAG","LD","LE","VOL","MEI","PTE","PTD","CA"][Math.floor(Math.random() * 9)];
        forca = Math.floor((app.round * 0.2) + 15 + Math.random() * 20);
    }

    if (TIMES_ELITE.includes(timeOrigem) || forca > 87) valorBase = Math.floor(forca * 1500000);
    else if (forca > 75) valorBase = Math.floor(forca * 500000);
    else valorBase = Math.floor(forca * 6000);

    dadosLeilao.jogador = {
        nome: nomeSorteado, timeOrigem, pos: posicao, force: forca,
        energy: 100, status: 'ok', cards: 0, scored: false,
        num: Math.floor(Math.random() * 99) + 1,
        salario: calcularSalario(forca, app.team.l)
    };
    dadosLeilao.lanceAtual = valorBase;
    dadosLeilao.donoLance = "Lance Inicial";
    dadosLeilao.tempo = 12;

    atualizarTelaLeilao();
    if (dadosLeilao.timerId) clearInterval(dadosLeilao.timerId);
    dadosLeilao.timerId = setInterval(() => {
        if (!leilaoAtivo) { clearInterval(dadosLeilao.timerId); dadosLeilao.timerId = null; return; }
        dadosLeilao.tempo--;
        const elT = document.getElementById('leilao-contagem');
        if (elT) elT.innerText = dadosLeilao.tempo + "s";
        if (Math.random() < 0.35) processarLanceIA();
        if (dadosLeilao.tempo <= 0) finalizarLeilao();
        else atualizarTelaLeilao();
    }, 1000);
}

function atualizarTelaLeilao() {
    const p = dadosLeilao.jogador;
    if (!p) return;
    const cor = obterCorSetor(p.pos);
    const elCard = document.getElementById('leilao-card');
    if (elCard) elCard.innerHTML = `
        <b style="color:${cor};font-size:16px;">${formatarPosicao(p.pos)} - ${p.nome}</b>
        <div style="color:#aaa;font-size:12px;">${p.timeOrigem}</div>
        <div style="color:var(--gold);font-size:18px;font-weight:900;margin-top:5px;">FORÇA: ${Math.floor(p.force)}</div>
        <div style="color:#aaa;font-size:11px;">💸 Salário: R$ ${p.salario.toLocaleString()}/mês</div>`;
    const elV = document.getElementById('leilao-lance-valor');
    if (elV) elV.innerText = "R$ " + dadosLeilao.lanceAtual.toLocaleString();
    const elD = document.getElementById('leilao-lance-dono');
    if (elD) elD.innerText = "Dono do lance: " + dadosLeilao.donoLance;
}

function darLanceUsuario() {
    const isElite = TIMES_ELITE.includes(dadosLeilao.jogador.timeOrigem) || dadosLeilao.jogador.force > 88;
    if (isElite && ["2","3","4"].includes(app.team.l)) {
        mostrarToast(`🚫 ${dadosLeilao.jogador.nome} não tem interesse em jogar na Série ${app.team.l}!`, 'danger');
        return;
    }
    const prox = Math.floor(dadosLeilao.lanceAtual * 1.1);
    if (app.money < prox) { mostrarToast('Saldo insuficiente!', 'danger'); return; }
    dadosLeilao.lanceAtual = prox;
    dadosLeilao.donoLance = app.coach;
    dadosLeilao.tempo = Math.max(dadosLeilao.tempo, 5);
    atualizarTelaLeilao();
}

function processarLanceIA() {
    const rivais = app.teams.filter(t => t.id !== app.team.id && t.nome !== dadosLeilao.jogador.timeOrigem);
    const timeIA = rivais[Math.floor(Math.random() * rivais.length)];
    if (!timeIA) return;
    const isElite = TIMES_ELITE.includes(dadosLeilao.jogador.timeOrigem) || dadosLeilao.jogador.force > 88;
    if (isElite && ["2","3","4"].includes(timeIA.l)) return;
    const cfg = LIMITES_SERIE_LEILAO[timeIA.l] || LIMITES_SERIE_LEILAO["4"];
    // Saldo máximo REAL que o time IA pode pagar (baseado na série dele)
    let saldo = Math.floor(Math.random() * (cfg.max - cfg.min)) + cfg.min;
    const prox = Math.floor(dadosLeilao.lanceAtual * 1.1);
    // Time de série baixa NUNCA ultrapassa o teto da sua série
    if (prox > cfg.max) return;
    if (prox > saldo) return;
    const fMedia = timeIA.players.reduce((a, b) => a + b.force, 0) / timeIA.players.length;
    if (fMedia < dadosLeilao.jogador.force + 2 || dadosLeilao.jogador.force > 85) {
        dadosLeilao.lanceAtual = prox;
        dadosLeilao.donoLance = timeIA.nome;
        dadosLeilao.tempo = Math.max(dadosLeilao.tempo, 4);
    }
}

function finalizarLeilao() {
    leilaoAtivo = false;
    if (dadosLeilao.timerId) { clearInterval(dadosLeilao.timerId); dadosLeilao.timerId = null; }

    const remover = (nome) => {
        app.teams.forEach(t => {
            const idx = t.players.findIndex(p => p.nome === nome);
            if (idx !== -1) t.players.splice(idx, 1);
        });
    };

    if (dadosLeilao.donoLance === "Lance Inicial") {
        document.getElementById('modal-leilao').style.display = 'none'; return;
    }

    const isElite = TIMES_ELITE.includes(dadosLeilao.jogador.timeOrigem) || dadosLeilao.jogador.force > 88;
    const timeVencObj = app.teams.find(t => t.nome === dadosLeilao.donoLance) || app.team;
    let aceita = true;
    if (isElite && ["2","3","4"].includes(timeVencObj.l)) aceita = Math.random() > 0.98;
    if (isElite && timeVencObj.l === "1") aceita = Math.random() > 0.30;
    if (Math.random() < 0.05) aceita = false;

    if (aceita) {
        if (dadosLeilao.donoLance === app.coach) {
            remover(dadosLeilao.jogador.nome);
            app.money -= dadosLeilao.lanceAtual;
            app.team.players.push({ ...dadosLeilao.jogador });
            mostrarToast(`🏆 Você contratou ${dadosLeilao.jogador.nome}!`, 'success');
        } else {
            const tv = app.teams.find(t => t.nome === dadosLeilao.donoLance);
            if (tv) { remover(dadosLeilao.jogador.nome); tv.players.push({ ...dadosLeilao.jogador }); }
            mostrarToast(`💰 ${dadosLeilao.jogador.nome} foi para o ${dadosLeilao.donoLance} por R$ ${dadosLeilao.lanceAtual.toLocaleString()}`, 'info');
        }
    } else {
        mostrarToast(`❌ ${dadosLeilao.jogador.nome} recusou a proposta do ${dadosLeilao.donoLance}!`, 'danger');
    }

    document.getElementById('modal-leilao').style.display = 'none';
    updateOffice();
}

function desistirLeilao() {
    leilaoAtivo = false;
    if (dadosLeilao.timerId) { clearInterval(dadosLeilao.timerId); dadosLeilao.timerId = null; }
    const modal = document.getElementById('modal-leilao');
    if (modal) modal.style.display = 'none';
}

// ==========================================
// EVOLUÇÃO DE JOGADORES
// ==========================================

function evoluirJogadores() {
    app.teams.forEach(t => {
        t.players.forEach((p, idx) => {
            const ganho = idx < 11 ? 0.15 : 0.05;
            p.force = Math.min(99, p.force + ganho);
            p.evol = (p.evol || 0) + ganho;
            // Atualiza salário com a evolução
            p.salario = calcularSalario(p.force, t.l);
        });
    });
    mostrarToast('📈 Jogadores evoluíram esta temporada!', 'success');
}

// ==========================================
// FIM DE TEMPORADA / SUBIDA E DESCIDA
// ==========================================

function processarFimTemporada() {
    if (app.round < 22) return;
    const ligas = ["1","2","3","4"];
    let novasLigas = new Map();
    let resumoHTML = "";

    ligas.forEach(l => {
        const tabela = app.teams.filter(t => t.l === l).sort((a,b) => b.pts - a.pts || b.sg - a.sg);
        const titulo = l === "1" ? "SÉRIE A" : l === "2" ? "SÉRIE B" : l === "3" ? "SÉRIE C" : "SÉRIE D";
        resumoHTML += `<div style="background:#000;padding:12px;border-radius:10px;margin-bottom:12px;border:1px solid #333;">
            <div style="color:var(--gold);font-weight:bold;font-size:13px;border-bottom:1px solid #333;padding-bottom:8px;margin-bottom:10px;">${titulo}</div>`;

        // Campeão
        if (tabela[0]) {
            resumoHTML += `<div style="display:flex;justify-content:space-between;padding:6px 0;">
                <span style="color:#fff;font-weight:bold;">👑 ${tabela[0].nome}</span>
                <b style="color:var(--gold);">CAMPEÃO</b>
            </div>`;
            if (tabela[0].id === app.team.id) {
                app.trophies = (app.trophies || 0) + 1;
                app.money += 5000000;
                mostrarToast(`🏆 CAMPEÃO DA ${titulo}! +R$ 5.000.000!`, 'gold');
            }
        }

        // Subidas (2 primeiros, exceto série A)
        if (l !== "1") {
            tabela.slice(0, 2).forEach(t => {
                novasLigas.set(t.id, String(parseInt(l) - 1));
                // Troféu de subida para o usuário
                if (t.id === app.team.id) {
                    app.trofeus = app.trofeus || {};
                    if (l==='4') { app.trofeus.d_c = (app.trofeus.d_c||0)+1; mostrarToast('🥉 Parabéns! Você subiu da Série D para a C!','gold'); }
                    if (l==='3') { app.trofeus.c_b = (app.trofeus.c_b||0)+1; mostrarToast('🥈 Parabéns! Você subiu da Série C para a B!','gold'); }
                    if (l==='2') { app.trofeus.b_a = (app.trofeus.b_a||0)+1; mostrarToast('🥇 Parabéns! Você subiu da Série B para a A!','gold'); }
                }
                resumoHTML += `<div style="display:flex;justify-content:space-between;padding:4px 0;">
                    <span style="color:#fff;">${t.nome}</span>
                    <b style="color:#2ecc71;">⬆️ Série ${parseInt(l)-1}</b>
                </div>`;
            });
        }

        // Descidas (2 últimos, exceto série D)
        if (l !== "4") {
            tabela.slice(-2).forEach(t => {
                if (!novasLigas.has(t.id)) {
                    novasLigas.set(t.id, String(parseInt(l) + 1));
                    resumoHTML += `<div style="display:flex;justify-content:space-between;padding:4px 0;">
                        <span style="color:#888;">${t.nome}</span>
                        <b style="color:#e74c3c;">⬇️ Série ${parseInt(l)+1}</b>
                    </div>`;
                }
            });
        }

        // Série A: campeão e vice classificam para Copa Mundial (não sobem de divisão)
        if (l === "1") {
            tabela.slice(0, 2).forEach(t => {
                resumoHTML += `<div style="display:flex;justify-content:space-between;padding:4px 0;">
                    <span style="color:#fff;">${t.nome}</span>
                    <b style="color:var(--gold);">🏆 Classificado Copa</b>
                </div>`;
            });
        }

        resumoHTML += `</div>`;
    });

    // Folha salarial do fim de temporada
    descontarSalarios();

    document.getElementById('lista-subidas-descidas').innerHTML = resumoHTML;
    document.getElementById('modal-temporada').style.display = 'flex';

    // Aplica mudanças de liga
    novasLigas.forEach((liga, id) => {
        const time = app.teams.find(t => t.id === id);
        if (time) time.l = liga;
    });

    checarConvitesCarreira();
}

function fecharRelatorioTemporada() {
    document.getElementById('modal-temporada').style.display = 'none';
    app.temporada = (app.temporada || 1) + 1;
    app.teams.forEach(t => {
        t.pts = 0; t.j = 0; t.sg = 0; t.v = 0; t.e = 0; t.d = 0; t.gm = 0;
        t.players.forEach(p => { p.energy = 100; p.scored = false; p.cards = 0; if (p.status !== 'lesão') p.status = 'ok'; });
    });
    app.round = 1;
    app.ligaRound = 0;
    app.ligaRoundUltimaCopa = 0;
    app.copaCampeaoTemporada = false;
    app._adversarioCache = null;
    // Reseta inCup para todos poderem participar da próxima copa
    app.teams.forEach(t => { t.inCup = true; t.golsIda = 0; });
    if (typeof gerarMercado === 'function') gerarMercado();
    updateOffice();
    mostrarToast(`🎉 Temporada ${app.temporada} iniciada! Boa sorte!`, 'gold');
}

function checarDemissao() {
    const dir = app.diretoria || 70;
    const tor = app.torcida || 70;
    if (dir < 15 || tor < 15) {
        // Demissão real — encontra outro time para o técnico
        const tab = app.teams.filter(t => t.l === app.team.l).sort((a,b) => b.pts - a.pts || b.sg - a.sg);
        const pos = tab.findIndex(t => t.id === app.team.id) + 1;
        const motivo = dir < 15 ? 'A diretoria perdeu a confiança em você' : 'A torcida não aguenta mais os resultados';
        // Times disponíveis de série inferior ou igual
        const candidatos = app.teams.filter(t => t.id !== app.team.id && (t.l === app.team.l || t.l > app.team.l));
        const novoTime = candidatos[Math.floor(Math.random() * candidatos.length)];
        setTimeout(() => {
            alert(`🚨 DEMITIDO!

${motivo}.
Você foi dispensado do ${app.team.nome}.

${novoTime ? `O ${novoTime.nome} te contratou como técnico.` : 'Você está desempregado temporariamente.'}`);
            if (novoTime) {
                app.team = novoTime;
                app.diretoria = 50;
                app.torcida = 50;
                app.money = Math.max(app.money, 100000);
                updateOffice();
                setTimeout(() => {
                    // Garante que está no escritório antes dos fogos
                    document.getElementById('screen-match').style.display = 'none';
                    document.getElementById('screen-office').style.display = 'flex';
                    if (typeof changeTab === 'function') changeTab('home');
                    setTimeout(() => dispararFogos(
                        `Novo Emprego! 📋`,
                        `${app.coach}, você agora comanda o ${app.team.nome}! Boa sorte!`,
                        7000
                    ), 500);
                }, 300);
            }
        }, 800);
        return true;
    }
    return false;
}

function checarConvitesCarreira() {
    // Primeiro verifica demissão
    if (checarDemissao()) return;

    const tab = app.teams.filter(t => t.l === app.team.l).sort((a,b) => b.pts - a.pts || b.sg - a.sg);
    const pos = tab.findIndex(t => t.id === app.team.id) + 1;
    const l = app.team.l;
    let convite = null;
    if (l === "4" && pos <= 4)      convite = app.teams.filter(t => t.l === "3")[Math.floor(Math.random() * 5)];
    else if (l === "3" && pos <= 4) convite = app.teams.filter(t => t.l === "2")[Math.floor(Math.random() * 5)];
    else if (l === "2" && pos <= 4) convite = app.teams.filter(t => t.l === "1")[Math.floor(Math.random() * 5)];
    else if (l === "1" && pos <= 2) convite = app.teams.filter(t => t.l === "E")[Math.floor(Math.random() * 5)];
    if (convite) {
        setTimeout(() => {
            if (confirm(`💼 PROPOSTA: O ${convite.nome} (Série ${convite.l}) quer te contratar. Aceita?`)) {
                app.team = convite;
                app.money += convite.l === "E" ? 50000000 : 5000000;
                updateOffice();
                setTimeout(() => {
                    document.getElementById('screen-match').style.display = 'none';
                    document.getElementById('screen-office').style.display = 'flex';
                    if (typeof changeTab === 'function') changeTab('home');
                    setTimeout(() => dispararFogos(
                        `Novo Contrato! 🤝`,
                        `${app.coach} assina com o ${app.team.nome}! Vamos em frente!`,
                        7000
                    ), 500);
                }, 300);
            }
        }, 1500);
    }
}

// ==========================================
// FINALIZAR PARTIDA
// ==========================================

function substituirExpulsosAutomaticamente() {
    if (!app.team) return;
    // Limpa cartões amarelos de todos os jogadores ao iniciar nova partida
    app.team.players.forEach(p => { if (p.cards === 1) p.cards = 0; });
    for (let i = 0; i < 11; i++) {
        const p = app.team.players[i];
        if (!p || p.status !== 'vermelho') continue;
        // Busca o melhor reserva disponível da mesma posição
        const grupo = converterPosicaoParaGrupo(p.pos);
        let melhor = null, melhorIdx = -1;
        for (let j = 11; j < app.team.players.length; j++) {
            const r = app.team.players[j];
            if (r.status === 'ok' && converterPosicaoParaGrupo(r.pos) === grupo) {
                if (!melhor || r.force > melhor.force) { melhor = r; melhorIdx = j; }
            }
        }
        // Se não achou mesma posição, pega qualquer reserva ok
        if (!melhor) {
            for (let j = 11; j < app.team.players.length; j++) {
                const r = app.team.players[j];
                if (r.status === 'ok') { melhor = r; melhorIdx = j; break; }
            }
        }
        if (melhor && melhorIdx !== -1) {
            app.team.players[i] = melhor;
            app.team.players[melhorIdx] = p;
            mostrarToast(`🔄 ${abreviarNome(melhor.nome)} entrou no lugar do expulso ${abreviarNome(p.nome)}`, 'info');
        }
    }
}

function finishMatch() {
    idTimeSelecionado = null;
    document.getElementById('screen-match').style.display = 'none';
    document.getElementById('screen-office').style.display = 'flex';
    substituirExpulsosAutomaticamente();

    if (app.isCupMatch) {
        // Copa: IDA → VOLTA → elimina
        if (app.cupLeg === 1) {
            // IDA concluída — próximo será VOLTA (isCupMatch continua true)
            app.cupLeg = 2;
            mostrarToast('⚽ Fim da IDA! Próximo jogo é a VOLTA da copa.', 'info');
        } else {
            // VOLTA concluída — processa e encerra copa
            if (typeof CopaMundial !== 'undefined') CopaMundial.processarEliminatorias();
            app.cupLeg = 1;
            app.isCupMatch = false; // copa encerrada, volta pra liga
        }
        // Copa nunca avança round da liga
    } else {
        // Liga — avança rounds
        app.round++;
        app.ligaRound = (app.ligaRound || 0) + 1;
        evoluirJogadores();
    }

    app.teams.forEach(t => t.players.forEach(p => {
        p.scored = false;
        p.energy = Math.min(100, p.energy + 20);
    }));

    // Processa suspensão e lesão só do time do usuário
    app.team.players.forEach(p => {
        // Vermelho = 2 jogos suspenso
        if (p.status === 'vermelho') {
            p.suspJogos = 2;
            p.status = 'ok';
            adicionarNotificacao('🟥 ' + p.nome + ' ficará suspenso por 2 jogos.');
        }
        // Lesão = 1 ou 2 jogos fora
        if (p.status === 'lesão' && !(p.suspJogos > 0)) {
            p.suspJogos = 1 + Math.floor(Math.random() * 2);
            adicionarNotificacao('🚑 ' + p.nome + ' ficará fora por ' + p.suspJogos + ' jogo(s).');
        }
        // Desconta suspensão a cada rodada
        if (p.suspJogos > 0) {
            p.suspJogos--;
            if (p.suspJogos === 0 && p.status === 'lesão') {
                p.status = 'ok';
                adicionarNotificacao('✅ ' + p.nome + ' está recuperado!');
            }
        }
    });

    app._adversarioCache = null;
    gerenciarSomPartida(false);
    gerenciarMusicaEscritorio(true);

    // Fim de temporada só é processado pela LIGA (round >= 22), não pela copa
    if (!app.isCupMatch) processarFimTemporada();

    // Proposta só aparece no escritório, nunca durante partida/leilão
    // (verificarPropostasRecebidas já tem guard, mas removemos do setTimeout aqui)

    processarVendaPendente();
    if (typeof resolverPropostasPendentes === 'function') resolverPropostasPendentes();
    checarChanceLeilao();

    // Mensagens pós-jogo (propostas só aparecem no escritório via updateOffice)
    setTimeout(() => {
        mostrarMensagemDiretoria();
        setTimeout(() => mostrarMensagemTorcida(), 4000);
        setTimeout(() => mostrarMensagemJogador(), 7000);
    }, 1200);
    // Propostas aparecem depois que o escritório já está visível
    setTimeout(() => verificarPropostasRecebidas(), 2500);

    updateOffice();
    if (typeof changeTab === 'function') changeTab('home');
}

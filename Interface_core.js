// --- EURO FOOT 2026 - JONAS 007 PRO ---
// --- NÚCLEO DA INTERFACE E CARREIRA (interface_core.js) ---

// ==========================================
// FUNÇÕES DE FORMATAÇÃO E AUXÍLIO
// ==========================================

function abreviarNome(nome) {
    let partes = nome.trim().split(' ');
    if (partes.length <= 1) return nome;
    return `${partes[0].charAt(0).toUpperCase()}. ${partes[partes.length - 1]}`;
}

function formatarPosicao(sigla) {
    const mapa = {
        'G': 'GOL', 'LD': 'LD', 'LE': 'LE', 'Z': 'ZAG', 'ZAG': 'ZAG',
        'LAD': 'LD', 'LAE': 'LE', 'V': 'VOL', 'VOL': 'VOL',
        'M': 'MEI', 'MEI': 'MEI', 'PTE': 'PTE', 'PTD': 'PTD',
        'A': 'ATA', 'CA': 'CEN', 'D': 'DEF'
    };
    return mapa[sigla.toUpperCase()] || sigla.toUpperCase();
}

function ordenarJogadores(elenco) {
    const ordem = {
        'G': 1,
        'LD': 2, 'LE': 2, 'Z': 2, 'ZAG': 2, 'D': 2, 'LAD': 2, 'LAE': 2,
        'V': 3, 'VOL': 3, 'M': 3, 'MEI': 3,
        'A': 4, 'PTE': 4, 'PTD': 4, 'CA': 4, 'CEN': 4
    };
    return elenco.sort((a, b) => (ordem[a.pos.toUpperCase()] || 9) - (ordem[b.pos.toUpperCase()] || 9));
}

// ==========================================
// ECONOMIA E VALOR DE MERCADO
// ==========================================

function calcularValorJogador(p, ligaTime) {
    let base = p.force * 10000;
    let mult = 1;
    if (ligaTime === "E") mult = 25;
    else if (ligaTime === "1") mult = 10;
    else if (ligaTime === "2") mult = 5;
    else if (ligaTime === "3") mult = 2;
    else if (ligaTime === "4") mult = 0.8;
    return Math.floor(base * mult);
}

// ==========================================
// IDENTIDADE VISUAL (CORES)
// ==========================================

function gerarCorPorNome(nome) {
    let hash = 0;
    for (let i = 0; i < nome.length; i++) hash = nome.charCodeAt(i) + ((hash << 5) - hash);
    return `hsl(${Math.abs(hash % 360)}, 70%, 45%)`;
}

function obterCoresTime(nomeTime) {
    const cores = {
        "Real Madrid":          { bg: "#ffffff", texto: "#000000", cor1: "#ffffff", cor2: "#d4af37", tipo: "liso" },
        "Manchester City":      { bg: "#6caddf", texto: "#ffffff", cor1: "#6caddf", cor2: "#ffffff", tipo: "liso" },
        "Bayern Munique":       { bg: "#dc052d", texto: "#ffffff", cor1: "#dc052d", cor2: "#0066b2", tipo: "liso" },
        "Barcelona":            { bg: "#a50044", texto: "#ffffff", cor1: "#a50044", cor2: "#004d98", tipo: "listrado" },
        "Liverpool":            { bg: "#c8102e", texto: "#ffffff", cor1: "#c8102e", cor2: "#c8102e", tipo: "liso" },
        "Arsenal":              { bg: "#ef0107", texto: "#ffffff", cor1: "#ef0107", cor2: "#ffffff", tipo: "liso" },
        "Inter de Milão":       { bg: "#0068a8", texto: "#ffffff", cor1: "#0068a8", cor2: "#000000", tipo: "listrado" },
        "Paris Saint-Germain":  { bg: "#004170", texto: "#ffffff", cor1: "#004170", cor2: "#da291c", tipo: "listrado" },
        "Bayer Leverkusen":     { bg: "#e32219", texto: "#ffffff", cor1: "#e32219", cor2: "#000000", tipo: "listrado" },
        "Benfica":              { bg: "#cc0000", texto: "#ffffff", cor1: "#cc0000", cor2: "#cc0000", tipo: "liso" },
        "Porto":                { bg: "#003087", texto: "#ffffff", cor1: "#003087", cor2: "#ffffff", tipo: "listrado" },
        "Sporting":             { bg: "#006600", texto: "#ffffff", cor1: "#006600", cor2: "#ffffff", tipo: "listrado" },
        "Palmeiras":            { bg: "#006437", texto: "#ffffff", cor1: "#006437", cor2: "#ffffff", tipo: "liso" },
        "Flamengo":             { bg: "#c10000", texto: "#ffffff", cor1: "#c10000", cor2: "#000000", tipo: "listrado" },
        "Corinthians":          { bg: "#ffffff", texto: "#000000", cor1: "#ffffff", cor2: "#000000", tipo: "listrado" },
        "São Paulo":            { bg: "#ffffff", texto: "#c10000", cor1: "#ffffff", cor2: "#c10000", tipo: "liso" },
        "Santos":               { bg: "#ffffff", texto: "#000000", cor1: "#ffffff", cor2: "#000000", tipo: "liso" },
        "Internacional":        { bg: "#e20e0e", texto: "#ffffff", cor1: "#e20e0e", cor2: "#e20e0e", tipo: "liso" },
        "Atlético-MG":          { bg: "#1a1a1a", texto: "#ffffff", cor1: "#ffffff", cor2: "#000000", tipo: "listrado" },
        "Cruzeiro":             { bg: "#003399", texto: "#ffffff", cor1: "#003399", cor2: "#003399", tipo: "liso" },
        "Vasco":                { bg: "#1a1a1a", texto: "#ffffff", cor1: "#000000", cor2: "#ffffff", tipo: "listrado" },
        "Botafogo":             { bg: "#ffffff", texto: "#000000", cor1: "#ffffff", cor2: "#000000", tipo: "listrado" },
        "Sport":                { bg: "#c10000", texto: "#f1c40f", cor1: "#c10000", cor2: "#f1c40f", tipo: "listrado" },
        "Bahia":                { bg: "#0038a8", texto: "#ffffff", cor1: "#ffffff", cor2: "#0038a8", tipo: "listrado" },
        "Coritiba":             { bg: "#00591b", texto: "#ffffff", cor1: "#00591b", cor2: "#ffffff", tipo: "listrado" },
        "Fortaleza":            { bg: "#0033a0", texto: "#ffffff", cor1: "#cc0000", cor2: "#0033a0", tipo: "listrado" },
        "Athletico-PR":         { bg: "#cc0000", texto: "#ffffff", cor1: "#cc0000", cor2: "#000000", tipo: "listrado" },
        "Santa Cruz":           { bg: "#ff0000", texto: "#ffffff", cor1: "#ff0000", cor2: "#000000", tipo: "listrado" },
        "Remo":                 { bg: "#001a4d", texto: "#ffffff", cor1: "#001a4d", cor2: "#001a4d", tipo: "liso" },
        "Paysandu":             { bg: "#00aae4", texto: "#ffffff", cor1: "#00aae4", cor2: "#ffffff", tipo: "listrado" },
        "Goiás":                { bg: "#006400", texto: "#ffffff", cor1: "#006400", cor2: "#ffffff", tipo: "listrado" },
        "Guarani":              { bg: "#00a651", texto: "#ffffff", cor1: "#00a651", cor2: "#ffffff", tipo: "liso" },
        "Ceará":                { bg: "#000000", texto: "#ffffff", cor1: "#000000", cor2: "#ffffff", tipo: "listrado" },
        "Avaí":                 { bg: "#003e7e", texto: "#ffffff", cor1: "#003e7e", cor2: "#ffffff", tipo: "liso" },
        "Ponte Preta":          { bg: "#000000", texto: "#ffffff", cor1: "#000000", cor2: "#000000", tipo: "liso" },
        "América-MG":           { bg: "#007b3f", texto: "#ffffff", cor1: "#007b3f", cor2: "#000000", tipo: "listrado" },
        "Chapecoense":          { bg: "#00693e", texto: "#ffffff", cor1: "#00693e", cor2: "#ffffff", tipo: "liso" },
        "CRB":                  { bg: "#00008b", texto: "#ffffff", cor1: "#00008b", cor2: "#ff0000", tipo: "listrado" },
        "Vila Nova":            { bg: "#cc0000", texto: "#ffffff", cor1: "#cc0000", cor2: "#000000", tipo: "listrado" },
    };
    if (cores[nomeTime]) return cores[nomeTime];
    const c = gerarCorPorNome(nomeTime);
    return { bg: c, texto: "#ffffff", cor1: c, cor2: c, tipo: "liso" };
}

// ==========================================
// LÓGICA DE RODADAS E IA
// ==========================================

// Verifica se esta rodada deve ser uma rodada de copa
// Chamada APENAS em abrirPreJogo — nunca no updateOffice
function deveJogarCopa() {
    if (app.copaCampeaoTemporada) return false;  // já tem campeão
    if (app.round >= 22) return false;            // liga terminou
    if (app.isCupMatch) return true;              // VOLTA pendente
    const lr = app.ligaRound || 0;
    const ultimaCopa = app.ligaRoundUltimaCopa || 0;
    const vivos = app.teams.filter(t => t.inCup === true);
    if (vivos.length <= 1) return false;
    // Copa só quando passaram 6 rodadas de liga desde a última copa
    return (lr - ultimaCopa) >= 6;
}

// gerarJogos sempre gera jogos de LIGA — copa é tratada separadamente
function _organizarTimeCPU(t) {
    // Coloca os jogadores na ordem G, D, M, A para escalação correta
    var ordem = {G:0, ZAG:1, LD:2, LE:3, VOL:4, MEI:5, PTE:6, PTD:7, CA:8};
    t.players.sort(function(a, b) {
        var pa = ordem[a.pos] !== undefined ? ordem[a.pos] : 9;
        var pb = ordem[b.pos] !== undefined ? ordem[b.pos] : 9;
        if (pa !== pb) return pa - pb;
        return b.force - a.force;
    });
}

// ══════════════════════════════════════════
// SISTEMA DE MORAL DO ELENCO
// ══════════════════════════════════════════

function calcularMoralJogador(p, isTitular) {
    let moral = p.moral || 70;
    // Titular satisfeito, reserva insatisfeito
    if (isTitular) moral = Math.min(100, moral + 2);
    else moral = Math.max(10, moral - 1);
    // Gols aumentam moral
    if (p.gols && p.gols > 0) moral = Math.min(100, moral + p.gols * 3);
    p.moral = Math.round(moral);
    return moral;
}

function getMoralEmoji(moral) {
    if (moral >= 80) return '😄';
    if (moral >= 60) return '🙂';
    if (moral >= 40) return '😐';
    if (moral >= 20) return '😠';
    return '😡';
}

function getMoralBônus(moral) {
    // Moral alta = até +3% de força, baixa = até -5%
    if (moral >= 80) return 1.03;
    if (moral >= 60) return 1.0;
    if (moral >= 40) return 0.97;
    return 0.94;
}

function definirCapitao() {
    if (!app.team || !app.team.players) return;
    // Capitão = titular mais experiente (maior força)
    const titulares = app.team.players.slice(0, 11).filter(p => p.status === 'ok');
    if (titulares.length === 0) return;
    titulares.sort((a, b) => b.force - a.force);
    // Remove capitão antigo
    app.team.players.forEach(p => p.capitao = false);
    titulares[0].capitao = true;
    app._capitao = titulares[0].nome;
}

function atualizarMoralElenco() {
    if (!app.team) return;
    app.team.players.forEach((p, i) => {
        calcularMoralJogador(p, i < 11);
    });
}

// Notícias da imprensa — afetam torcida
const NOTICIAS_POSITIVAS = [
    (t, c) => `📰 Imprensa exalta o ${t}: "${c} impressiona com boa fase!"`,
    (t, c) => `📺 Repórter destaca atuação do ${t}: "${c} está em grande momento!"`,
    (t, c) => `📰 ${t} é elogiado pela mídia após sequência positiva!`,
    (t, c) => `📺 "${c} tem o melhor elenco da divisão", diz comentarista.`,
    (t, c) => `📰 Torcida do ${t} enche as redes de elogios ao trabalho de ${c}!`,
];
const NOTICIAS_NEGATIVAS = [
    (t, c) => `📰 Imprensa critica o ${t}: "Falta identidade no time de ${c}."`,
    (t, c) => `📺 Comentarista questiona: "O ${t} de ${c} decepciona os torcedores."`,
    (t, c) => `📰 ${t} é alvo de críticas após sequência ruim. ${c} sob pressão.`,
    (t, c) => `📺 "A torcida do ${t} está insatisfeita com o rendimento", diz repórter.`,
    (t, c) => `📰 Jornalistas cobram reforços no ${t}: "${c} precisa de ajuda!"`,
];

function dispararNoticiasImprensa() {
    if (!app.team) return;
    const pts = app.team.pts || 0;
    const rodadas = app.round || 1;
    const mediaPts = rodadas > 1 ? pts / (rodadas - 1) : 1;
    const positivo = mediaPts >= 1.5 || (app.torcida || 70) >= 75;
    const lista = positivo ? NOTICIAS_POSITIVAS : NOTICIAS_NEGATIVAS;
    const noticia = lista[Math.floor(Math.random() * lista.length)](app.team.nome, app.coach);
    adicionarNotificacao(noticia);
    // Afeta torcida
    if (positivo) {
        app.torcida = Math.min(100, (app.torcida || 70) + 5);
    } else {
        app.torcida = Math.max(0, (app.torcida || 70) - 5);
    }
    // Imprensa vai só pro sininho, não como balão
    // adicionarNotificacao já foi chamado acima
}

// ══════════════════════════════════════════
// NOTÍCIAS DE TRANSFERÊNCIAS CPU
// ══════════════════════════════════════════
var _negociacoesPendentes = []; // { comprador, vendedor, jogador, valor }

function gerarNoticiasTransferenciasCPU() {
    // A cada 2-3 rodadas, simula negociações entre times CPU
    var timesA = app.teams.filter(function(t){ return t.l === 'E' || t.l === '1'; });
    if (timesA.length < 4) return;
    var numNeg = 1 + Math.floor(Math.random()*2);
    for (var n=0; n<numNeg; n++) {
        var tComp = timesA[Math.floor(Math.random()*timesA.length)];
        var tVend = timesA[Math.floor(Math.random()*timesA.length)];
        if (tComp.id === tVend.id || tComp.id === app.team.id || tVend.id === app.team.id) continue;
        var craques = tVend.players.filter(function(p){ return p.force >= 60; });
        if (!craques.length) continue;
        var jog = craques[Math.floor(Math.random()*craques.length)];
        var val = Math.round(jog.force * (tVend.l==='E'?800000:200000) * (0.8+Math.random()*0.6));
        _negociacoesPendentes.push({ comprador:tComp.nome, vendedor:tVend.nome, jogador:jog.nome, valor:val, rodada:app.round });
        adicionarNotificacao('🔔 ' + tComp.nome + ' está negociando ' + jog.nome + ' com o ' + tVend.nome + ' por R$ ' + val.toLocaleString('pt-BR') + '!');
    }
}

function resolverNoticiasTransferenciasCPU() {
    var pendentes = _negociacoesPendentes.filter(function(n){ return n.rodada < app.round; });
    _negociacoesPendentes = _negociacoesPendentes.filter(function(n){ return n.rodada >= app.round; });
    pendentes.forEach(function(neg) {
        var fechou = Math.random() > 0.35;
        if (fechou) {
            var tVend = app.teams.find(function(t){ return t.nome===neg.vendedor; });
            var tComp = app.teams.find(function(t){ return t.nome===neg.comprador; });
            if (tVend && tComp) {
                var pi = tVend.players.findIndex(function(p){ return p.nome===neg.jogador; });
                if (pi !== -1) {
                    var jog = tVend.players.splice(pi,1)[0];
                    tComp.players.push(jog);
                }
            }
            adicionarNotificacao('✅ FECHADO! ' + neg.comprador + ' contratou ' + neg.jogador + ' do ' + neg.vendedor + ' por R$ ' + neg.valor.toLocaleString('pt-BR') + '!');
            mostrarToast('🔔 ' + neg.comprador + ' contratou ' + neg.jogador + '!', 'gold');
        } else {
            var motivos = [
                neg.comprador + ' não chegou a acordo com ' + neg.vendedor + ' por ' + neg.jogador + '. Negociação encerrada.',
                neg.jogador + ' recusou a transferência para o ' + neg.comprador + '.',
                neg.vendedor + ' recusou vender ' + neg.jogador + ' ao ' + neg.comprador + '.',
                'Negociação entre ' + neg.comprador + ' e ' + neg.vendedor + ' por ' + neg.jogador + ' fracassou.'
            ];
            adicionarNotificacao('❌ ' + motivos[Math.floor(Math.random()*motivos.length)]);
        }
    });
}

// ══════════════════════════════════════════
// CLÁSSICO ESPECIAL
// ══════════════════════════════════════════
const CLASSICOS = {
    "Flamengo":    ["Fluminense","Vasco","Botafogo"],
    "Fluminense":  ["Flamengo","Vasco","Botafogo"],
    "Vasco":       ["Flamengo","Fluminense","Botafogo"],
    "Botafogo":    ["Flamengo","Fluminense","Vasco"],
    "Corinthians": ["Palmeiras","São Paulo","Santos"],
    "Palmeiras":   ["Corinthians","São Paulo","Santos"],
    "São Paulo":   ["Corinthians","Palmeiras","Santos"],
    "Santos":      ["Corinthians","Palmeiras","São Paulo"],
    "Atlético-MG": ["Cruzeiro"],
    "Cruzeiro":    ["Atlético-MG"],
    "Grêmio":      ["Internacional"],
    "Internacional":["Grêmio"],
    "Athletico-PR":["Coritiba"],
    "Coritiba":    ["Athletico-PR"],
    "Bahia":       ["Vitória"],
    "Vitória":     ["Bahia"],
    "Sport":       ["Náutico","Ceará","Fortaleza"],
    "Ceará":       ["Fortaleza","Sport"],
    "Fortaleza":   ["Ceará","Sport"],
};

function verificarClassico(nomeAdversario) {
    if (!app.team) return false;
    const rivais = CLASSICOS[app.team.nome] || [];
    return rivais.includes(nomeAdversario);
}

function aplicarBonusClassico() {
    app.torcida = Math.min(100, (app.torcida||70) + 10);
    app.diretoria = Math.min(100, (app.diretoria||70) + 5);
    mostrarToast('🔥 CLÁSSICO! Torcida empurra o time! +10% torcida!', 'gold');
}

// ══════════════════════════════════════════
// RENOVAÇÃO DE CONTRATO
// ══════════════════════════════════════════
function verificarRenovacoes() {
    if (!app.team) return;
    // Jogadores com mais de 3 temporadas pedem renovação
    const candidatos = app.team.players.filter(p => {
        const temp = p.temporadasNoClube || 1;
        return temp >= 2 && !p.renovacaoPendente && Math.random() < 0.15;
    });
    if (candidatos.length === 0) return;
    const p = candidatos[Math.floor(Math.random() * candidatos.length)];
    p.renovacaoPendente = true;
    const novoSalario = Math.round((p.salario || calcularSalario(p.force, app.team.l)) * 1.2);
    const msg = `📋 ${p.nome} quer renovar o contrato! Novo salário: R$ ${novoSalario.toLocaleString()}/mês`;
    adicionarNotificacao(msg);

    // Modal de renovação
    setTimeout(() => {
        if (!document.getElementById('screen-office') || document.getElementById('screen-office').style.display === 'none') return;
        if (confirm(`${msg}

Aceitar renovação?`)) {
            p.salario = novoSalario;
            p.renovacaoPendente = false;
            p.temporadasNoClube = 0;
            p.moral = Math.min(100, (p.moral||70) + 15);
            mostrarToast(`✅ ${p.nome} renovou! Salário: R$ ${novoSalario.toLocaleString()}/mês`, 'success');
        } else {
            p.renovacaoPendente = false;
            p.moral = Math.max(0, (p.moral||70) - 30);
            mostrarToast(`😠 ${p.nome} está insatisfeito com a recusa!`, 'danger');
        }
    }, 2000);
}

// ══════════════════════════════════════════
// JOGADOR INSATISFEITO VAI EMBORA
// ══════════════════════════════════════════
function verificarInsatisfeitos() {
    if (!app.team) return;
    const insatisfeitos = app.team.players.filter(p => (p.moral||70) < 20 && p.status !== 'lesão');
    insatisfeitos.forEach(p => {
        // Remove do time e vai para outro clube
        const idx = app.team.players.indexOf(p);
        if (idx === -1) return;
        app.team.players.splice(idx, 1);
        const timesRand = app.teams.filter(t => t.id !== app.team.id);
        const destino = timesRand[Math.floor(Math.random() * timesRand.length)];
        if (destino) destino.players.push({...p, moral:70});
        const msg = `😡 ${p.nome} saiu do clube insatisfeito e foi para o ${destino ? destino.nome : 'mercado'}!`;
        adicionarNotificacao(msg);
        mostrarToast(msg, 'danger');
    });
}

// ══════════════════════════════════════════
// PROPOSTA DE OUTRO CLUBE PELO SEU CRAQUE
// ══════════════════════════════════════════
function verificarPropostaExterna() {
    if (!app.team || app.team.players.length <= 11) return;
    const titulares = app.team.players.slice(0, 11);
    const craque = titulares.sort((a,b) => b.force - a.force)[0];
    if (!craque || craque.force < 60) return;
    if (Math.random() > 0.25) return; // 25% de chance por rodada

    const timesRicos = ["Real Madrid","Palmeiras","Flamengo","Manchester City","Barcelona","Liverpool","Botafogo","Cruzeiro"];
    const comprador = timesRicos[Math.floor(Math.random() * timesRicos.length)];
    if (comprador === app.team.nome) return;

    const oferta = Math.round(craque.force * (app.team.l === 'E' ? 1200000 : app.team.l === '1' ? 400000 : 80000) * (0.9 + Math.random() * 0.4));
    const msg = `💰 O ${comprador} oferece R$ ${oferta.toLocaleString()} por ${craque.nome}!`;
    adicionarNotificacao(msg);

    setTimeout(() => {
        if (!document.getElementById('screen-office') || document.getElementById('screen-office').style.display === 'none') return;
        // Abre contra-proposta com timeDonoObj = app.team (é o MEU jogador sendo vendido)
        _abrirModalContraProposta(craque, comprador, oferta, app.team);
    }, 2500);
}

// ══════════════════════════════════════════
// MODAL CONTRA-PROPOSTA (venda e compra)
// ══════════════════════════════════════════
// Fila de propostas pendentes para resolver na próxima rodada
if (!window._propostasPendentes) window._propostasPendentes = [];

function resolverPropostasPendentes() {
    if (!window._propostasPendentes || window._propostasPendentes.length === 0) return;
    var pendentes = window._propostasPendentes.splice(0);
    pendentes.forEach(function(p) {
        var aceite = Math.random() < p.chance;
        if (p.tipo === 'venda') {
            if (aceite) {
                app.money += p.valor;
                var idx = app.team.players.findIndex(function(j){ return j.nome === p.jogNome; });
                if (idx !== -1) {
                    var jog = app.team.players.splice(idx,1)[0];
                    var dest = app.teams.find(function(t){ return t.nome===p.clube; });
                    if (dest) dest.players.push(Object.assign({},jog));
                }
                adicionarNotificacao('✅ ' + p.clube + ' ACEITOU a contra-proposta! ' + p.jogNome + ' vendido por R$ ' + p.valor.toLocaleString('pt-BR') + '!');
                mostrarToast('💰 ' + p.jogNome + ' vendido por R$ ' + p.valor.toLocaleString('pt-BR') + '!', 'success');
                updateOffice();
            } else {
                adicionarNotificacao('❌ ' + p.clube + ' RECUSOU a contra-proposta de R$ ' + p.valor.toLocaleString('pt-BR') + ' por ' + p.jogNome + '.');
                mostrarToast('❌ ' + p.clube + ' recusou a contra-proposta!', 'danger');
            }
        } else if (p.tipo === 'compra') {
            if (aceite) {
                if (app.money < p.valor) {
                    adicionarNotificacao('❌ Proposta aceita mas sem saldo! Perdeu ' + p.jogNome + '.');
                    return;
                }
                app.money -= p.valor;
                var novJog = Object.assign({}, p.jogObj, {
                    energy:100, status:'ok', cards:0, scored:false, suspJogos:0,
                    moral:70, num: p.jogObj.num || (app.team.players.length + 1),
                    salario: p.jogObj.salario || calcularSalario(p.jogObj.force, app.team.l)
                });
                // Remove campos temporários
                delete novJog._mercadoIdx;
                app.team.players.push(novJog);
                // Remove do mercado pelo nome (mais seguro que índice)
                if (app.market) {
                    var mi = app.market.findIndex(function(j){ return j.nome===p.jogNome; });
                    if (mi !== -1) app.market.splice(mi, 1);
                }
                // Remove do time de origem pelo nome
                var orig = app.teams.find(function(t){ return t.nome===p.clube; });
                if (orig) { var pi=orig.players.findIndex(function(j){return j.nome===p.jogNome;}); if(pi!==-1) orig.players.splice(pi,1); }
                adicionarNotificacao('✅ ' + p.clube + ' ACEITOU! ' + p.jogNome + ' contratado por R$ ' + p.valor.toLocaleString('pt-BR') + '!');
                mostrarToast('✅ ' + p.jogNome + ' chegou ao clube!', 'success');
                if (typeof renderMercado === 'function') renderMercado();
                updateOffice();
            } else {
                adicionarNotificacao('❌ ' + p.clube + ' RECUSOU R$ ' + p.valor.toLocaleString('pt-BR') + ' por ' + p.jogNome + '. Tente novamente.');
                mostrarToast('❌ ' + p.clube + ' recusou a proposta!', 'danger');
            }
        }
    });
}

function _abrirModalContraProposta(jogador, nomeClube, ofertaInicial, timeDonoObj) {
    // Remove modal antigo
    var oldModal = document.getElementById('modal-contraproposta');
    if (oldModal) oldModal.parentNode.removeChild(oldModal);

    var modal = document.createElement('div');
    modal.id = 'modal-contraproposta';
    modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.95);z-index:60000;display:flex;align-items:center;justify-content:center;padding:16px;';
    document.body.appendChild(modal);

    var ofertaAtual = ofertaInicial;
    var éVenda = (timeDonoObj && timeDonoObj.id === app.team.id);

    function atualizarDisplay() {
        document.getElementById('cp-valor-display').textContent = 'R$ ' + ofertaAtual.toLocaleString('pt-BR');
        var diff = ofertaAtual - ofertaInicial;
        var diffEl = document.getElementById('cp-diff');
        if (diff !== 0) {
            diffEl.textContent = (diff > 0 ? '+' : '') + 'R$ ' + Math.abs(diff).toLocaleString('pt-BR') + ' vs original';
            diffEl.style.color = diff > 0 ? '#2ecc71' : '#e74c3c';
        } else {
            diffEl.textContent = 'Proposta original';
            diffEl.style.color = '#888';
        }
    }

    modal.innerHTML =
        '<div style="background:#111;border:2px solid #c5a059;border-radius:16px;padding:22px;width:100%;max-width:400px;">' +
            '<h3 style="color:#c5a059;margin:0 0 6px;font-size:17px;">💰 ' + (éVenda ? 'PROPOSTA PELO SEU JOGADOR' : 'NEGOCIAÇÃO') + '</h3>' +
            '<div style="background:#000;border-radius:8px;padding:12px;margin-bottom:14px;">' +
                '<div style="color:#fff;font-weight:900;font-size:16px;">' + (jogador.nome||'?') + '</div>' +
                '<div style="color:#aaa;font-size:12px;">F:' + Math.floor(jogador.force||0) + ' | ' + (jogador.pos||'') + '</div>' +
                '<div style="color:#aaa;font-size:12px;margin-top:4px;">' + (éVenda ? 'Interessado: ' : 'Time: ') + '<b style="color:#fff;">' + nomeClube + '</b></div>' +
            '</div>' +
            '<div style="text-align:center;margin-bottom:16px;">' +
                '<div style="color:#888;font-size:11px;margin-bottom:4px;">VALOR DA PROPOSTA</div>' +
                '<div id="cp-valor-display" style="color:#c5a059;font-size:26px;font-weight:900;">R$ ' + ofertaAtual.toLocaleString('pt-BR') + '</div>' +
                '<div id="cp-diff" style="font-size:11px;color:#888;">Proposta original</div>' +
            '</div>' +
            '<div style="background:#1a1a1a;border-radius:8px;padding:8px;margin-bottom:12px;font-size:11px;color:#888;text-align:center;">⏳ Resposta no próximo jogo via sininho</div>' +
            '<div style="display:grid;grid-template-columns:1fr 1fr;gap:8px;margin-bottom:12px;">' +
                '<button id="cp-mais10" style="background:#1b5e20;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;touch-action:manipulation;">+10%</button>' +
                '<button id="cp-mais25" style="background:#2e7d32;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;touch-action:manipulation;">+25%</button>' +
                '<button id="cp-menos10" style="background:#7f0000;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;touch-action:manipulation;">-10%</button>' +
                '<button id="cp-menos25" style="background:#b71c1c;color:#fff;border:none;padding:12px;border-radius:8px;font-weight:bold;cursor:pointer;touch-action:manipulation;">-25%</button>' +
            '</div>' +
            '<div style="display:flex;gap:8px;">' +
                '<button id="cp-enviar" style="flex:1;background:#c5a059;color:#000;border:none;padding:14px;border-radius:8px;font-weight:900;font-size:15px;cursor:pointer;touch-action:manipulation;">📨 ENVIAR</button>' +
                '<button id="cp-cancelar" style="flex:1;background:#222;color:#e74c3c;border:1px solid #e74c3c;padding:14px;border-radius:8px;font-weight:bold;cursor:pointer;touch-action:manipulation;">CANCELAR</button>' +
            '</div>' +
        '</div>';

    document.getElementById('cp-mais10').onclick  = function(){ ofertaAtual = Math.round(ofertaAtual*1.10); atualizarDisplay(); };
    document.getElementById('cp-mais25').onclick  = function(){ ofertaAtual = Math.round(ofertaAtual*1.25); atualizarDisplay(); };
    document.getElementById('cp-menos10').onclick = function(){ ofertaAtual = Math.round(ofertaAtual*0.90); atualizarDisplay(); };
    document.getElementById('cp-menos25').onclick = function(){ ofertaAtual = Math.round(ofertaAtual*0.75); atualizarDisplay(); };

    document.getElementById('cp-cancelar').onclick = function() {
        modal.style.display = 'none';
        if (éVenda) mostrarToast('💪 ' + jogador.nome + ' ficou no clube!', 'gold');
    };

    document.getElementById('cp-enviar').onclick = function() {
        modal.style.display = 'none';
        var ratio = ofertaAtual / ofertaInicial;
        var chance;
        if (éVenda) {
            chance = ratio >= 1 ? 0.88 : ratio >= 0.85 ? 0.55 : 0.2;
        } else {
            var lNum = {'E':0,'1':1,'2':2,'3':3,'4':4};
            var timeVend = app.teams.find(function(t){ return t.nome===nomeClube; });
            var divVend = timeVend ? (lNum[timeVend.l]||4) : 4;
            var teto = divVend===0?999999999 : divVend===1?10000000 : divVend===2?2000000 : divVend===3?500000 : 150000;
            chance = ofertaAtual > teto * 1.5 ? 0 : (ratio >= 1 ? 0.85 : ratio >= 0.8 ? 0.50 : 0.15);
        }
        if (!éVenda && app.money < ofertaAtual) {
            mostrarToast('💸 Saldo insuficiente!', 'danger'); return;
        }
        var jogSnap = JSON.parse(JSON.stringify(jogador));
        if (!window._propostasPendentes) window._propostasPendentes = [];
        window._propostasPendentes.push({
            tipo: éVenda ? 'venda' : 'compra',
            jogNome: jogador.nome,
            jogObj: jogSnap,
            clube: nomeClube,
            valor: ofertaAtual,
            chance: chance
        });
        adicionarNotificacao('📨 Proposta enviada ao ' + nomeClube + ' por ' + jogador.nome + ' (R$ ' + ofertaAtual.toLocaleString('pt-BR') + '). Aguarde...');
        mostrarToast('📨 Proposta enviada! Resposta no próximo jogo.', 'gold');
    };
}


// ══════════════════════════════════════════
// SISTEMA DE REPUTAÇÃO E DESAFIOS SEMANAIS
// ══════════════════════════════════════════

// Multiplicador por divisão: D=1x, C=3x, B=8x, A=20x, Europa=50x
function _multDesafio() {
    var l = app.team ? app.team.l : '4';
    return l==='E'?50 : l==='1'?20 : l==='2'?8 : l==='3'?3 : 1;
}
function _premioDesafio(base) {
    return base * _multDesafio();
}

// h=true → meu time é CASA (t1=meu time, lado esquerdo)
// h=false → meu time é FORA (t2=meu time, lado direito)
var DESAFIOS_POOL = [
    { id:'vencer2',    txt:'Vença por 2+ gols (qualquer mando)',  xp:80,  base:100000, tipo:'dinheiro', check: function(m,h){ var mg=h?m.g1:m.g2,ag=h?m.g2:m.g1; return mg-ag>=2; } },
    { id:'naoTomar',   txt:'Não tome gol nessa rodada',           xp:100, base:80000,  tipo:'dinheiro', check: function(m,h){ var ag=h?m.g2:m.g1; return ag===0; } },
    { id:'vencerFora', txt:'Vença jogando FORA (você = direita)', xp:120, base:150000, tipo:'dinheiro', check: function(m,h){ if(h) return false; return m.g2>m.g1; } },
    { id:'vencerCasa', txt:'Vença jogando EM CASA (você = esq)', xp:80,  base:80000,  tipo:'dinheiro', check: function(m,h){ if(!h) return false; return m.g1>m.g2; } },
    { id:'goleada',    txt:'Faça 3+ gols na partida',             xp:90,  base:0,      tipo:'leilao',   check: function(m,h){ var mg=h?m.g1:m.g2; return mg>=3; } },
    { id:'vencer',     txt:'Vença a próxima partida',             xp:60,  base:50000,  tipo:'dinheiro', check: function(m,h){ var mg=h?m.g1:m.g2,ag=h?m.g2:m.g1; return mg>ag; } },
    { id:'empatar',    txt:'Não perca (vitória ou empate)',        xp:50,  base:30000,  tipo:'dinheiro', check: function(m,h){ var mg=h?m.g1:m.g2,ag=h?m.g2:m.g1; return mg>=ag; } },
    { id:'semVermelho',txt:'Sem cartão vermelho',                  xp:70,  base:0,      tipo:'xp',       check: function(m,h){ return !app.team.players.some(function(p){return p.status==='vermelho';}); } },
    { id:'placarLimpo',txt:'Vença sem tomar gol',                  xp:110, base:120000, tipo:'dinheiro', check: function(m,h){ var mg=h?m.g1:m.g2,ag=h?m.g2:m.g1; return mg>ag && ag===0; } },
];

var REPUTACAO_NIVEIS = [
    { min:0,   max:199,  estrelas:1, label:'Novato',      cor:'#888'    },
    { min:200, max:499,  estrelas:2, label:'Promissor',   cor:'#c0c0c0' },
    { min:500, max:999,  estrelas:3, label:'Experiente',  cor:'#cd7f32' },
    { min:1000,max:1999, estrelas:4, label:'Renomado',    cor:'#c5a059' },
    { min:2000,max:99999,estrelas:5, label:'Lendário',    cor:'#ffd700' },
];

function getNivelReputacao() {
    var xp = app.reputacaoXP || 0;
    for (var i = REPUTACAO_NIVEIS.length-1; i >= 0; i--) {
        if (xp >= REPUTACAO_NIVEIS[i].min) return REPUTACAO_NIVEIS[i];
    }
    return REPUTACAO_NIVEIS[0];
}

function gerarDesafio() {
    if (app.desafioAtual && app.desafioAtual.rodada === app.round) return; // já tem
    var pool = DESAFIOS_POOL.slice();
    var d = pool[Math.floor(Math.random() * pool.length)];
    var premio = d.tipo==='leilao' ? '🎰 Leilão Grátis' : d.tipo==='xp' ? '⭐ +XP Bônus' : '💰 R$ '+_premioDesafio(d.base).toLocaleString('pt-BR');
    app.desafioAtual = { id:d.id, txt:d.txt, xp:d.xp, base:d.base, tipo:d.tipo, recomp:premio, rodada:app.round, cumprido:false };
    adicionarNotificacao('🎯 NOVO DESAFIO: ' + d.txt + ' → ' + premio);
    mostrarToast('🎯 ' + d.txt, 'gold');
}

function verificarDesafio(match, isHome) {
    if (!app.desafioAtual || app.desafioAtual.cumprido) return;
    if (app.desafioAtual.rodada !== app.round) return;
    var d = DESAFIOS_POOL.find(function(x){ return x.id===app.desafioAtual.id; });
    if (!d) return;
    var ok = d.check(match, isHome);
    if (ok) {
        app.desafioAtual.cumprido = true;
        app.reputacaoXP = (app.reputacaoXP||0) + d.xp;
        // Aplica recompensa
        var tipo = app.desafioAtual.tipo || 'dinheiro';
        if (tipo === 'dinheiro') {
            app.money = (app.money||0) + _premioDesafio(app.desafioAtual.base||0);
        } else if (tipo === 'xp') {
            app.reputacaoXP = (app.reputacaoXP||0) + 50;
        } else if (tipo === 'leilao') {
            app.leilaoGratis = true;
        }
        var nivel = getNivelReputacao();
        adicionarNotificacao('✅ DESAFIO CUMPRIDO! ' + d.txt + ' → ' + d.recomp + ' | XP: +' + d.xp);
        mostrarToast('✅ Desafio cumprido! ' + d.recomp, 'success');
    }
}

function renderDesafioCard() {
    var el = document.getElementById('desafio-card');
    if (!el) return;
    var d = app.desafioAtual;
    var nivel = getNivelReputacao();
    var xp = app.reputacaoXP || 0;
    var prox = REPUTACAO_NIVEIS.find(function(n){ return n.min > xp; });
    var pct = prox ? Math.round(((xp - nivel.min) / (prox.min - nivel.min)) * 100) : 100;
    var estrelas = '';
    for (var i=0;i<5;i++) estrelas += i < nivel.estrelas ? '⭐' : '☆';

    var desafioHtml = '';
    if (d && !d.cumprido) {
        desafioHtml =
            '<div style="background:#0a0a0a;border:1px solid #c5a059;border-radius:10px;padding:12px;margin-top:10px;">' +
                '<div style="color:#c5a059;font-size:11px;font-weight:bold;margin-bottom:4px;">🎯 DESAFIO DA RODADA '+d.rodada+'</div>' +
                '<div style="color:#fff;font-size:13px;margin-bottom:6px;">'+d.txt+'</div>' +
                '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                    '<span style="color:#2ecc71;font-size:12px;">'+d.recomp+'</span>' +
                    '<span style="color:#c5a059;font-size:11px;">+'+d.xp+' XP</span>' +
                '</div>' +
            '</div>';
    } else if (d && d.cumprido) {
        desafioHtml = '<div style="background:#0a2a0a;border:1px solid #2ecc71;border-radius:10px;padding:10px;margin-top:10px;text-align:center;color:#2ecc71;font-size:13px;font-weight:bold;">✅ Desafio cumprido!</div>';
    }

    el.innerHTML =
        '<div style="background:#111;border:1px solid #333;border-radius:12px;padding:14px;margin-bottom:10px;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:8px;">' +
                '<div>' +
                    '<div style="color:'+nivel.cor+';font-size:13px;font-weight:900;">'+estrelas+' '+nivel.label+'</div>' +
                    '<div style="color:#555;font-size:10px;">'+xp+' XP'+(prox?' / '+prox.min+' XP':'')+'</div>' +
                '</div>' +
                '<div style="color:'+nivel.cor+';font-size:28px;font-weight:900;">'+nivel.estrelas+'★</div>' +
            '</div>' +
            '<div style="background:#222;border-radius:4px;height:6px;overflow:hidden;">' +
                '<div style="background:'+nivel.cor+';height:100%;width:'+pct+'%;border-radius:4px;transition:width 0.5s;"></div>' +
            '</div>' +
            desafioHtml +
        '</div>';
}

function gerarJogos() {
    try {
        app.matches = [];
        if (!app.teams || app.teams.length === 0) return;
        app.teams.forEach(t => {
            if (t.inCup === undefined) t.inCup = true;
            if (t.id !== app.team.id) {
                const fm = ["4-3-3","4-4-2","3-5-2","5-4-1","4-5-1","5-3-2","3-4-3","4-2-4","5-4-1","3-3-4"];
                t.formacao = fm[Math.floor(Math.random() * fm.length)];
                _organizarTimeCPU(t);
            }
        });
        gerarJogosLiga();
    } catch (e) {
        console.error("Erro ao gerar jogos:", e);
        gerarJogosLiga();
    }
}

// Gera rodada de copa — chamada explicitamente em abrirPreJogo
function gerarJogosCopa() {
    app.matches = [];
    const vivos = app.teams.filter(t => t.inCup === true);
    if (typeof CopaMundial !== 'undefined') CopaMundial.gerarConfrontos(vivos);
    else gerarJogosLiga();
}

function gerarJogosLiga() {
    ["E", "1", "2", "3", "4"].forEach(dv => {
        let lTeams = [...app.teams].filter(t => t.l === dv).sort(() => Math.random() - 0.5);
        for (let i = 0; i < lTeams.length; i += 2) {
            if (lTeams[i + 1]) {
                app.matches.push({ t1: lTeams[i], t2: lTeams[i + 1], g1: 0, g2: 0, l: dv, isCup: false });
            }
        }
    });
}

// ==========================================
// SAVE E LOAD
// ==========================================

function salvarJogo(mostrarAviso = true) {
    if (!app.team) return;
    const dados = {
        team: app.team, money: app.money, coach: app.coach, round: app.round,
        trophies: app.trophies, teams: app.teams, configTimer: app.configTimer,
        tatic: app.tatic, isCupMatch: app.isCupMatch, cupLeg: app.cupLeg,
        cupStage: app.cupStage, currentCupPairingIds: app.currentCupPairingIds,
        diretoria: app.diretoria, torcida: app.torcida, temporada: app.temporada,
        leilaoRodada: app.leilaoRodada
    };
    localStorage.setItem('eurofoot_save_jonas', JSON.stringify(dados));
    if (mostrarAviso) mostrarMensagem('💾 Progresso salvo!', 'info');
}

function _reconstruirElencosDoDB() {
    // Força todos os times (inclusive o do usuário) a usarem os dados do DB
    // Mantém pts/stats mas substitui jogadores pelo DB atualizado
    if (!DB || !app.teams) return;
    var MAP = {G:'G',ZAG:'D',LD:'D',LE:'D',VOL:'M',MEI:'M',PTE:'A',PTD:'A',CA:'A'};
    app.teams.forEach(function(t) {
        var dbT = DB.find(function(d){ return d.n === t.nome; });
        if (!dbT) return;
        // Reconstrói jogadores na ordem correta
        var jogadores = dbT.j.map(function(x, idx) {
            var d = x.split(':');
            var force = parseInt(d[2]) || 50;
            // Preserva gols, moral e stats do save
            var antigo = t.players.find(function(p){ return p.nome === d[1]; });
            return {
                pos:d[0], nome:d[1], force:force, energy:antigo ? antigo.energy : 100,
                status: antigo && antigo.status !== 'vermelho' ? antigo.status : 'ok',
                cards: antigo ? antigo.cards : 0,
                scored: false, num:idx+1,
                salario: antigo ? antigo.salario : calcularSalario(force, t.l),
                evol: antigo ? antigo.evol : 0,
                gols: antigo ? (antigo.gols||0) : 0,
                moral: antigo ? (antigo.moral||70) : 70,
                suspJogos: antigo ? (antigo.suspJogos||0) : 0
            };
        });
        t.players = jogadores;
    });
    // Atualiza também o time do usuário
    if (app.team) {
        var dbMeu = DB.find(function(d){ return d.n === app.team.nome; });
        if (dbMeu) {
            app.team.players = dbMeu.j.map(function(x, idx) {
                var d = x.split(':');
                var force = parseInt(d[2]) || 50;
                var antigo = app.team.players.find(function(p){ return p.nome === d[1]; });
                return {
                    pos:d[0], nome:d[1], force:force, energy:antigo ? antigo.energy : 100,
                    status: antigo && antigo.status !== 'vermelho' ? antigo.status : 'ok',
                    cards: antigo ? antigo.cards : 0,
                    scored: false, num:idx+1,
                    salario: antigo ? antigo.salario : calcularSalario(force, app.team.l),
                    evol: antigo ? antigo.evol : 0,
                    gols: antigo ? (antigo.gols||0) : 0,
                    moral: antigo ? (antigo.moral||70) : 70,
                    suspJogos: antigo ? (antigo.suspJogos||0) : 0
                };
            });
        }
    }
}

function carregarJogo() {
    const save = localStorage.getItem('eurofoot_save_jonas');
    if (save) {
        const dados = JSON.parse(save);
        Object.assign(app, dados);
        // Reconstrói elencos com dados atualizados do DB
        _reconstruirElencosDoDB();
        // Garante ligaRound correto para copa funcionar
        if (!app.ligaRound) app.ligaRound = app.round || 1;
        if (!app.ligaRoundUltimaCopa) app.ligaRoundUltimaCopa = 0;

        // Atualiza elencos dos times com dados mais recentes do DB
        // (mantém pontos/stats, mas renova os jogadores)
        if (DB && app.teams) {
            app.teams.forEach(t => {
                const dbTime = DB.find(d => d.n === t.nome);
                if (dbTime) {
                    // Só atualiza se o elenco parece desatualizado (menos posições variadas)
                    const grupos = new Set(t.players.map(p => p.pos));
                    if (grupos.size < 4) {
                        t.players = dbTime.j.map((x, idx) => {
                            let d = x.split(':');
                            const force = parseInt(d[2]);
                            return { pos: d[0], nome: d[1], force, energy: 100, status: 'ok', cards: 0, scored: false, num: idx+1, salario: calcularSalario(force, t.l), evol: 0 };
                        });
                    }
                }
            });
            // Atualiza também o time do usuário
            if (app.team) {
                const dbMeu = DB.find(d => d.n === app.team.nome);
                if (dbMeu) {
                    const grupos = new Set(app.team.players.map(p => p.pos));
                    if (grupos.size < 4) {
                        app.team.players = dbMeu.j.map((x, idx) => {
                            let d = x.split(':');
                            const force = parseInt(d[2]);
                            return { pos: d[0], nome: d[1], force, energy: 100, status: 'ok', cards: 0, scored: false, num: idx+1, salario: calcularSalario(force, app.team.l), evol: 0 };
                        });
                    }
                }
            }
        }

        document.getElementById('screen-setup').style.display = 'none';
        document.getElementById('screen-office').style.display = 'flex';
        if (typeof gerenciarMusicaEscritorio === 'function') gerenciarMusicaEscritorio(true);
        updateOffice();
        setTimeout(() => mostrarToast(`Bem-vindo de volta, ${app.coach}! Temporada ${app.temporada || 1}. 🎯`, 'gold'), 800);
    } else {
        alert("Nenhum save encontrado!");
    }
}

function salvarConfig() {
    app.configTimer = parseInt(document.getElementById('cfg-timer').value) || 300;
    salvarJogo(false);
    mostrarMensagem('⚙️ Ajustes aplicados!', 'info');
    changeTab('home');
}

// ==========================================
// INICIALIZAÇÃO
// ==========================================

// ══════════════════════════════════════════
// TUTORIAL DO JOGO
// ══════════════════════════════════════════
var _tutorialStep = 0;
var _tutorialSteps = [
    {
        titulo: '⚽ Bem-vindo ao Euro Foot 2026!',
        texto: 'Você é um técnico que começa na Série D e tenta chegar à Liga Europa! Vamos aprender o básico.',
        icone: '⚽'
    },
    {
        titulo: '🏠 Tela Principal',
        texto: 'Aqui você vê seus titulares e reservas. Clique em um jogador para selecioná-lo (fica destacado) e depois clique em outro para trocar as posições.',
        icone: '🏠'
    },
    {
        titulo: '⚠️ Penalidade de Posição',
        texto: 'Ao trocar jogadores de posições diferentes, a força (F:) fica vermelha e cai: ATK↔MEI: -5% | ATK↔DEF: -12% | G↔ATK: -20%. Use com sabedoria!',
        icone: '⚠️'
    },
    {
        titulo: '📋 Esquema Tático',
        texto: 'Escolha a formação do seu time (4-3-3, 4-4-2, etc). A formação muda a quantidade de defensores, meias e atacantes na escalação.',
        icone: '📋'
    },
    {
        titulo: '💰 Mercado e Scout',
        texto: 'Na aba Mercado, negocie jogadores. Use o botão NEGOCIAR para enviar propostas — o clube pode aceitar ou recusar. A resposta chega no próximo jogo pelo sininho 🔔.',
        icone: '💰'
    },
    {
        titulo: '🔔 Sininho de Avisos',
        texto: 'Todas as notícias importantes chegam aqui: transferências, propostas, lesões, renovações, imprensa e mais. Fique de olho!',
        icone: '🔔'
    },
    {
        titulo: '⚽ Durante a Partida',
        texto: 'Clique em PAUSA para fazer substituições e mudar a formação. No intervalo aparece automaticamente a tela de substituições.',
        icone: '⚽'
    },
    {
        titulo: '🏆 Subindo de Divisão',
        texto: 'Termine entre os primeiros da sua divisão para subir! Série D → C → B → A → Liga Europa. Ganhe a Copa Mundial para o troféu máximo 🏆.',
        icone: '🏆'
    },
    {
        titulo: '❤️ Moral e Contrato',
        texto: 'Jogadores insatisfeitos (😡) podem ir embora! Aceite renovações de contrato para manter o elenco feliz. Jogadores fora de posição também ficam insatisfeitos.',
        icone: '❤️'
    },
    {
        titulo: '✅ Pronto para jogar!',
        texto: 'Agora você sabe o básico. Você pode rever o tutorial a qualquer momento em Config. Boa sorte, treinador! 🎯',
        icone: '🎯'
    }
];

function abrirTutorial() {
    _tutorialStep = 0;
    _mostrarStepTutorial();
}

function _mostrarStepTutorial() {
    var step = _tutorialSteps[_tutorialStep];
    var modal = document.getElementById('modal-tutorial');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-tutorial';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.96);z-index:99000;display:flex;align-items:center;justify-content:center;padding:20px;';
        document.body.appendChild(modal);
    }

    var total = _tutorialSteps.length;
    var pct = Math.round((_tutorialStep / (total-1)) * 100);
    var isLast = _tutorialStep === total - 1;

    modal.innerHTML =
        '<div style="background:#111;border:2px solid #c5a059;border-radius:20px;padding:28px 24px;max-width:400px;width:100%;text-align:center;">' +
            '<div style="font-size:52px;margin-bottom:12px;">' + step.icone + '</div>' +
            '<h2 style="color:#c5a059;font-size:18px;margin:0 0 14px;">' + step.titulo + '</h2>' +
            '<p style="color:#ddd;font-size:14px;line-height:1.7;margin:0 0 20px;white-space:pre-line;">' + step.texto + '</p>' +
            // Barra de progresso
            '<div style="background:#222;border-radius:4px;height:6px;margin-bottom:20px;overflow:hidden;">' +
                '<div style="background:#c5a059;height:100%;width:' + pct + '%;transition:width 0.3s;border-radius:4px;"></div>' +
            '</div>' +
            '<div style="color:#555;font-size:11px;margin-bottom:16px;">' + (_tutorialStep+1) + ' / ' + total + '</div>' +
            '<div style="display:flex;gap:10px;">' +
                (_tutorialStep > 0 ? '<button onclick="_tutorialAnterior()" style="flex:1;background:#222;color:#aaa;border:1px solid #333;padding:13px;border-radius:10px;font-weight:bold;cursor:pointer;">← Anterior</button>' : '<div style="flex:1;"></div>') +
                (isLast
                    ? '<button onclick="_fecharTutorial()" style="flex:2;background:#c5a059;color:#000;border:none;padding:13px;border-radius:10px;font-weight:900;font-size:15px;cursor:pointer;">🎮 JOGAR!</button>'
                    : '<button onclick="_tutorialProximo()" style="flex:2;background:#c5a059;color:#000;border:none;padding:13px;border-radius:10px;font-weight:900;font-size:15px;cursor:pointer;">Próximo →</button>') +
            '</div>' +
            '<button onclick="_fecharTutorial()" style="width:100%;background:#1a1a1a;border:1px solid #333;color:#888;font-size:13px;margin-top:10px;padding:10px;border-radius:8px;cursor:pointer;">⏭ Pular Tutorial</button>' +
        '</div>';
    modal.style.display = 'flex';
}

function _tutorialProximo() {
    if (_tutorialStep < _tutorialSteps.length - 1) {
        _tutorialStep++;
        _mostrarStepTutorial();
    }
}

function _tutorialAnterior() {
    if (_tutorialStep > 0) {
        _tutorialStep--;
        _mostrarStepTutorial();
    }
}

function _fecharTutorial() {
    var modal = document.getElementById('modal-tutorial');
    if (modal) modal.style.display = 'none';
}

function init() {
    app.teams = DB.map((t, i) => ({
        id: i, nome: t.n, l: String(t.l), pts: 0, j: 0, sg: 0, inCup: true,
        players: t.j.map((x, idx) => {
            let d = x.split(':');
            const liga = String(t.l);
            const force = parseInt(d[2]);
            return {
                pos: d[0], nome: d[1], force: force,
                energy: 100, status: 'ok', cards: 0, scored: false, num: idx + 1,
                salario: calcularSalario(force, liga),
                evol: 0
            };
        })
    }));
    gerarMercado();
    const grid = document.getElementById('grid-teams');
    if (grid) {
        grid.innerHTML = `
            <button onclick="carregarJogo()" style="
                width:100%;padding:16px;margin-bottom:10px;border:none;border-radius:12px;
                background:linear-gradient(135deg,#1b5e20,#2ecc71);
                color:#fff;font-size:16px;font-weight:900;cursor:pointer;
                box-shadow:0 4px 15px rgba(46,204,113,0.4);letter-spacing:1px;">
                💾 CONTINUAR CARREIRA
            </button>
            <button onclick="novoJogo()" style="
                width:100%;padding:16px;border:none;border-radius:12px;
                background:linear-gradient(135deg,#7f4f00,#c5a059);
                color:#000;font-size:16px;font-weight:900;cursor:pointer;
                box-shadow:0 4px 15px rgba(197,160,89,0.4);letter-spacing:1px;">
                ⚽ NOVO JOGO
            </button>
        `;
    }
}

function novoJogo() {
    if (localStorage.getItem('eurofoot_save_jonas') && !confirm("Deseja deletar o progresso atual?")) return;
    localStorage.removeItem('eurofoot_save_jonas');
    app.round = 1; app.isCupMatch = false; app.cupLeg = 1;
    app.diretoria = 70; app.torcida = 70; app.temporada = 1;
    sortearTime();
}

function sortearTime() {
    let input = document.getElementById('input-coach');
    app.coach = input && input.value.trim() !== "" ? input.value.trim() : "Treinador Jonas";
    let timesD = app.teams.filter(t => t.l === "4");
    app.team = timesD[Math.floor(Math.random() * timesD.length)];
    app.money = 500000;
    document.getElementById('screen-setup').style.display = 'none';
    document.getElementById('screen-office').style.display = 'flex';
    if (typeof gerenciarMusicaEscritorio === 'function') gerenciarMusicaEscritorio(true);
    updateOffice();
    // Tutorial aparece sempre no novo jogo
    setTimeout(abrirTutorial, 1000);
    // Mensagem de boas-vindas
    setTimeout(() => {
        if (typeof dispararFogos === 'function') {
            dispararFogos(
                `Bem-vindo, ${app.coach}! 🎉`,
                `Você é o novo técnico do ${app.team.nome}! Boa sorte na Série D!`,
                7000
            );
        }
        setTimeout(() => mostrarMensagemDiretoria(), 3000);
    }, 800);
}

// ==========================================
// MENSAGENS DO JOGO
// ==========================================

// ── SISTEMA DE NOTIFICAÇÕES (SININHO) ──
const _notificacoes = [];
let _notificacoesNaoLidas = 0;

const MENSAGENS_DIRETORIA_NOTIF = [
    "📋 Precisamos de um goleiro! Vá ao mercado.",
    "📋 Reforce o meio-campo antes da próxima rodada.",
    "📋 Busque um atacante. O time precisa de gols!",
    "📋 A diretoria exige vitória no próximo clássico!",
    "📋 Contrate pelo menos 2 jogadores esta semana.",
    "📋 O elenco está fraco. Vá ao scout procurar reforços.",
    "📋 A torcida quer ver o time ganhar. Aja agora!",
    "📋 Reforce a defesa. Tomamos gols demais.",
    "📋 O orçamento foi liberado. Use bem o dinheiro!",
    "📋 O conselho avalia sua permanência no cargo.",
];

function adicionarNotificacao(msg) {
    _notificacoes.unshift({ msg, lida: false, hora: new Date().toLocaleTimeString('pt-BR', {hour:'2-digit',minute:'2-digit'}) });
    if (_notificacoes.length > 20) _notificacoes.pop();
    _notificacoesNaoLidas++;
    _atualizarSininho();
}

function _atualizarSininho() {
    const badge = document.getElementById('sininho-badge');
    if (badge) {
        badge.textContent = _notificacoesNaoLidas > 0 ? _notificacoesNaoLidas : '';
        badge.style.display = _notificacoesNaoLidas > 0 ? 'flex' : 'none';
    }
}

function abrirNotificacoes() {
    _notificacoesNaoLidas = 0;
    _notificacoes.forEach(n => n.lida = true);
    _atualizarSininho();
    let modal = document.getElementById('modal-notif');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-notif';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.92);z-index:30000;flex-direction:column;';
        document.body.appendChild(modal);
    }
    const lista = _notificacoes.length === 0
        ? '<div style="color:#555;padding:20px;text-align:center;">Nenhuma notificação.</div>'
        : _notificacoes.map(n => `<div style="padding:14px 16px;border-bottom:1px solid #1a1a1a;background:${n.lida?'transparent':'rgba(197,160,89,0.06)'};">
            <div style="color:#fff;font-size:13px;">${n.msg}</div>
            <div style="color:#555;font-size:10px;margin-top:4px;">${n.hora}</div>
          </div>`).join('');
    modal.innerHTML = `<div style="background:#0a0a0a;border-bottom:1px solid #222;padding:15px 16px;display:flex;align-items:center;justify-content:space-between;">
        <span style="color:var(--gold);font-weight:bold;font-size:16px;">🔔 Notificações</span>
        <button onclick="document.getElementById('modal-notif').style.display='none'"
            style="background:#222;color:#fff;border:none;padding:8px 16px;border-radius:8px;font-weight:bold;cursor:pointer;">✕ FECHAR</button>
    </div>
    <div style="flex:1;overflow-y:auto;">${lista}</div>`;
    modal.style.display = 'flex';
}

function dispararNotificacaoDiretoria() {
    const msg = MENSAGENS_DIRETORIA_NOTIF[Math.floor(Math.random() * MENSAGENS_DIRETORIA_NOTIF.length)];
    adicionarNotificacao(msg);
}

// ── SISTEMA DE TOASTS SIMPLES ──
var _tFila = [];
var _tAtivo = false;

function mostrarToast(msg, tipo) {
    tipo = tipo || 'gold';
    // info → redireciona para sininho, não aparece como balão
    if (tipo === 'info') { adicionarNotificacao(msg); return; }
    _tFila.push({msg: msg, tipo: tipo});
    if (!_tAtivo) _showToast();
}

function _showToast() {
    if (_tFila.length === 0) { _tAtivo = false; return; }
    // Não mostra toast se leilão estiver aberto
    var leilao = document.getElementById('modal-leilao');
    if (leilao && leilao.style.display !== 'none') {
        // Aguarda leilão fechar
        setTimeout(_showToast, 500);
        return;
    }
    _tAtivo = true;
    var item = _tFila.shift();
    var old = document.getElementById('gtoast');
    if (old && old.parentNode) old.parentNode.removeChild(old);

    var cores = { gold:'#b8860b', danger:'#c62828', success:'#1b5e20' };
    var bg = cores[item.tipo] || cores.gold;
    var cor = item.tipo === 'gold' ? '#fff' : '#fff';

    var wrap = document.createElement('div');
    wrap.id = 'gtoast';
    wrap.style.cssText = 'position:fixed;top:14px;left:50%;transform:translateX(-50%);z-index:999999;display:flex;align-items:center;border-radius:10px;overflow:visible;max-width:88vw;box-shadow:0 4px 20px rgba(0,0,0,0.85);background:'+bg+';color:'+cor+';font-weight:bold;font-size:13px;padding:12px 30px 12px 14px;line-height:1.4;';

    var txt = document.createElement('span');
    txt.textContent = item.msg;
    wrap.appendChild(txt);

    // X pequeno no canto superior direito
    var btn = document.createElement('span');
    btn.textContent = '✕';
    btn.style.cssText = 'position:absolute;top:4px;right:6px;font-size:13px;font-weight:900;cursor:pointer;opacity:0.75;line-height:1;padding:2px 3px;';
    function fechar() {
        var el = document.getElementById('gtoast');
        if (el && el.parentNode) el.parentNode.removeChild(el);
        clearTimeout(wrap._t);
        _tAtivo = false;
        setTimeout(_showToast, 80);
    }
    btn.onclick = fechar;
    btn.ontouchstart = function(e){ e.preventDefault(); fechar(); };
    wrap.appendChild(btn);
    document.body.appendChild(wrap);
    wrap._t = setTimeout(fechar, 4000);
}

function mostrarMensagem(msg, tipo) { mostrarToast(msg, tipo); }

// Toast rápido de 2s — para resultado de partida (vitória/empate/derrota)
function mostrarToastRapido(msg, tipo = 'info') {
    let t = document.getElementById('game-toast-rapido');
    if (!t) {
        t = document.createElement('div');
        t.id = 'game-toast-rapido';
        t.style.cssText = 'position:fixed;bottom:90px;left:50%;transform:translateX(-50%);z-index:99998;padding:12px 24px;border-radius:30px;font-weight:900;font-size:18px;text-align:center;max-width:80vw;box-shadow:0 4px 20px rgba(0,0,0,0.6);transition:opacity 0.3s;pointer-events:none;';
        document.body.appendChild(t);
    }
    const cores = { gold: '#c5a059', info: '#2196f3', danger: '#f44336', success: '#2ecc71' };
    t.style.background = cores[tipo] || cores.info;
    t.style.color = tipo === 'success' ? '#fff' : tipo === 'danger' ? '#fff' : '#fff';
    t.textContent = msg;
    t.style.opacity = '1';
    clearTimeout(t._t);
    t._t = setTimeout(() => { t.style.opacity = '0'; }, 2000);
}

const RIVAIS_HISTORICOS = {
    "Flamengo":"Fluminense","Fluminense":"Flamengo",
    "Corinthians":"Palmeiras","Palmeiras":"Corinthians",
    "São Paulo":"Corinthians","Botafogo":"Flamengo",
    "Atlético-MG":"Cruzeiro","Cruzeiro":"Atlético-MG",
    "Internacional":"Grêmio","Grêmio":"Internacional",
    "Vasco":"Fluminense","Santos":"Corinthians",
    "Real Madrid":"Barcelona","Barcelona":"Real Madrid",
    "Liverpool":"Manchester City","Manchester City":"Liverpool",
    "Bayern Munique":"Borussia Dortmund","Borussia Dortmund":"Bayern Munique",
    "Inter de Milão":"AC Milan","AC Milan":"Inter de Milão"
};

const MENSAGENS_DIRETORIA = [
    "A diretoria espera resultados! Não decepcione.",
    "Precisamos de vitórias para agradar os patrocinadores.",
    "O conselho está de olho no seu trabalho.",
    "Contratações inteligentes são essenciais para subir de divisão.",
    "A torcida exige mais gols e menos desculpas!",
    "Você tem nosso apoio, mas os resultados precisam aparecer.",
    "O planejamento da temporada depende de você.",
    "Novos investidores estão chegando. Mostre serviço!"
];

const MENSAGENS_TORCIDA = [
    "A torcida quer ver o time ganhar! Não os decepcione.",
    "As arquibancadas estão cheias de esperança. Honre isso.",
    "Os torcedores viajam longe para ver o time. Dê alegria a eles!",
    "A pressão da torcida é enorme. Responda dentro de campo.",
    "Mostre futebol bonito e a torcida ficará do seu lado."
];

const MENSAGENS_JOGADOR = [
    "precisa jogar mais. Está ficando para trás no time!",
    "está pedindo aumento de salário. Ele se sente subvalorizado.",
    "quer mais oportunidades como titular.",
    "está descontente com pouco tempo em campo.",
    "pediu para conversar sobre seu futuro no clube."
];

function mostrarMensagemDiretoria() {
    if (Math.random() > 0.4) {
        const rival = app.team ? RIVAIS_HISTORICOS[app.team.nome] : null;
        const adv = app._adversarioCache;
        if (rival && adv && adv.nome === rival) {
            const msgRival = `🔥 CLÁSSICO CONTRA O ${rival.toUpperCase()}! Precisamos ganhar em casa!`;
            if (app.round % 3 === 0) mostrarToast(`📋 Diretoria: "${msgRival}"`, 'danger');
        adicionarNotificacao(`📋 Diretoria: "${msgRival}"`);
            adicionarNotificacao(`📋 Diretoria: ${msgRival}`);
            return;
        }
        const msg = MENSAGENS_DIRETORIA[Math.floor(Math.random() * MENSAGENS_DIRETORIA.length)];
        mostrarToast(`📋 Diretoria: "${msg}"`, 'info');
        // 50% chance de também enviar para o sininho
        if (Math.random() > 0.5) adicionarNotificacao(`📋 Diretoria: ${msg}`);
    }
    // A cada 3 rodadas, diretoria manda notificação de reforço
    if (app.round > 0 && app.round % 3 === 0) dispararNotificacaoDiretoria();
}

function mostrarMensagemTorcida() {
    if (Math.random() > 0.5) {
        const msg = MENSAGENS_TORCIDA[Math.floor(Math.random() * MENSAGENS_TORCIDA.length)];
        mostrarToast(`🔥 Torcida: "${msg}"`, 'gold');
    }
}

function mostrarMensagemJogador() {
    if (!app.team || app.team.players.length === 0) return;
    if (Math.random() > 0.6) {
        const reservas = app.team.players.slice(11);
        if (reservas.length > 0) {
            const p = reservas[Math.floor(Math.random() * reservas.length)];
            const msg = MENSAGENS_JOGADOR[Math.floor(Math.random() * MENSAGENS_JOGADOR.length)];
            mostrarToast(`💬 ${abreviarNome(p.nome)} ${msg}`, 'info');
        }
    }
}

// ==========================================
// BARRAS DIRETORIA E TORCIDA
// ==========================================

function atualizarBarras(resultado) {
    // resultado: 'vitoria', 'empate', 'derrota'
    if (resultado === 'vitoria') {
        app.diretoria = Math.min(100, (app.diretoria || 70) + 8);
        app.torcida = Math.min(100, (app.torcida || 70) + 12);
    } else if (resultado === 'empate') {
        app.diretoria = Math.max(0, (app.diretoria || 70) - 3);
        app.torcida = Math.max(0, (app.torcida || 70) - 5);
    } else {
        app.diretoria = Math.max(0, (app.diretoria || 70) - 10);
        app.torcida = Math.max(0, (app.torcida || 70) - 15);
    }
    renderBarras();

    if ((app.diretoria || 70) < 20) {
        mostrarToast('⚠️ A diretoria está prestes a te demitir! Vença as próximas partidas!', 'danger');
    } else if ((app.torcida || 70) < 20) {
        mostrarToast('😤 A torcida está furiosa! O estádio está vaiando o time!', 'danger');
    }
}

function renderBarras() {
    const dir = app.diretoria || 70;
    const tor = app.torcida || 70;
    const fillDir = document.querySelector('#bar-diretoria .bar-fill');
    const fillTor = document.querySelector('#bar-torcida .bar-fill');
    if (fillDir) {
        fillDir.style.width = dir + '%';
        fillDir.style.background = dir > 60 ? '#2ecc71' : dir > 30 ? '#f1c40f' : '#e74c3c';
    }
    if (fillTor) {
        fillTor.style.width = tor + '%';
        fillTor.style.background = tor > 60 ? '#2ecc71' : tor > 30 ? '#f1c40f' : '#e74c3c';
    }
    // Atualiza labels com %
    const lblDir = document.getElementById('lbl-dir-pct');
    const lblTor = document.getElementById('lbl-tor-pct');
    if (lblDir) lblDir.textContent = dir + '%';
    if (lblTor) lblTor.textContent = tor + '%';

    // Fundo amarelo copa — só na VOLTA (leg 2), não na ida nem no escritório após a volta
    var emCopa = app.isCupMatch; // amarelo em QUALQUER rodada da copa (IDA e VOLTA)
    const header = document.querySelector('.office-header');
    if (header) {
        if (emCopa) {
            header.style.background = 'linear-gradient(135deg,#7f4f00,#c5a059)';
            header.style.borderBottom = '2px solid #ffd700';
        } else {
            header.style.background = '#000';
            header.style.borderBottom = '1px solid #333';
        }
    }
    const nameEl = document.getElementById('txt-team-name');
    if (nameEl) nameEl.style.color = emCopa ? '#000' : '#fff';
    const coachEl = document.getElementById('txt-coach-display');
    if (coachEl) coachEl.style.color = emCopa ? '#000' : '#fff';
    const moneyEl = document.getElementById('txt-money');
    if (moneyEl) {
        const spans = moneyEl.querySelectorAll('span');
        if (spans[0]) spans[0].style.color = emCopa ? '#1b5e20' : '#4caf50';
    }
    document.querySelectorAll('.bar-item span').forEach(function(el){
        el.style.color = emCopa ? '#000' : '#aaa';
    });
}

// ==========================================
// NAVEGAÇÃO E TABELA
// ==========================================

function changeTab(t) {
    ['view-home', 'view-tabela', 'view-mercado', 'view-config'].forEach(v => {
        const el = document.getElementById(v);
        if (el) el.style.display = 'none';
    });
    const target = document.getElementById('view-' + t);
    if (target) {
        target.style.display = 'block';
        if (t === 'tabela') renderTable();
        if (t === 'mercado') renderMercado();
        if (t === 'config') renderConfig();
    }
}

function renderTable() {
    const container = document.getElementById('tabela-body');
    if (!container) return;
    const ligaFiltro = document.getElementById('select-liga-view') ? document.getElementById('select-liga-view').value : app.team.l;
    const thead = document.getElementById('tabela-head');

    // Atualiza cabeçalho conforme modo
    if (thead) {
        if (ligaFiltro === "COPA") {
            thead.innerHTML = `<tr style="color:var(--gold);font-size:11px;">
                <th style="text-align:right;padding:6px;">TIME</th>
                <th style="text-align:center;width:60px;"></th>
                <th style="text-align:left;padding:6px;">TIME</th>
            </tr>`;
        } else {
            thead.innerHTML = `<tr style="color:var(--gold);font-size:11px;">
                <th>#</th><th style="text-align:left">TIME</th><th>PTS</th><th>J</th><th>SG</th>
            </tr>`;
        }
    }

    if (ligaFiltro === "COPA") {
        // Monta confrontos da copa usando os pairings salvos
        const pairIds = app.currentCupPairingIds || [];
        let htmlCopa = '';

        if (pairIds.length >= 2) {
            htmlCopa += `<tr><td colspan="5" style="padding:8px 10px;color:var(--gold);font-weight:bold;font-size:12px;background:#0a0a0a;">
                🏆 ${app.cupStage || 'COPA MUNDIAL'} — ${app.cupLeg === 1 ? 'IDA' : 'VOLTA'}
            </td></tr>`;
            for (let i = 0; i < pairIds.length; i += 2) {
                const t1 = app.teams.find(t => t.id === pairIds[i]);
                const t2 = app.teams.find(t => t.id === pairIds[i+1]);
                if (!t1 || !t2) continue;
                const vivo1 = t1.inCup, vivo2 = t2.inCup;
                // Placar acumulado (gols da ida se estiver na volta)
                const g1ida = t1.golsIda || 0;
                const g2ida = t2.golsIda || 0;
                const placarIda = (app.cupLeg === 2) ? `<span style="color:#888;font-size:10px;">(ida: ${g1ida}-${g2ida})</span>` : '';
                const cor1 = !vivo1 ? '#555' : t1.id === app.team.id ? 'var(--gold)' : '#fff';
                const cor2 = !vivo2 ? '#555' : t2.id === app.team.id ? 'var(--gold)' : '#fff';
                const elim1 = !vivo1 ? ' ❌' : '';
                const elim2 = !vivo2 ? ' ❌' : '';
                htmlCopa += `<tr style="height:52px;border-bottom:1px solid #1a1a1a;">
                    <td style="text-align:right;padding:8px 6px;color:${cor1};font-weight:bold;">${t1.nome}${elim1}</td>
                    <td style="text-align:center;color:var(--gold);font-weight:bold;min-width:60px;">
                        VS<br>${placarIda}
                    </td>
                    <td style="text-align:left;padding:8px 6px;color:${cor2};font-weight:bold;">${t2.nome}${elim2}</td>
                </tr>`;
            }
        } else {
            // Fallback: lista simples dos que ainda estão na copa
            htmlCopa = app.teams.filter(t => t.inCup).map(t => `
                <tr style="height:50px;">
                    <td style="text-align:center;color:var(--gold);">🏆</td>
                    <td style="text-align:left;font-weight:bold;padding-left:10px;" colspan="3">${t.nome}</td>
                    <td style="text-align:center;font-size:11px;color:#aaa;">NA DISPUTA</td>
                </tr>`).join('');
        }
        container.innerHTML = htmlCopa;
        return;
    }

    const s = [...app.teams].filter(t => t.l === ligaFiltro).sort((a, b) => b.pts - a.pts || b.sg - a.sg);
    const total = s.length;

    // Thead dinâmico para liga normal
    if (thead) {
        thead.innerHTML = `<tr style="color:var(--gold);font-size:10px;background:#0a0a0a;">
            <th style="width:24px;text-align:center;">#</th>
            <th style="text-align:left;padding-left:6px;">TIME</th>
            <th style="width:28px;text-align:center;">PTS</th>
            <th style="width:22px;text-align:center;">J</th>
            <th style="width:22px;text-align:center;">V</th>
            <th style="width:22px;text-align:center;">E</th>
            <th style="width:22px;text-align:center;">D</th>
            <th style="width:28px;text-align:center;">SG</th>
            <th style="width:28px;text-align:center;">GM</th>
        </tr>`;
    }

    container.innerHTML = s.map((t, i) => {
        let bordaStyle = '';
        if (['2','3','4'].includes(ligaFiltro) && i < 2) bordaStyle = 'border-left:4px solid #2ecc71;';
        if (['1','2','3'].includes(ligaFiltro) && i >= total - 2) bordaStyle = 'border-left:4px solid #e74c3c;';
        const meuTime = t.id === app.team.id;
        let badge = '';
        if (['2','3','4'].includes(ligaFiltro) && i < 2) badge = '<span style="color:#2ecc71;font-size:9px;"> ⬆</span>';
        if (['1','2','3'].includes(ligaFiltro) && i >= total - 2) badge = '<span style="color:#e74c3c;font-size:9px;"> ⬇</span>';
        const v = t.v || 0, e = t.e || 0, d = t.d || 0;
        const gm = t.gm || 0;
        const sgStr = t.sg > 0 ? `+${t.sg}` : String(t.sg);
        return `<tr style="height:44px;background:${meuTime ? 'rgba(197,160,89,0.1)' : 'transparent'};${bordaStyle}">
            <td style="text-align:center;font-size:11px;">${i + 1}</td>
            <td style="text-align:left;font-weight:bold;padding-left:6px;font-size:12px;${meuTime ? 'color:var(--gold)' : ''};max-width:110px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;">${t.nome}${badge}</td>
            <td style="text-align:center;font-weight:900;color:var(--gold);font-size:13px;">${t.pts}</td>
            <td style="text-align:center;font-size:11px;">${t.j}</td>
            <td style="text-align:center;font-size:11px;color:#2ecc71;">${v}</td>
            <td style="text-align:center;font-size:11px;color:#aaa;">${e}</td>
            <td style="text-align:center;font-size:11px;color:#e74c3c;">${d}</td>
            <td style="text-align:center;font-size:11px;${t.sg > 0 ? 'color:#2ecc71' : t.sg < 0 ? 'color:#e74c3c' : ''}">${sgStr}</td>
            <td style="text-align:center;font-size:11px;">${gm}</td>
        </tr>`;
    }).join('');
}

// ==========================================
// MERCADO E SCOUT
// ==========================================

function gerarMercado() {
    app.market = [];
    for (let i = 0; i < 12; i++) {
        let tA = DB[Math.floor(Math.random() * DB.length)];
        let pA = tA.j[Math.floor(Math.random() * tA.j.length)];
        let d = pA.split(':');
        const force = parseInt(d[2]);
        app.market.push({
            pos: d[0], nome: d[1], force: force,
            energy: 100, status: 'ok', cards: 0, scored: false,
            timeOrigem: tA.n, num: Math.floor(Math.random() * 98) + 2,
            salario: calcularSalario(force, String(tA.l)),
            evol: 0
        });
    }
}

function renderMercado() {
    const container = document.getElementById('view-mercado');
    if (!container) return;
    const folha = calcularFolhaSalarial();
    container.innerHTML = `
        <div style="background:#1a1a1a;padding:15px;border-radius:10px;border:1px solid var(--gold);margin-bottom:15px;">
            <h3 style="color:var(--gold);margin:0 0 10px 0;font-size:15px;">🔍 SCOUT PROFISSIONAL</h3>
            <div style="font-size:11px;color:#aaa;margin-bottom:10px;">💰 Folha Salarial Atual: <b style="color:#f44336;">R$ ${folha.toLocaleString()}/mês</b></div>
            <div style="display:flex;gap:5px;margin-bottom:8px;">
                <input type="text" id="search-name" placeholder="Nome do jogador..." style="flex:1;padding:10px;border-radius:5px;border:1px solid #333;background:#000;color:#fff;font-size:13px;">
                <button onclick="pesquisar()" style="background:var(--gold);border:none;padding:0 15px;border-radius:5px;font-weight:bold;cursor:pointer;color:#000;">BUSCAR</button>
            </div>
            <input type="text" id="search-team" placeholder="Buscar por time..." style="width:100%;padding:10px;border-radius:5px;border:1px solid #333;background:#000;color:#fff;font-size:13px;margin-bottom:8px;" oninput="pesquisarPorTime(this.value)">
            <div id="search-results" style="max-height:220px;overflow-y:auto;"></div>
        </div>
        <div style="color:var(--gold);font-size:12px;font-weight:bold;margin-bottom:10px;padding-left:5px;">🛒 JOGADORES DISPONÍVEIS</div>
        <div id="market-list"></div>
    `;
    renderListaMercado();
}

function renderListaMercado() {
    const c = document.getElementById('market-list');
    if (!c) return;
    c.innerHTML = app.market.map((p, i) => {
        let preco = Math.floor(calcularValorJogador(p, app.team.l) * 1.2);
        const cor = obterCorSetor(p.pos);
        return `<div style="display:flex;align-items:center;padding:12px;background:#1a1a1a;margin-bottom:8px;border-radius:8px;border-left:4px solid ${cor};">
            <div style="flex:1;">
                <b style="color:#fff;font-size:14px;">${p.nome}</b>
                <span style="color:${cor};font-size:11px;margin-left:6px;">${formatarPosicao(p.pos)}</span><br>
                <small style="color:#aaa;">F:${p.force} | ${p.timeOrigem} | 💸 R$ ${p.salario.toLocaleString()}/mês</small>
            </div>
            <button onclick="negociarJogadorMercado(${i}, ${preco})" style="background:#1a3a5c;color:#fff;border:none;padding:8px 10px;border-radius:5px;font-weight:bold;font-size:11px;cursor:pointer;">🤝 NEGOCIAR</button>
        </div>`;
    }).join('');
}

// Chances de recusa por divisão do time dono do jogador vs time do usuário
function _calcularChanceRecusa(ligaOrigem, ligaDestino) {
    // Time de liga superior raramente vende para liga inferior
    const ordem = { 'E': 0, '1': 1, '2': 2, '3': 3, '4': 4 };
    const diff = (ordem[ligaOrigem] || 4) - (ordem[ligaDestino] || 4);
    if (diff < 0) return 0.70;   // origem melhor que destino: 70% recusa
    if (diff === 0) return 0.30; // mesma divisão: 30% recusa
    return 0.10;                 // origem pior que destino: 10% recusa
}

const _RECUSAS = [
    (time, jogador) => `❌ O ${time} recusou! "${jogador} é peça fundamental e não está à venda."`,
    (time, jogador) => `❌ Negociação frustrada! O ${time} quer o dobro do valor proposto por ${jogador}.`,
    (time, jogador) => `❌ Sem acordo! A diretoria do ${time} disse que ${jogador} ficará no clube.`,
    (time, jogador) => `❌ Recusado! O agente de ${jogador} informou que o ${time} não libera.`,
    (time, jogador) => `❌ O ${time} exigiu uma proposta muito maior por ${jogador}. Tente mais tarde.`,
];
const _ACEITES = [
    (time, jogador, val) => `✅ ACORDO! O ${time} aceitou R$ ${val} por ${jogador}. Bem-vindo ao clube!`,
    (time, jogador, val) => `✅ Transferência concluída! ${jogador} chega por R$ ${val} vindo do ${time}.`,
    (time, jogador, val) => `✅ Negócio fechado! ${jogador} (${time}) assina por R$ ${val}.`,
];

function negociarJogadorMercado(idx, preco) {
    const p = app.market[idx];
    if (!p) return;
    const jogObj = {nome:p.nome, pos:p.pos, force:p.force, salario:p.salario, _mercadoIdx:idx,
        energy:100, status:'ok', cards:0, scored:false, num:99};
    _abrirModalContraProposta(jogObj, p.timeOrigem||'Livre', preco, null);
}

function pesquisar() {
    const termo = document.getElementById('search-name').value.toLowerCase().trim();
    if (termo.length < 2) return;
    let achados = [];
    app.teams.forEach(time => {
        time.players.forEach(p => {
            if (p.nome.toLowerCase().includes(termo) && time.id !== app.team.id) {
                achados.push({ ...p, timeNome: time.nome, timeId: time.id, liga: time.l });
            }
        });
    });
    renderResultadosBusca(achados.slice(0, 10));
}

function pesquisarPorTime(termo) {
    if (termo.length < 2) { document.getElementById('search-results').innerHTML = ''; return; }
    let achados = [];
    app.teams.forEach(time => {
        if (time.nome.toLowerCase().includes(termo.toLowerCase()) && time.id !== app.team.id) {
            time.players.forEach(p => achados.push({ ...p, timeNome: time.nome, timeId: time.id, liga: time.l }));
        }
    });
    renderResultadosBusca(achados.slice(0, 15));
}

function renderResultadosBusca(achados) {
    const el = document.getElementById('search-results');
    if (!el) return;
    if (achados.length === 0) { el.innerHTML = '<div style="color:#888;padding:10px;font-size:12px;">Nenhum resultado encontrado.</div>'; return; }
    el.innerHTML = achados.map(p => {
        let preco = Math.floor(calcularValorJogador(p, p.liga) * 1.5);
        const cor = obterCorSetor(p.pos);
        return `<div style="padding:10px;border-bottom:1px solid #222;display:flex;justify-content:space-between;align-items:center;">
            <div>
                <span style="color:#fff;font-size:12px;font-weight:bold;">${p.nome}</span>
                <span style="color:${cor};font-size:10px;margin-left:5px;">${formatarPosicao(p.pos)}</span><br>
                <span style="color:#aaa;font-size:10px;">${p.timeNome} | F:${p.force} | 💸 R$ ${p.salario ? p.salario.toLocaleString() : '?'}/mês</span>
            </div>
            <button onclick="negociarJogadorScout('${p.nome}',${p.timeId},${preco},'${p.timeNome}')" style="background:#1a3a5c;color:#fff;border:1px solid #3498db;padding:6px 10px;border-radius:4px;font-size:10px;cursor:pointer;">🤝 NEGOCIAR</button>
        </div>`;
    }).join('');
}

function negociarJogadorScout(nome, timeId, preco, timeNome) {
    const tv = app.teams.find(t => t.id == timeId);
    if (!tv) return;
    const p = tv.players.find(pl => pl.nome === nome);
    if (!p) return;
    _abrirModalContraProposta(p, timeNome||tv.nome, preco, null);
}

// Modal de negociação unificado
function _abrirModalNegociacao(nomeJogador, nomeTime, timeId, preco, salario, origem, idxMercado) {
    let modal = document.getElementById('modal-negociacao');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-negociacao';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.93);z-index:40000;display:flex;align-items:center;justify-content:center;padding:20px;';
        document.body.appendChild(modal);
    }

    modal.innerHTML = `<div style="background:#111;border:2px solid #3498db;border-radius:15px;padding:22px;max-width:95vw;width:100%;">
        <h3 style="color:#3498db;margin:0 0 12px;font-size:16px;">🤝 NEGOCIAÇÃO</h3>
        <div style="background:#000;border-radius:8px;padding:12px;margin-bottom:16px;border:1px solid #222;">
            <div style="color:#fff;font-weight:bold;font-size:16px;">${nomeJogador}</div>
            <div style="color:#aaa;font-size:12px;margin-top:2px;">Time: <b style="color:#fff;">${nomeTime}</b></div>
            <div style="color:var(--gold);font-weight:900;font-size:20px;margin-top:6px;">R$ ${preco.toLocaleString()}</div>
            <div style="color:#f44336;font-size:12px;margin-top:2px;">💸 Salário: R$ ${salario.toLocaleString()}/mês</div>
        </div>
        <p style="color:#aaa;font-size:12px;margin-bottom:16px;">Você deseja fazer uma proposta? O time pode aceitar ou recusar.</p>
        <div style="display:flex;gap:10px;">
            <button onclick="_enviarProposta('${nomeJogador}','${nomeTime}',${timeId || 'null'},${preco},${salario},'${origem}',${idxMercado || 'null'})"
                style="flex:1;background:#3498db;color:#fff;border:none;padding:13px;border-radius:8px;font-weight:900;cursor:pointer;">📨 ENVIAR PROPOSTA</button>
            <button onclick="document.getElementById('modal-negociacao').style.display='none'"
                style="flex:1;background:#222;color:#aaa;border:1px solid #333;padding:13px;border-radius:8px;font-weight:bold;cursor:pointer;">CANCELAR</button>
        </div>
    </div>`;
    modal.style.display = 'flex';
}

function _enviarProposta(nomeJogador, nomeTime, timeId, preco, salario, origem, idxMercado) {
    document.getElementById('modal-negociacao').style.display = 'none';

    // Calcula chance de recusa baseada nas divisões
    const tvLiga = timeId ? (app.teams.find(t => t.id == timeId) || {}).l || '4' : '4';
    const chanceRecusa = _calcularChanceRecusa(tvLiga, app.team.l);
    const recusou = Math.random() < chanceRecusa;

    if (recusou) {
        const msg = _RECUSAS[Math.floor(Math.random() * _RECUSAS.length)](nomeTime, nomeJogador);
        mostrarToast(msg, 'danger');
        adicionarNotificacao(msg);
        return;
    }

    // Aceito — efetiva a transferência
    if (app.money < preco) { mostrarToast('💸 Saldo insuficiente!', 'danger'); return; }
    app.money -= preco;

    let jogadorFinal = null;
    if (origem === 'mercado' && idxMercado !== null) {
        jogadorFinal = app.market.splice(idxMercado, 1)[0];
    } else if (timeId !== null) {
        const tv = app.teams.find(t => t.id == timeId);
        if (tv) {
            const pIdx = tv.players.findIndex(p => p.nome === nomeJogador);
            if (pIdx !== -1) jogadorFinal = tv.players.splice(pIdx, 1)[0];
        }
    }

    if (!jogadorFinal) { app.money += preco; mostrarToast('Erro na transferência.', 'danger'); return; }
    if (!jogadorFinal.salario) jogadorFinal.salario = salario;
    app.team.players.push({ ...jogadorFinal, energy: 100, status: 'ok', cards: 0, scored: false });

    const msgAceite = _ACEITES[Math.floor(Math.random() * _ACEITES.length)](nomeTime, nomeJogador, 'R$ ' + preco.toLocaleString());
    mostrarToast(msgAceite, 'success');
    adicionarNotificacao(msgAceite);
    updateOffice();
    if (typeof renderMercado === 'function') renderMercado();
}

// ==========================================
// PROPOSTAS RECEBIDAS
// ==========================================

// Templates de proposta variados por tipo de time
const _TEMPLATES_PROPOSTA = [
    (time, jogador, valor) => `🏟️ ${time.nome} quer renovar seu elenco e identificou ${jogador} como alvo principal. Oferta: R$ ${valor}.`,
    (time, jogador, valor) => `📧 E-mail da diretoria do ${time.nome}: "${jogador} é exatamente o jogador que precisamos. Oferecemos R$ ${valor} pelo passe."`,
    (time, jogador, valor) => `📞 O empresário de ${jogador} ligou: O ${time.nome} fez uma proposta formal de R$ ${valor}. Você aceita liberar o jogador?`,
    (time, jogador, valor) => `🤝 Negociação: ${time.nome} enviou proposta de R$ ${valor} por ${jogador}. O jogador demonstrou interesse na mudança.`,
    (time, jogador, valor) => `💼 Reunião marcada: Representantes do ${time.nome} vieram pessoalmente tratar da contratação de ${jogador} por R$ ${valor}.`,
    (time, jogador, valor) => `📱 Notícia no mercado: ${time.nome} faz oferta de R$ ${valor} por ${jogador}. Rumores confirmados pela imprensa.`,
];

function verificarPropostasRecebidas() {
    // NUNCA disparar durante partida, leilão ou se modal estiver aberto
    const emPartida = document.getElementById('screen-match') && document.getElementById('screen-match').style.display !== 'none';
    const emLeilao  = document.getElementById('modal-leilao') && document.getElementById('modal-leilao').style.display !== 'none';
    if (emPartida || emLeilao) return;
    if (!app.team || app.team.players.length <= 11) return;
    if (Math.random() > 0.3) return;

    // Escolhe jogador aleatório entre os titulares (não só o melhor)
    const titulares = app.team.players.slice(0, 11).filter(p => p.status === 'ok');
    if (titulares.length === 0) return;
    const craque = titulares[Math.floor(Math.random() * titulares.length)];

    // Só times da mesma divisão ou superior propõem
    const lNum = {'E':0,'1':1,'2':2,'3':3,'4':4};
    const minhaDiv = lNum[app.team.l] || 4;
    const timesInteressados = app.teams.filter(function(t){
        return t.id !== app.team.id && (lNum[t.l]||4) <= minhaDiv;
    });
    if (timesInteressados.length === 0) return;
    const timeOferta = timesInteressados[Math.floor(Math.random() * timesInteressados.length)];
    const multOferta = app.team.l==='4'?0.5:app.team.l==='3'?1.0:app.team.l==='2'?1.4:app.team.l==='1'?1.8:2.5;
    var ofertaBruta = Math.floor(calcularValorJogador(craque, app.team.l) * multOferta);
    // Teto da proposta baseado na divisão do comprador
    var lNumExt = {'E':0,'1':1,'2':2,'3':3,'4':4};
    var divComp = lNumExt[timeOferta.l] || 4;
    var tetoComp = divComp===0?999999999 : divComp===1?8000000 : divComp===2?2000000 : divComp===3?500000 : 120000;
    const oferta = Math.min(ofertaBruta, tetoComp);

    // Texto variado
    const template = _TEMPLATES_PROPOSTA[Math.floor(Math.random() * _TEMPLATES_PROPOSTA.length)];
    const msg = template(timeOferta, craque.nome, 'R$ ' + oferta.toLocaleString());

    // Mostra no escritório via modal de proposta (não confirm genérico)
    _mostrarModalProposta(msg, craque, timeOferta, oferta);
}

function _mostrarModalProposta(msg, craque, timeOferta, oferta) {
    // Usa o modal de contra-proposta com timeDonoObj = app.team (MEU jogador)
    adicionarNotificacao('📨 ' + timeOferta.nome + ' quer comprar ' + craque.nome + ' por R$ ' + oferta.toLocaleString('pt-BR') + '!');
    _abrirModalContraProposta(craque, timeOferta.nome, oferta, app.team);
}

// ==========================================
// SALÁRIOS
// ==========================================

function calcularFolhaSalarial() {
    if (!app.team) return 0;
    return app.team.players.reduce((acc, p) => acc + (p.salario || calcularSalario(p.force, app.team.l)), 0);
}

function descontarSalarios() {
    const folha = calcularFolhaSalarial();
    app.money -= folha;
    mostrarToast(`💸 Folha salarial descontada: R$ ${folha.toLocaleString()}`, 'danger');
    if (app.money < 0) {
        mostrarToast('⚠️ DÍVIDA! Seu clube está no vermelho. Venda jogadores urgente!', 'danger');
    }
}

// ==========================================
// RENDERIZAR CONFIG
// ==========================================

function renderArtilharia(liga) {
    // Coleta apenas jogadores com gols > 0 nesta divisão
    const artilheiros = [];
    app.teams.filter(t => t.l === liga).forEach(t => {
        t.players.forEach(p => {
            if (p.gols && p.gols > 0) {
                artilheiros.push({ nome: p.nome, time: t.nome, gols: p.gols });
            }
        });
    });
    artilheiros.sort((a, b) => b.gols - a.gols);
    if (artilheiros.length === 0) {
        return '<div style="color:#555;padding:15px;text-align:center;font-size:12px;">Nenhum gol registrado nesta divisão ainda.</div>';
    }
    return artilheiros.slice(0, 10).map((a, i) => {
        const medal = i === 0 ? '🥇' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
        return `<div style="display:flex;align-items:center;padding:10px 12px;border-bottom:1px solid #1a1a1a;">
            <span style="width:28px;font-size:15px;">${medal}</span>
            <div style="flex:1;">
                <b style="color:#fff;font-size:13px;">${a.nome}</b><br>
                <span style="color:#888;font-size:11px;">${a.time}</span>
            </div>
            <b style="color:var(--gold);font-size:17px;">${a.gols} ⚽</b>
        </div>`;
    }).join('');
}

function renderRankingTecnicos() {
    const ranking = app.rankingTecnicos || [];
    // Adiciona o usuário
    const tab = app.teams.filter(t => t.l === app.team.l).sort((a,b) => b.pts-a.pts||b.sg-a.sg);
    const pos = tab.findIndex(t => t.id === app.team.id) + 1;
    const pontos = app.team.pts || 0;
    const meuEntry = ranking.find(r => r.nome === app.coach);
    if (!meuEntry) ranking.push({ nome: app.coach, time: app.team.nome, pts: pontos, trofeus: app.trophies || 0 });
    else { meuEntry.pts = pontos; meuEntry.time = app.team.nome; meuEntry.trofeus = app.trophies || 0; }
    ranking.sort((a, b) => b.trofeus - a.trofeus || b.pts - a.pts);
    if (ranking.length === 0) return '<div style="color:#555;padding:10px;font-size:12px;">Nenhum dado ainda.</div>';
    return ranking.slice(0, 10).map((r, i) => {
        const medal = i === 0 ? '🏆' : i === 1 ? '🥈' : i === 2 ? '🥉' : `${i+1}.`;
        const isMe = r.nome === app.coach;
        return `<div style="display:flex;align-items:center;padding:8px 10px;border-bottom:1px solid #1a1a1a;background:${isMe?'rgba(197,160,89,0.1)':'transparent'};">
            <span style="width:28px;font-size:13px;">${medal}</span>
            <div style="flex:1;">
                <b style="color:${isMe?'var(--gold)':'#fff'};font-size:13px;">${r.nome}</b>
                <div style="color:#888;font-size:10px;">${r.time}</div>
            </div>
            <div style="text-align:right;">
                <div style="color:var(--gold);font-size:12px;">${r.trofeus} 🏆</div>
                <div style="color:#aaa;font-size:10px;">${r.pts} pts</div>
            </div>
        </div>`;
    }).join('');
}

function renderConfig() {
    const container = document.getElementById('view-config');
    if (!container) return;
    const folha = calcularFolhaSalarial();
    const liga = app.team ? app.team.l : '1';
    container.innerHTML = `
        <div style="display:flex;gap:0;margin-bottom:15px;border-bottom:2px solid #222;">
            <button onclick="mostrarAba('aba-cfg')" id="btn-aba-cfg"
                style="flex:1;padding:10px;background:transparent;border:none;color:var(--gold);font-weight:bold;font-size:12px;border-bottom:2px solid var(--gold);cursor:pointer;">⚙️ CONFIG</button>
            <button onclick="mostrarAba('aba-art')" id="btn-aba-art"
                style="flex:1;padding:10px;background:transparent;border:none;color:#888;font-size:12px;cursor:pointer;">⚽ ARTILHARIA</button>
            <button onclick="mostrarAba('aba-tec')" id="btn-aba-tec"
                style="flex:1;padding:10px;background:transparent;border:none;color:#888;font-size:12px;cursor:pointer;">👤 TÉCNICOS</button>
        </div>

        <div id="aba-cfg">
            <button onclick="abrirTutorial()" style="width:100%;background:#1a1a1a;border:1px solid #c5a059;color:#c5a059;padding:13px;border-radius:8px;font-weight:bold;font-size:14px;margin-bottom:12px;cursor:pointer;">📖 VER TUTORIAL</button>
            <div style="background:#111;padding:15px;border-radius:10px;border:1px solid #333;margin-bottom:10px;">
                <label style="color:#aaa;font-size:12px;">Velocidade do Jogo (ms):</label>
                <input type="number" id="cfg-timer" value="${app.configTimer || 300}" style="width:100%;padding:10px;background:#000;color:#fff;border:1px solid #333;margin-top:5px;border-radius:5px;">
                <button onclick="salvarConfig()" style="width:100%;margin-top:10px;background:var(--gold);border:none;padding:10px;border-radius:5px;font-weight:bold;cursor:pointer;color:#000;">APLICAR</button>
            </div>
            <div style="background:#111;padding:15px;border-radius:10px;border:1px solid #333;margin-bottom:10px;">
                <div style="color:#aaa;font-size:12px;margin-bottom:8px;">📊 Temporada ${app.temporada || 1} | Rodada ${app.round}/22</div>
                <div style="color:#f44336;font-size:12px;">💸 Folha: R$ ${folha.toLocaleString()}/mês</div>
                <div style="color:#2ecc71;font-size:12px;">💰 Saldo: R$ ${(app.money || 0).toLocaleString()}</div>
            </div>
            <button onclick="salvarJogo()" style="width:100%;background:#222;color:#28a745;padding:13px;border:1px solid #333;font-weight:bold;border-radius:8px;cursor:pointer;margin-bottom:8px;">💾 SALVAR</button>
            <button onclick="location.reload()" style="width:100%;background:#222;color:#fff;padding:13px;border:1px solid #333;font-weight:bold;border-radius:8px;cursor:pointer;margin-bottom:8px;">🔄 RECARREGAR</button>
            <button onclick="if(confirm('Apagar save?')){localStorage.clear();location.reload();}" style="width:100%;background:#441111;color:#ff4444;padding:13px;border:1px solid #662222;font-weight:bold;border-radius:8px;cursor:pointer;">🚪 SAIR</button>
        </div>

        <div id="aba-art" style="display:none;">
            <div style="display:flex;gap:5px;margin-bottom:10px;flex-wrap:wrap;">
                ${['E','1','2','3','4'].map(l => `<button onclick="document.getElementById('art-list').innerHTML=renderArtilharia('${l}')"
                    style="background:#1a1a1a;color:${l===liga?'var(--gold)':'#888'};border:1px solid #333;padding:6px 10px;border-radius:5px;font-size:11px;cursor:pointer;">
                    ${l==='E'?'Europa':l==='1'?'Série A':l==='2'?'Série B':l==='3'?'Série C':'Série D'}
                </button>`).join('')}
            </div>
            <div id="art-list">${renderArtilharia(liga)}</div>
        </div>

        <div id="aba-tec" style="display:none;">
            <div style="color:#aaa;font-size:11px;padding:5px 10px 10px;">Ranking por troféus e pontos</div>
            <div id="tec-list">${renderRankingTecnicos()}</div>
        </div>
    `;
}

// ==========================================
// ONLOAD
// ==========================================

function mostrarAba(id) {
    ['aba-cfg','aba-art','aba-tec'].forEach(a => {
        const el = document.getElementById(a);
        if (el) el.style.display = a === id ? 'block' : 'none';
    });
    ['btn-aba-cfg','btn-aba-art','btn-aba-tec'].forEach(b => {
        const el = document.getElementById(b);
        if (el) {
            el.style.color = b === 'btn-' + id ? 'var(--gold)' : '#888';
            el.style.borderBottom = b === 'btn-' + id ? '2px solid var(--gold)' : 'none';
        }
    });
}

window.onload = function () {
    if (typeof app !== 'undefined' && typeof DB !== 'undefined') {
        init();
        document.body.addEventListener('click', function () {
            if (document.getElementById('screen-setup') &&
                document.getElementById('screen-setup').style.display !== 'none') {
                if (typeof gerenciarMusicaAbertura === "function") gerenciarMusicaAbertura(true);
            }
        }, { once: true });
    }
};

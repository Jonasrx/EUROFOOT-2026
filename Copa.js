
// Mostra fila de pênaltis — todos os jogos um após o outro
function _mostrarFilaPenaltis(fila, idx) {
    if (idx >= fila.length) {
        CopaMundial.verificarStatusTorneio();
        return;
    }
    var jogo = fila[idx];
    // Quando fechar, abre o próximo
    window._penOnClose = function() {
        _mostrarFilaPenaltis(fila, idx+1);
    };
    _mostrarTelaPenaltis(jogo.nomeT1, jogo.nomeT2, jogo.lances, jogo.sc1, jogo.sc2, jogo.vencedor, jogo.isMeu, !jogo.isNosso);
}


// ── TELA DE PÊNALTIS NARRADA ──
function _mostrarTelaPenaltis(nomeT1, nomeT2, lances, sc1, sc2, vencedor, isMeu, rapido) {
    var modal = document.getElementById('modal-penaltis-copa');
    if (!modal) {
        modal = document.createElement('div');
        modal.id = 'modal-penaltis-copa';
        modal.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;background:rgba(0,0,0,0.97);z-index:99000;display:flex;flex-direction:column;overflow:hidden;';
        document.body.appendChild(modal);
    }

    modal.innerHTML =
        '<div style="background:linear-gradient(135deg,#0a0a0a,#1a1a0a);border-bottom:2px solid #c5a059;padding:16px;text-align:center;flex-shrink:0;">' +
            '<div style="font-size:28px;">🥅</div>' +
            '<div style="color:#c5a059;font-size:18px;font-weight:900;letter-spacing:2px;">DISPUTA DE PÊNALTIS</div>' +
            '<div style="color:#fff;font-size:14px;margin-top:4px;"><b>'+nomeT1+'</b> <span style="color:#c5a059;">x</span> <b>'+nomeT2+'</b></div>' +
        '</div>' +
        '<div id="pen-placar" style="display:flex;justify-content:center;gap:24px;padding:12px;background:#111;flex-shrink:0;">' +
            '<div style="text-align:center;"><div style="color:#aaa;font-size:10px;">'+nomeT1+'</div><div id="pen-sc1" style="color:#fff;font-size:32px;font-weight:900;">0</div></div>' +
            '<div style="color:#c5a059;font-size:28px;font-weight:900;align-self:center;">x</div>' +
            '<div style="text-align:center;"><div style="color:#aaa;font-size:10px;">'+nomeT2+'</div><div id="pen-sc2" style="color:#fff;font-size:32px;font-weight:900;">0</div></div>' +
        '</div>' +
        '<div id="pen-log" style="flex:1;overflow-y:auto;padding:12px;"></div>' +
        '<div id="pen-result" style="display:none;text-align:center;padding:20px;flex-shrink:0;"></div>' +
        '<div style="padding:12px;flex-shrink:0;">' +
            '<button id="pen-btn-next" onclick="_penProximo()" style="width:100%;background:#c5a059;color:#000;border:none;padding:16px;border-radius:10px;font-weight:900;font-size:16px;cursor:pointer;touch-action:manipulation;">▶ PRÓXIMA COBRANÇA</button>' +
        '</div>';

    modal.style.display = 'flex';

    // Guarda estado
    window._penState = { lances:lances, idx:0, sc1:0, sc2:0, nomeT1:nomeT1, nomeT2:nomeT2, vencedor:vencedor, isMeu:isMeu, finalSc1:sc1, finalSc2:sc2, rapido:rapido };

    // Modo rápido (CPU): mostra tudo automaticamente com delay
    if (rapido) {
        var delay = 0;
        lances.forEach(function(){ delay += 300; setTimeout(_penProximo, delay); });
        setTimeout(function(){
            _penFinalizar();
            setTimeout(function(){
                var m = document.getElementById('modal-penaltis-copa');
                if(m) m.style.display='none';
                if(typeof window._penOnClose==='function') window._penOnClose();
            }, 1500);
        }, delay + 500);
    }
}

function _penProximo() {
    var s = window._penState;
    if (!s) return;

    if (s.idx >= s.lances.length) {
        // Fim
        _penFinalizar();
        return;
    }

    var lance = s.lances[s.idx];
    s.idx++;

    if(lance.c1) s.sc1++;
    if(lance.c2) s.sc2++;

    document.getElementById('pen-sc1').textContent = s.sc1;
    document.getElementById('pen-sc2').textContent = s.sc2;

    var log = document.getElementById('pen-log');
    var isMorte = lance.morte ? '<span style="color:#e74c3c;font-size:10px;"> [Morte súbita]</span>' : '';

    var linha = document.createElement('div');
    linha.style.cssText = 'border-bottom:1px solid #1a1a1a;padding:10px 0;display:flex;gap:8px;align-items:center;animation:fadeIn 0.3s ease;';

    var num = s.idx;
    linha.innerHTML =
        '<span style="color:#555;font-size:11px;min-width:20px;">'+num+'</span>' +
        '<div style="flex:1;">' +
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="color:#fff;font-size:13px;">' + lance.n1 + isMorte + '</span>' +
                '<span style="font-size:18px;">' + (lance.c1 ? '⚽' : '❌') + '</span>' +
            '</div>' +
            '<div style="color:#555;font-size:10px;text-align:center;margin:2px 0;">──────────</div>' +
            '<div style="display:flex;justify-content:space-between;align-items:center;">' +
                '<span style="color:#fff;font-size:13px;">' + lance.n2 + '</span>' +
                '<span style="font-size:18px;">' + (lance.c2 ? '⚽' : '❌') + '</span>' +
            '</div>' +
        '</div>';

    log.appendChild(linha);
    log.scrollTop = log.scrollHeight;

    // Muda botão no último lance
    if (s.idx >= s.lances.length) {
        var btn = document.getElementById('pen-btn-next');
        if (btn) btn.textContent = '🏆 VER RESULTADO';
    }
}

function _penFinalizar() {
    var s = window._penState;
    var modal = document.getElementById('modal-penaltis-copa');
    var res = document.getElementById('pen-result');
    var btn = document.getElementById('pen-btn-next');

    res.style.display = 'block';
    res.innerHTML =
        '<div style="font-size:40px;">' + (s.isMeu ? '🏆' : '😢') + '</div>' +
        '<div style="color:#c5a059;font-size:22px;font-weight:900;margin:8px 0;">' + s.vencedor.toUpperCase() + '</div>' +
        '<div style="color:#fff;font-size:16px;">AVANÇA! (' + s.finalSc1 + ' x ' + s.finalSc2 + ')</div>';

    if (btn) {
        btn.textContent = '✅ CONTINUAR';
        btn.onclick = function() {
            modal.style.display = 'none';
            if (s.isMeu && typeof mostrarToast === 'function')
                mostrarToast('🏆 ' + s.vencedor + ' avança nos pênaltis!', 'success');
            else if (!s.isMeu && typeof mostrarToast === 'function')
                mostrarToast('😢 Eliminado nos pênaltis!', 'danger');
            if (typeof window._penOnClose === 'function') window._penOnClose();
        };
    }
}

// --- BRASFOOT 2026 - JONAS 007 PRO ---
// --- LÓGICA EXCLUSIVA DA COPA MUNDIAL (copa.js) ---

const CopaMundial = {

    atualizarNomeFase: function(numTimes) {
        if (numTimes > 16)      app.cupStage = "FASE INICIAL";
        else if (numTimes === 16) app.cupStage = "OITAVAS DE FINAL";
        else if (numTimes === 8)  app.cupStage = "QUARTAS DE FINAL";
        else if (numTimes === 4)  app.cupStage = "SEMIFINAL";
        else if (numTimes === 2)  app.cupStage = "GRANDE FINAL";
        return app.cupStage;
    },

    gerarConfrontos: function(competidores) {
        if (app.cupLeg === 1) {
            // Número ímpar → W.O. para um time
            if (competidores.length % 2 !== 0) {
                const idxWO = Math.floor(Math.random() * competidores.length);
                const timeBye = competidores.splice(idxWO, 1)[0];
                console.log(`COPA: ${timeBye.nome} avançou por W.O.`);
            }
            competidores.sort(() => Math.random() - 0.5);
            app.currentCupPairingIds = competidores.map(t => t.id);
        } else {
            let ordenados = [];
            app.currentCupPairingIds.forEach(id => {
                const t = app.teams.find(team => team.id === id);
                if (t && t.inCup) ordenados.push(t);
            });
            competidores = ordenados;
        }

        this.atualizarNomeFase(competidores.length);

        for (let i = 0; i < competidores.length; i += 2) {
            if (competidores[i + 1]) {
                // Inverter mando na volta
                const t1 = (app.cupLeg === 1) ? competidores[i]     : competidores[i + 1];
                const t2 = (app.cupLeg === 1) ? competidores[i + 1] : competidores[i];
                app.matches.push({ t1, t2, g1: 0, g2: 0, l: "COPA", isCup: true, stage: app.cupStage });
            }
        }
    },

    processarEliminatorias: function() {
        var filaJogos = []; // todos os jogos que precisam de pênaltis
        var meuJogo = null;

        app.matches.forEach(function(m) {
            if (!m.isCup) return;
            var totalT1 = m.g1 + (m.t1.golsIda || 0);
            var totalT2 = m.g2 + (m.t2.golsIda || 0);

            if (totalT1 > totalT2) {
                m.t2.inCup = false;
            } else if (totalT2 > totalT1) {
                m.t1.inCup = false;
            } else {
                // Simula pênaltis
                var bat1 = m.t1.players.slice(0,11).filter(function(p){return p.status==='ok'&&p.pos!=='G';}).sort(function(a,b){return b.force-a.force;}).slice(0,5);
                var bat2 = m.t2.players.slice(0,11).filter(function(p){return p.status==='ok'&&p.pos!=='G';}).sort(function(a,b){return b.force-a.force;}).slice(0,5);
                var sc1=0,sc2=0,lances=[];
                for(var i=0;i<5;i++){
                    var b1=bat1[i]||bat1[0]; var b2=bat2[i]||bat2[0];
                    var c1=Math.random()>0.25; var c2=Math.random()>0.25;
                    if(c1)sc1++; if(c2)sc2++;
                    lances.push({n1:b1?b1.nome:'?',c1:c1,n2:b2?b2.nome:'?',c2:c2});
                }
                var rd=1;
                while(sc1===sc2&&rd<=10){
                    var b1=bat1[rd%bat1.length]||bat1[0]; var b2=bat2[rd%bat2.length]||bat2[0];
                    var c1=Math.random()>0.25; var c2=Math.random()>0.25;
                    if(c1)sc1++; if(c2)sc2++;
                    lances.push({n1:b1?b1.nome:'?',c1:c1,n2:b2?b2.nome:'?',c2:c2,morte:true});
                    rd++;
                }
                var vencedor = sc1>sc2?m.t1:m.t2;
                var perdedor = sc1>sc2?m.t2:m.t1;
                perdedor.inCup = false;

                var isNosso = (m.t1.id===app.team.id||m.t2.id===app.team.id);
                var jogo = {nomeT1:m.t1.nome,nomeT2:m.t2.nome,lances:lances,sc1:sc1,sc2:sc2,vencedor:vencedor.nome,isMeu:isNosso&&(vencedor.id===app.team.id),isNosso:isNosso};
                if(isNosso) meuJogo = jogo;
                else filaJogos.push(jogo);
            }
            m.t1.golsIda = 0; m.t2.golsIda = 0;
        });

        // Mostra todos os jogos CPU primeiro, depois o nosso
        var fila = filaJogos;
        if(meuJogo) fila = fila.concat([meuJogo]);

        if(fila.length > 0) {
            _mostrarFilaPenaltis(fila, 0);
        } else {
            CopaMundial.verificarStatusTorneio();
        }
    },

    verificarStatusTorneio: function() {
        const vivos = app.teams.filter(t => t.inCup);

        if (vivos.length === 1) {
            const campeao = vivos[0];
            alert(`🏆 FIM DE TORNEIO!\n\n${campeao.nome.toUpperCase()} É O GRANDE CAMPEÃO!`);

            if (campeao.id === app.team.id) {
                app.money    = (app.money    || 0) + 10000000;
                app.trophies = (app.trophies || 0) + 1;
                app.trofeus  = app.trofeus  || {};
                app.trofeus.copa = (app.trofeus.copa || 0) + 1;
                if (typeof mostrarToast === 'function') {
                    mostrarToast('🏆 CAMPEÃO DA COPA! +R$ 10.000.000!', 'gold');
                }
            }

            // Marca que copa desta temporada já tem campeão — não inicia nova até próxima temporada
            app.copaCampeaoTemporada = true;
            app.isCupMatch = false;
            // NÃO reseta inCup aqui — só reseta no fecharRelatorioTemporada

        } else if (vivos.length === 0) {
            // Failsafe
            app.teams.forEach(t => t.inCup = true);
        } else {
            const nomeFase = this.atualizarNomeFase(vivos.length);
            if (typeof mostrarToast === 'function') {
                mostrarToast(`${vivos.length} times avançam para as ${nomeFase}!`, 'gold');
            } else {
                alert(`Fase concluída! ${vivos.length} times avançam para as ${nomeFase}.`);
            }
        }
    }
};

window.CopaMundial = CopaMundial;

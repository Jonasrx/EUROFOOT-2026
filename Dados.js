// --- BRASFOOT 2026 - JONAS 007 PRO ---
// --- BANCO DE DADOS COMPLETO (dados.js) - ELENCOS 2026 OFICIAIS ---

let app = {
    team: null, teams: [], minute: 0, interval: null, selIdx: null,
    matches: [], round: 1, totalRounds: 22, money: 50000000,
    coach: "Jonas", trophies: 0, tatic: "4-3-3",
    halfTimeReached: false, market: [],
    configTimer: 300, diretoria: 70, torcida: 70,
    isCupMatch: false, cupLeg: 1, cupStage: "", currentCupPairingIds: [],
    leilaoRodada: 0, temporada: 1, folhaSalarial: 0, ligaEuropaAtiva: false,
    trofeus: { d_c: 0, c_b: 0, b_a: 0, a_e: 0, copa: 0 },
    artilharia: {}, rankingTecnicos: []
};

const TROFEUS_INFO = {
    d_c:  { emoji: "🥉", nome: "Subiu D→C",      cor: "#cd7f32" },
    c_b:  { emoji: "🥈", nome: "Subiu C→B",      cor: "#c0c0c0" },
    b_a:  { emoji: "🥇", nome: "Subiu B→A",      cor: "#ffd700" },
    a_e:  { emoji: "🏅", nome: "Subiu A→Europa", cor: "#4fc3f7" },
    copa: { emoji: "🏆", nome: "Copa Mundial",    cor: "#c5a059" }
};

const DB = [

    // ==========================================
    // SÉRIE A 2026 — 20 times oficiais
    // ==========================================

    {n:"Flamengo",l:"1",j:["G:Rossi:69", "ZAG:Léo Pereira:67", "ZAG:Léo Ortiz:65", "ZAG:Danilo:64", "LD:Varela:64", "MEI:Arrascaeta:70", "MEI:De la Cruz:68", "MEI:Paquetá:67", "VOL:Pulgar:65", "CA:Pedro:71", "PTE:Samuel Lino:65", "G:Andrew:58", "LE:Ayrton Lucas:64", "ZAG:Vitão:63", "LD:Emerson Royal:62", "LE:Alex Sandro:58", "MEI:Carrascal:65", "VOL:Jorginho:64", "VOL:Evertton Araújo:61", "PTE:Everton Cebolinha:64", "CA:Bruno Henrique:64", "PTE:Gonzalo Plata:63"]},

    {n:"Palmeiras",l:"1",j:["G:Carlos Miguel:68", "ZAG:Gustavo Gómez:68", "ZAG:Murilo:67", "LE:Piquerez:66", "ZAG:Bruno Fuchs:63", "MEI:Jhon Arias:68", "VOL:Andreas Pereira:67", "VOL:Allan:65", "VOL:Maurício:65", "PTE:Vitor Roque:69", "CA:Flaco López:68", "G:Marcelo Lomba:61", "LD:Giay:63", "LE:Arthur:63", "ZAG:Benedetti:62", "LD:Khellven:61", "MEI:Emiliano Martínez:65", "VOL:Marlon Freitas:64", "MEI:Lucas Evangelista:63", "MEI:Sosa:62", "PTE:Felipe Anderson:65", "CA:Riquelme:63", "PTD:Luighi:62"]},

    {n:"Botafogo",l:"1",j:["G:John:66", "ZAG:Adryelson:67", "ZAG:Alexander Barboza:65", "LE:Alex Telles:65", "ZAG:Bastos:64", "MEI:Thiago Almada:70", "MEI:Savarino:66", "VOL:Gregore:65", "VOL:Marlon Freitas:64", "PTE:Luiz Henrique:70", "CA:Igor Jesus:66", "G:Gatito:61", "LD:Vitinho:63", "LD:Damián Suárez:61", "LE:Cuiabano:61", "MEI:Óscar Romero:64", "VOL:Danilo:63", "VOL:Allan:61", "CA:Tiquinho:65", "PTD:Matheus:64", "PTE:Jeffinho:63"]},

    {n:"Corinthians",l:"1",j:["G:Hugo Souza:67", "ZAG:André Ramalho:65", "ZAG:Félix Torres:64", "LD:Fagner:63", "ZAG:Cacá:62", "MEI:Rodrigo Garro:69", "MEI:Memphis:67", "VOL:José Martínez:65", "MEI:Matheus Pereira:65", "CA:Yuri Alberto:66", "PTE:Wesley:63", "G:Matheus Donelli:58", "LE:Matheus Bidu:62", "LD:Matheuzinho:61", "ZAG:Gustavo Henrique:60", "LE:Hugo:59", "MEI:Igor Coronado:63", "VOL:Charles:62", "VOL:Raniele:62", "VOL:Breno Bidon:61", "PTD:André Carrillo:62", "CA:Hector Hernández:61"]},

    {n:"São Paulo",l:"1",j:["G:Rafael:67", "ZAG:Arboleda:67", "ZAG:Alan Franco:64", "LE:Welington:63", "LD:Igor Vinícius:62", "MEI:Oscar:68", "MEI:Lucas Moura:68", "VOL:Alisson:65", "MEI:Nestor:63", "CA:Calleri:68", "PTE:Ferreirinha:64", "G:Jandrei:60", "ZAG:Sabino:61", "LD:Rafinha:61", "LE:Patryck:60", "VOL:Bobadilla:62", "VOL:Marcos Antonio:62", "MEI:Galoppo:61", "CA:Luciano:64", "PTD:Wellington Rato:63", "PTD:Erick:62"]},

    {n:"Atlético-MG",l:"1",j:["G:Everson:67", "LE:Arana:67", "ZAG:Alonso:66", "LD:Saravia:64", "ZAG:Igor Rabello:62", "MEI:Scarpa:68", "MEI:Zaracho:67", "VOL:Otávio:65", "MEI:Bernard:65", "PTE:Hulk:68", "CA:Paulinho:68", "G:Guilherme Marinato:58", "ZAG:Lyanco:62", "ZAG:Paulo:61", "LE:Rubens:61", "LD:Natã:60", "VOL:Fausto Vera:63", "MEI:Palacios:63", "VOL:Alan Franco:62", "CA:Deyverson:63", "PTD:Cadu:62", "PTE:Rômulo:61"]},

    {n:"Fluminense",l:"1",j:["G:Fábio:66", "ZAG:Thiago Santos:64", "ZAG:Manoel:63", "ZAG:Ignácio:62", "LD:Samuel Xavier:62", "VOL:André:68", "MEI:Ganso:65", "MEI:Paulo Baya:64", "VOL:Martinelli:63", "CA:Germán Cano:67", "CA:Jhon Arias:67", "G:Vitor Eudes:58", "LE:Diogo Barbosa:62", "LE:Marcelo:61", "LD:Guga:60", "VOL:Alexsander:62", "MEI:Nonato:62", "PTE:Serna:64", "PTE:Kauã Elias:63", "PTD:Marquinhos:62"]},

    {n:"Internacional",l:"1",j:["G:Rochet:68", "LE:Bernabei:65", "ZAG:Clayton Sampaio:63", "ZAG:Rogel:63", "LD:Bustos:63", "MEI:Alan Patrick:68", "VOL:Fernando:66", "VOL:Thiago Maia:65", "VOL:Bruno Henrique:63", "CA:Borré:67", "PTE:Wesley Ribeiro:64", "G:Anthoni:58", "ZAG:Mercado:62", "LD:Igor Gomes:62", "LE:Renê:61", "MEI:Hyoran:62", "MEI:Gabriel Carvalho:62", "PTD:Bruno Tabata:63", "PTE:Wanderson:62", "CA:Alario:62"]},

    {n:"Cruzeiro",l:"1",j:["G:Cássio:66", "LD:William:65", "LE:Marlon:64", "ZAG:João Marcelo:63", "ZAG:Zé Ivaldo:62", "MEI:Matheus Pereira:70", "VOL:Walace:65", "MEI:Barreal:64", "VOL:Romero:62", "PTE:Gabigol:67", "PTE:Dudu:65", "G:Anderson:58", "ZAG:Neris:61", "LD:Rafa Silva:60", "LE:Kaiki:58", "VOL:Lucas Silva:61", "MEI:Peralta:61", "PTD:Álvaro Barreal:63", "CA:Kaio Jorge:63", "CA:Dinenno:62"]},

    {n:"Bahia",l:"1",j:["G:Adriel:63", "ZAG:Kanu:64", "LD:Arias:64", "LE:Luciano Juba:64", "ZAG:Gabriel Xavier:63", "MEI:Everton Ribeiro:68", "VOL:Caio Alexandre:66", "MEI:Cauly:66", "VOL:Jean Lucas:65", "PTE:Thaciano:65", "CA:Everaldo:65", "G:Danilo Fernandes:59", "ZAG:Cuesta:63", "LD:Gilberto:62", "LE:Luciano:62", "VOL:Rezende:62", "MEI:Pena:62", "PTE:Biel:64", "PTE:Lucho Rodríguez:63", "CA:Willian José:63"]},

    {n:"Vasco",l:"1",j:["G:Léo Jardim:67", "ZAG:João Victor:65", "LE:Lucas Piton:65", "ZAG:Maicon:63", "LD:Puma Rodríguez:63", "MEI:Coutinho:66", "MEI:Payet:65", "VOL:Hugo Moura:63", "VOL:Sforza:62", "CA:Vegetti:68", "PTE:Adson:63", "G:Keiller:59", "ZAG:Rojas:60", "LD:Paulinho:60", "LE:Luan:59", "VOL:Galdames:62", "MEI:Mateus Carvalho:61", "PTE:David:62", "CA:Emerson Rodríguez:62", "PTD:Rayan:60"]},

    {n:"Grêmio",l:"1",j:["G:Marchesín:64", "ZAG:Kannemann:63", "ZAG:Gustavo Martins:62", "ZAG:Rodrigo Ely:61", "LD:João Pedro:61", "MEI:Cristaldo:64", "VOL:Villasanti:63", "MEI:Monsalve:63", "VOL:Dodi:62", "PTE:Soteldo:64", "CA:Diego Costa:62", "G:Gabriel Grando:59", "LE:Reinaldo:61", "LD:Fábio:59", "LE:Mayk:58", "MEI:Edenilson:62", "VOL:Carballo:60", "PTE:Everton Galdino:60", "CA:André Henrique:60", "PTD:João Victor Melo:59"]},

    {n:"Santos",l:"1",j:["G:Gabriel Brazão:62", "ZAG:Gil:63", "ZAG:Basso:61", "LD:Chermont:60", "LE:Escobar:60", "MEI:Giuliano:64", "VOL:Pituca:63", "VOL:Schmidt:62", "MEI:Diego Pituca:61", "CA:Neymar:67", "PTE:Guilherme:64", "G:João Paulo:58", "ZAG:Alex:58", "LD:Hayner:58", "LE:Léo:57", "MEI:Patrick:60", "VOL:Sandry:59", "PTD:Otero:61", "CA:Furch:61", "PTE:Pedrinho:60", "CA:Willian:59"]},

    {n:"Bragantino",l:"1",j:["G:Cleiton:64", "ZAG:Pedro Henrique:63", "ZAG:Luan Cândido:62", "LD:Andrés Hurtado:61", "LE:Luan Candido:61", "VOL:Jadsom:63", "MEI:Lincoln:63", "VOL:Lucas Evangelista:62", "MEI:Vitinho:62", "CA:Carlos Vinícius:65", "PTE:Helinho:63", "G:Lucão:58", "ZAG:Fabrício:60", "LD:Aderlan:59", "LE:Henry Mosquera:59", "VOL:Matheus Fernandes:61", "MEI:Jhon Jhon:61", "PTD:Eduardo Sasha:62", "PTE:Mosquera:61", "CA:Thiago Borbas:61"]},

    {n:"Mirassol",l:"1",j:["G:Alex Muralha:61", "ZAG:Luís Otávio:60", "LD:Neto Moura:60", "ZAG:Danilo Boza:59", "LE:Lucas Ramon:59", "MEI:Chico Kim:62", "VOL:Danielzinho:61", "MEI:Cristian:61", "VOL:Yago:60", "CA:Dellatorre:63", "CA:Zé Love:62", "G:Muralha:59", "ZAG:Thomás Ortiz:58", "LD:Daniel Borges:58", "LE:Zé Roberto:57", "MEI:Artur:60", "VOL:Gabriel:59", "PTE:Fernandinho:61", "PTD:Iury Castilho:61", "PTE:Alex Santana:60"]},

    {n:"Vitória",l:"1",j:["G:Lucas Arcanjo:62", "ZAG:Neris:61", "ZAG:Camutanga:60", "LD:Raúl Cáceres:60", "LE:Lucas Esteves:60", "VOL:Luan:62", "MEI:Matheusinho:62", "VOL:Filipe Machado:61", "MEI:Osvaldo:61", "CA:Alerrandro:64", "PTE:Guilherme Bissoli:62", "G:Dalton:58", "ZAG:Wagner Leonardo:59", "LD:Willean Lepo:58", "LE:PK:57", "VOL:Rodrigo Andrade:60", "MEI:Léo Naldi:60", "PTD:Everaldo:62", "CA:Carlos Eduardo:62", "PTE:Janderson:61"]},

    {n:"Athletico-PR",l:"1",j:["G:Mycael:63", "ZAG:Matheus Felipe:62", "LE:Esquivel:62", "ZAG:Kaique Rocha:61", "LE:Abner:61", "VOL:Fernandinho:64", "VOL:Erick:63", "MEI:Zapelli:62", "MEI:Praxedes:61", "PTE:Canobbio:63", "CA:Vitor Bueno:62", "G:Bento:61", "ZAG:Thiago Heleno:60", "LD:Madson:60", "LD:Khellven:59", "VOL:Gabriel:60", "MEI:João Cruz:60", "CA:Pablo:62", "PTE:Cuello:61", "PTD:Julimar:59"]},

    {n:"Coritiba",l:"1",j:["G:Pedro Morisco:62", "ZAG:Benevenuto:62", "LD:Natanael:62", "ZAG:Antônio:61", "LE:Jamerson:61", "VOL:Sebastian:63", "MEI:Frizzo:63", "VOL:Morelli:62", "MEI:Bernardo:61", "PTE:Robson:63", "PTD:Figueiredo:62", "G:Gabriel Vasconcelos:59", "ZAG:Thalisson:59", "LE:Warley:59", "LD:Jhonny:57", "VOL:Paulista:60", "MEI:Boschetti:59", "CA:Brumado:62", "PTE:Castillo:61", "CA:Brandão:59"]},

    {n:"Chapecoense",l:"1",j:["G:Cavichioli:62", "ZAG:Bruno Lopes:61", "ZAG:Moledo:61", "ZAG:Domingos:60", "LD:Marcelinho:59", "MEI:Giovanni:62", "MEI:Marlone:61", "VOL:Foguinho:60", "VOL:Tárik:60", "PTE:Mário:63", "CA:Perotti:62", "G:Gasparotto:58", "LE:Mancha:59", "LD:Matheus:57", "LE:Rafael:57", "VOL:Auremir:60", "MEI:Carvalheira:59", "PTD:Tiago:60", "CA:Ronaldo:59", "PTD:Mailton:58"]},

    {n:"Remo",l:"1",j:["G:Vinícius:61", "ZAG:Ligger:60", "ZAG:Genílson:59", "LD:Sávio:59", "LE:Marcelinho:59", "VOL:Jáderson:62", "MEI:Pavani:62", "VOL:Paulinho:61", "MEI:Rodrigo Andrade:61", "CA:Ribamar:64", "PTE:Pedro Vitor:62", "G:Léo Soares:57", "ZAG:Rafael Jansen:58", "LD:Ricardo:57", "LE:Paulo Cuéllar:57", "VOL:Adsson:60", "MEI:Uchôa:60", "PTE:Ytalo:62", "CA:Carlos Moraes:62", "PTD:Ronald:61"]},

    // ==========================================
    // SÉRIE B 2026 — 20 times oficiais
    // ==========================================

    {n:"Ceará",l:"2",j:["G:Richard:53", "ZAG:David:51", "ZAG:Matheus Felipe:50", "LD:Raí Ramos:50", "LE:Eric Baía:50", "MEI:Mugni:53", "VOL:Lourenço:52", "VOL:Richardson:50", "MEI:Castilho:50", "PTE:Pulga:54", "PTE:Aylon:51", "G:Bruno Ferreira:49", "ZAG:Lacerda:49", "LD:Nino Paraíba:48", "LE:Marlon:48", "VOL:Calebe:49", "MEI:Jean Carlos:49", "PTD:Saulo:51", "CA:Barceló:51", "CA:Facundo:50"]},

    {n:"Fortaleza",l:"2",j:["G:João Ricardo:55", "ZAG:Kuscevic:54", "ZAG:Titi:53", "LD:Tinga:53", "ZAG:Brítez:52", "MEI:Pochettino:55", "VOL:Hércules:54", "VOL:Rossetto:52", "VOL:Zé Welison:51", "CA:Lucero:55", "PTE:Yago Pikachu:54", "G:Kozlinski:50", "LE:Pacheco:52", "LE:Bruno Pacheco:50", "LD:Mancuso:49", "MEI:Kervin:51", "MEI:Caleb:50", "PTE:Moisés:53", "PTE:Machuca:52", "CA:Marinho:52"]},

    {n:"Sport",l:"2",j:["G:Caíque França:52", "ZAG:Thyere:51", "LE:Felipinho:50", "ZAG:Chico:49", "LD:Nino Paraíba:49", "MEI:Lucas Lima:53", "VOL:Calebe:52", "VOL:Pepê:51", "MEI:Giovanni:51", "CA:Coutinho:53", "PTE:Barletta:52", "G:Jordan:46", "LE:Dalbert:49", "ZAG:Luis Soares:48", "LD:Cariús:48", "VOL:Raul:49", "MEI:Andrey:49", "CA:Zé Roberto:51", "PTE:Wellington:50", "PTD:Ortiz:50"]},

    {n:"Juventude",l:"2",j:["G:Gabriel:52", "ZAG:Danilo Boza:51", "ZAG:Rodrigo Sam:50", "LD:Reginaldo:50", "LE:Alan Ruschel:50", "VOL:Caíque:52", "MEI:Mandaca:52", "VOL:Jadson:51", "MEI:Thiaguinho:51", "CA:Gilberto:53", "PTE:Lucas Barbosa:52", "G:César:49", "ZAG:Vitor Mendes:49", "LD:Ewerthon:48", "LE:Felipinho:48", "VOL:Jean Carlos:50", "MEI:Isidro Pitta:50", "CA:Wanderson:52", "PTE:Batalla:51", "PTD:Edinho:51"]},

    {n:"Ponte Preta",l:"2",j:["G:Rocha:51", "ZAG:Silva:51", "ZAG:Raphael:50", "ZAG:Joílson:49", "LD:Inocêncio:49", "MEI:Elvis:53", "VOL:EmersonS:51", "VOL:Castro:50", "MEI:Régis:50", "CA:Jeh:54", "PTE:Novaes:51", "G:Luan:47", "LE:Risso:49", "LD:Júnior:48", "LE:Emerson:48", "VOL:Ramon:49", "MEI:Leo Artur:49", "PTD:Iago:50", "PTE:Venício:49", "CA:Ricardinho:49"]},

    {n:"Londrina",l:"2",j:["G:Arthur:51", "ZAG:Maistro:50", "ZAG:Rayhan:50", "LD:Ennes:50", "LE:Maurício:49", "MEI:Longuine:53", "VOL:Tauã:51", "VOL:Kadu:50", "MEI:Gegê:49", "CA:Amorim:53", "PTE:Iago:52", "G:Saulo:48", "ZAG:Roque:48", "LD:Samuel:48", "LE:Calyson:47", "VOL:Peu:48", "MEI:Cacho:48", "PTD:Everton:51", "PTE:Henrique:49", "CA:Rubens:49"]},

    {n:"Náutico",l:"2",j:["G:Vagner:51", "ZAG:Matos:50", "ZAG:Iran:49", "LD:Arnaldo:49", "LE:Diego:49", "MEI:Marco:52", "MEI:Patrick:52", "VOL:Sousa:51", "VOL:Igor:48", "CA:Paulo:54", "CA:Mezenga:53", "G:Maticoli:47", "ZAG:Robson:48", "LD:Gilson:47", "LE:Lorran:47", "VOL:Wendel:48", "MEI:Thalissinho:48", "PTE:Maia:51", "PTD:Felipe:49", "PTD:Kayon:48"]},

    {n:"São Bernardo",l:"2",j:["G:Alex Alves:50", "ZAG:Renan Siqueira:49", "ZAG:Wagner:49", "LD:Patrick Brey:49", "LE:Marlon Freitas:49", "MEI:Jean Lucas:51", "VOL:Matheus Sales:50", "MEI:Daniel Penha:50", "VOL:Leandro Maciel:49", "CA:Avenatti:52", "PTE:Bryan Borges:51", "G:Diego Loureiro:47", "ZAG:Mateus Costa:48", "LD:Bernardo:47", "LE:Jean:47", "MEI:Rafael Gava:49", "VOL:Rodrigo:48", "PTE:Diego Tavares:50", "PTD:Elvis:50", "CA:Thaylln:50"]},

    {n:"América-MG",l:"2",j:["G:Dalberson:51", "ZAG:Éder:51", "ZAG:Ricardo:51", "LE:Marlon:50", "LE:Nicolas:50", "VOL:Juninho Valoura:54", "MEI:Moisés:52", "MEI:Benítez:52", "VOL:Alê:51", "PTE:Renato:51", "PTD:Jacaré:51", "G:Elias:47", "ZAG:Júlio:49", "LD:Borges:49", "LD:Raul:48", "VOL:Wallisson:50", "MEI:Rodriguinho:49", "CA:Brenner:51", "PTD:Fabinho:50", "CA:Felipe Azevedo:49"]},

    {n:"Botafogo-SP",l:"2",j:["G:Diogo Loureiro:50", "ZAG:Wallison:50", "ZAG:David Braz:49", "LD:Kevyson:49", "LE:Guilherme Pacheco:49", "VOL:Rodrigo Souza:51", "MEI:Bryan Borges:51", "VOL:Boschetti:50", "MEI:Jean Lucas:50", "CA:William Pottker:52", "PTE:Raul:51", "G:Matheus:47", "ZAG:Lucas Cunha:48", "LD:Rafael:47", "LE:DG:47", "VOL:Luiz Henrique:49", "MEI:Daniel Penha:49", "PTE:Cristtyan:50", "PTD:Vinicius Peixoto:50", "CA:Thaylln:50"]},

    {n:"Novorizontino",l:"2",j:["G:Giovanni:51", "ZAG:Luís Otávio:50", "ZAG:César Martins:50", "LD:Rodrigo Soares:50", "LE:Eduardo:50", "VOL:Luís Oyama:52", "MEI:Danielzinho:52", "VOL:Anderson Conceição:51", "MEI:Murilo Rangel:51", "CA:Léo Tocantins:53", "PTE:Reverson:52", "G:Jordi:48", "ZAG:Renato:49", "LD:Pablo:48", "LE:Waguininho:48", "VOL:Patrick:50", "MEI:Wálber:50", "CA:Neto Pessoa:52", "PTE:Diego Corrêa:51", "PTD:Ronaldo:51"]},

    {n:"Avaí",l:"2",j:["G:César:51", "ZAG:Tiago Alves:51", "LD:Kevin:51", "ZAG:Vilar:50", "LE:Mário Sérgio:50", "MEI:Giovanni:53", "VOL:Willian:51", "MEI:Castro:51", "MEI:João Pedro:50", "CA:Poveda:53", "PTE:Garcez:52", "G:Bohn:48", "ZAG:Alan Cardoso:49", "LD:Jonathan:48", "LE:Zeca:47", "VOL:Jean Lucas:49", "VOL:Rodrigo:48", "PTE:Pottker:52", "PTD:Hygor:51", "CA:Cassiano:50"]},

    {n:"Criciúma",l:"2",j:["G:Gustavo:51", "ZAG:Rodrigo:50", "ZAG:Tobias Figueiredo:50", "LD:Claudinho:50", "LE:Marcelo:50", "VOL:Barreto:52", "MEI:Fellipe Mateus:52", "VOL:Willian Oliveira:51", "MEI:Matheusinho:51", "CA:Bolasie:53", "PTE:Allano:52", "G:Alisson:48", "ZAG:Fabricio Bruno:49", "LD:Jonathan:48", "LE:Henrique:48", "VOL:Ronald:50", "MEI:Dudu Vieira:50", "PTE:Arthur Caíke:51", "PTD:Bolasie:51", "CA:Héctor Sandoval:51"]},

    {n:"CRB",l:"2",j:["G:Albino:52", "ZAG:Saimon:51", "LD:Hereda:51", "ZAG:Alemão:50", "LE:Formiga:50", "MEI:Gegê:53", "MEI:Chay:52", "VOL:Falvão:51", "VOL:César:51", "CA:Anselmo Ramon:54", "PTE:Léo Pereira:52", "G:Caetano:46", "ZAG:Henrique:49", "LE:Wanderson:49", "LD:Raul:48", "VOL:Rômulo:50", "MEI:João Pedro:50", "PTE:Labandeira:51", "PTD:Mike:51", "CA:Getúlio:50"]},

    {n:"Vila Nova",l:"2",j:["G:Denis:52", "LD:Ralf:52", "ZAG:Quintero:51", "ZAG:Jemmes:50", "LD:Elias:49", "VOL:Igor Henrique:51", "VOL:Cristiano:50", "MEI:Naninho:50", "MEI:João Tiago:49", "PTE:Alesson:53", "CA:Henrique:52", "G:Hall:47", "LE:Rhuan:49", "LE:Arilson:49", "ZAG:Pank:48", "MEI:Douglas Baggio:48", "PTD:Apodi:51", "PTD:Junior:51", "CA:Juan Cazares:50"]},

    {n:"Atlético-GO",l:"2",j:["G:Ronaldo:52", "ZAG:Alix Vinicius:51", "LD:Maguinho:51", "LE:Arthur Henrique:51", "ZAG:Wanderson:50", "VOL:Gabriel Baralhas:53", "MEI:Shaylon:53", "VOL:Rhaldney:52", "MEI:Marcelinho:52", "PTE:Luiz Fernando:53", "CA:Hyuri:53", "G:Vagner:48", "ZAG:Edson Felipe:49", "LD:Ortega:49", "LE:Guilherme Romão:49", "VOL:Jorginho:51", "MEI:Janderson:51", "PTE:Alejo Cruz:52", "CA:Derek:52", "PTD:Emiliano Rodríguez:51"]},

    {n:"Cuiabá",l:"2",j:["G:Walter:52", "ZAG:Marllon:51", "LD:Daniel Guedes:51", "LE:Igor Cariús:51", "ZAG:Alan Empereur:50", "VOL:Filipe Augusto:53", "MEI:Fernando Sobral:53", "VOL:Pepê:52", "MEI:Clayson:52", "CA:Pitta:54", "PTE:Derik Lacerda:53", "G:João Carlos:48", "ZAG:Zé Marcos:49", "LD:João Lucas:49", "LE:Rikelmi:49", "VOL:Lucas Mineiro:51", "MEI:Jonathan:51", "PTE:Isidro Pitta:52", "PTD:Elton:52", "CA:André Luis:52"]},

    {n:"Goiás",l:"2",j:["G:Tadeu:55", "ZAG:Messias:51", "ZAG:Ribeiro:51", "ZAG:Braz:50", "LD:Dieguinho:50", "MEI:Régis:52", "VOL:Marcão:51", "MEI:Juninho:50", "MEI:LuizH:48", "PTD:ThiagoG:54", "PTE:Baya:51", "G:Thiago Rodrigues:50", "LE:Sander:50", "LD:Yan:48", "LE:Sávio:48", "VOL:Nathan:47", "CA:Edu:51", "CA:Welliton:50", "PTE:Angelo:47"]},

    {n:"Athletic",l:"2",j:["G:Matheus Cavichioli:52", "ZAG:Gabriel Inocêncio:51", "ZAG:Ericsson:50", "LD:Patrick Brey:50", "LE:Marlon:50", "VOL:Matheus Sales:52", "MEI:Jefferson Nem:52", "VOL:Leandro Maciel:51", "MEI:Rafael Gava:51", "CA:Avenatti:53", "PTE:Bryan Borges:52", "G:Victor Souza:48", "ZAG:Willian Machado:49", "LD:Bernardo:48", "LE:Jean:48", "VOL:Rodrigo:50", "MEI:Kelvin:50", "CA:Thaylln:52", "PTE:Cristtyan:51", "PTD:Vinicius Peixoto:51"]},

    {n:"Operário",l:"2",j:["G:Renan:51", "LD:Rafael Chorão:51", "LE:Fabiano:51", "ZAG:Reniê:50", "ZAG:Willian Machado:50", "VOL:Índio:52", "MEI:Boschetti:52", "VOL:Cristiano:51", "MEI:Giovanni:51", "CA:Dalberto:53", "PTE:Marcelo:52", "G:Thiago Coelho:48", "ZAG:Rhodolfo:49", "LD:Arnaldo:49", "LE:Elias:49", "VOL:Marcelo:50", "MEI:Dirceu:50", "CA:Thomaz:52", "PTE:Ronald:51", "PTD:Felipe Garcia:51"]},

    // ==========================================
    // SÉRIE C 2026 — mantidos do original
    // ==========================================
    {n:"Figueirense",l:"3",j:["G:Thiago:35", "ZAG:Genilson:33", "ZAG:Thomás:32", "LD:Cedric:32", "LE:Samuel:31", "MEI:Camilo:36", "VOL:Gledson:34", "MEI:Léo:33", "MEI:Jhony:28", "PTE:Alisson:35", "CA:Pato:35", "G:Barreta:26", "ZAG:Rafael:28", "ZAG:Tiago:27", "VOL:Machado:27", "VOL:Henrique:27", "PTD:Jefinho:34", "PTD:Ruan:28", "PTE:Renan:26", "CA:Bernaldo:26"]},
    {n:"CSA",l:"3",j:["G:Sena:33", "ZAG:Santos:32", "ZAG:Biazus:31", "LD:Raphinha:30", "LE:DalPian:30", "VOL:Bochecha:34", "VOL:Nicola:32", "MEI:Brayann:31", "VOL:Cléber:28", "CA:TiagoM:35", "PTE:Leque:33", "G:Thomazella:28", "ZAG:Buiate:27", "ZAG:Erik:27", "MEI:Dudu:27", "MEI:Faguinho:27", "PTD:Robinho:32", "PTE:Richard:28", "PTD:Iury:28", "CA:Tiago:26"]},
    {n:"Paysandu",l:"3",j:["G:DiogoS:36", "ZAG:Quintana:34", "ZAG:Carlão:33", "LD:Edílson:33", "LE:Bryan:32", "MEI:Cazares:38", "VOL:Vieira:35", "MEI:Netinho:34", "VOL:Val:28", "CA:Nicolas:39", "PTE:Esli:36", "G:Nogueira:30", "ZAG:Wanderson:30", "ZAG:Maia:30", "VOL:Bispo:28", "MEI:Juninho:27", "CA:Jean:35", "PTE:Bóia:30", "PTE:Ruan:28", "PTD:Borasi:28"]},
    {n:"Botafogo-PB",l:"3",j:["G:Dalton:35", "LD:Lenon:33", "ZAG:Douglas:32", "ZAG:Wendel:32", "LE:Evandro:31", "VOL:Thallyson:34", "MEI:Leite:34", "VOL:Gama:33", "MEI:Djalma:28", "CA:Pipico:36", "CA:Jô:35", "G:Wallace:25", "ZAG:Reniê:28", "ZAG:Balardin:27", "VOL:Edmundo:27", "MEI:Gonçalves:26", "PTE:Warley:33", "PTD:Leite:29", "PTE:Joãozinho:28", "PTD:Lima:27"]},
    {n:"Confiança",l:"3",j:["G:Souza:33", "ZAG:Raphael:31", "ZAG:Robson:31", "LD:Cunha:30", "LE:Borges:30", "VOL:André:33", "VOL:Fábio:32", "MEI:Vicente:32", "VOL:Betinho:28", "CA:Bueno:35", "PTE:Willians:34", "G:Gabriel:25", "ZAG:Adalberto:28", "LD:Eduardo:27", "VOL:Ruan:27", "MEI:Recife:27", "PTD:Italo:33", "PTE:Hyuri:28", "PTE:Vico:28", "PTD:Thiago:28"]},
    {n:"Ferroviária",l:"3",j:["G:Saulo:35", "ZAG:Medina:32", "ZAG:Ronaldo:32", "LD:Lucas:31", "LE:Igor:31", "VOL:Ricardinho:34", "VOL:Xavier:33", "MEI:Mateus:33", "MEI:Cássio:28", "CA:Carlão:35", "PTE:Vitor:33", "G:Wall:25", "ZAG:Jackson:30", "ZAG:Maycon:28", "VOL:Pablo:27", "VOL:Cauã:26", "PTD:Juninho:32", "PTD:Quirino:28", "PTE:Thailor:27", "CA:Atac1:27"]},
    {n:"Volta Redonda",l:"3",j:["G:Jean:34", "ZAG:Barra:33", "LD:W.Silva:33", "ZAG:Souza:32", "LE:Sanchez:31", "MEI:MV:36", "VOL:Robinho:33", "VOL:Danrley:32", "MEI:Rafinha:28", "PTE:Ítalo:35", "CA:Douglas:33", "G:Yuma:25", "ZAG:Rigo:28", "ZAG:Murillo:27", "VOL:Karl:27", "MEI:Henrique:26", "PTD:B.Santos:32", "PTE:Vini:28", "PTD:Cristiano:28", "CA:Kauan:27"]},
    {n:"Ypiranga",l:"3",j:["G:Edson:34", "ZAG:Heitor:32", "ZAG:Mendonça:32", "LD:Gedeílson:31", "LE:Willian:30", "MEI:Taddei:34", "VOL:Uchôa:33", "MEI:Mello:32", "VOL:Mossoró:28", "CA:ZéVitor:35", "PTE:Fabrício:33", "G:Alexander:25", "ZAG:Windson:27", "ZAG:Fernando:27", "VOL:Clayton:27", "MEI:Dudu:27", "PTD:Jonathan:32", "CA:Cariús:30", "PTD:Mirandinha:28", "PTE:Reifit:27"]},
    {n:"Aparecidense",l:"3",j:["G:Pedro:33", "ZAG:Vanderley:32", "ZAG:Maurício:31", "LD:Sales:31", "LE:Rodrigues:30", "MEI:Robert:34", "MEI:Nunes:33", "VOL:DuGaia:32", "VOL:Felipe:28", "CA:Rubens:35", "PTE:James:34", "G:Cabral:25", "ZAG:Silva:28", "ZAG:Marcelo:27", "VOL:Genilson:27", "MEI:Matheus:27", "PTD:Torres:33", "PTD:Juninho:28", "PTE:Emanuel:27", "PTD:Cauari:26"]},
    {n:"Tombense",l:"3",j:["G:Felipe Garcia:34", "ZAG:Joseph:32", "ZAG:Roger Carvalho:31", "LD:David:31", "LE:Manoel:30", "MEI:Zé Gabriel:34", "VOL:Rodrigo:33", "VOL:Everton Sena:32", "MEI:Dirceu:28", "CA:Rubens:35", "PTE:Caíque:34", "G:Bruno:25", "ZAG:Lucas:28", "ZAG:Reniê:27", "VOL:Guilherme:27", "VOL:Abou:26", "PTD:Cássio:32", "PTE:Dodô:28", "PTD:Marquinhos:28", "CA:Rafael:27"]},
    {n:"ABC",l:"3",j:["G:Rhuan:33", "ZAG:Isac:31", "ZAG:Thiago:31", "LD:Fabinho:30", "LE:Diego:30", "VOL:Rafinha:33", "MEI:Joãozinho:33", "VOL:Weslley:32", "MEI:Talison:28", "PTE:Negueba:35", "CA:Anselmo:34", "G:Felipe:25", "ZAG:Henrique:27", "ZAG:Danilo:27", "VOL:Luiz:27", "VOL:Thiago:26", "PTD:Elvis:32", "PTD:Zé Carlos:28", "PTE:Walber:27", "CA:Rodrigo:27"]},
    {n:"Sampaio Corrêa",l:"3",j:["G:Gabriel:33", "ZAG:Nilson:31", "ZAG:Joécio:31", "LD:Thiago:30", "LE:Gustavo:30", "VOL:Ferreira:33", "MEI:Eloir:33", "VOL:Reniê:32", "MEI:Rafael:28", "CA:Roney:35", "PTE:Ciel:34", "G:Nilton:25", "ZAG:Danilo:27", "ZAG:Marcus:27", "VOL:Patrick:27", "VOL:Marcão:26", "PTD:Léo:32", "PTD:Léo Cruz:28", "PTE:Dioguinho:27", "CA:Vinícius:27"]},

    // ==========================================
    // SÉRIE D 2026 — mantidos do original
    // ==========================================
    {n:"Moto Club",l:"4",j:["G:Deola:16", "ZAG:Paulo:15", "ZAG:Mário:14", "LD:Vitor:14", "LE:Luis:14", "VOL:Rafael:15", "VOL:Henrique:15", "MEI:Glaybson:15", "MEI:Lucas:15", "PTE:Vitor:16", "CA:Waldir:16", "G:Renan:13", "G:Pedro:12", "ZAG:Dico:13", "ZAG:Breno:13", "VOL:Felipe:13", "VOL:Everton:13", "MEI:Alan:13", "PTD:Neto:13", "CA:Junior:13"]},
    {n:"Brasil de Pelotas",l:"4",j:["G:Gabriel:16", "ZAG:Adriel:15", "ZAG:Bruno:15", "LD:Zeca:14", "LE:Danilo:14", "VOL:Anderson:15", "VOL:Marcinho:15", "MEI:Rafael:15", "MEI:Maurício:15", "PTE:Robinho:16", "CA:Lucão:16", "G:Thierry:13", "ZAG:Mário:13", "ZAG:Danilo:13", "ZAG:Alisson:13", "VOL:Jonas:13", "VOL:Vitor:13", "MEI:Léo:13", "PTD:Juba:13", "CA:MárioJr:13"]},
    {n:"Santa Cruz",l:"4",j:["G:Melo:16", "ZAG:Italo:15", "ZAG:Rafael:15", "LD:Toty:14", "LE:João:14", "VOL:Caio:15", "MEI:Lucas:15", "MEI:Pereira:15", "MEI:Henri:15", "CA:Siri:16", "CA:Gilvan:16", "G:Rokenedy:13", "ZAG:Breno:13", "ZAG:Cristiano:13", "LD:Dudu:13", "VOL:Carlos:13", "VOL:Cardoso:13", "MEI:Melo:13", "PTE:Felipe:13", "PTD:Tallyson:13"]},
    {n:"Treze",l:"4",j:["G:Igor:16", "ZAG:Luis:15", "ZAG:Rafael:15", "LD:Guilherme:14", "LE:Igor:14", "VOL:Robert:15", "VOL:Juninho:15", "MEI:Edmundo:15", "MEI:Chaves:15", "PTE:Pilar:16", "CA:Thiago:16", "G:Andrade:13", "ZAG:Léo:13", "ZAG:Jan:13", "ZAG:Wanderson:13", "VOL:Alex:13", "VOL:Ruan:13", "MEI:Vitor:13", "PTD:Lucas:13", "CA:Vitinho:13"]},
    {n:"Joinville",l:"4",j:["G:Glauco:16", "ZAG:Carlos:15", "ZAG:Alisson:15", "LD:Diego:14", "LE:Sena:14", "VOL:Evandro:15", "VOL:Kadu:15", "MEI:Silas:15", "MEI:Warley:15", "PTE:Vitor:16", "CA:Yuri:16", "G:Pedro:13", "ZAG:Gabriel:13", "ZAG:Zaga:13", "ZAG:Natan:13", "VOL:Léo:13", "VOL:Breno:13", "MEI:João:13", "PTD:Porto:13", "PTD:Igor:13"]},
    {n:"América-RN",l:"4",j:["G:Lucão:16", "ZAG:Salazar:15", "ZAG:Alan:15", "LD:Marcos:14", "LE:João:14", "VOL:Ferreira:15", "VOL:Souza:15", "MEI:Norberto:15", "MEI:Cassiano:15", "PTE:Gustavo:16", "CA:Rafinha:16", "G:Renan:13", "ZAG:Rafael:13", "ZAG:Hyago:13", "ZAG:Guilherme:13", "VOL:Wendel:13", "VOL:Luan:13", "MEI:Matheus:13", "PTD:Giovani:13", "PTD:Caio:13"]},
    {n:"Sergipe",l:"4",j:["G:Igor:15", "ZAG:Dedé:14", "ZAG:Natan:14", "LD:Mateus:14", "LE:Léo:14", "VOL:Arthur:15", "VOL:Diego:15", "MEI:Lucas:14", "MEI:Sandro:14", "PTE:Luan:16", "CA:Tony:16", "G:Pedro:13", "ZAG:Zeca:13", "ZAG:Tiago:13", "ZAG:João:13", "VOL:Fabio:13", "VOL:Felipe:13", "MEI:Vitor:13", "PTD:Breno:13", "PTD:Caio:13"]},
    {n:"Anápolis",l:"4",j:["G:Weller:15", "ZAG:Luizão:14", "ZAG:André:14", "LD:Fabio:14", "LE:Joao:14", "VOL:Stefano:15", "VOL:Paulinho:15", "MEI:Zizu:15", "MEI:Vitor:15", "CA:Gonzalo:16", "CA:Marcão:16", "G:Hugo:13", "ZAG:Titi:13", "ZAG:Ruan:13", "ZAG:Luan:13", "VOL:Yan:13", "VOL:Biel:13", "MEI:Pedro:13", "PTE:Igor:13", "PTD:Leo:13"]},
    {n:"Iguatu",l:"4",j:["G:Geferson:15", "ZAG:Max:14", "ZAG:Uesles:14", "LD:Guidi:14", "LE:Fernando:14", "VOL:Dudu:15", "VOL:Guidio:15", "MEI:Diego:15", "MEI:Pedrinho:15", "PTE:Tiaguinho:16", "CA:Otacilio:16", "G:Patrício:13", "ZAG:Rafael:13", "ZAG:Ivan:13", "ZAG:Dito:13", "VOL:Ze:13", "VOL:Beto:13", "MEI:Cid:13", "PTE:Neco:13", "PTD:Ari:13"]},
    {n:"Itabuna",l:"4",j:["G:Patrik:15", "ZAG:Vital:14", "ZAG:Tallys:14", "LD:Diego:14", "LE:Caetano:14", "VOL:Eden:15", "VOL:Papa:15", "MEI:Muri:15", "MEI:Gabriel:15", "PTD:Manoel:16", "CA:Ricardo:16", "G:Marcos:13", "ZAG:Lucas:13", "ZAG:Thiago:13", "ZAG:Renan:13", "VOL:Daniel:13", "VOL:André:13", "MEI:Paulo:13", "PTE:João:13", "CA:Pedro:13"]},
    {n:"Portuguesa-RJ",l:"4",j:["G:Bruno:16", "ZAG:Michel:15", "ZAG:Pedro:14", "LD:Joao:14", "LE:Léo:14", "VOL:Romarinho:15", "VOL:Wellington:15", "MEI:Anderson:15", "MEI:Lucas:15", "PTE:Bochecha:16", "CA:Broca:16", "G:Cid:13", "ZAG:Dudu:13", "ZAG:Leo:13", "ZAG:Ze:13", "VOL:Ruan:13", "VOL:Yan:13", "MEI:Biel:13", "PTD:Ari:13", "CA:Guto:13"]},
    {n:"Manauara",l:"4",j:["G:Jonathas:15", "ZAG:Caique:14", "ZAG:Paulista:14", "LD:Luis:14", "LE:Jhon:14", "VOL:Ricardo:15", "VOL:Ítalo:15", "MEI:Gama:15", "MEI:Mello:15", "PTE:Vitor:16", "CA:Neto:16", "G:Felipe:13", "G:Daniel:13", "ZAG:Marcos:13", "ZAG:Thiago:13", "ZAG:Renan:13", "VOL:Pedro:13", "MEI:André:13", "PTD:Paulo:13", "CA:Lucas:13"]},

    // ==========================================
    // LIGA EUROPA 2026 — 20 times
    // ==========================================
    {n:"Real Madrid",l:"E",j:["G:Courtois:95", "ZAG:Militão:93", "ZAG:Rüdiger:91", "LD:Carvajal:90", "ZAG:Tchouaméni:89", "MEI:Bellingham:97", "VOL:Valverde:94", "VOL:Camavinga:91", "MEI:Modric:86", "CA:Mbappé:99", "PTE:Vinícius Jr:98", "G:Lunin:85", "LE:Mendy:89", "ZAG:Alaba:88", "LD:Lucas Vázquez:83", "LE:Fran García:83", "MEI:Arda Güler:86", "VOL:Ceballos:82", "PTD:Rodrygo:92", "PTE:Brahim:87", "CA:Endrick:85"]},
    {n:"Manchester City",l:"E",j:["G:Ederson:94", "ZAG:Rúben Dias:93", "ZAG:Akanji:91", "LE:Gvardiol:91", "ZAG:Stones:89", "VOL:Rodri:96", "MEI:De Bruyne:95", "MEI:Bernardo Silva:92", "VOL:Gündogan:87", "CA:Haaland:99", "PTE:Foden:93", "G:Ortega:82", "LD:Walker:88", "ZAG:Aké:87", "LD:Lewis:82", "LE:Nusi:80", "VOL:Kovacic:85", "MEI:Nunes:83", "PTE:Doku:88", "CA:Savinho:88", "PTE:Grealish:85"]},
    {n:"Bayern Munique",l:"E",j:["G:Neuer:91", "LD:Kimmich:92", "LE:Davies:91", "ZAG:Kim:90", "ZAG:Upamecano:89", "MEI:Musiala:95", "VOL:Palhinha:89", "VOL:Goretzka:87", "MEI:Gnabry:86", "CA:Harry Kane:97", "PTE:Sané:91", "G:Ulreich:79", "LE:Alphonso:89", "ZAG:De Ligt:88", "LD:Laimer:84", "ZAG:Dier:83", "VOL:Pavlovic:85", "MEI:Müller:85", "PTD:Olise:89", "PTE:Coman:87", "CA:Tel:84"]},
    {n:"Barcelona",l:"E",j:["G:Ter Stegen:92", "ZAG:Araújo:93", "LD:Koundé:90", "LE:Balde:88", "ZAG:Cubarsí:87", "MEI:Pedri:93", "VOL:De Jong:91", "MEI:Gavi:91", "MEI:Dani Olmo:90", "PTE:Lamine Yamal:95", "CA:Lewandowski:93", "G:Iñaki Peña:80", "ZAG:Christensen:86", "ZAG:Iñigo Martínez:85", "LD:Héctor Fort:80", "LE:Gerard Martín:80", "VOL:Fermín:85", "VOL:Casadó:83", "PTD:Raphinha:91", "PTE:Ansu Fati:82", "CA:Pau Victor:80"]},
    {n:"Liverpool",l:"E",j:["G:Alisson:95", "ZAG:Van Dijk:94", "LD:Alexander-Arnold:93", "ZAG:Konaté:90", "LE:Robertson:89", "VOL:Mac Allister:92", "MEI:Szoboszlai:91", "VOL:Gravenberch:88", "MEI:Curtis Jones:85", "PTD:Salah:96", "PTE:Luis Díaz:92", "G:Kelleher:82", "ZAG:Gomez:84", "ZAG:Quansah:83", "LE:Tsimikas:83", "LD:Bradley:82", "MEI:Elliott:84", "VOL:Endo:83", "CA:Darwin Núñez:89", "PTE:Gakpo:88", "CA:Diogo Jota:88"]},
    {n:"Arsenal",l:"E",j:["G:Raya:90", "ZAG:Saliba:93", "ZAG:Gabriel Magalhães:92", "ZAG:White:88", "LD:Ben White:88", "MEI:Odegaard:95", "VOL:Rice:93", "MEI:Merino:88", "VOL:Partey:86", "PTD:Saka:94", "PTE:Martinelli:90", "G:Neto:83", "ZAG:Calafiori:87", "LD:Timber:87", "LE:Zinchenko:85", "LE:Kiwior:82", "VOL:Jorginho:85", "MEI:Nwaneri:81", "CA:Havertz:90", "PTE:Trossard:88", "CA:Gabriel Jesus:87"]},
    {n:"Paris Saint-Germain",l:"E",j:["G:Donnarumma:92", "ZAG:Marquinhos:93", "LD:Hakimi:92", "LE:Nuno Mendes:89", "ZAG:Lucas Hernández:88", "MEI:Dembélé:92", "VOL:Vitinha:91", "VOL:Joao Neves:88", "VOL:Fabian Ruiz:87", "PTE:Barcola:89", "CA:Gonçalo Ramos:87", "G:Safonov:82", "LD:Zaire-Emery:88", "ZAG:Pacho:87", "LE:Skriniar:86", "ZAG:Beraldo:84", "MEI:Kang-in Lee:86", "MEI:Asensio:84", "PTD:Doué:86", "CA:Kolo Muani:85", "PTE:Mayulu:79"]},
    {n:"Bayer Leverkusen",l:"E",j:["G:Hradecky:88", "LE:Grimaldo:92", "LD:Frimpong:91", "ZAG:Tah:90", "ZAG:Tapsoba:89", "MEI:Wirtz:95", "VOL:Xhaka:91", "VOL:Andrich:87", "VOL:Aleix Garcia:86", "CA:Boniface:89", "PTD:Frimpong:88", "G:Kovar:81", "ZAG:Hincapié:88", "LE:Palacios:86", "LD:Mukiele:84", "ZAG:Belocian:80", "MEI:Hofmann:84", "MEI:Adli:84", "PTE:Terrier:86", "CA:Schick:85", "PTE:Tella:83"]},
    {n:"Inter de Milão",l:"E",j:["G:Sommer:90", "ZAG:Bastoni:92", "LE:Dimarco:91", "ZAG:Pavard:90", "ZAG:Acerbi:87", "MEI:Barella:92", "MEI:Calhanoglu:92", "VOL:Frattesi:88", "VOL:Zielinski:87", "CA:Lautaro Martínez:94", "PTD:Thuram:90", "G:Martinez:81", "ZAG:De Vrij:86", "LD:Dumfries:86", "LD:Darmian:84", "LE:Carlos Augusto:84", "MEI:Mkhitaryan:87", "VOL:Asllani:81", "PTE:Taremi:86", "CA:Arnautovic:83", "PTE:Correa:81"]},
    {n:"Atlético Madrid",l:"E",j:["G:Oblak:93", "ZAG:Giménez:90", "ZAG:Le Normand:88", "LD:Molina:88", "ZAG:Lenglet:84", "VOL:De Paul:90", "VOL:Koke:88", "VOL:Barrios:86", "MEI:Gallagher:85", "CA:Julián Álvarez:93", "PTD:Griezmann:92", "G:Grbic:80", "LE:Reinildo:84", "LE:Galán:83", "ZAG:Witsel:82", "LD:Azpilicueta:81", "MEI:Saúl:82", "MEI:Riquelme:80", "PTE:Samuel Lino:85", "CA:Sörloth:84", "PTE:Correa:82"]},
    {n:"Juventus",l:"E",j:["G:Di Gregorio:86", "ZAG:Bremer:90", "LD:Cambiaso:88", "LE:Andrea Cambiaso:86", "ZAG:Gatti:85", "MEI:Douglas Luiz:88", "VOL:Locatelli:87", "VOL:Fagioli:85", "VOL:McKennie:84", "CA:Vlahovic:90", "PTD:Yildiz:88", "G:Perin:79", "ZAG:Kalulu:84", "LE:Cabal:84", "ZAG:Danilo:82", "LD:Weah:82", "MEI:Thuram:84", "MEI:Miretti:81", "PTE:Kostic:83", "CA:Milik:83", "PTE:Mbangula:81"]},
    {n:"AC Milan",l:"E",j:["G:Maignan:93", "LE:Theo Hernández:91", "ZAG:Tomori:88", "ZAG:Thiaw:86", "ZAG:Pavlovic:85", "VOL:Reijnders:89", "VOL:Fofana:88", "MEI:Loftus-Cheek:86", "MEI:Bennacer:85", "PTE:Leão:91", "PTD:Pulisic:89", "G:Sportiello:79", "LD:Emerson Royal:83", "ZAG:Gabbia:82", "LD:Calabria:81", "LE:Terracciano:80", "VOL:Musah:83", "MEI:Jiménez:81", "CA:Morata:87", "CA:Abraham:83", "PTE:Okafor:81"]},
    {n:"Napoli",l:"E",j:["G:Meret:86", "LD:Di Lorenzo:88", "ZAG:Buongiorno:87", "ZAG:Rrahmani:86", "LE:Olivera:84", "VOL:Anguissa:90", "MEI:Lobotka:90", "MEI:McTominay:88", "MEI:Raspadori:84", "CA:Lukaku:89", "PTE:Neres:85", "G:Caprile:78", "LE:Spinazzola:82", "ZAG:Juan Jesus:80", "ZAG:Mazzocchi:79", "LD:Zanoli:79", "VOL:Gilmour:82", "VOL:Folorunsho:81", "PTD:Politano:85", "CA:Simeone:83", "PTE:Ngonge:81"]},
    {n:"Borussia Dortmund",l:"E",j:["G:Kobel:89", "ZAG:Schlotterbeck:87", "ZAG:Süle:86", "LE:Maatsen:85", "ZAG:Hummels:83", "MEI:Brandt:88", "VOL:Can:86", "VOL:Sabitzer:85", "VOL:Nmecha:84", "CA:Guirassy:89", "PTD:Sancho:87", "G:Meyer:78", "ZAG:Bensebaini:83", "LD:Ryerson:83", "LE:Groß:82", "LD:Reus:81", "MEI:Reyna:83", "MEI:Pascal:79", "PTE:Adeyemi:86", "CA:Füllkrug:86", "PTE:Malen:84"]},
    {n:"Chelsea",l:"E",j:["G:Sánchez:85", "LD:James:88", "ZAG:Disasi:86", "ZAG:Colwill:86", "LD:Gusto:86", "MEI:Palmer:92", "VOL:Caicedo:91", "MEI:Enzo Fernández:89", "VOL:Gallagher:85", "PTE:Nkunku:87", "CA:Jackson:87", "G:Petrovic:79", "LE:Chilwell:84", "ZAG:Badiashile:83", "LE:Cucurella:83", "ZAG:Chalobah:82", "VOL:Lobotka:84", "MEI:Dewsbury-Hall:82", "PTD:Madueke:86", "PTE:Guiu:81", "CA:Broja:80"]},
    {n:"Benfica",l:"E",j:["G:Trubin:88", "ZAG:António Silva:88", "ZAG:Otamendi:86", "LE:Florentino:85", "LD:Bah:84", "MEI:Kokçu:89", "VOL:Aursnes:87", "MEI:Aktürkoglu:87", "MEI:Cabral:83", "PTD:Di María:88", "CA:Pavlidis:86", "G:Samuel Soares:78", "ZAG:Araújo:83", "LD:Barreiro:83", "ZAG:Beste:82", "LE:Carreras:82", "VOL:Renato Sanches:82", "VOL:Rollheiser:82", "PTE:Amdouni:83", "PTE:Rollheiser:82", "CA:Cabral:82"]},
    {n:"Porto",l:"E",j:["G:Diogo Costa:91", "ZAG:Nehuen Pérez:85", "LD:João Mário:84", "ZAG:Otávio:83", "ZAG:Tiago Djaló:82", "VOL:Varela:88", "MEI:Nico González:86", "MEI:Vieira:85", "VOL:Eustáquio:84", "PTE:Galeno:88", "PTD:Pepê:87", "G:Cláudio Ramos:79", "LE:Moura:82", "LE:Grujic:82", "ZAG:Zaidu:80", "LD:Gul:79", "MEI:Iván Jaime:83", "VOL:Vasco Sousa:82", "CA:Samu Omorodion:87", "PTE:Namaso:81", "CA:Toni Martínez:81"]},
    {n:"Sporting",l:"E",j:["G:Israel:83", "ZAG:Inácio:89", "ZAG:Diomande:88", "ZAG:Debast:84", "ZAG:St. Juste:83", "MEI:Pote:90", "VOL:Hjulmand:89", "VOL:Morita:86", "MEI:Edwards:86", "CA:Gyökeres:94", "PTD:Trincão:88", "G:Kovacevic:80", "LD:Quenda:82", "LE:Reis:82", "LE:Ivanusa:80", "LD:Esgaio:79", "VOL:Bragança:84", "MEI:Holsmand:81", "PTE:Harder:82", "CA:Geny Catamo:82", "PTE:Araújo:80"]},
    {n:"Roma",l:"E",j:["G:Svilar:85", "ZAG:Ndicka:86", "ZAG:Mancini:85", "LE:Angeliño:84", "ZAG:Smalling:83", "MEI:Pellegrini:88", "VOL:Cristante:86", "VOL:Paredes:84", "MEI:Aouar:82", "PTD:Dybala:90", "CA:Dovbyk:88", "G:Rui Patrício:80", "ZAG:Llorente:82", "LD:Celik:82", "LE:Zalewski:81", "LD:Karsdorp:79", "VOL:Bove:81", "MEI:Le Fee:80", "PTE:El Shaarawy:84", "CA:Belotti:81", "PTE:Solbakken:80"]},
    {n:"Ajax",l:"E",j:["G:Pasveer:83", "ZAG:Sutalo:84", "LD:Rensch:83", "ZAG:Kaplan:82", "LE:Wijndal:82", "MEI:Berghuis:85", "VOL:Taylor:84", "VOL:Henderson:84", "VOL:Hlynsson:80", "PTD:Bergwijn:86", "CA:Brobbey:85", "G:Gorter:77", "ZAG:Hato:81", "LE:Conceição:81", "LD:Gaaei:80", "ZAG:Baas:79", "MEI:Rasmussen:79", "MEI:Danilo:79", "PTE:Godts:83", "CA:Akpom:82", "PTE:Traoré:81"]}

];

// ==========================================
// SALÁRIOS POR SÉRIE
// ==========================================
const SALARIOS_SERIE = {
    "E": { min: 500000, max: 3000000 },
    "1": { min: 80000,  max: 500000  },
    "2": { min: 20000,  max: 80000   },
    "3": { min: 5000,   max: 20000   },
    "4": { min: 1000,   max: 5000    }
};

function calcularSalario(force, liga) {
    const faixa = SALARIOS_SERIE[liga] || SALARIOS_SERIE["4"];
    const pct = Math.min((force - 10) / 90, 1);
    return Math.floor(faixa.min + (faixa.max - faixa.min) * pct);
}

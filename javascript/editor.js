async function fetchCarta(nomeCarta) {
    try {
        let res = await fetch(`https://api.magicthegathering.io/v1/cards?name="${nomeCarta}"&rarity=Mythic Rare|Common|Uncommon|Rare|Basic Land`);
        let cartas = await res.json()
        let carta = cartas.cards[0];
        return {
            nome: carta.name,
            tipo: carta.types,
        };
    } catch (err) {
        console.log(err);
    }
}
function jsontabela(json) {

    var cols = Object.keys(json[0]);

    var headerRow = '';
    var bodyRows = '';

    cols.map(function (col) {
        headerRow += '<th>' + col + '</th>';
    });
    console.log(json);

    json.map(function (row) {
        bodyRows += '<tr>';

        cols.map(function (colName) {
            bodyRows += '<td><carta->' + row[colName] + '</carta-></td>';
        })

        bodyRows += '</tr>';
    });

    return '<table class="table"><thead><tr>' +
        headerRow +
        '</tr></thead><tbody>' +
        bodyRows +
        '</tbody></table>';

}
function tipoResolver(tipos) {
    const tiposArray = ["Land", "Creature", "Enchantment", "Artifact", "Planeswalker", "Instant", "Sorcery"];
    let maior = tiposArray.length;
    for (let i = 0; i < tipos.length; i++) {
        const tipo = tipos[i];
        if (tiposArray.indexOf(tipo) < maior && tiposArray.indexOf(tipo) > -1) {
            maior = tiposArray.indexOf(tipo);
        }
    }

    return tiposArray[maior];
}


async function salvaLista() {

    const lista = [];

    for (let i = 0; i < document.getElementById("decklist").value.split('\n').length; i++) {
        const linha = document.getElementById("decklist").value.split('\n')[i];
        if (linha)
            lista.push({
                nome: linha.substring(linha.indexOf(" ") + 1, linha.length),
                quantidade: linha.substring(0, linha.indexOf(" "))
            })
    }
    const listaTipos = [];
    const listaCartas = [];

    for (const carta of lista) {
        await fetchCarta(carta.nome).then((cartaJson) => {
            cartaJson.quantidade = carta.quantidade;
            cartaJson.tipo = tipoResolver(cartaJson.tipo);
            listaCartas.push(cartaJson);
            if (!listaTipos.includes(cartaJson.tipo)) {
                listaTipos.push(cartaJson.tipo);
            }
        });
    }
    listaTipos.sort((a, b) => a !== b ? a < b ? -1 : 1 : 0);
    let want = {};
    want.total = 0;
    for (const tipo of listaTipos) {
        let qtdCarta = 0;
        let lista = []
        for (const carta of listaCartas) {
            if (carta.tipo === tipo) {
                qtdCarta += parseInt(carta.quantidade);
                lista.push({ Nome: carta.nome, Quantidade: carta.quantidade });
            }
        }
        want[tipo] = lista;
        want.total += qtdCarta;
    }
    document.getElementById("listasel").innerHTML = "";
    for (const prop of Object.keys(want)) {
        if (prop != "total") {
            document.getElementById("listasel").innerHTML += "<h5>" + prop + "</h5>";
            document.getElementById("listasel").innerHTML += jsontabela(want[prop]);
        }
    }
    document.querySelectorAll("carta-").forEach((tagCarta) => {
        setTimeout(() => {
            const NOMECARTA = tagCarta.innerText;
            fetch("https://api.scryfall.com/cards/named?exact=" + NOMECARTA).then((response) => {
                return response.json();
            }).then((carta) => {
                const LINKIMG = carta.image_uris.normal;
                const SCRYFALLURI = carta.scryfall_uri;
                tagCarta.outerHTML = '<a class="tooltipCarta" href="' + SCRYFALLURI + '">' + NOMECARTA + "<span><img src=" + LINKIMG + "></span></a>";
            });
        }, 100);
    });
}
async function fetchCarta(nomeCarta) {
    try {
        let res = await fetch(`https://api.magicthegathering.io/v1/cards?name="${nomeCarta}"&rarity=Mythic Rare|Common|Uncommon|Rare|Basic Land`);
        let cartas = await res.json()
        let carta = cartas.cards[0];
        return {
            nome: carta.name,
            tipo: carta.types,
            raridade: carta.rarity
        };
    } catch (err) {
        console.log(err);
    }
}
function tipoResolver(tipos) {
    const tiposArray = ["Land", "Creature", "Enchantment", "Artifact", "Planeswalker", "Instant", "Sorcery"];
    let maior = tiposArray.length;
    tipos.forEach(tipo => {
        if (tiposArray.indexOf(tipo) < maior && tiposArray.indexOf(tipo) > -1) {
            maior = tiposArray.indexOf(tipo);
        }
    });
    return tiposArray[maior];
}

let listaCartas = ["Lightning Bolt", "Sunscape Familiar", "Preordain", "Frogmite", "Island"];
for (let i = 0; i < listaCartas.length; i++) {
    fetchCarta(listaCartas[i]).then((cartaJson) => {
        cartaJson.tipo = tipoResolver(cartaJson.tipo);
        console.log(cartaJson);

    })
}
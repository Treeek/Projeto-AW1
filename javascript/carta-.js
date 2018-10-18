document.querySelectorAll("carta-").forEach((tagCarta) => {
    setInterval(() => {
        const nomeCarta = tagCarta.innerText;
        fetch("https://api.scryfall.com/cards/named?exact=" + nomeCarta).then((response) => {
            return response.json()
        }).then((carta) => {
            const linkImg = carta.image_uris.normal;
            tagCarta.innerHTML = '<a class="tooltipCarta" href="">' + nomeCarta + "<span><img src=" + linkImg + "></span></a>";
        });
    }, 100)
});
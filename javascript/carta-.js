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
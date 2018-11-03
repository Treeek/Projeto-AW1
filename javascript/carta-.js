document.querySelectorAll("carta-").forEach((tagCarta) => {
    setInterval(() => {
        const NOMECARTA = tagCarta.innerText;
        fetch("https://api.scryfall.com/cards/named?exact=" + NOMECARTA).then((response) => {
            return response.json();
        }).then((carta) => {
            const LINKIMG = carta.image_uris.normal;
            tagCarta.innerHTML = '<a class="tooltipCarta" href="">' + NOMECARTA + "<span><img src=" + LINKIMG + "></span></a>";
        });
    }, 100);
});
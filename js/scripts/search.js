{
    const btnSearch = document.getElementById('js-btn-search');
    btnSearch.addEventListener('click', searchPokemon);
    const inputSearch = document.getElementById('js-input-search');
    inputSearch.addEventListener('keypress', (event) => {
        if(event.key === 'Enter') {
            searchPokemon()
        }
    })

    function searchPokemon() {
        const pokemonArea = document.getElementById('results-pokemon');
        pokemonArea.innerHTML = '';

        const btnLoadMore = document.getElementById('btn-load-more'); 
        btnLoadMore.classList.add('disabled');

        const countPokemon = document.getElementById('js-count-pokemon');
        countPokemon.innerText = 1;

        const valueInput = (inputSearch.value).toLowerCase();

        axios({
            method : 'GET',
            url : `https://pokeapi.co/api/v2/pokemon/${valueInput}`
        })
        .then (response => {
            const { name, id, sprites, types } = response.data;
            const infoCard = {
                name : name,
                code : id,
                image : sprites.front_default,
                type : types[0].type.name,
            }
            renderCard(infoCard.name, infoCard.code, infoCard.image, infoCard.type);
            
            const cardPokemon = document.querySelectorAll('.js-open-details-pokemon');
            
            cardPokemon.forEach(card => {
                card.addEventListener('click', openDetailsPokemon)
            })
        })
    }
}
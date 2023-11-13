{   
    const buttonAll = document.getElementById('button-all');
    buttonAll.addEventListener("click", filterAll)
    
    axios({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/type',
    })
    .then((response) => {
        const { results } = response.data;

        results.forEach((type, index) => {
            if (index < 18) {
                createTypeNav(type.name, index);
            }
        })
    })

    function createTypeNav(type, index) {
        const typeNav = document.getElementById('js-type-nav');
        
        let item = document.createElement('li');
        typeNav.appendChild(item);
        
        let buttonType = document.createElement('button');
        buttonType.classList = `type-filter ${type}`;
        buttonType.setAttribute('id-type', index + 1)
        item.appendChild(buttonType);
        
        let icon = document.createElement('div');
        icon.classList.add('icon');
        buttonType.appendChild(icon);
        
        let iconImg = document.createElement('img');
        iconImg.src = `./img/svg/icons-type/${type}.svg`;
        icon.appendChild(iconImg);
        
        let nameType = document.createElement('span');
        nameType.textContent = firstLetterCapitalized(`${type}`);
        buttonType.appendChild(nameType);
        
        const allTypes = document.querySelectorAll('.type-filter');
        allTypes.forEach(btn => {
            btn.addEventListener('click', filterByType)
        })
    }

    function filterByType() {
        const pokemonArea = document.getElementById('results-pokemon');
        pokemonArea.innerHTML = '';

        const btnLoadMore = document.getElementById('btn-load-more'); 
        btnLoadMore.classList.add('disabled');

        let idPokemon = this.getAttribute('id-type');

        axios({
            method: 'GET',
            url: `https://pokeapi.co/api/v2/type/${idPokemon}`,
        })
        .then((response) => {
            const { pokemon } = response.data

            const countPokemon = document.getElementById('js-count-pokemon');
            countPokemon.innerText = pokemon.length;

            pokemon.forEach(pok => {
                const { url } = pok.pokemon;

                axios({
                    method : 'GET',
                    url : `${url}`
                })
                .then((response) => {
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
            })
        })
    }

    function filterAll() {
        const pokemonArea = document.getElementById('results-pokemon');
        pokemonArea.innerHTML = '';

        const btnLoadMore = document.getElementById('btn-load-more'); 
        btnLoadMore.classList.remove('disabled');

        axios({
            method : 'GET',
            url : 'https://pokeapi.co/api/v2/pokemon?limit=9&offset=0',
        })
        .then((response) => {
            const { count, results } = response.data;
            const countPokemon = document.getElementById('js-count-pokemon');
            
            countPokemon.innerText = count;

            results.forEach(pokemon => {
                let urlPokemonDetails = pokemon.url;
                axios({
                    method: 'GET',
                    url: `${urlPokemonDetails}`,
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
            })
        })
    }
}

{
    const btnCloseModal = document.querySelector('.js-close-modal-details');
    btnCloseModal.addEventListener('click', closeDetaisPokemon);
    listingPokemon('https://pokeapi.co/api/v2/pokemon?limit=9&offset=0');
    
    function firstLetterCapitalized(namePok) {
        return namePok.charAt(0).toUpperCase() + namePok.slice(1);
    }

    function renderCard(name, code, image, type) {
        let results = document.getElementById('results-pokemon');

        let cardPokemon = document.createElement('button');
        cardPokemon.classList = `card-pokemon js-open-details-pokemon ${type}`;
        cardPokemon.setAttribute('code-pokemon', code);
        results.appendChild(cardPokemon);

        let iconType = document.createElement('div');
        iconType.classList.add('icon-type');
        cardPokemon.appendChild(iconType);

        let imgType = document.createElement('img');
        imgType.classList.add('icon-type-pokemon');
        imgType.src = `./img/svg/icons-type/${type}.svg`;
        iconType.appendChild(imgType);

        let containerPokemon = document.createElement('div');
        containerPokemon.classList.add('container-pokemon');
        cardPokemon.appendChild(containerPokemon);

        let containerImg = document.createElement('div');
        containerImg.classList.add('img-pokemon');
        containerPokemon.appendChild(containerImg);

        let imgPokemon = document.createElement('img');
        imgPokemon.classList.add('image');
        imgPokemon.src = image !== null ? image : "https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png";
        containerImg.appendChild(imgPokemon);

        let infoPokemon = document.createElement('div');
        infoPokemon.classList.add('info');
        containerPokemon.appendChild(infoPokemon)

        let namePokemon = document.createElement('h3');
        namePokemon.textContent = firstLetterCapitalized(name);
        infoPokemon.appendChild(namePokemon);

        let idPokemon = document.createElement('span');
        idPokemon.classList.add('id-pokemon')
        idPokemon.textContent = `#${code}`;
        infoPokemon.appendChild(idPokemon);
    }

    function closeDetaisPokemon() {
        document.documentElement.classList.remove('open-modal');
    }
    
    function listingPokemon(urlAPI) {
        axios({
            method: 'GET',
            url: urlAPI,
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
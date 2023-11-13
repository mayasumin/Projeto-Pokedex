{
    function openDetailsPokemon() {
        document.documentElement.classList.add('open-modal');

        const modal = document.getElementById('js-modal-details');

        let imgPokemon = this.querySelector('.image');
        let imgPokemonModal = document.getElementById('js-image-pokemon-modal');
        imgPokemonModal.setAttribute('src', imgPokemon.getAttribute('src'));

        let typePokemon = this.classList[2];
        modal.setAttribute('type-pokemon-modal', typePokemon);

        let iconType = this.querySelector('.icon-type-pokemon');
        let iconTypeModal = document.getElementById('js-image-type-modal');
        iconTypeModal.setAttribute('src', iconType.getAttribute('src'));

        let namePokemon = this.querySelector('h3');
        let namePokemonModal = document.getElementById('js-name-pokemon-modal');
        namePokemonModal.textContent = namePokemon.textContent;

        let idPokemon = this.querySelector('.id-pokemon');
        let idPokemonModal = document.getElementById('js-id-pokemon-modal');
        idPokemonModal.textContent = idPokemon.textContent;

        let codePokemon = this.getAttribute('code-pokemon');

        axios({
            method : 'GET',
            url : `https://pokeapi.co/api/v2/pokemon/${codePokemon}`
        })
        .then((response) => {
            const { types, height, weight, abilities, stats } = response.data;
            const heightValue = document.getElementById('js-height-pok');
            const weightValue = document.getElementById('js-weight-pok');
            const infoPokemon = {
                typesList : listTypes(types),
                typesObj : types,
                heightPok : heightValue.textContent = `${height / 10}m`,
                weightPok : weightValue.textContent = `${weight / 10}kg`,
                abilitiesPok : listAbilities(abilities),
                statsPok : stats,
            }
            listWeaknesses(infoPokemon.typesObj)

            const statsHP = document.getElementById('js-stats-hp');
            statsHP.style.width = `${infoPokemon.statsPok[0].base_stat}%`;

            const statsAttack = document.getElementById('js-stats-atk');
            statsAttack.style.width = `${infoPokemon.statsPok[1].base_stat}%`;

            const statsDefense = document.getElementById('js-stats-def');
            statsDefense.style.width = `${infoPokemon.statsPok[2].base_stat}%`;

            const statsSpAttack = document.getElementById('js-stats-sp-atk');
            statsSpAttack.style.width = `${infoPokemon.statsPok[3].base_stat}%`;

            const statsSpDefense = document.getElementById('js-stats-sp-def');
            statsSpDefense.style.width = `${infoPokemon.statsPok[4].base_stat}%`;

            const statsSpeed = document.getElementById('js-stats-speed');
            statsSpeed.style.width = `${infoPokemon.statsPok[5].base_stat}%`

            function listTypes(types) {
                const typeList = document.getElementById('type-list');
                typeList.innerHTML = '';
                types.forEach((type) => {
                    let typeName = document.createElement('li');
                    typeName.classList = `tag-type ${type.type.name}`;
                    typeName.textContent = firstLetterCapitalized(`${type.type.name}`) 
                    typeList.appendChild(typeName)
                })
            }

            function listAbilities(abilities) {
                abilities.forEach((abil) => {
                    let abilitiesNames = document.getElementById('js-abilities-pok');
                    abilitiesNames.textContent = firstLetterCapitalized(abil.ability.name);
                })
            }

            function listWeaknesses(typesObj) {
                const weakList = document.getElementById('js-weak-pok');
                weakList.innerHTML = '';
                typesObj.forEach((typeInfo) => {
                    axios({
                        method : 'GET',
                        url : `${typeInfo.type.url}`
                    })
                    .then((response) => {
                        const { double_damage_from } = response.data.damage_relations;
                        double_damage_from.forEach(weakness => {
                            let weakName = document.createElement('li');
                            weakName.classList = `tag-type ${weakness.name}`;
                            weakName.textContent = firstLetterCapitalized(`${weakness.name}`);
                            weakList.appendChild(weakName);
                        })
                    })
                })
            }
        })
    }
}
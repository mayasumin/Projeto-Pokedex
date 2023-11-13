{
    axios({
        method: 'GET',
        url: 'https://pokeapi.co/api/v2/type',
    })
    .then((response) => {
        const { results } = response.data;
        
        results.forEach((type, index) => {
            if (index < 18) {
                createSelectCustom(type.name, index);
            }
        })
    })
    
    const btnDropdownSelect = document.getElementById('js-open-select-custom');
    btnDropdownSelect.addEventListener('click', () => {
        btnDropdownSelect.parentElement.classList.toggle('active');
    })

    function createSelectCustom(type, index) {
        const bntAllDropdown = document.getElementById('js-dropdown-all');
        bntAllDropdown.addEventListener("click", filterAll);

        const dropdownSelect = document.getElementById('js-dropdown-select');

        let item = document.createElement('li')
        dropdownSelect.appendChild(item);

        let buttonType = document.createElement('button');
        buttonType.classList = `dropdown-type ${type}`;
        buttonType.setAttribute('id-type', index + 1);
        item.appendChild(buttonType);

        let icon = document.createElement('div');
        icon.classList.add('icon');
        buttonType.appendChild(icon)
        
        let iconImg = document.createElement('img');
        iconImg.src = `./img/svg/icons-type/${type}.svg`;
        icon.appendChild(iconImg);

        let nameType = document.createElement('span');
        nameType.textContent = firstLetterCapitalized(`${type}`);
        buttonType.appendChild(nameType);

        const allTypes = document.querySelectorAll('.dropdown-type');
        const typeSelect = document.getElementById('js-type-selected');
        allTypes.forEach(btn => {
            btn.addEventListener('click', filterByType);
            btn.addEventListener('click', function() {
                typeSelect.textContent = '';
                typeSelect.textContent = firstLetterCapitalized(`${btn.classList[1]}`);
            })
        })
    }
}
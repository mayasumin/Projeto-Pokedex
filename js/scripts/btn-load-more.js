{
    const btnLoadMore = document.getElementById('btn-load-more'); 
    
    btnLoadMore.addEventListener('click', showMorePokemon);

    let countPagination = 9;

    function showMorePokemon() {
        listingPokemon(`https://pokeapi.co/api/v2/pokemon?limit=9&offset=${countPagination}`);
        countPagination+=9; 
    }
}
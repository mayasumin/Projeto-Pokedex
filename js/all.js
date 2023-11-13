{const a=document.getElementById("btn-load-more");a.addEventListener("click",showMorePokemon);let e=9;function showMorePokemon(){listingPokemon("https://pokeapi.co/api/v2/pokemon?limit=9&offset="+e),e+=9}}{const c=document.querySelector(".js-close-modal-details");function firstLetterCapitalized(e){return e.charAt(0).toUpperCase()+e.slice(1)}function renderCard(e,t,n,o){var a=document.getElementById("results-pokemon"),d=document.createElement("button"),a=(d.classList="card-pokemon js-open-details-pokemon "+o,d.setAttribute("code-pokemon",t),a.appendChild(d),document.createElement("div")),s=(a.classList.add("icon-type"),d.appendChild(a),document.createElement("img")),o=(s.classList.add("icon-type-pokemon"),s.src=`./img/svg/icons-type/${o}.svg`,a.appendChild(s),document.createElement("div")),a=(o.classList.add("container-pokemon"),d.appendChild(o),document.createElement("div")),s=(a.classList.add("img-pokemon"),o.appendChild(a),document.createElement("img")),d=(s.classList.add("image"),s.src=null!==n?n:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/770px-Pok%C3%A9_Ball_icon.svg.png",a.appendChild(s),document.createElement("div")),n=(d.classList.add("info"),o.appendChild(d),document.createElement("h3")),a=(n.textContent=firstLetterCapitalized(e),d.appendChild(n),document.createElement("span"));a.classList.add("id-pokemon"),a.textContent="#"+t,d.appendChild(a)}function closeDetaisPokemon(){document.documentElement.classList.remove("open-modal")}function listingPokemon(e){axios({method:"GET",url:e}).then(e=>{var{count:e,results:t}=e.data;document.getElementById("js-count-pokemon").innerText=e,t.forEach(e=>{e=e.url;axios({method:"GET",url:""+e}).then(e=>{var{name:e,id:t,sprites:n,types:o}=e.data,e={name:e,code:t,image:n.front_default,type:o[0].type.name};renderCard(e.name,e.code,e.image,e.type),document.querySelectorAll(".js-open-details-pokemon").forEach(e=>{e.addEventListener("click",openDetailsPokemon)})})})})}c.addEventListener("click",closeDetaisPokemon),listingPokemon("https://pokeapi.co/api/v2/pokemon?limit=9&offset=0")}{function openDetailsPokemon(){document.documentElement.classList.add("open-modal");var e=document.getElementById("js-modal-details"),t=this.querySelector(".image"),t=(document.getElementById("js-image-pokemon-modal").setAttribute("src",t.getAttribute("src")),this.classList[2]),e=(e.setAttribute("type-pokemon-modal",t),this.querySelector(".icon-type-pokemon")),t=(document.getElementById("js-image-type-modal").setAttribute("src",e.getAttribute("src")),this.querySelector("h3")),e=(document.getElementById("js-name-pokemon-modal").textContent=t.textContent,this.querySelector(".id-pokemon")),t=(document.getElementById("js-id-pokemon-modal").textContent=e.textContent,this.getAttribute("code-pokemon"));axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/"+t}).then(e=>{var{types:e,height:t,weight:n,abilities:o,stats:a}=e.data,d=document.getElementById("js-height-pok"),s=document.getElementById("js-weight-pok"),e={typesList:function(e){const n=document.getElementById("type-list");n.innerHTML="",e.forEach(e=>{var t=document.createElement("li");t.classList="tag-type "+e.type.name,t.textContent=firstLetterCapitalized(""+e.type.name),n.appendChild(t)})}(e),typesObj:e,heightPok:d.textContent=t/10+"m",weightPok:s.textContent=n/10+"kg",abilitiesPok:void o.forEach(e=>{document.getElementById("js-abilities-pok").textContent=firstLetterCapitalized(e.ability.name)}),statsPok:a};{d=e.typesObj;const i=document.getElementById("js-weak-pok");i.innerHTML="",d.forEach(e=>{axios({method:"GET",url:""+e.type.url}).then(e=>{e=e.data.damage_relations.double_damage_from;e.forEach(e=>{var t=document.createElement("li");t.classList="tag-type "+e.name,t.textContent=firstLetterCapitalized(""+e.name),i.appendChild(t)})})})}document.getElementById("js-stats-hp").style.width=e.statsPok[0].base_stat+"%",document.getElementById("js-stats-atk").style.width=e.statsPok[1].base_stat+"%",document.getElementById("js-stats-def").style.width=e.statsPok[2].base_stat+"%",document.getElementById("js-stats-sp-atk").style.width=e.statsPok[3].base_stat+"%",document.getElementById("js-stats-sp-def").style.width=e.statsPok[4].base_stat+"%",document.getElementById("js-stats-speed").style.width=e.statsPok[5].base_stat+"%"})}}{axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(e=>{e=e.data.results;e.forEach((e,t)=>{t<18&&createSelectCustom(e.name,t)})});const wa=document.getElementById("js-open-select-custom");function createSelectCustom(e,t){document.getElementById("js-dropdown-all").addEventListener("click",filterAll);var n=document.getElementById("js-dropdown-select"),o=document.createElement("li"),n=(n.appendChild(o),document.createElement("button")),t=(n.classList="dropdown-type "+e,n.setAttribute("id-type",t+1),o.appendChild(n),document.createElement("div")),o=(t.classList.add("icon"),n.appendChild(t),document.createElement("img")),t=(o.src=`./img/svg/icons-type/${e}.svg`,t.appendChild(o),document.createElement("span")),o=(t.textContent=firstLetterCapitalized(""+e),n.appendChild(t),document.querySelectorAll(".dropdown-type"));const a=document.getElementById("js-type-selected");o.forEach(e=>{e.addEventListener("click",filterByType),e.addEventListener("click",function(){a.textContent="",a.textContent=firstLetterCapitalized(""+e.classList[1])})})}wa.addEventListener("click",()=>{wa.parentElement.classList.toggle("active")})}{const Na=document.getElementById("js-btn-search"),Oa=(Na.addEventListener("click",searchPokemon),document.getElementById("js-input-search"));function searchPokemon(){document.getElementById("results-pokemon").innerHTML="",document.getElementById("btn-load-more").classList.add("disabled");document.getElementById("js-count-pokemon").innerText=1;var e=Oa.value.toLowerCase();axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon/"+e}).then(e=>{var{name:e,id:t,sprites:n,types:o}=e.data,e={name:e,code:t,image:n.front_default,type:o[0].type.name};renderCard(e.name,e.code,e.image,e.type),document.querySelectorAll(".js-open-details-pokemon").forEach(e=>{e.addEventListener("click",openDetailsPokemon)})})}Oa.addEventListener("keypress",e=>{"Enter"===e.key&&searchPokemon()})}var slide_hero=new Swiper(".slide-hero",{effect:"fade",slidesPerView:2,spaceBetween:30,pagination:{el:".slide-hero .main-area .area-explorer .swiper-pagination",clickable:!0}});{const a0=document.getElementById("button-all");function createTypeNav(e,t){var n=document.getElementById("js-type-nav"),o=document.createElement("li"),n=(n.appendChild(o),document.createElement("button")),t=(n.classList="type-filter "+e,n.setAttribute("id-type",t+1),o.appendChild(n),document.createElement("div")),o=(t.classList.add("icon"),n.appendChild(t),document.createElement("img")),t=(o.src=`./img/svg/icons-type/${e}.svg`,t.appendChild(o),document.createElement("span"));t.textContent=firstLetterCapitalized(""+e),n.appendChild(t),document.querySelectorAll(".type-filter").forEach(e=>{e.addEventListener("click",filterByType)})}function filterByType(){document.getElementById("results-pokemon").innerHTML="";document.getElementById("btn-load-more").classList.add("disabled");var e=this.getAttribute("id-type");axios({method:"GET",url:"https://pokeapi.co/api/v2/type/"+e}).then(e=>{e=e.data.pokemon;document.getElementById("js-count-pokemon").innerText=e.length,e.forEach(e=>{e=e.pokemon.url;axios({method:"GET",url:""+e}).then(e=>{var{name:e,id:t,sprites:n,types:o}=e.data,e={name:e,code:t,image:n.front_default,type:o[0].type.name};renderCard(e.name,e.code,e.image,e.type),document.querySelectorAll(".js-open-details-pokemon").forEach(e=>{e.addEventListener("click",openDetailsPokemon)})})})})}function filterAll(){document.getElementById("results-pokemon").innerHTML="",document.getElementById("btn-load-more").classList.remove("disabled"),axios({method:"GET",url:"https://pokeapi.co/api/v2/pokemon?limit=9&offset=0"}).then(e=>{var{count:e,results:t}=e.data;document.getElementById("js-count-pokemon").innerText=e,t.forEach(e=>{e=e.url;axios({method:"GET",url:""+e}).then(e=>{var{name:e,id:t,sprites:n,types:o}=e.data,e={name:e,code:t,image:n.front_default,type:o[0].type.name};renderCard(e.name,e.code,e.image,e.type),document.querySelectorAll(".js-open-details-pokemon").forEach(e=>{e.addEventListener("click",openDetailsPokemon)})})})})}a0.addEventListener("click",filterAll),axios({method:"GET",url:"https://pokeapi.co/api/v2/type"}).then(e=>{e=e.data.results;e.forEach((e,t)=>{t<18&&createTypeNav(e.name,t)})})}
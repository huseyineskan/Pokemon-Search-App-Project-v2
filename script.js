const searchInput = document.getElementById('search-input');
const searchBtn = document.getElementById('search-button')
const pokemonImgDiv = document.getElementById('pokemon-img');

const pokemonName = document.getElementById('pokemon-name')
const pokemonId= document.getElementById('pokemon-id')
const height = document.getElementById('height')
const weight = document.getElementById('weight')
const types = document.getElementById('types')
const hp = document.getElementById('hp')
const attack = document.getElementById('attack')
const defense = document.getElementById('defense')
const specialAttack = document.getElementById('special-attack')
const specialDefense = document.getElementById('special-defense')
const speed = document.getElementById('speed')
const removeBtn = document.getElementById('remove-input')

const getPokemon = async () => {
    try {
        const inputValue = searchInput.value.toLowerCase();
        const response = await fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputValue}`)
        const data = await response.json();

        console.log(data)
        pokemonImgDiv.innerHTML = `<img id="sprite" src="${data.sprites.front_default}">`;
        pokemonName.textContent = data.name.toUpperCase();
        pokemonId.textContent = data.id;
        weight.textContent = data.weight;
        height.textContent = data.height;
        hp.textContent = data.stats[0].base_stat;
        attack.textContent = data.stats[1].base_stat;
        defense.textContent = data.stats[2].base_stat;
        specialAttack.textContent = data.stats[3].base_stat;
        specialDefense.textContent = data.stats[4].base_stat;
        speed.textContent = data.stats[5].base_stat;

        types.innerHTML = data.types
        .map(
          (obj) => `<span class="type ${obj.type.name}">${obj.type.name}</span>`,
        )
        .join("");

    } catch (err){
        resetValues();
        alert("Pokémon not found");
        console.log("Pokémon not found: " + err);
    }
}

function resetValues(){
    pokemonImgDiv.innerHTML = "";
    pokemonName.textContent = "";
    pokemonId.textContent = "";
    weight.textContent = "";
    height.textContent = "";
    hp.textContent = "";
    attack.textContent = "";
    defense.textContent = "";
    specialAttack.textContent = "";
    specialDefense.textContent = "";
    speed.textContent = "";
    types.textContent = "";
}

searchBtn.addEventListener('click', getPokemon);
searchInput.addEventListener('keyup', removeBtnF)

searchInput.addEventListener('keypress', (e) => {
    if(e.key === 'Enter') getPokemon();
})

removeBtn.addEventListener('click', () => {
    searchInput.value = "";
    removeBtn.style.display = "none";
})

function removeBtnF(){
    if(searchInput.value.trim() === '' ){
        removeBtn.style.display = "none";
    } else {
        removeBtn.style.display = "block";
    }
}
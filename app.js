document.getElementById("pokemonName").addEventListener("input", function() {
    const name = this.value.toLowerCase();
    getSuggestions(name);
});

let suggestions = [];

async function getSuggestions(name) {
    if (name.length === 0) {
        updateSuggestions([]);
        return;  // Clear suggestions if input is empty
    }
    try {
        const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=1000');  // Fetch all Pokémon names
        const data = await response.json();
        suggestions = data.results
            .filter(pokemon => pokemon.name.startsWith(name)) // Filter Pokémon names starting with input
            .map(pokemon => pokemon.name);
        updateSuggestions(suggestions);  // Update the suggestion list with results
    } catch (error) {
        console.error('Error fetching suggestions:', error);
    }
}

function updateSuggestions(suggestions) {
    const ul = document.querySelector('.suggestions-list');
    if (suggestions.length > 0) {
        ul.innerHTML = suggestions.map(suggestion => `<li onclick="selectSuggestion('${suggestion}')">${suggestion}</li>`).join('');
        ul.style.display = "block";  // Ensure suggestions list is visible
    } else {
        ul.innerHTML = '';  // Clear suggestions list when no matches
        ul.style.display = "none";  // Hide suggestions list when empty
    }
}

function selectSuggestion(name) {
    document.getElementById("pokemonName").value = name;
    updateSuggestions([]);  // Clear the suggestions after selection
    fetchData();  // Fetch Pokémon data for the selected name
}

async function fetchData() {
    try {
        const pokemonName = document.getElementById("pokemonName").value.toLowerCase();
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);
        if (!response.ok) {
            throw new Error('No Pokémon found');
        }
        const data = await response.json();
        const pokemonImage = document.getElementById("pokemon_image");
        pokemonImage.src = data.sprites.front_default;
        pokemonImage.style.display = "block";
    } catch (error) {
        console.error('Error:', error);
    }
}

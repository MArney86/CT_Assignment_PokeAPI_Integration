async function fetchPokemonData(pokemonName) {
    document.getElementById('poke-error').innerHTML = ''; // Clear previous error messages
    document.getElementById('poke-result').innerHTML = ''; // Clear previous results

    try {
        //fetch the pokemon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        //check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        const pokemoneData = await response.json();

        document.getElementById('poke-result').innerHTML = `<h2>Loading info...</h2>`;

        return pokemoneData;
    } catch (error) {
        //handle errors that may occur during the fetch
        document.getElementById('poke-error').innerHTML = `
            <p class="error">Error retrieving data for ${pokemonName}:</p>
            <p class="error">${error.message}</p>
            `;
    }
}



//add event listener to the submit button
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async (event) => {
    //prevent the default form submission behavior
    event.preventDefault();

    const inputField = document.getElementById('poke-input').value;
    const pokemonData = await fetchPokemonData(`${inputField.toLowerCase().trim()}`);

    document.getElementById('poke-result').innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>Type(s): </p>
        <ul> 
            ${pokemonData.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>
    `;
});
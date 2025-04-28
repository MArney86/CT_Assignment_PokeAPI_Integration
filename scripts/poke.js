async function fetchPokemonData(pokemonName) {
    // Clear previous error messages
    document.getElementById('poke-error').innerHTML = '';
    // Hide the error section
    document.getElementById('poke-error').style.display = 'none';
    // Clear previous results
    document.getElementById('poke-result').innerHTML = '';

    try {
        //fetch the pokemon data from the API
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`);

        //check if the response is ok (status code 200-299)
        if (!response.ok) {
            throw new Error('Pokemon not found');
        }

        //parse the response data as JSON
        const pokemoneData = await response.json();

        //generate the HTML for a loading message to be replaced once the data is fetched
        document.getElementById('poke-result').innerHTML = `<h2>Loading info...</h2>`;
         // Show the result section
        document.getElementById('poke-result').style.display = 'flex';

        //return the pokemon data
        return pokemoneData;
    } catch (error) {
        //handle errors that may occur during the fetch
        //generate and display an error message in the HTML
        document.getElementById('poke-error').innerHTML = `
            <p class="error">Error retrieving data for ${pokemonName}:</p>
            <p class="error">${error.message}</p>
        `;
        // Show the error section
        document.getElementById('poke-error').style.display = 'flex';
         // Hide the result section
        document.getElementById('poke-result').style.display = 'none';

    }
}

//add event listener to the submit button
const submitButton = document.getElementById('submit');

submitButton.addEventListener('click', async (event) => {
    
    //prevent the default form submission behavior
    event.preventDefault();

    //get the value from the input field then fetch the pokemon data using the input value
    const inputField = document.getElementById('poke-input').value;
    const pokemonData = await fetchPokemonData(`${inputField.toLowerCase().trim()}`);

    //generate and display the HTML usin the fetched data
    document.getElementById('poke-result').innerHTML = `
        <h2>${pokemonData.name}</h2>
        <img src="${pokemonData.sprites.front_default}" alt="${pokemonData.name}">
        <p>Type(s): </p>
        <ul> 
            ${pokemonData.types.map(type => `<li>${type.type.name}</li>`).join('')}
        </ul>`;
});
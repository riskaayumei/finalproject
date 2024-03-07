const pokedex = document.getElementById("pokemon")
const getPokemon = () => {
  const promises = [];
  for (let i = 1; i <= 40; i++) {
    const url = `https://pokeapi.co/api/v2/pokemon/${i}`
    promises.push(fetch(url).then(res => res.json()))
  }
  Promise.all(promises).then(result => {
    const pokemon = result.map(data => ({
      id: data.id,
      name: data.name,
      type: data.types.map(type=>type.type.name).join(", "),
      image: data.sprites["front_default"],
      stats: data.stats.map(stat => ({
        name: stat.stat.name,
        value: stat.base_stat
      }))
    }))
    displayPokemon(pokemon)
  })
}
const displayPokemon = pokemon => {
  const pokemonString = pokemon
    .map(
      singlePokemon => `
    <li>
      <img src="${singlePokemon.image}" />
      <h3>${singlePokemon.id}. ${singlePokemon.name} </h3>
      <p> Type: ${singlePokemon.type} </p>
      <h2>Stats:</h2>
      <ul>
        ${singlePokemon.stats.map(stat => ` 
            <div class="stats"> ${stat.name}: ${stat.value}</div>
        `).join("")}
      </ul>
    </li>`
    )
    .join("")
  pokedex.innerHTML = pokemonString
}
getPokemon()


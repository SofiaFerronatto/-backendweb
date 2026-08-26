const botao = document.getElementById("botao-carregar");
const lista = document.getElementById("lista-pokemons");
let contagem = 1;
 
async function buscarPokemons() {
    lista.innerHTML = "";
 
    const resposta = await fetch("https://pokeapi.co/api/v2/pokemon?limit=15");
    const dados = await resposta.json();
 
    console.log(dados.results);
 
    for (const pokemon of dados.results) {
        console.log(pokemon.name);
 
        const respostaDetalhes = await fetch(pokemon.url);
        const detalhes = await respostaDetalhes.json();
 
        const card = document.createElement("div");
        card.classList.add("card");
 
        card.innerHTML = `
            <img src="${detalhes.sprites.other["official-artwork"].front_default}" alt="${detalhes.name}">
            <h2>${detalhes.name}</h2>
            ${contagem}
        `;
 
        lista.appendChild(card);
 
        contagem += 1;
    }
}
 
botao.addEventListener("click", async () => {
    try {
        await buscarPokemons();
    } catch (erro) {
        console.log("Erro ao carregar Pokémon");
        lista.innerHTML = "<p>Erro ao carregar os Pokémon.</p>";
    }
});
 
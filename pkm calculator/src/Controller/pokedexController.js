async function nameToNumber(name) {

    var raw;

    await fetch('./src/db/pokedexNumber.json').then(r => r.json()).then(data => raw = data);

    console.log(raw);


    var pkmobj = raw.filter(e => e.name == name)

    return pkmobj.number

}

function getPkmImage(name) {

    return 'https://play.pokemonshowdown.com/sprites/dex/' + name.toLowerCase() + '.png'


}

export default { nameToNumber, getPkmImage }
async function getCompData() {

    var rawData

    await fetch('https://eurekaffeine.github.io/pokemon-champions-scraper/battle_meta.json').then(r => r.json())
        .then(data => rawData = data)

    return rawData;


}

async function getUsageData() {

    //Padrao: {Regulation: XXX, Pokemon: [dex_id,form,name,rank,top_abilites,top_items,top_moves,top_teammates,top_tera_types,usage_rate,win_rate]}
    

    const rawData = await getCompData()

    console.log(rawData);

    const usageData = {
        'Regulation': rawData.season.name,
        'Pokemon': rawData.pokemon_usage
    }

    return usageData

}

export default { getUsageData }
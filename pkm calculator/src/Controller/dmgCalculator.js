import { calculate, Generations, Pokemon, Move } from '@smogon/calc';

function calc(poke, enemy ,move) {

    try {
        //console.log(poke);
        //console.log(enemy)

        
        const gen = Generations.get(9);
        const result = calculate(
            gen,
            new Pokemon(gen, poke.name, {
                item: poke.item,
                nature: poke.nature,
                evs: { spa: poke.evs.spa, at: poke.evs.at },
            }),
            new Pokemon(gen, enemy.name, {
                item: enemy.item,
                nature: enemy.nature,
                evs: { hp: enemy.evs.hp, spd: enemy.evs.spd, df: enemy.evs.df },
            }),
            new Move(gen, move)
        );
        return result.kochance() //See all result object atributes


    } catch (error) {
        //console.log(error);
        
        return 'No damage'
    }
}

export default {
    calc
}
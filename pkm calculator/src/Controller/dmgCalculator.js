import { calculate, Generations, Pokemon, Move } from '@smogon/calc';

function calc(poke, enemy, move) {

    try {
        //console.log(poke)
        //console.log(enemy)


        const gen = Generations.get(9);
        const result = calculate(
            gen,
            new Pokemon(gen, poke.name, {
                item: poke.item,
                nature: poke.nature,
                evs: { hp: poke.evs.hp, at: poke.evs.at, df: poke.evs.df,  spa: poke.evs.spa, sd: poke.evs.sd, sp: poke.evs.sp},
            }),
            new Pokemon(gen, enemy.name, {
                item: enemy.item,
                nature: enemy.nature,
                evs: { hp: enemy.evs.hp, at: enemy.evs.at, df: enemy.evs.df,  spa: enemy.evs.spa, sd: enemy.evs.sd, sp: enemy.evs.sp},
            }),
            new Move(gen, move)
        );

        var resultString = result.desc().split('(')[1].split(')')[0] + ' ' + result.kochance().text

        return resultString

    } catch (error) {
        //console.log(error);

        return 'No damage'
    }
}

export default {
    calc
}
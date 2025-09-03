import { calculate, Generations, Pokemon, Move, Field } from '@smogon/calc';

function calc(poke, enemy, move, conditions) {

    try {
        console.log(poke)
        //console.log(enemy)

        //console.log(poke.evs);
        //console.log(conditions);
        
        

        var pokeEvs = {
            hp: poke.evs.hp ? poke.evs.hp : 0,
            atk: poke.evs.at ? poke.evs.at : 0,
            def: poke.evs.df ? poke.evs.df : 0,
            spa: poke.evs.sa ? poke.evs.sa : 0,
            spd: poke.evs.sd ? poke.evs.spd : 0,
            spe: poke.evs.sp ? poke.evs.spe : 0,
        }

        var enemyEvs = {
            hp: enemy.evs.hp ? enemy.evs.hp : 0,
            atk: enemy.evs.at ? enemy.evs.at : 0,
            def: enemy.evs.df ? enemy.evs.df : 0,
            spa: enemy.evs.sa ? enemy.evs.sa : 0,
            spd: enemy.evs.sd ? enemy.evs.spd : 0,
            spe: enemy.evs.sp ? enemy.evs.spe: 0,
        }


        const gen = Generations.get(9);
        const result = calculate(
            gen,
            new Pokemon(gen, poke.name, {
                level: 50,
                item: poke.item,
                nature: poke.nature,
                evs: pokeEvs,
                teraType: conditions.offensiveTera?poke.teraType:''
            }),
            new Pokemon(gen, enemy.name, {
                level: 50,
                item: enemy.item,
                nature: enemy.nature,
                evs: enemyEvs,
            }),
            new Move(gen, move),
            new Field({
                weather: conditions.weather
            })
        );

        var resultString = result.desc().split('(')[1].split(')')[0] + ' ' + result.kochance().text

        //var resultString = result.desc()


        return resultString

    } catch (error) {
        //console.log(error);

        return 'No damage'
    }
}

export default {
    calc
}
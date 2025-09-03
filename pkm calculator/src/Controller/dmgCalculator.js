import { calculate, Generations, Pokemon, Move, Field } from '@smogon/calc';

function calc(poke, enemy, move, conditions) {

    try {
        //console.log(poke)
        //console.log(enemy)

        //console.log(poke.evs);
        //console.log(conditions);
        
        

        var pokeEvs = {
            hp: poke.evs.hp ? poke.evs.hp : 0,
            atk: poke.evs.at ? poke.evs.at : 0,
            def: poke.evs.df ? poke.evs.df : 0,
            spa: poke.evs.sa ? poke.evs.sa : 0,
            spd: poke.evs.sd ? poke.evs.spd : 0,
            spe: poke.evs.sp ? poke.evs.sp : 0,
        }

        var enemyEvs = {
            hp: enemy.evs.hp ? enemy.evs.hp : 0,
            atk: enemy.evs.at ? enemy.evs.at : 0,
            def: enemy.evs.df ? enemy.evs.df : 0,
            spa: enemy.evs.sa ? enemy.evs.sa : 0,
            spd: enemy.evs.sd ? enemy.evs.spd : 0,
            spe: enemy.evs.sp ? enemy.evs.sp: 0,
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
                weather: conditions.weather,
                terrain: conditions.terrain
            })
        );

        var resultString = result.desc().split('(')[1].split(')')[0] + ' ' + result.kochance().text

        //var resultString = result.attacker.rawStats

        return resultString

    } catch (error) {
        //console.log(error);

        return 'No damage'
    }
}


function calcSpeed(poke, enemy, move, conditions) {

    try {
        
        var pokeEvs = {
            spe: poke.evs.sp ? poke.evs.sp : 0,
        }

        var enemyEvs = {
            spe: enemy.evs.sp ? enemy.evs.sp: 0,
        }


        const gen = Generations.get(9);
        const result = calculate(
            gen,
            new Pokemon(gen, poke.name, {
                level: 50,
                item: poke.item,
                nature: poke.nature,
                evs: pokeEvs,
            }),
            new Pokemon(gen, enemy.name, {
                level: 50,
                item: enemy.item,
                nature: enemy.nature,
                evs: enemyEvs,
            }),
            new Move(gen, move),
            new Field({
                weather: conditions.weather,
                terrain: conditions.terrain
            })
        );

        
        if (enemy.item=='Choice Scarf') {
            result.defender.rawStats.spe = result.defender.rawStats.spe * 1.5
        }
        if (poke.item=='Choice Scarf') {
            result.attacker.rawStats.spe = result.attacker.rawStats.spe * 1.5
        }
        
        var resultString = result.defender.rawStats.spe

        return result.defender.rawStats.spe > result.attacker.rawStats.spe ? resultString + ' Attacker Underspeeds':resultString + ' Attacker Outspeeds' 

    } catch (error) {
        return 'Speed unknown'
    }
}


export default {
    calc,
    calcSpeed
}
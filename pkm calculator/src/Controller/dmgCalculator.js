import { calculate, Generations, Pokemon, Move } from '@smogon/calc';

function calc(poke, move) {

    try {
        const gen = Generations.get(9);
        const result = calculate(
            gen,
            new Pokemon(gen, poke.name, {
                item: poke.item,
                nature: poke.nature,
                evs: { spa: poke.evs.spa },
            }),
            new Pokemon(gen, 'Chansey', {
                item: 'Eviolite',
                nature: 'Calm',
                evs: { hp: 252, spd: 252 },
            }),
            new Move(gen, move)
        );
        return result.kochance().text //See all result object atributes


    } catch (error) {
        return 'No damage'
    }
}

export default {
    calc
}
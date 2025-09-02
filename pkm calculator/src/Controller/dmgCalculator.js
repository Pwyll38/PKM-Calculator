import { calculate, Generations, Pokemon, Move } from '@smogon/calc';

function calc(poke) {
    
    if(poke){
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
        new Move(gen, 'Focus Blast')
    );
    return result.kochance() //See all result object atributes
    
    }
}

export default{
     calc
     }
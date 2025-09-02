<script>

import importPokesController from './Controller/importPoke'
import { ref } from "vue";

export default {

  name: 'main screen',

  setup() {
    const pokesString = ref('')
    const pokes = ref([])

    return {
      pokesString,
      pokes
    }
  },

  methods: {
    async importString() {

      var data =
        `
      Beats walkin (Koraidon) @ Life Orb  
Ability: Orichalcum Pulse  
Level: 50  
Tera Type: Fire  
EVs: 252 Atk / 4 SpD / 252 Spe  
Adamant Nature  
- Flare Blitz  
- Close Combat  
- U-turn  
- Drain Punch  

Miraidon @ Choice Scarf  
Ability: Hadron Engine  
Level: 50  
Tera Type: Electric  
EVs: 252 SpA / 4 SpD / 252 Spe  
Modest Nature  
- Electro Drift  
- Draco Meteor  
- Volt Switch  
- Solar Beam  

Flutter Mane @ Choice Specs  
Ability: Protosynthesis  
Level: 50  
Tera Type: Ghost  
EVs: 252 SpA / 4 SpD / 252 Spe  
Timid Nature  
IVs: 0 Atk  
- Moonblast  
- Shadow Ball  
- Power Gem  
- Mystical Fire  

Chien-Pao @ Focus Sash  
Ability: Sword of Ruin  
Level: 50  
Tera Type: Ice  
EVs: 252 Atk / 4 SpA / 252 Spe  
Adamant Nature  
- Swords Dance  
- Sacred Sword  
- Ice Spinner  
- Sucker Punch  

Ting-Lu @ Assault Vest  
Ability: Vessel of Ruin  
Level: 50  
Tera Type: Dark  
EVs: 252 HP / 252 Atk / 4 SpD  
Impish Nature  
- Payback  
- Earthquake  
- Heavy Slam  
- Ruination  

Garganacl @ Rocky Helmet  
Ability: Purifying Salt  
Level: 50  
Tera Type: Rock  
EVs: 252 HP / 4 Atk / 252 Def  
Impish Nature  
- Salt Cure  
- Protect  
- Earthquake  
- Recover  
      `

      importPokesController.importPokes(this.pokesString, '123')

      
    }
  }



}

</script>

<template>

  <textarea type="textarea" v-model="pokesString"></textarea>
  <button @click="importString()">Calc</button>

</template>

<style scoped></style>

<script>

import importPokesController from './Controller/importPoke'
import dmgCalculator from './Controller/dmgCalculator';
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

      this.pokes = importPokesController.importPokes(this.pokesString, 'Pwylls')
      
    },
    
    runCalcs(poke, move){
      return dmgCalculator.calc(poke, move)

    }
  }



}

</script>

<template>

  <textarea type="textarea" v-model="pokesString"></textarea>
  <button @click="importString()">Import</button>

  <li v-for="poke in pokes">
    <h3>{{ poke.name }}</h3>
    <li v-for="move in poke.moves">
      <h5>{{ poke.move }}</h5>
      {{ runCalcs(poke, move) }}
    </li>

  </li>

</template>

<style scoped></style>

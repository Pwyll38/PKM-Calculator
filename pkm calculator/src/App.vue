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
    
    runCalcs(poke){
      return dmgCalculator.calc(poke)

    }
  }



}

</script>

<template>

  <textarea type="textarea" v-model="pokesString"></textarea>
  <button @click="importString()">Import</button>

  <li v-for="poke in pokes">
    <h4>{{ poke.name }}</h4>
    <h2>{{ runCalcs(poke) }}</h2>

  </li>

</template>

<style scoped></style>

<script>

import importPokesController from './Controller/importPoke'
import dmgCalculator from './Controller/dmgCalculator';
import { ref } from "vue";

export default {

  name: 'main screen',

  setup() {
    const pokesString = ref('')
    const enemiesString = ref('')
    const pokes = ref([])
    const enemyPokes = ref([])


    return {
      pokesString,
      pokes,
      enemyPokes,
      enemiesString,
    }
  },

  methods: {
    async importString() {

      this.pokes = importPokesController.importPokes(this.pokesString, 'Pwylls')

    },

    async importEnemies() {

      this.enemyPokes = importPokesController.importPokes(this.pokesString, 'Pwylls')

    },

    runCalcs(poke, enemy, move) {
      return dmgCalculator.calc(poke, enemy, move)

    }
  }



}

</script>

<template>

  <textarea type="textarea" v-model="pokesString"></textarea>
  <button @click="importString()">Import</button>

  <textarea type="textarea" v-model="enemiesString"></textarea>
  <button @click="importEnemies()">Import enemies</button>

  <li v-for="poke in pokes">
    <h3>{{ poke.name }}</h3>
    <li v-for="move in poke.moves">
    <h4>Move: {{ move }}</h4>
      <li v-for="enemy in enemyPokes">
        <h6>VS {{ enemy.name }}</h6>
      {{ runCalcs(poke, enemy, move) }}
      </li>
    </li>

  </li>

</template>

<style scoped></style>

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
      enemiesString
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

    },

    buildTableHeaders() {

      var headers =
        [
          {
            text: "MOVE", value: "move"
          }
        ]

      this.enemyPokes.forEach(enemy => {

        headers.push({
          text: enemy.name, value: enemy.name
        })

      });

      return headers
    },

    buildTableItems(poke) {
      var items = []

      poke.moves.forEach(move => {
        items.push(
          {
            move: move
          }
        )
      });

      items.forEach(item => {
        this.enemyPokes.forEach(enemy => {
          item[enemy.name] = this.runCalcs(poke, enemy, item.move)
        });
      });




      return items

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
    {{ poke.name }}

    <EasyDataTable :headers="buildTableHeaders()" :items="buildTableItems(poke)" />

  </li>

</template>

<style scoped></style>

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

    const conditions = ref({})

    return {
      pokesString,
      pokes,
      enemyPokes,
      enemiesString,
      conditions
    }
  },

  methods: {
    async importString() {

      this.pokes = importPokesController.importPokes(this.pokesString, 'Pwylls')

    },

    async importEnemies() {

      this.enemyPokes = importPokesController.importPokes(this.pokesString, 'Pwylls')

    },

    runCalcs(poke, enemy, move, conditions) {
      return dmgCalculator.calc(poke, enemy, move, conditions)

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
          item[enemy.name] = this.runCalcs(poke, enemy, item.move, this.conditions)
        });
      });

      return items

    }
  }



}

</script>

<template>

  <input type="checkbox" @click="this.conditions['weather']?this.conditions['weather'] = '':this.conditions['weather'] = 'Sun'">Sun</input>
  <input type="checkbox" @click="this.conditions['weather']?this.conditions['weather'] = '':this.conditions['weather'] = 'Rain'">Rain</input>
  <input type="checkbox" @click="this.conditions['terrain']?this.conditions['terrain'] = '':this.conditions['terrain'] = 'Electric'">Electric terrain</input>
  <input type="checkbox" @click="this.conditions['offensiveTera']?this.conditions['offensiveTera'] = '':this.conditions['offensiveTera'] = 'Y'">Tera</input>

  <textarea type="textarea" v-model="pokesString"></textarea>
  <button @click="importString()">Import friendlies</button>

  <textarea type="textarea" v-model="enemiesString"></textarea>
  <button @click="importEnemies()">Import enemies</button>


  <li v-for="poke in pokes">
    <h2>{{ poke.name }}</h2>

    <EasyDataTable :headers="buildTableHeaders()" :items="buildTableItems(poke)" />

  </li>

</template>

<style scoped></style>

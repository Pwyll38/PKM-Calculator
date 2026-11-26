<script>

import pokesController from './Controller/importPoke'
import dmgCalculator from './Controller/dmgCalculator';
import dataScaper from './Controller/dataScraper';
import pokedexController from './Controller/pokedexController';

import { ref } from "vue";

export default {

  name: 'main screen',

  setup() {
    const pokesString = ref('')
    const enemiesString = ref('')
    const pokes = ref([])
    const enemyPokes = ref([])
    const pokeData = ref()
    const teamHistory = ref(JSON.parse(localStorage.getItem('friendlyTeamsHistory')))

    const conditions = ref({})

    return {
      pokesString,
      pokes,
      enemyPokes,
      enemiesString,
      conditions,
      pokeData,
      teamHistory,
    }
  },

  methods: {

    getPkmImage(name) {

      //return 'https://img.pokemondb.net/sprites/home/normal/'+name.toLowerCase()+'.png'

      return 'https://play.pokemonshowdown.com/sprites/dex/' + name.toLowerCase() + '.png'

    },

    async importAPIData() {

      var pokeData;

      if (localStorage.getItem('UsageData') === null) {
        var pokeData = await dataScaper.getUsageData()

        localStorage.setItem('UsageData', JSON.stringify(pokeData));

        console.log('Saving usageData to local storage');

      } else {
        poke = localStorage.getItem('UsageData')
      }

      this.pokeData = pokeData

    },

    async importString() {

      var friendlyTeam = pokesController.importPokes(this.pokesString, 'Pwylls')

      if(this.teamHistory === null){
        console.log("Team history is null");

        this.teamHistory = []
        
        this.teamHistory[0] = friendlyTeam
        localStorage.setItem('friendlyTeamsHistory', JSON.stringify(this.teamHistory))
      }else{
        console.log(this.teamHistory);

        this.teamHistory.push(friendlyTeam)
        
        localStorage.setItem('friendlyTeamsHistory', JSON.stringify(this.teamHistory));
      }


      this.pokes = friendlyTeam

    },

    async importEnemies() {

      this.enemyPokes = this.enemyPokes.concat(pokesController.importPokes(this.enemiesString, 'Pwylls'))

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

      items.push({
        move: 'Speed Tiers'
      })

      poke.moves.forEach(move => {
        items.push(
          {
            move: move
          }
        )
      });

      items.forEach(item => {
        this.enemyPokes.forEach(enemy => {

          if (item.move == 'Speed Tiers') {
            item[enemy.name] = dmgCalculator.calcSpeed(poke, enemy, item.move, this.conditions)
          } else {
            item[enemy.name] = dmgCalculator.calc(poke, enemy, item.move, this.conditions)
          }
        });
      });

      return items

    }
  }



}

</script>

<template>


  <div>
    <button @click="importAPIData()">Import API</button>
  </div>


  <div>Select team</div>
  <li>
    <ul v-for="(team, index) in teamHistory">
      <button @click="this.pokes = teamHistory">
        <img v-for="(teammember, index) in team" :src="getPkmImage(teammember.name)" alt="">
      </button>
    </ul>
  </li>

  <div>
    <textarea type="textarea" v-model="pokesString"></textarea>
    <button @click="importString()">Import friendlies</button>
  </div>

  <div v-if="pokes.length > 0">
    <textarea type="textarea" v-model="enemiesString"></textarea>
    <button @click="importEnemies()">Import enemies</button>
  </div>

  <div v-if="enemyPokes.length > 0">
    <input type="checkbox"
      @click="this.conditions['weather'] ? this.conditions['weather'] = '' : this.conditions['weather'] = 'Sun'">Sun</input>
    <input type="checkbox"
      @click="this.conditions['weather'] ? this.conditions['weather'] = '' : this.conditions['weather'] = 'Rain'">Rain</input>
    <input type="checkbox"
      @click="this.conditions['terrain'] ? this.conditions['terrain'] = '' : this.conditions['terrain'] = 'Electric'">Electric
    terrain</input>
    <input type="checkbox"
      @click="this.conditions['offensiveTera'] ? this.conditions['offensiveTera'] = '' : this.conditions['offensiveTera'] = 'Y'">Tera</input>
  </div>

  <li v-for="poke in pokes">
    <h2>{{ poke.name }}</h2>

    <EasyDataTable :headers="buildTableHeaders()" :items="buildTableItems(poke)" alternating border-cell />

  </li>

</template>

<style scoped></style>

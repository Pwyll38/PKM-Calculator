<script>

import pokesController from '../../Controller/importPoke'
import dmgCalculator from '../../Controller/dmgCalculator';
import dataScaper from '../../Controller/dataScraper';

import { SidebarMenu } from 'vue-sidebar-menu'
import 'vue-sidebar-menu/dist/vue-sidebar-menu.css'

import { ref, toHandlers } from "vue";
import PokemonDisplay from '../reusables/PokemonDisplay.vue';

export default {

    components: {
        SidebarMenu,
    },

    name: 'Home Screen',

    beforeMount() {
        this.buildSidebarMenu()
    },

    setup() {
        const pokesString = ref('')
        const enemiesString = ref('')
        const pokes = ref([])
        const enemyPokes = ref([])
        const pokeData = ref()
        const teamHistory = ref(JSON.parse(localStorage.getItem('friendlyTeamsHistory')))

        const conditions = ref({})

        const sidebarMenu = ref([{

            header: 'Teams',
            hiddenOnCollapse: 'true',

        }])

        return {
            pokesString,
            pokes,
            enemyPokes,
            enemiesString,
            conditions,
            pokeData,
            teamHistory,
            sidebarMenu,
        }
    },



    methods: {

        buildSidebarMenu() {

            this.teamHistory.forEach(team => {

                if (team != null) {

                    var childMenu = []

                    team.forEach(poke => {
                        childMenu.push(
                            {
                                title: poke.name,
                                href: '/poke?poke='+poke.name,
                                icon: {
                                    element: 'img',
                                    class: 'pokemon-sidebar-icon',
                                    attributes: {
                                        src: this.getPkmImage(poke.name),
                                        alt: poke.name
                                    }
                                },
                            }
                        )
                    });

                    this.sidebarMenu.push(
                        {
                            title: team[0].name + " Team",
                            child: childMenu,
                            href: '/team?team='+team[0].name + "Team",
                            icon: {
                                element: 'img',
                                class: 'pokemon-sidebar-icon',
                                attributes: {
                                    src: this.getPkmImage(team[0].name),
                                    alt: team[0].name
                                }
                            },
                        }
                    )
                }


            });

            return this.sidebarMenu



        },

        getPkmImage(name) {

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

            if (this.teamHistory === null) {
                console.log("Team history is null");

                this.teamHistory = []

                this.teamHistory[0] = friendlyTeam
                localStorage.setItem('friendlyTeamsHistory', JSON.stringify(this.teamHistory))
            } else {
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



    <sidebar-menu showChild=true :menu="this.sidebarMenu" />


    <div>
        <button @click="importAPIData()">Import API</button>
    </div>


    <div>Select team</div>
    <li>
        <ul v-for="(team, index) in teamHistory">
            <button @click="this.pokes = team">
                <img v-for="(teammember, index) in team" :src="getPkmImage(teammember.name)" alt=""
                    onerror="this.onerror = null;this.src = 'https://play.pokemonshowdown.com/sprites/dex/ababo.png'">
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

        <PokemonDisplay :pokemon=poke></PokemonDisplay>

        <EasyDataTable :headers="buildTableHeaders()" :items="buildTableItems(poke)" alternating border-cell />

    </li>

</template>

<style scoped></style>

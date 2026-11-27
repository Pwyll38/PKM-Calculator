<script>
export default {
    name: "PokemonDisplay",

    props: {
        pokemon:
        {
            default:
            {
                'name': 'ditto'

            }
        }
    },

    methods: {

        getPkmImage(name) {

            return 'https://play.pokemonshowdown.com/sprites/dex/' + name.toLowerCase() + '.png'

        },



    }

}
</script>

<template>
    <div class=container>
        <img :src="getPkmImage(pokemon.name)" alt="">

        <h2>{{ pokemon.name }}</h2>

        <p>
            Types: {{pokemon.types}}
            Base stats {{ pokemon.bs }}
            Abilities {{ pokemon.abilities }}
        </p>
    </div>
</template>

<style scoped></style>
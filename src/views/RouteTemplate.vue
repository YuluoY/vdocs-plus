<template>
    <div class="routeTemplate">
        <!--        <div class="img-wrapper">-->
        <!--            <span class="title">{{ nav.filter(item => item.href === `/${resource}`)[0].title }}</span>-->
        <!--            <img src="../assets/img/hudieren.jpg" class="img"/>-->
        <!--        </div>-->
        <div>
            <component
                    v-for="(c, i) in nav" :key="i"
                    :is="require(`@/views/${c.label}`).default"
                    v-if=" c.href === `/${resource}`">
                <div v-if="c.children">
                    <router-view></router-view>
                </div>
            </component>
        </div>
    </div>
</template>

<script>
    import {mapState} from "vuex";

    export default {
        name: "RouteTemplate",
        props: {
            resource: String
        },
        data() {
            return {}
        },
        methods: {},
        computed: mapState({
            nav: state => state.app.header.nav,
        }),
        mounted() {
            console.log(this.$route);
        }

    }
</script>

<style scoped lang="scss">
  .img-wrapper {
    position: relative;

    .title {
      position: absolute;
      font-size: 3em;
      top: 50%;
      left: 43%;
      z-index: 999;
    }

    .img {
      width: 100%;
      height: 60vh;
      filter: blur(4px);
      backdrop-filter: blur(100px);
    }
  }

</style>
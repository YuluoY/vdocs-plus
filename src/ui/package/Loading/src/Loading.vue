<template>
    <transition name="fade">
        <div class="h-loading"
             ref="loading"
             v-if="visible"
             :style="style">
            <div>{{ text }}</div>
        </div>
    </transition>
</template>

<script>
    export default {
        name: "Loading",
        props: {
            text: {type: String},
            background: {type: String},
            visible: {type: Boolean},
            dom: {type: HTMLElement},
            borderRadius: {type: String, default: () => 'unset'}
        },
        computed: {
            style() {
                return {
                    background: this.background,
                    'border-radius': this.borderRadius
                }

            }
        },
        mounted() {

        }
    }
</script>

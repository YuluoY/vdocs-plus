<template>
    <transition>
        <transition appear :name='animateName'>
            <div class='h-notification' :style="style" v-on="$listeners" v-if="!!id">
                <div class="box">
                    <svg-icon :icon-class="type" class-name="svg-tips"></svg-icon>
                    <div class="content">{{ text }}</div>
                </div>
                <svg-icon icon-class="quit" class-name="svg-quit"
                          @click="cancel" v-if="!isAutomaticExit"></svg-icon>
            </div>
        </transition>
    </transition>
</template>

<script>

    export default {
        name: "Notification",
        props: {
            text: {type: String, default: () => '', require: true},
            type: String,
            color: String,
            duration: Number,
            direction: String,
            background: String,
            verticalGap: {type: Number, default: () => 0},
            isAutomaticExit: Boolean,
        },
        data() {
            return {
                backgroundMapping: new Map([
                    ['info', 'rgba(96,96,96,0.4)'],
                    ['success', 'rgba(67,176,52,0.4)'],
                    ['error', 'rgba(253,107,109,0.4)'],
                    ['warning', 'rgba(250,196,88,0.4)'],
                ]),
            }
        },
        methods: {
            cancel() {
                this.$set(this, 'id', false)
                this.$forceUpdate()
            },
            autoExit() {
                setTimeout(_ => {
                    this.$set(this, 'id', false)
                    this.$forceUpdate()
                }, this.duration * 1000)
            }
        },
        computed: {
            style() {
                return {
                    // [this.direction]: '0',
                    right: 0,
                    "margin-top": `${this.verticalGap}px`,
                    background: this.background ?? this.backgroundMapping.get(this.type),
                }
            },
            animateName: () => `fade-right`
        },
        mounted() {
            this.isAutomaticExit && this.autoExit();
        }
    }
</script>

<style scoped lang="scss">



</style>
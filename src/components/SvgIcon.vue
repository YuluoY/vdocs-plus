<template>
    <div style="display: inline-block">
        <svg :class="svgClass" v-on="$listeners">
            <use :xlink:href="iconName"></use>
        </svg>
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: "SvgIcon",
        props: {
            iconClass: {type: String, require: true},
            className: {type: String, default: () => ''},
            form: {type: String, default: ''},
        },
        computed: {
            iconName() {
                return `#icon-${this.iconClass}`
            },
            svgClass() {
                if (!!this.className) {
                    return 'svg-icon ' + this.className;
                }
                return 'svg-icon';
            }
        }
    }
</script>

<style scoped>
    .svg-icon {
        width: 1em;
        height: 1em;
        vertical-align: -0.15em;
        fill: currentColor;
        overflow: hidden;

    }
    .swing{
        animation: swing .3s ease-in-out;
    }
    @keyframes swing {
        from{
            transform: translateX(-50px);
        }
        to{
            transform: translateX(50px);
        }
    }
</style>
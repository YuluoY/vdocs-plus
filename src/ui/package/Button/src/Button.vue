<template>
    <button class="h-btn forbid-select-text" ref="btn"

            :disabled="disabled">
        <slot></slot>
    </button>
</template>

<script type="text/babel">
    const {dom} = $hUtils;
    export default {
        name: "HButton",
        props: {
            type: {type: String, default: ''},
            size: {type: String, default: 'default'},
            radius: {type: String, default: 'plain'},
            disabled: {type: Boolean, default: false},
        },
        methods: {
            init() {
                if (this.disabled) dom.addClass(this.$refs.btn, 'h-disabled');
                dom.addClass(this.$refs.btn, `bg-${this.type}`)
                    .addClass(this.$refs.btn, `fs-${this.size}`)
                    .addClass(this.$refs.btn, `borRadius-${this.radius}`)
            }
        },

        mounted() {
            this.init();
        }
    }
</script>
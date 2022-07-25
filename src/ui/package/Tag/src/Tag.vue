<template>
    <div :class='tagClass' ref="tag" :title="title">
        <a v-if="href[0] !== '/'" :href="href" target="_blank">
            <div class="tag">
                <span :class="'iconfont icon-'+iconType"></span>
                <span>{{ text }}<span v-if="num">（{{ num }}）</span></span>
            </div>
        </a>
        <router-link v-else
                     exact
                     :to="href"
                     :tag="tag"
                     target="_self">
            <div class="tag">
                <span :class="'iconfont icon-'+iconType"></span>
                <span>{{ text }}<span v-if="num">（{{ num }}）</span></span>
            </div>
        </router-link>
    </div>
</template>

<script>
    const {dom} = $hUtils;
    export default {
        name: "HTag",
        props: {
            text: {type: String},
            type: {type: String, default: 'primary'},
            num: {type: Number, default: 0},
            isShowIcon: {type: Boolean, default: false},
            hollow: {type: Boolean, default: false},
            radius: {type: String, default: 'default'},
            href: {type: String},
            tag: {type: String, default: () => 'a'},
            iconType: {type: String, default: () => 'biaoqian1'},
            title: {type: String}
        },
        computed: {
            tagClass() {
                let typeArr = ['info', 'danger', 'success', 'primary', 'warning', 'base'];
                let baseClassName = `h-tag${this.hollow ? '-hollow' : ''}`;
                let baseBgClassName = `bg-primary${this.hollow ? '-hollow' : ''}`;
                const forbidSelectText = 'forbid-select-text';
                if (typeArr.includes(this.type)) baseBgClassName = `bg-${this.type}${this.hollow ? '-hollow' : ''}`;
                return `${baseClassName} ${baseBgClassName} ${forbidSelectText}`;
            }
        },
        mounted() {
            dom.addClass(this.$refs.tag, `borRadius-${this.radius}`);
        }

    }
</script>

<style scoped>
    a {
        color: white;
    }
</style>
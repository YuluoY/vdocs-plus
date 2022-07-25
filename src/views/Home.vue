<template>
    <div class="home">
        <h-container>
            <h-section>
                <template #h-drop>
                    <h-drop></h-drop>
                </template>
            </h-section>
            <h-main>
                <template #h-sidebar>
                    <h-sidebar></h-sidebar>
                </template>
                <template #h-content>
                    <h-content></h-content>
                </template>
                <template #h-footer>
                    <h-footer></h-footer>
                </template>
            </h-main>
        </h-container>
    </div>
</template>

<script>
    // @ is an alias to /src

    import hHeader from '@/components/h-header'
    import HContainer from "@/components/h-container";
    import HSection from "@/components/h-section";
    import HMain from "@/components/h-main";
    import HDrop from "@/components/h-drop";
    import InfoCountWrapper from "@/components/InfoCountWrapper";
    import CategoryTagWrapper from "@/components/CategoryTagWrapper";
    import FriendLinksWrapper from "@/components/FriendLinksWrapper";
    import HContent from "@/components/h-content";
    import HFooter from "@/components/h-footer";
    import HSidebar from "@/components/h-sidebar";

    export default {
        name: 'Home',
        components: {
            HSidebar,
            HFooter,
            HContent,
            FriendLinksWrapper,
            CategoryTagWrapper, InfoCountWrapper, HDrop, HMain, HSection, HContainer, hHeader
        },

        computed: {},
        mounted() {

        }
    }
</script>

<style scoped lang="scss">

</style>

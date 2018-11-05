<template>
    <mu-toast v-show="visible" :message="message"/>
</template>
<script>
    import Vue from 'vue';
    import MuseUI from 'muse-ui'
    Vue.use(MuseUI)
    export default {
        data () {
            return {
                visible: true,
                message: ''
            }
        }
    }
</script>
<style lang="less" scoped>
    .mu-toast {
        text-align: center;
        @media only screen and (max-width: 500px) {
            width: 75%;
            left: 50%;
            bottom: 20px;
            transform: translate(-50%, 0);
        }
    }
</style>


<template>
    <div>
        <div @click="show = !show">dashboard main page</div> 
    </div>
</template>
<script>
    export default {
        data() {
            return {
                show: false
            }
        },
        methods: {
            changeTab (tabIndex) {
                this.tabIndex = tabIndex;
            }
        }
    }
</script>
<style lang="less" scoped>

</style>

<template>
    <div>
        <mu-dialog :open="show" :title="title">
            {{content}}
            <mu-flat-button slot="actions" @click="cancelAction" primary label="取消"/>
            <mu-flat-button slot="actions" @click="confirmAction" primary label="确定"/>
        </mu-dialog>
        <ul>
            <li v-for="item in array" :key="item">{{item}}{{title}}</li>
        </ul>
        <p v-text="title"></p>
        <p>sdfds</p>
    </div>
</template>
<script>
    export default {
        data () {
            return {
                show: false,
                title: '提示',
                content: '你确定要执行本次操作吗？',
                array: [1, 2, 3, 4, 5]
            }
        },
        methods: {
            cancelAction () {
                this.show = false;
                this.cancel && this.cancel();
            },
            confirmAction () {
                this.show = false;
                this.confirm && this.confirm();
            }
        }
    }
</script>



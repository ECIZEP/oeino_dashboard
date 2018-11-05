<template>
    <div class="photos_wrapper">
        <h2>图片管理</h2>
        <ul class="album_list" ref="list">
            <li class="album_item" v-for="(item, index) in imagesInfo" :key="index">
                <img :src="item.src" alt="">
                <header>
                    <p class="album_time">2018-06-05</p>
                    <p class="album_name">京城组合会上海</p>
                </header>
            </li>
        </ul>
        <!-- <input type="file" name="photo" @change="fileUpload" />
        <img :src="picUrl" />
        <mu-raised-button label="添加分类" @click="posttest" labelPosition="after">
            <span class="icon-plus-circle icon_raised_button mu-icon"></span>
        </mu-raised-button> -->
    </div>
</template>
<script>
    import {
        getUploadToken,
        getList
    } from '../../api/photo';

    export default {
        data() {
            return {
                currentPic: null,
                uploadToken: null,
                picUrl: null,
                imagesUrl: [],
                imagesInfo: [],
                intervalTimer: null
            }
        },
        created() {
            getUploadToken().then(res => {
                if (res.data.code === 200) {
                    this.uploadToken = res.data.data;
                }
            });
        },
        mounted() {
            getList().then(res => {
                if (res.data.code === 200) {
                    res.data.message.forEach(url => {
                        let imageInfo = {
                            imageObject: new Image(),
                            loaded: false,
                            src: ''
                        }
                        imageInfo.imageObject.src = url;
                        if (imageInfo.imageObject.complete) {
                            imageInfo.loaded = true;
                        }
                        this.imagesInfo.push(imageInfo);
                    })
                }
                // 定时check，加速获取图片宽高
                this.intervalTimer = setInterval(() => {
                    this.imagesInfo.forEach(imageInfo => {
                        if (imageInfo.imageObject.width > 0 && !imageInfo.loaded) {
                            imageInfo.loaded = true;
                        }
                    })
                    if (this.imagesInfo.every(item => item.loaded)) {
                        // 处理瀑布流
                        this.waterCal();
                        this.imagesInfo.forEach(item => item.src = item.imageObject.src);
                        clearInterval(this.intervalTimer);
                        window.addEventListener('resize', this.waterCal.bind(this));
                    }
                }, 40)
            });

        },
        methods: {
            test(event) {
                console.log('load', event.target.height);
            },
            waterCal() {
                let wrapperWidth = this.$refs.list.clientWidth;
                let row = parseInt(wrapperWidth / 320);
                let itemWidth = (wrapperWidth - 40 * row) / row;
                let items = this.$refs.list.getElementsByClassName('album_item');
                let height = new Array(row);
                for (let i = 0; i < row; i++) {
                    height[i] = 0;
                }
                for (let index = 0; index < items.length; index++) {
                    items[index].style.width = itemWidth + 'px';
                    items[index].style.left = (itemWidth + 40) * (index % row) + 'px';
                    items[index].style.top = height[index % row] + 'px';
                    let clientHeight = this.imagesInfo[index].imageObject.height * itemWidth / this.imagesInfo[index].imageObject.width + 65;
                    height[index % row] += clientHeight + 40;
                }
            },
            posttest() {
                let observable = qiniu.upload(this.currentPic, this.currentPic.name, this.uploadToken, {
                    fname: this.currentPic.name,
                    mineType: ["image/png", "image/jpeg", "image/jpg"]
                }, {
                    region: qiniu.region.z0
                });
                let subscription = observable.subscribe({
                    next(res) {
                        console.log('loaded:' + res.total.loaded + ' ' + res.total.percent);
                    },
                    error(res) {
                        console.log(res);
                    },
                    complete(res) {
                        console.log('complete');
                        console.log(res);
                    }
                })
                /* let formData = new FormData();
                formData.append('cover', this.currentPic);
                http.post('/upload', formData).then(res => {
                    console.log(res);
                }) */
            },
            fileUpload(event) {
                this.currentPic = event.target.files[0];
                this.picUrl = window.URL.createObjectURL(this.currentPic);

                console.log(this.currentPic);
            }
        }
    }
</script>
<style lang="less" scoped>
    .photos_wrapper {
        h2 {
            font-size: 24px;
            margin-bottom: 30px;
        }

        .album_list {
            position: relative;

            .album_item {
                display: inline-block;
                position: absolute;
                background-color: white;
                border-radius: 7px;
                box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 15px 100px 0 rgba(0, 0, 75, 0.125);
                transition: box-shadow ease-out .5s, opacity linear .3s;
                transition-delay: .2s;

                &:hover {
                    box-shadow: 0 5px 12px rgba(0, 0, 0, 0.05), 0 15px 180px 0 rgba(0, 0, 50, 0.25);
                }

                img {
                    width: 100%;
                    border-radius: 7px 7px 0 0;
                }

                header {
                    padding: 10px 15px;
                    text-align: center;

                    .album_time {
                        font-size: 14px;
                    }

                    .album_name {
                        color: #232326;
                        font-weight: bold;
                    }
                }
            }
        }
    }
</style>

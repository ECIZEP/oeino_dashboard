<template>
    <div class="app">
        <h1 class="login_title">Argentina</h1>
        <!-- <section class="float_card login_card">
            <div class="three_one"></div>
            <p class="login_text">{{username ? username.toUpperCase() : 'Hey'}}, Welcome To Login</p>
            <mu-text-field label="账号" v-model="username" type="text" :label-float="true"></mu-text-field>
            <mu-text-field label="密码" v-model="password" type="password" :label-float="true"></mu-text-field> 
            <div class="login_button">
                <mu-raised-button label="注册" class="demo-raised-button"/>
                <mu-raised-button label="登录" class="demo-raised-button" primary @click="login"/>
            </div>
        </section> -->
        <div class="third-part" @click="oauth2login">
            <div class="btn-go btn-github" data-platform="github">
                <i class="social-github" data-platform="github"></i>
                Sign In with Github
            </div>
            <div class="btn-go btn-google" data-platform="google">
                <i class="social-google" data-platform="google"></i>
                Sign In with Google
            </div>
        </div>
    </div>
</template>

<script>
    import {
        login
    } from '../../api/user'

    export default {
        data() {
            return {
                username: '',
                password: ''
            }
        },
        created() {
        },
        methods: {
            oauth2login(event) {
                const platform = event.target.dataset.platform;
                window.location.href = `//oeino.cn/oauth2/signin?platform=${platform}&returnUrl=${encodeURIComponent(this.$route.query.returnUrl)}`;
            }
        }
    }
</script>·

<style lang="less" scoped>
    .app {
        background: url('../../assets/images/photo-1508167396118-bf93d72130df.jpeg') no-repeat left top;
        background-size: cover;

        .login_title {
            color: white;
            font-size: 90px;
            text-align: center;
            padding-top: 100px;
        }
    }

    .float_card {
        margin: 0 auto;
        border-radius: 10px;
        box-shadow: 0 2px 2px rgba(0, 0, 0, 0.05), 0 15px 100px 0 rgba(0, 0, 75, 0.125);
        transition: box-shadow ease-out .5s, opacity linear .3s;
        transition-delay: .2s;

        &:hover {
            box-shadow: 0 5px 12px rgba(0, 0, 0, 0.05), 0 15px 180px 0 rgba(0, 0, 50, 0.25);
            opacity: 1;
        }
    }

    .login_card {
        position: absolute;
        z-index: 2;
        top: 200px;
        left: 50%;
        transform: translate(-50%, 0);
        width: 350px;
        height: 480px;
        background-color: white;
        text-align: center;

        .three_one {
            height: 125px;
            border-radius: 10px 10px 0 0;
            background: linear-gradient(135deg, #dfa36e 0%, #ea8783 50%, #db8869 55%, #da817c 100%);
            margin-bottom: 70px;
        }

        .login_text {
            margin-bottom: 20px;
        }

        .login_button {
            margin-top: 20px;
            display: flex;
            justify-content: space-around;
        }
    }
    .third-part {
        text-align: center;
        .btn-go {
            position: relative;
            font-size: 16px;
            color: #fff;
            cursor: pointer;
            border-radius: 2px;
            font-weight: 300;
            height: 44px;
            width: 300px;
            display: inline-block;
            letter-spacing: 0;
            line-height: 44px;
            margin-bottom: 12px;
            margin-right: 5px;
            text-align: center;
            background-color: #666;

            i {
                position: absolute;
                top: 12px;
                left: 13px;
                display: inline-block;
                width: 20px;
                height: 20px;
                
                &.social-github {
                    background: url('../../assets/images/github.png') left top no-repeat;
                    background-size: cover;
                }

                &.social-google {
                    background: url('../../assets/images/google.png') left top no-repeat;
                    background-size: cover;
                }
            }
        }
    }

.third-part .btn-github {
    background-color: #333333!important;
    color: #fff
}

.third-part .btn-github:hover {
    background-color: #333333;
    opacity: .7
}

.third-part .btn-google {
    background-color: #0084ff!important;
    color: #fff
}

.third-part .btn-google:hover {
    background-color: #0084ff;
    opacity: .7
}
</style>

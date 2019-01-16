<template>
    <div class="personal-center">
        <div class="breadcrumbs">测试个人中心 > {{name}}</div>
        <div class="personal-content">
            <div class="leftBar">
                <plug-sidebar :menu-list="leftBarList" prop-path="/center"></plug-sidebar>
            </div>
            <div class="rightContent">
                <router-view/>
            </div>
        </div>
    </div>
</template>

<script>
    import PlugSidebar from './plug-sidebar'
    export default {
        components: {
            PlugSidebar,
        },
        data() {
            return {
                leftBarList: [
                    {name: '账户概况', path: ['/center']},
                    {name: '我的账户', path: ['/center/account','/center/account/finance']},
                    {name: '我的云算力', path: ['/center/hash','/center/hash/detail','/center/hash/repertory']},
                    {name: '量化收益', path: ['/center/income']},
                    {name: '邀请列表', path: ['/center/invite','/center/invite/detail']},
                    {name: '资料修改', path: ['/center/profile']}
                ],
                activeBarIndex: 0,
                name: this.$route.name
            }
        },
        watch: {
          '$route'(to, from) {
            this.name = to.name;
          }
        }
    }
</script>

<style scoped lang="scss">
    @import "../../static/css/public.scss";

    .personal-center {
        width: 100%;
        min-width: 1200px;
        background: #F5F6FA;
        .header {
            width: 100%;
            height: 82px;
            background: #010424;
        }
        .footer {
            width: 100%;
            height: 176px;
            background: #010424;
        }
        .breadcrumbs {
            width: 1200px;
            margin: 12px auto;
            height: 16px;
            text-align: left;
            line-height: 16px;
            font-size: 12px;
            color: #9B9B9B;
        }
        .personal-content {
            width: 1200px;
            margin: 0 auto 50px;
            @include clearfix;
            .leftBar {
                float: left;
                width: 160px;
                height: 460px;
                background: #fff;
                border-radius: 4px;
                overflow: hidden;
            }
            .rightContent {
                float: right;
                width: 1030px;
                min-height: 730px;
                height: auto;
                overflow: hidden;
                border-radius: 4px;
                background: #fff;
            }
        }
    }
</style>
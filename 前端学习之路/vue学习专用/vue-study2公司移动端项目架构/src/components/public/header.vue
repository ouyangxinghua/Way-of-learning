<template>
    <div class="base-header">
        <div @click="goBack" class="base-header-left">
            <span><i class="arrow"></i> 返回</span>
        </div>
        <h3 class="base-header-title">{{ title }}</h3>
        <div class="base-header-right">
            <slot name="right"></slot>
        </div>
    </div>
</template>

<script>
export default {
    name: 'base-header',
    data () {
        return {}
    },
    props: {
        title: {
            type: String,
            required: true
        }
    },
    methods: {
        goBack () {
            console.log('====')
            this.$emit('back');
        }
    }
}
</script>

<style lang="scss">
.base-header {
    position: fixed;
    top: 0;
    left: 0;
    display: block;
    box-sizing: border-box;
    width: 100%;
    height: px2rem(88px);
    line-height: px2rem(88px);
    text-align: center;
    border-bottom: 1px solid #dddddd;
    z-index: 99;
    &-title {
        float: left;
        width: 60%;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        font-size: px2rem(36px);
        color: #000;
    }
    &-left, &-right {
        float: left;
        width: 20%;
        font-size: px2rem(34px);
        color: #333;
    }
    // css3 箭头 start
    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: px2rem(14px);
        height: px2rem(14px);
        border-left: 1px solid #000;
        border-bottom: 1px solid #000;
        transform: rotate(45deg);
    }

}

</style>

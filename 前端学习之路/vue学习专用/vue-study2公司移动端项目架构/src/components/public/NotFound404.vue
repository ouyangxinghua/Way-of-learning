<template>
    <div class="container">
        <div class="not-found"></div>
    </div>
</template>

<script>
export default {
    name: 'NotFound404',
    data () {
        return {}
    },
    created () {},
    methods: {}
}
</script>

<style lang="scss" scoped>
.container {
    width: 100%;
    height: 100%;
}
.not-found {
    width: 100%;
    height: px2rem(690px);
    background-image: url('../../assets/images/error.png');
    background-repeat: no-repeat;
    background-size: auto;
    background-position: center;
}
</style>

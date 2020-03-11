<template>
  <div class="look">{{message}}
    <p>{{$route.params.name}}</p>
  </div>
</template>

<script>
export default {
  name: 'lookOne',
  data () {
    return {
      message: '你瞅啥！'
    }
  }
}
</script>

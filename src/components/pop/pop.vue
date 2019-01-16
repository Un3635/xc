<template>
    <div class="pop" v-if="popShow">
      <p>{{popText}}</p>
    </div>
</template>

<script>
  import {mapGetters} from 'vuex'
  export default {
    computed:{
      ...mapGetters({
        popShow:'popShow',
        popText:'popText'
      })
    }
  }
</script>

<style scoped lang="scss">
.pop{
  position:absolute;
  top:100px;
  left:50%;
  transform:translateX(-50%);
  padding:20px 20px;
  border-radius:8px;
  background:rgba(0,0,0,0.65);
  text-align:center;
  transition:0.3s all ease-in;
  p{
    font-size:16px;
    color:#fff;
    line-height:30px;
  }
}
@media screen and (max-width: 918px) {
  .pop{
    position:absolute;
    top:1rem;
    padding:0.2rem 0.2rem;
    border-radius:0.08rem;
    p{
      font-size:0.16rem;
      line-height:0.3rem;
    }
  }
}
</style>

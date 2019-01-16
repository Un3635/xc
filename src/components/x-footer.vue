<template>
  <div class="footer">
    <p>© Thunder Kungfu Academy 49430 Grimmer Blvd, Fremont, CA 94538</p>
  </div>
</template>

<script>
  export default {
    name: 'XFooter',
    data () {
      return {}
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
 .footer{
   width:100%;
   min-width:1200px;
   height:50px;
   background:#910e00;
   text-align:center;
   p{
     font-size:14px;
     line-height:50px;
     color:#eee;
     font-weight:200;
     font-family: DINNextW01Light;
   }
 }
 @media screen and (max-width: 918px) {
   .footer{
     width:100%;
     min-width:12rem;
     height:0.5rem;
     background:#910e00;
     text-align:center;
     p{
       font-size:0.14rem;
       line-height:0.5rem;
       color:#eee;
       font-weight:200;
       font-family: DINNextW01Light;
     }
   }
 }
</style>

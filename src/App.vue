<template>
  <div id="app">
    <img alt="Vue logo" src="./assets/b.jpg">
    <Startpage/>
   
  </div>
</template>

<script>
import Startpage from './views/Startpage.vue'


export default {
  name: 'App',
  components: {
    Startpage,
    
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}

</style>
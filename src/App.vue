<script setup>
// import HelloWorld from './components/HelloWorld.vue'
// import TheWelcome from './components/TheWelcome.vue'

// import { ref, onMounted, onUnmounted } from 'vue';

// const isScrolled = ref(false);

// const handleScroll = () => {
// isScrolled.value = window.scrollY > 50; // Cambia el valor según el umbral deseado
// };

// onMounted(() => {
//     window.addEventListener('scroll', handleScroll);
// });

// onUnmounted(() => {
//     window.removeEventListener('scroll', handleScroll);
// });


</script>

<template>
  <!-- <header>
    <div style="width: 100%; height: 5vh;  background: white; " >
      <div style="height: 5vh; margin-bottom:6px; background: #024a71;     position: fixed; display: flex;     justify-content: center;align-items: center;     z-index: 99; " class="bg-[#024a71] w-full h-[1vh] " >
          <h1 style="    font-size: 18px; font-weight: 600; font-family: none;" class="text-white font-bold text-2xl my-2 clsstt-3" :class="{ 'opacity-0 scale-75': !isScrolled, 'opacity-100 scale-100': isScrolled }">luxe reserve</h1>

      </div>
    </div>
  </header> -->
  <div id="app" class="clsstrr-1" >

    <router-view />

  </div>
</template>


<style scoped>

.clsstrr-1 {
  width: 100%!important;
  /* height: 95vh!important; */
  padding: 0px!important;
  background-color: white!important;
  background: white!important;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  /* margin-top: 60px; */
}

</style>

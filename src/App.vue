<script setup>
import { RouterView } from 'vue-router'
import Header from './components/Header.vue'
import Footer from './components/Footer.vue'
</script>

<template>
  <div class="min-h-screen bg-white flex flex-col">
    <Header />
    <main class="flex-grow">
      <RouterView />
    </main>
    <Footer />
  </div>
</template>

<style>
/* Global styles if needed */
</style>
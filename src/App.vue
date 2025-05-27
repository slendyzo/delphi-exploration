<template>
  <div class="app-container">
    <AppHeader /> <!-- Use the AppHeader component -->
    <router-view />
  </div>
</template>

<script setup>
import AppHeader from './components/AppHeader.vue'; // Import the component
</script>

<style>
/* Your .app-container style is already in global.css */
</style>
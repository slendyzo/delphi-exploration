<template>
  <header class="app-header">
    <button class="mobile-nav-toggle" aria-label="Toggle navigation" :aria-expanded="isMobileNavOpen.toString()" @click="toggleMobileNav">
      <font-awesome-icon :icon="['fas', 'bars']" />
    </button>
    <div class="logo-container">
      <!-- Use the imported logoUrl -->
      <img :src="logoUrl" alt="Logo" class="header-logo">
    </div>
    <nav :class="['main-nav', { active: isMobileNavOpen }]">
      <router-link to="/" class="nav-link nav-link-home non-clickable" @click.prevent>Home</router-link>
      <router-link to="/" class="nav-link" @click="closeMobileNav">Shill</router-link>
      <router-link to="/feature-one" class="nav-link" @click="closeMobileNav">Feature TBA 1</router-link>
      <router-link to="/feature-two" class="nav-link" @click="closeMobileNav">Feature TBA 2</router-link>
      
      <a href="#" class="nav-link mobile-only nav-link-login" @click.prevent="handleMobileLogin">Login</a>
      <a href="#" class="nav-link mobile-only nav-link-signup btn btn-primary" @click.prevent="handleMobileSignup">Sign Up</a>
    </nav>
    <div class="header-actions">
      <button class="search-toggle-mobile" aria-label="Toggle search" @click="toggleMobileSearch">
        <font-awesome-icon :icon="['fas', 'search']" />
      </button>
      <div :class="['search-bar', { active: isMobileSearchOpen }]">
        <font-awesome-icon :icon="['fas', 'search']" class="desktop-search-icon" />
        <input type="text" placeholder="Search" class="desktop-search-input">
      </div>
      <button class="btn btn-login desktop-only-btn">Login</button>
      <button class="btn btn-primary btn-signup desktop-only-btn">Sign Up</button>
    </div>
    <div v-if="isMobileNavOpen" class="overlay mobile-nav-active" @click="closeMobileNav"></div>
  </header>
</template>

<script setup>
import { ref } from 'vue';
// RouterLink is automatically available if vue-router is installed and used
// import { RouterLink } from 'vue-router'; 
import logoUrl from '@/assets/Logo.svg'; // Import the logo

const isMobileNavOpen = ref(false);
const isMobileSearchOpen = ref(false); 

const toggleMobileNav = () => {
  isMobileNavOpen.value = !isMobileNavOpen.value;
  if (isMobileNavOpen.value) {
    document.body.style.overflow = 'hidden';
  } else {
    document.body.style.overflow = '';
  }
};

const closeMobileNav = () => {
  isMobileNavOpen.value = false;
  document.body.style.overflow = '';
};

const toggleMobileSearch = () => {
  isMobileSearchOpen.value = !isMobileSearchOpen.value;
  console.log("Mobile search toggled:", isMobileSearchOpen.value);
};

const handleMobileLogin = () => {
  console.log("Mobile login clicked");
  closeMobileNav();
};

const handleMobileSignup = () => {
  console.log("Mobile signup clicked");
  closeMobileNav();
};
</script>

<style scoped>
.main-nav .nav-link.router-link-active,
.main-nav .nav-link.router-link-exact-active {
  color: #ffffff;
  font-weight: 700;
}
.overlay.mobile-nav-active {
    display: block; 
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.6);
    z-index: 1040; 
}
</style>
<template>
    <header class="app-header">
      <button class="mobile-nav-toggle" aria-label="Toggle navigation" :aria-expanded="isMobileNavOpen.toString()" @click="toggleMobileNav">
        <font-awesome-icon :icon="['fas', 'bars']" />
      </button>
      <div class="logo-container">
        <img src="/Logo.svg" alt="Logo" class="header-logo"> <!-- Path from public folder -->
      </div>
      <nav :class="['main-nav', { active: isMobileNavOpen }]">
        <router-link to="/" class="nav-link nav-link-home non-clickable" @click.prevent>Home</router-link>
        <router-link to="/" class="nav-link" @click="closeMobileNav">Shill</router-link>
        <router-link to="/feature-one" class="nav-link" @click="closeMobileNav">Feature TBA 1</router-link>
        <router-link to="/feature-two" class="nav-link" @click="closeMobileNav">Feature TBA 2</router-link>
        
        <!-- Mobile only links -->
        <a href="#" class="nav-link mobile-only nav-link-login" @click.prevent="handleMobileLogin">Login</a>
        <a href="#" class="nav-link mobile-only nav-link-signup btn btn-primary" @click.prevent="handleMobileSignup">Sign Up</a>
      </nav>
      <div class="header-actions">
        <button class="search-toggle-mobile" aria-label="Toggle search" @click="toggleMobileSearch">
          <font-awesome-icon :icon="['fas', 'search']" />
        </button>
        <div :class="['search-bar', { active: isMobileSearchOpen }]"> <!-- Add active class for mobile search if needed -->
          <font-awesome-icon :icon="['fas', 'search']" class="desktop-search-icon" />
          <input type="text" placeholder="Search" class="desktop-search-input">
        </div>
        <button class="btn btn-login desktop-only-btn">Login</button>
        <button class="btn btn-primary btn-signup desktop-only-btn">Sign Up</button>
      </div>
      <!-- Overlay for mobile nav -->
      <div v-if="isMobileNavOpen" class="overlay mobile-nav-active" @click="closeMobileNav"></div>
    </header>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { RouterLink } from 'vue-router'; // Not strictly necessary to import for <router-link> but good practice
  
  const isMobileNavOpen = ref(false);
  const isMobileSearchOpen = ref(false); // If you plan to implement mobile search toggle
  
  const toggleMobileNav = () => {
    isMobileNavOpen.value = !isMobileNavOpen.value;
    // Potentially hide body scroll when mobile nav is open
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
    // Basic toggle, you might need more complex logic if it's a full overlay search
    isMobileSearchOpen.value = !isMobileSearchOpen.value;
    console.log("Mobile search toggled:", isMobileSearchOpen.value);
  };
  
  const handleMobileLogin = () => {
    console.log("Mobile login clicked");
    closeMobileNav();
    // Add login logic/modal trigger
  };
  
  const handleMobileSignup = () => {
    console.log("Mobile signup clicked");
    closeMobileNav();
    // Add signup logic/modal trigger
  };
  
  // Note: The active class on router-link will be handled by Vue Router's
  // linkActiveClass and linkExactActiveClass options set in router/index.js
  </script>
  
  <style scoped>
  /* Add any component-specific styles here if needed.
     Most header styles are already in global.css */
  
  /* Adjustments for Vue Router's active class if needed,
     though 'active' should work out of the box. */
  .main-nav .nav-link.router-link-active,
  .main-nav .nav-link.router-link-exact-active {
    color: #ffffff;
    font-weight: 700;
  }
  
  /* Ensure mobile nav overlay is styled - you might need to adjust z-index relative to header */
  .overlay.mobile-nav-active {
      display: block; /* Or use v-show on the element */
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background-color: rgba(0, 0, 0, 0.6);
      z-index: 1040; /* Should be below main-nav but above content */
  }
  
  /* Styling for mobile search bar if it becomes an overlay */
  /* .search-bar.active { ... } */
  </style>
<template>
    <main class="main-content">
      <!-- Feature Header (Title and Submit Idea Button) -->
      <div class="feature-header">
        <h1 id="pageTitle">{{ pageTitle }}</h1>
        <div class="feature-header-actions">
          <button id="submitIdeaBtnPage" class="btn btn-primary" @click="openSubmitIdeaSidebar">Submit Idea</button>
        </div>
      </div>
  
      <!-- Page Controls (Sub-nav and View/Filter Controls) -->
      <div class="page-controls">
        <nav class="sub-nav">
          <a href="#" :class="['sub-nav-link', { active: activeTab === 'ideas' }]" @click.prevent="setActiveTab('ideas')">Ideas</a>
          <a href="#" :class="['sub-nav-link', { active: activeTab === 'leaderboard' }]" @click.prevent="setActiveTab('leaderboard')">Leaderboard</a>
        </nav>
        <div class="view-controls">
          <div v-if="activeTab === 'ideas'" class="ideas-view-toggle" id="ideasViewToggle">
            <button :class="['view-toggle-btn', { active: currentIdeasView === 'v1' }]" data-view="v1" aria-label="List View" @click="setIdeasView('v1')">
              <font-awesome-icon :icon="['fas', 'list-ul']" />
            </button>
            <button :class="['view-toggle-btn', { active: currentIdeasView === 'v2' }]" data-view="v2" aria-label="Grid View" @click="setIdeasView('v2')">
              <font-awesome-icon :icon="['fas', 'th-large']" />
            </button>
          </div>
          <button v-if="activeTab === 'leaderboard'" id="filtersBtn" class="btn btn-filter" @click="toggleFilterPanel">
            <font-awesome-icon :icon="['fas', 'filter']" /> Filters
          </button>
        </div>
      </div>
  
      <!-- Filter Panel (conditionally displayed) -->
      <div v-if="activeTab === 'leaderboard' && isFilterPanelVisible" class="filter-panel" id="filterPanel">
        <div class="filter-group">
          <label class="filter-label">Status</label>
          <div class="filter-options">
            <label><input type="radio" name="statusFilter" value="active" checked> Active</label>
            <label><input type="radio" name="statusFilter" value="closed"> Closed</label>
          </div>
        </div>
        <div class="filter-group">
          <label class="filter-label">Date Range</label>
          <div class="filter-options">
            <!-- Basic date filters, actual filtering logic to be added -->
            <label><input type="radio" name="dateFilter" value="today" checked> Today</label>
            <label><input type="radio" name="dateFilter" value="yesterday"> Yesterday</label>
            <label><input type="radio" name="dateFilter" value="this_week"> This week</label>
            <label><input type="radio" name="dateFilter" value="this_month"> This month</label>
            <label><input type="radio" name="dateFilter" value="custom"> Custom</label>
          </div>
        </div>
      </div>
  
      <!-- Ideas Content Wrapper -->
      <div class="ideas-content-wrapper">
        <!-- V1 Ideas List -->
        <div v-if="activeTab === 'ideas' && currentIdeasView === 'v1'" class="content-container" id="ideasContainerV1Wrapper">
        <div class="ideas-list-container" id="ideasContainerV1" style="display: flex; flex-direction: column; gap: 15px;"> <!-- Copied styles from original script.js for ideasContainerV1 -->
            <p v-if="!ideasStore.latestIdeasV1.length" style="text-align: center; padding: 20px;">No ideas to display.</p>
            <IdeaCardV1
            v-for="idea in ideasStore.latestIdeasV1"
            :key="idea.id"
            :idea="idea"
            @view-details="openViewIdeaSidebar" 
            />
        </div>
        </div>
  
      <!-- V2 Ideas Grid -->
      <div v-if="activeTab === 'ideas' && currentIdeasView === 'v2'" id="ideasContainerV2Wrapper"> <!-- This wrapper is wide due to no .content-container class -->
        <div class="ideas-list-container-v2" id="ideasContainerV2" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(340px, 1fr)); gap: 20px;"> <!-- Styles from original global.css -->
          <p v-if="!ideasStore.ideas.length" style="text-align: center; padding: 20px; grid-column: 1 / -1;">No ideas to display.</p>
          <IdeaCardV2
          v-for="idea in ideasStore.ideas" 
          :key="idea.id"
          :idea="idea"
          @view-details="openViewIdeaSidebar"
        />
        </div>
      </div>
  
        <!-- Leaderboard -->
          <div v-if="activeTab === 'leaderboard'" class="content-container" id="leaderboardContainerWrapper">
            <div class="leaderboard-container" id="leaderboardContainer" style="display: block;"> <!-- Ensure container is visible -->
              <LeaderboardTable @view-details="openViewIdeaSidebar" />
            </div>
          </div>
      </div>
  
      <SubmitIdeaSidebar
  :is-open="isSubmitIdeaSidebarOpen"
  @close="closeSubmitIdeaSidebar"
/>
  
<ViewIdeaSidebar
  :is-open="isViewIdeaSidebarOpen"
  :idea-id="selectedIdeaIdForView"
  @close="closeViewIdeaSidebar"
/>
      
      <!-- Overlay for sidebars -->
      <div v-if="isSubmitIdeaSidebarOpen || isViewIdeaSidebarOpen" class="overlay active" @click="closeAllSidebars"></div>
  
    </main>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useIdeasStore } from '@/stores/ideasStore'; // Adjusted path assuming default Vite structure
  import IdeaCardV1 from '@/components/IdeaCardV1.vue';
  import IdeaCardV2 from '@/components/IdeaCardV2.vue';
  import LeaderboardTable from '@/components/LeaderboardTable.vue';
  import SubmitIdeaSidebar from '@/components/SubmitIdeaSidebar.vue';
  import ViewIdeaSidebar from '@/components/ViewIdeaSidebar.vue';

  const ideasStore = useIdeasStore();
  
  const activeTab = ref('ideas'); // 'ideas' or 'leaderboard'
  const currentIdeasView = ref('v1'); // 'v1' or 'v2'
  const isFilterPanelVisible = ref(false);
  
  const isSubmitIdeaSidebarOpen = ref(false);
  const isViewIdeaSidebarOpen = ref(false);
  const selectedIdeaIdForView = ref(null);
  
  const pageTitle = computed(() => {
    return activeTab.value === 'leaderboard' ? 'Leaderboard' : 'The Shilling';
  });
  
  const selectedIdeaForView = computed(() => {
    if (selectedIdeaIdForView.value === null) return null;
    return ideasStore.getIdeaById(selectedIdeaIdForView.value);
  });
  
  function setActiveTab(tabName) {
    activeTab.value = tabName;
    if (tabName !== 'leaderboard') {
      isFilterPanelVisible.value = false; // Hide filter panel if not on leaderboard
    }
  }
  
  function setIdeasView(viewName) {
    currentIdeasView.value = viewName;
  }
  
  function toggleFilterPanel() {
    isFilterPanelVisible.value = !isFilterPanelVisible.value;
  }
  
  function openSubmitIdeaSidebar() {
    isSubmitIdeaSidebarOpen.value = true;
    // Potentially add body overflow hidden
  }
  
  function closeSubmitIdeaSidebar() {
    isSubmitIdeaSidebarOpen.value = false;
    // Potentially remove body overflow hidden
  }
  
  function openViewIdeaSidebar(ideaId) {
    selectedIdeaIdForView.value = ideaId;
    isViewIdeaSidebarOpen.value = true;
  }
  
  function closeViewIdeaSidebar() {
    isViewIdeaSidebarOpen.value = false;
    selectedIdeaIdForView.value = null;
  }
  
  function closeAllSidebars() {
    closeSubmitIdeaSidebar();
    closeViewIdeaSidebar();
  }
  
  // TODO: Implement actual sorting for leaderboard
  // TODO: Implement actual filtering logic
  // TODO: Replace placeholder card divs with actual IdeaCardV1/V2 components
  // TODO: Replace placeholder sidebar divs with actual Sidebar components
  </script>
  
  <style scoped>
  /* Styles specific to ShillView can go here if needed.
     Most of the layout styles are from global.css */
  
  .idea-card-placeholder-v1, .idea-card-placeholder-v2 {
    border: 1px dashed #555;
    padding: 10px;
    margin-bottom: 10px;
    background-color: #2a2d31;
    color: white;
  }
  .idea-card-placeholder-v2 {
      min-height: 150px; /* Example to give some body to grid items */
  }
  
  .sidebar-placeholder {
    position: fixed;
    top: 0;
    right: 0;
    width: 400px;
    height: 100%;
    background-color: #1c1e21;
    border-left: 1px solid #333;
    padding: 20px;
    box-shadow: -2px 0 5px rgba(0,0,0,0.5);
    z-index: 1200; /* Ensure it's above overlay */
    color: white;
    overflow-y: auto;
  }
  .sidebar-placeholder h2 {
    margin-top: 0;
  }
  
  /* Overlay style is already in global.css, but ensure it covers content and is below sidebars
     The .active class will be toggled by Vue */
  /* .overlay.active { ... } */
  </style>
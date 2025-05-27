<template>
    <aside :class="['sidebar', { open: isOpen }]" id="viewIdeaSidebar">
      <div v-if="!idea" class="sidebar-loading">Loading idea...</div>
      <template v-else>
        <div class="sidebar-header">
          <div class="sidebar-header-main-content">
            <h2 id="viewIdeaTitle">{{ idea.title }}</h2>
            <div class="idea-meta-top">
              <span id="viewIdeaUserDate">{{ idea.author || 'Anon' }} • {{ idea.date }}</span>
            </div>
          </div>
          <button id="closeViewSidebarBtn" class="close-btn header-close-btn" @click="closeSidebar">×</button>
        </div>
        <div class="sidebar-content">
          <div class="idea-chart-placeholder">
            <img v-if="randomChartImage" :src="randomChartImage" alt="Chart for idea" />
            <span v-else>Chart Area Placeholder</span>
          </div>
          <div class="chart-timeframe-selectors">
            <button :class="{active: chartTimeframe === '1H'}" @click="chartTimeframe = '1H'">1H</button>
            <button :class="{active: chartTimeframe === '1D'}" @click="chartTimeframe = '1D'">1D</button>
            <button :class="{active: chartTimeframe === '1W'}" @click="chartTimeframe = '1W'">1W</button>
            <button :class="{active: chartTimeframe === '1M'}" @click="chartTimeframe = '1M'">1M</button>
            <button :class="{active: chartTimeframe === 'ALL'}" @click="chartTimeframe = 'ALL'">ALL</button>
            <button>00</button> <!-- Placeholder -->
          </div>
  
          <div class="idea-details-header">
            <div class="tags">
              <span :class="['tag', idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : '']" id="viewIdeaPosition">
                {{ idea.position }}
              </span>
              <span class="tag tag-asset" id="viewIdeaSymbolDisplay">{{ idea.symbol }}</span>
            </div>
            <div class="total-return">
              Total Return
              <span :class="['view-idea-total-return-value', totalReturnClassSidebar]" id="viewIdeaTotalReturn">
                {{ formattedTotalReturnSidebar }}
              </span>
            </div>
            <div :class="['status', idea.status ? idea.status.toLowerCase() : '']" id="viewIdeaStatus">
              {{ idea.status }}
            </div>
          </div>
  
          <div class="idea-interactions">
            <button :class="['interaction-btn like-btn-sidebar', { liked: idea.isLiked }]" title="Like" @click="toggleLike">
              <font-awesome-icon :icon="[idea.isLiked ? 'fas' : 'far', 'heart']" />
              <span id="viewIdeaLikes">{{ idea.likes }}</span>
            </button>
            <button class="interaction-btn" title="Comment"><font-awesome-icon :icon="['far', 'comment']" /> <span id="viewIdeaCommentsCount">{{ idea.commentsCount }}</span></button>
            <button class="interaction-btn" title="Bookmark"><font-awesome-icon :icon="['fas', 'bookmark']" /> <span id="viewIdeaShares">{{ idea.shares }}</span></button>
            <button class="interaction-btn" title="More options"><font-awesome-icon :icon="['fas', 'ellipsis-h']" /></button>
            <button class="interaction-btn" title="Share"><font-awesome-icon :icon="['fas', 'share-alt']" /></button>
          </div>
  
          <section class="info-section">
            <div class="info-section-header">
              <h3>INFO</h3>
              <div class="info-time-toggle">
                <button :class="{active: infoTimeframe === '24h'}" @click="infoTimeframe = '24h'">24h</button>
                <button :class="{active: infoTimeframe === '1d'}" @click="infoTimeframe = '1d'">1d</button>
                <button :class="{active: infoTimeframe === '7d'}" @click="infoTimeframe = '7d'">7d</button>
              </div>
            </div>
            <div class="info-grid">
              <div><span>Symbol</span><strong id="viewInfoSymbol">{{ idea.symbol }}</strong></div>
              <div><span>Network</span><strong id="viewInfoNetwork">{{ idea.network || "N/A" }}</strong></div>
              <div><span>Market Cap</span><strong id="viewInfoMarketCap">{{ idea.marketCap || "N/A" }}</strong></div>
              <div><span>Volume</span><strong id="viewInfoVolume">{{ idea.volume || "N/A" }}</strong></div>
              <div><span>Contract Add.</span><strong id="viewInfoContract" class="contract-address">{{ idea.contractAddress || "N/A" }}</strong></div>
              <div>
                <span>Performance</span>
                <strong :class="['view-info-performance-value', performanceClassSidebar]" id="viewInfoPerformance">
                  {{ formattedPerformanceSidebar }}
                </strong>
              </div>
            </div>
          </section>
  
          <section class="thesis-section">
            <h3>THESIS</h3>
            <p id="viewIdeaThesisText">{{ idea.thesis }}</p>
          </section>
  
          <section class="exit-date-section">
            <h3>Exit Date</h3>
            <strong id="viewIdeaExitDate">{{ idea.exitDate || "N/A" }}</strong>
          </section>
  
          <section class="comments-section">
            <h3>COMMENTS</h3>
            <div class="comment-input-area">
              <img src="https://i.pravatar.cc/30?u=currentUserInput" alt="User Avatar" class="user-avatar-comment">
              <input type="text" v-model="newCommentText" placeholder="This is my comment..." id="newCommentText" @keyup.enter="sendComment">
              <button id="sendCommentBtn" class="btn btn-primary" @click="sendComment">Send</button>
            </div>
            <div class="comment-list" id="commentList">
              <div v-if="!idea.comments || idea.comments.length === 0" class="no-comments">
                No comments yet. Be the first to comment!
              </div>
              <!-- Actual comment rendering will go here -->
              <div v-for="(comment, index) in idea.comments" :key="index" class="comment-item-placeholder" style="border-bottom: 1px solid #444; padding: 10px 0; color: white;">
                <p><strong>{{ comment.author }}</strong> <span style="color: #888; font-size: 0.8em;">{{ comment.time }}</span></p>
                <p>{{ comment.text }}</p>
              </div>
            </div>
          </section>
  
          <div class="sidebar-disclaimer">
            <font-awesome-icon :icon="['fas', 'info-circle']" />
            Trade ideas presented are for educational purposes only and are not financial advice. Please conduct your own research or consult a financial advisor before making any investment decisions.
          </div>
        </div>
      </template>
    </aside>
  </template>
  
  <script setup>
  import { ref, computed, watch } from 'vue';
  import { useIdeasStore } from '@/stores/ideasStore';
  
  const props = defineProps({
    isOpen: {
      type: Boolean,
      default: false
    },
    ideaId: {
      type: [Number, String, null], // Can be null when sidebar is closed
      default: null
    }
  });
  
  const emit = defineEmits(['close']);
  
  const ideasStore = useIdeasStore();
  const chartImagePaths = ['/charts/Graph.png', '/charts/Graph-1.png']; // Paths from public folder
  
  const idea = ref(null);
  const randomChartImage = ref(null);
  const chartTimeframe = ref('1H');
  const infoTimeframe = ref('24h');
  const newCommentText = ref('');
  
  watch(() => props.ideaId, (newId) => {
    if (newId !== null) {
      idea.value = ideasStore.getIdeaById(newId);
      selectRandomChart();
    } else {
      idea.value = null; // Clear idea when sidebar is closed or ideaId is null
    }
  }, { immediate: true }); // immediate: true to run on component mount if ideaId is already set
  
  watch(() => props.isOpen, (newVal) => {
    if (newVal && props.ideaId) {
      idea.value = ideasStore.getIdeaById(props.ideaId); // Re-fetch idea when opening
      selectRandomChart();
    }
    if (!newVal) {
      newCommentText.value = ''; // Clear comment input when sidebar closes
    }
  });
  
  function selectRandomChart() {
    if (chartImagePaths.length > 0) {
      const randomIndex = Math.floor(Math.random() * chartImagePaths.length);
      randomChartImage.value = chartImagePaths[randomIndex];
    }
  }
  
  const displayTotalReturnSidebar = computed(() => {
    if (!idea.value) return "0.00%";
    return idea.value.status === 'Pending' ? "0.00%" : idea.value.totalReturn;
  });
  
  const formattedTotalReturnSidebar = computed(() => {
    return ideasStore.formatPercentage(displayTotalReturnSidebar.value);
  });
  
  const totalReturnClassSidebar = computed(() => {
    if (!idea.value) return '';
    return ideasStore.getPerformanceClass(displayTotalReturnSidebar.value, idea.value.status);
  });
  
  const displayPerformanceSidebar = computed(() => {
    if (!idea.value) return "0.00%";
    return idea.value.status === 'Pending' ? "0.00%" : idea.value.performance;
  });
  
  const formattedPerformanceSidebar = computed(() => {
    return ideasStore.formatPercentage(displayPerformanceSidebar.value);
  });
  
  const performanceClassSidebar = computed(() => {
    if (!idea.value) return '';
    return ideasStore.getPerformanceClass(displayPerformanceSidebar.value, idea.value.status);
  });
  
  function closeSidebar() {
    emit('close');
  }
  
  function toggleLike() {
    if (idea.value) {
      ideasStore.toggleLike(idea.value.id);
      // The idea object in the store is reactive, so 'idea.value' here will update
      // if the store's idea object is the same reference or if we re-fetch it.
      // To be absolutely sure, re-assign idea.value from the store if needed,
      // but Pinia's reactivity should handle it.
      // idea.value = { ...ideasStore.getIdeaById(idea.value.id) }; // Force reactivity if needed
    }
  }
  
  function sendComment() {
      if (!newCommentText.value.trim() || !idea.value) return;
      ideasStore.addCommentToIdea(idea.value.id, newCommentText.value.trim());
      newCommentText.value = ''; // Clear input
  }
  
  // Initial chart selection if sidebar opens with an idea
  if (props.isOpen && props.ideaId) {
      idea.value = ideasStore.getIdeaById(props.ideaId);
      selectRandomChart();
  }
  </script>
  
  <style scoped>
  .sidebar-loading {
    padding: 20px;
    text-align: center;
    color: #84888D;
  }
  /* Styles for this component are mostly in global.css */
  /* Ensure comment input area is styled correctly if needed */
  .no-comments {
    text-align: center;
    color: #6c757d;
    padding: 15px 0;
    font-style: italic;
  }
  </style>
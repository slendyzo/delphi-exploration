<template>
    <div class="idea-card" @click="emitViewDetails">
      <div class="idea-card-top-section">
        <div class="idea-card-main-info">
          <h3>{{ idea.title || 'Idea' }}</h3>
          <p class="idea-card-description">{{ idea.description || '' }}</p>
        </div>
        <div class="idea-card-meta-island">
          <span class="idea-card-date">{{ idea.date || '' }}</span>
          <div class="idea-card-island">
            <div class="island-left-content">
              <div class="island-position-asset">
                <span :class="['tag', idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : '']">
                  {{ idea.position || '' }}
                </span>
                <font-awesome-icon v-if="networkIconClass" :icon="networkIconClass" />
                <span class="tag-asset">{{ idea.symbol || '' }}</span>
              </div>
              <div class="island-total-return">
                Total Return
                <span :class="totalReturnV1Class">
                  {{ formattedV1TotalReturn }}
                </span>
              </div>
            </div>
            <div class="island-status">{{ idea.status || '' }}</div>
          </div>
        </div>
      </div>
      <div class="idea-card-bottom-section">
        <span class="idea-card-author">
          <img :src="idea.authorAvatar || defaultAvatar" :alt="idea.author || 'anon'">
          {{ idea.author || 'Anon' }}
        </span>
        <div class="idea-card-actions">
          <button :class="['like-btn-v1', { liked: idea.isLiked }]" @click.stop="toggleLike" title="Like">
            <font-awesome-icon :icon="[idea.isLiked ? 'fas' : 'far', 'heart']" />
            <span class="like-count">{{ idea.likes || 0 }}</span>
          </button>
          <button title="Comment" @click.stop="emitViewDetails"> <!-- Or handle comment separately -->
            <font-awesome-icon :icon="['far', 'comment']" /> {{ idea.commentsCount || 0 }}
          </button>
          <button title="Bookmark" @click.stop> <!-- Add bookmark functionality later -->
            <font-awesome-icon :icon="['fas', 'bookmark']" />
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useIdeasStore } from '@/stores/ideasStore';
  
  const props = defineProps({
    idea: {
      type: Object,
      required: true
    }
  });
  
  const emit = defineEmits(['view-details']);
  
  const ideasStore = useIdeasStore();
  
  const defaultAvatar = computed(() => `https://i.pravatar.cc/20?u=${encodeURIComponent(props.idea.author || 'anon')}`);
  
  const networkIconClass = computed(() => {
    if (!props.idea.network) return null;
    const n = props.idea.network.toLowerCase();
    if (n === 'ethereum' || n === 'bsc') return ['fab', 'ethereum'];
    if (n === 'solana') return ['fab', 'btc']; // Placeholder, as Solana icon might need special handling or be in free-brands
    // For Font Awesome 6, brand icons are typically like ['fab', 'solana'] if available
    // You might need to import faSolana from '@fortawesome/free-brands-svg-icons' in main.js and add it to library
    // And ensure it's correctly mapped here. For now, using BTC as a visible placeholder if Solana brand isn't setup in main.js
    if (n === 'bitcoin') return ['fab', 'btc'];
    return null; // Or a default icon
  });
  
  const valueToDisplayInCardV1 = computed(() => {
    return props.idea.status === 'Pending' ? "0.00%" : props.idea.totalReturn;
  });
  
  const formattedV1TotalReturn = computed(() => {
    return ideasStore.formatPercentage(valueToDisplayInCardV1.value);
  });
  
  const totalReturnV1Class = computed(() => {
    return ideasStore.getPerformanceClass(valueToDisplayInCardV1.value, props.idea.status);
  });
  
  function toggleLike() {
    ideasStore.toggleLike(props.idea.id);
  }
  
  function emitViewDetails() {
    emit('view-details', props.idea.id);
  }
  </script>
  
  <style scoped>
  /* Styles for idea-card, idea-card-top-section, etc., are in global.css.
     Only add styles here if they are truly specific to this component's
     internal structure and shouldn't affect other .idea-card instances
     if you had different types of idea cards. */
  
  .idea-card {
    /* Clicks on the card itself (not buttons) will trigger view details */
    cursor: pointer; 
  }
  
  .idea-card-actions button {
    background: none;
    border: none;
    color: #6c757d; /* from global.css */
    cursor: pointer;
    font-size: 0.9em; /* from global.css */
    padding: 0;
  }
  .idea-card-actions button:hover {
    color: #007bff; /* from global.css */
  }
  .idea-card-actions .like-btn-v1.liked .fa-heart, /* Target the icon directly for color */
  .idea-card-actions .like-btn-v1.liked { /* Keep this for other potential 'liked' styles on the button */
      color: #007bff; /* or your liked color e.g. #dc3545 */
  }
  .fa-heart {
      transition: color 0.2s ease;
  }
  </style>
<template>
    <div class="idea-card-v2" @click="emitViewDetails">
      <div class="idea-card-v2-header">
        <h3 class="idea-card-v2-title">{{ idea.title || 'Idea' }}</h3>
        <span class="idea-card-v2-date">{{ idea.date || '' }}</span>
      </div>
      <p class="idea-card-v2-description">
        {{ idea.description ? (idea.description.length > 120 ? idea.description.substring(0, 120) + '...' : idea.description) : 'No description.' }}
      </p>
      <div class="idea-card-v2-main-content">
        <div class="idea-card-v2-details-island">
          <span :class="['tag', idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : '']">
            {{ idea.position || '' }}
          </span>
          <font-awesome-icon v-if="networkIconClass" :icon="networkIconClass" />
          <span class="idea-card-v2-symbol">{{ idea.symbol || '' }}</span>
          <span :class="['idea-card-v2-return', returnClassV2]">
            {{ formattedReturnOrPerfV2 }}
          </span>
        </div>
        <span :class="['idea-card-v2-status', idea.status ? idea.status.toLowerCase() : '']">
          {{ idea.status || '' }}
        </span>
      </div>
      <div class="idea-card-v2-footer">
        <div class="idea-card-v2-author">
          <img :src="idea.authorAvatar || defaultAvatar" :alt="idea.author || 'anon'">
          <span>{{ idea.author || 'Anon' }}</span>
        </div>
        <div class="idea-card-v2-actions">
          <button :class="['like-btn-v2', { liked: idea.isLiked }]" @click.stop="toggleLike" title="Like">
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
    // Same logic as IdeaCardV1.vue
    if (!props.idea.network) return null;
    const n = props.idea.network.toLowerCase();
    if (n === 'ethereum' || n === 'bsc') return ['fab', 'ethereum'];
    if (n === 'solana') return ['fab', 'btc']; // Placeholder - ensure 'faSolana' or equivalent is in main.js brands library
    if (n === 'bitcoin') return ['fab', 'btc'];
    return null;
  });
  
  const rawValueForV2 = computed(() => {
    return props.idea.status === 'Pending' ? "0.00%" : (props.idea.totalReturnsLeaderboard || props.idea.performance || '--');
  });
  
  const formattedReturnOrPerfV2 = computed(() => {
    return ideasStore.formatPercentage(rawValueForV2.value);
  });
  
  const returnClassV2 = computed(() => {
    return ideasStore.getPerformanceClass(rawValueForV2.value, props.idea.status);
  });
  
  function toggleLike() {
    ideasStore.toggleLike(props.idea.id);
  }
  
  function emitViewDetails() {
    emit('view-details', props.idea.id);
  }
  </script>
  
  <style scoped>
  /* Styles for idea-card-v2, etc., are in global.css.
     Add specific scoped styles if necessary. */
  .idea-card-v2 {
      cursor: pointer;
  }
  
  .idea-card-v2-actions button {
    /* Copied from IdeaCardV1 for consistency, adjust if V2 actions are different */
    background: none;
    border: none;
    color: #6c757d;
    cursor: pointer;
    font-size: 0.8em; /* from global.css for v2 actions */
    padding: 0;
  }
  .idea-card-v2-actions button:hover {
    color: #007bff;
  }
  .idea-card-v2-actions .like-btn-v2.liked .fa-heart,
  .idea-card-v2-actions .like-btn-v2.liked {
      color: #007bff;
  }
  /* If the heart icon itself needs separate transition for v2 */
  /* .idea-card-v2-actions .fa-heart { transition: color 0.2s ease; } */
  </style>
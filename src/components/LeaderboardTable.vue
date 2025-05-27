<template>
    <div class="leaderboard-table-wrapper">
      <table>
        <thead>
          <tr>
            <th
              v-for="header in headers"
              :key="header.key"
              :class="getHeaderClasses(header)"
              @click="header.sortable ? sortBy(header.key) : null"
            >
              {{ header.label }}
              <span v-if="header.timeframe" class="timeframe">{{ header.timeframe }}</span>
            </th>
          </tr>
        </thead>
        <tbody id="leaderboardBody">
          <tr v-if="sortedIdeas.length === 0">
            <td :colspan="headers.length" style="text-align: center; padding: 20px;">No ideas to display on the leaderboard.</td>
          </tr>
          <tr v-for="(idea) in sortedIdeas" :key="idea.id" @click="emitViewDetails(idea.id)">
            <td :class="getRankCellClass(idea.performanceRank)">
              <span>{{ idea.performanceRank }}</span>
            </td>
            <td class="user-cell">
              <img :src="idea.authorAvatar || defaultAvatar(idea.author)" :alt="idea.author || 'anon'" class="leaderboard-user-avatar">
              <span class="leaderboard-username">{{ idea.author || 'Anonymous' }}</span>
            </td>
            <td class="symbol-cell-v2">
              <div class="symbol-chip">
                <font-awesome-icon :icon="['fas', 'coins']" class="leaderboard-symbol-icon default-symbol-icon" />
                <span class="leaderboard-symbol-text">{{ idea.symbol || 'N/A' }}</span>
              </div>
            </td>
            <td :class="['total-returns-cell', getTotalReturnsClass(idea)]">
              {{ formatIdeaPercentage(idea, 'totalReturnsLeaderboard') }}
            </td>
            <td class="position-cell">
              <span :class="['tag', idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : '']">
                {{ idea.position || 'N/A' }}
              </span>
            </td>
            <td :class="['performance-cell', getPerformanceClass(idea)]">
              {{ formatIdeaPercentage(idea, 'performance') }}
            </td>
            <td class="volume-cell">{{ idea.volume || 'N/A' }}</td>
            <td class="status-cell">{{ idea.status || 'N/A' }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useIdeasStore } from '@/stores/ideasStore';
  
  const emit = defineEmits(['view-details']);
  const ideasStore = useIdeasStore();
  
  const headers = ref([
    { key: 'rank', label: 'RANK', sortable: true, align: 'center' },
    { key: 'author', label: 'USER', sortable: true },
    { key: 'symbol', label: 'SYMBOL', sortable: true, align: 'center' },
    { key: 'totalReturnsLeaderboard', label: 'TOTAL RETURNS', sortable: true, align: 'left' },
    { key: 'position', label: 'POSITION', sortable: true, align: 'center' },
    { key: 'performance', label: 'PERFORMANCE', sortable: true, align: 'left', timeframe: '24H' },
    { key: 'volume', label: 'VOLUME', sortable: true, align: 'left', timeframe: '24H' },
    { key: 'status', label: 'STATUS', sortable: true, align: 'left' }
  ]);
  
  const currentSortKey = ref('rank'); // Default sort by performanceRank
  const currentSortOrder = ref('asc');  // Ranks are ascending
  
  const defaultAvatar = (authorName) => `https://i.pravatar.cc/24?u=${encodeURIComponent(authorName || 'anon')}`;
  
  const sortedIdeas = computed(() => {
    const ideasCopy = [...ideasStore.rankedIdeas]; 
    return ideasCopy.sort((a, b) => { 
      let valA = a[currentSortKey.value];
      let valB = b[currentSortKey.value];
  
      if (['totalReturnsLeaderboard', 'performance', 'volume'].includes(currentSortKey.value)) { 
        valA = parseFloat(String(valA)?.replace(/[+%M$]/g, '')) || 0;
        valB = parseFloat(String(valB)?.replace(/[+%M$]/g, '')) || 0;
      } else if (currentSortKey.value === 'rank') { 
        valA = a.performanceRank;
        valB = b.performanceRank;
      } else { 
        valA = String(valA)?.toLowerCase() || '';
        valB = String(valB)?.toLowerCase() || '';
      } 
  
      if (currentSortOrder.value === 'asc') { 
        return valA < valB ? -1 : valA > valB ? 1 : 0;
      } else { 
        return valA > valB ? -1 : valA < valB ? 1 : 0;
      } 
    }); 
  }); 
  
  function sortBy(sortKey) {
    if (!sortKey) return;
    if (currentSortKey.value === sortKey) {
      if (currentSortOrder.value === 'desc') {
        currentSortOrder.value = 'asc';
      } else if (currentSortOrder.value === 'asc') {
        // If already sorted by rank ascending, and clicked again, maybe switch to totalReturnsLeaderboard desc
        if (sortKey === 'rank') {
          currentSortKey.value = 'totalReturnsLeaderboard';
          currentSortOrder.value = 'desc';
        } else {
          // For other columns, if clicked when asc, revert to default (rank asc)
          currentSortKey.value = 'rank';
          currentSortOrder.value = 'asc';
        }
      }
    } else {
      currentSortKey.value = sortKey;
      if (sortKey === 'rank') {
        currentSortOrder.value = 'asc'; 
      } else {
        currentSortOrder.value = (['author', 'symbol', 'position', 'status'].includes(sortKey)) ? 'asc' : 'desc';
      }
    }
  }
  
  function getHeaderClasses(header) {
    const classes = {
      sortable: header.sortable,
      'align-center': header.align === 'center',
      'align-left': header.align === 'left', 
      'sort-asc': header.sortable && currentSortKey.value === header.key && currentSortOrder.value === 'asc',
      'sort-desc': header.sortable && currentSortKey.value === header.key && currentSortOrder.value === 'desc',
    };
    return classes;
  }
  
  function getRankCellClass(performanceRank) {
    let rankClass = "rank-cell";
    if (
        (currentSortKey.value === 'rank' && currentSortOrder.value === 'asc' && performanceRank <= 3) ||
        (currentSortKey.value === 'totalReturnsLeaderboard' && currentSortOrder.value === 'desc' && performanceRank <= 3)
    ) {
        rankClass += " top-rank";
    }
    return rankClass;
  }
  
  function formatIdeaPercentage(idea, fieldKey) {
    const value = idea.status === 'Pending' ? "0.00%" : idea[fieldKey];
    return ideasStore.formatPercentage(value);
  }
  
  function getTotalReturnsClass(idea) {
      const value = idea.status === 'Pending' ? "0.00%" : idea.totalReturnsLeaderboard;
      return ideasStore.getPerformanceClass(value, idea.status);
  }
  
  function getPerformanceClass(idea) {
      const value = idea.status === 'Pending' ? "0.00%" : idea.performance;
      return ideasStore.getPerformanceClass(value, idea.status);
  }
  
  function emitViewDetails(ideaId) {
    emit('view-details', ideaId);
  }
  </script>
  
  <style scoped>
  /* Most table styles are in global.css.
     Scoped styles here are for dynamic parts handled by Vue if necessary. */
  /* The sort arrows are handled by global.css based on .sort-asc / .sort-desc */
  </style>
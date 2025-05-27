import { defineStore } from 'pinia'
import { ref, computed } from 'vue' // Import computed if needed for derived state

// --- Utility Functions (can be moved to src/utils/formatters.js later if they grow) ---
function formatPercentage(valueStr) {
    if (valueStr === null || typeof valueStr === 'undefined' || valueStr.toString().trim() === "" || valueStr === "--" || valueStr === "N/A") {
        return '--';
    }
    const num = parseFloat(String(valueStr).replace(/[+%]/g, ''));
    if (isNaN(num)) {
        return '--';
    }
    const sign = num > 0 ? '+' : num < 0 ? '-' : '';
    return sign + Math.abs(num).toFixed(2) + '%';
}

function getPerformanceClass(valueStr, status) {
    if (status === 'Pending') return '';
    if (!valueStr || valueStr === '--' || valueStr === 'N/A') return '';
    const num = parseFloat(String(valueStr).replace(/[+%]/g, ''));
    if (isNaN(num) || num === 0) return '';
    return num > 0 ? 'positive' : 'negative';
}
// --- End Utility Functions ---


export const useIdeasStore = defineStore('ideas', () => {
  // --- STATE ---
  const ideas = ref([
    // Copied directly from your original script.js
    { id: 1, title: "Buy TIA", description: "The future of HyperLiquid looks promising...", author: "Username", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("Username")}`, date: "May 19, 2025", symbol: "HYPE", network: "Ethereum", position: "Long", thesis: "The future of HyperLiquid is very bright...", contractAddress: "0x2948...21238", totalReturn: "+33.000%", totalReturnsLeaderboard: "+33.000%", status: "Active", likes: 15, commentsCount: 3, shares: 5, marketCap: "$2.3B", volume: "$232.12M", performance: "+24%", exitDate: "July 24, 2025", isLiked: false, comments: [ { userAvatar: `https://i.pravatar.cc/30?u=Commenter1`, author: "CommenterOne", username: "@One", time: "2hr ago", text: "Solid thesis, I'm in!" }, { userAvatar: `https://i.pravatar.cc/30?u=SkepticSal`, author: "SkepticSal", username: "@Sal", time: "1hr ago", text: "Hmm, seems a bit overhyped. What are the risks?" }, { userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("Username")}`, author: "Username", username: "@Username", time: "30m ago", text: "Valid point Sal, main risk is regulatory uncertainty, but the tech is solid." } ] },
    { id: 2, title: "Short BTC", description: "Bitcoin facing headwinds...", author: "AlphaUser", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("AlphaUser")}`, date: "May 18, 2025", symbol: "BTC", network: "Bitcoin", position: "Short", thesis: "Bitcoin is overbought and due for a significant correction...", contractAddress: "N/A", totalReturn: "+180%", totalReturnsLeaderboard: "+27.500%", status: "Closed", likes: 10, commentsCount: 2, shares: 3, marketCap: "$1.2T", volume: "$180.45M", performance: "+19%", exitDate: "Aug 10, 2025", isLiked: false, comments: [ { userAvatar: `https://i.pravatar.cc/30?u=BullishBob`, author: "BullishBob", username: "@Bob", time: "5hr ago", text: "Shorting BTC? Brave soul!" }, { userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("AlphaUser")}`, author: "AlphaUser", username: "@Alpha", time: "4hr ago", text: "It's a calculated risk. The indicators are there." } ] },
    { id: 3, title: "Long TIA again", description: "Celestia's modular approach is key...", author: "BetaTester", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("BetaTester")}`, date: "May 17, 2025", symbol: "TIA", network: "Celestia", position: "Long", thesis: "Celestia's modular design for blockchains is groundbreaking...", contractAddress: "N/A", totalReturn: "+50%", totalReturnsLeaderboard: "+10.323%", status: "Active", likes: 5, commentsCount: 1, shares: 1, marketCap: "$2.5B", volume: "$300.75M", performance: "-53%", exitDate: "Sep 01, 2025", isLiked: false, comments: [ { userAvatar: `https://i.pravatar.cc/30?u=TechGuru`, author: "TechGuru", username: "@Guru", time: "1d ago", text: "Agreed, the modularity is a game changer." } ] },
    { id: 4, title: "KTA All In", description: "Kadena's multi-chain scalability.", author: "GammaGuest", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("GammaGuest")}`, date: "May 16, 2025", symbol: "KTA", network: "Kadena", position: "Long", thesis: "Kadena's unique chainweb architecture...", totalReturn:"--", totalReturnsLeaderboard: "+23.200%", status: "Active", likes: 2, commentsCount: 0, shares: 0, marketCap: "$100M", volume: "$150.60M", performance: "+24%", exitDate: "N/A", isLiked: false, comments: [] },
    { id: 5, title: "Bitcoin Dip Buy", description: "Accumulating BTC on this dip.", author: "DeltaDude", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("DeltaDude")}`, date: "May 15, 2025", symbol: "BTC", network: "Bitcoin", position: "Long", thesis: "This dip is a prime buying opportunity...", totalReturn:"0.00%", totalReturnsLeaderboard: "0.00%", status: "Pending", likes: 7, commentsCount: 0, shares: 0, marketCap: "$1.2T", volume: "$275.10M", performance: "0.00%", exitDate: "N/A", isLiked: false, comments: [] },
    { id: 6, title: "POPCAT Mania", description: "Popcat to the moon!", author: "EpsilonExpert", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("EpsilonExpert")}`, date: "May 14, 2025", symbol: "POPCAT", network: "Solana", position: "Long", thesis: "POPCAT has the meme potential...", totalReturn:"--", totalReturnsLeaderboard: "+12.430%", status: "Active", likes: 15, commentsCount: 0, shares: 0, marketCap: "$50M", volume: "$290.00M", performance: "+21%", exitDate: "N/A", isLiked: false, comments: [] },
    { id: 7, title: "WIF Next Wave", description: "Dogwifhat still has room.", author: "ZetaZone", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("ZetaZone")}`, date: "May 13, 2025", symbol: "WIF", network: "Solana", position: "Long", thesis: "While WIF has had a good run...", totalReturn:"--", totalReturnsLeaderboard: "+7.560%", status: "Closed", likes: 9, commentsCount: 0, shares: 0, marketCap: "$300M", volume: "$160.90M", performance: "+23%", exitDate: "N/A", isLiked: false, comments: [] },
    { id: 8, title: "Short INIT", description: "INIT protocol looks overvalued.", author: "EtaUser", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("EtaUser")}`, date: "May 12, 2025", symbol: "INIT", network: "Ethereum", position: "Short", thesis: "INIT's current valuation doesn't match...", totalReturn:"-5.00%", totalReturnsLeaderboard: "+3.450%", status: "Active", likes: 3, commentsCount: 0, shares: 0, marketCap: "$80M", volume: "$120.45M", performance: "+170%", exitDate: "N/A", isLiked: false, comments: [] },
    { id: 9, title: "CRV Bounce", description: "Curve Finance recovery.", author: "ThetaTester", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("ThetaTester")}`, date: "May 11, 2025", symbol: "CRV", network: "Ethereum", position: "Long", thesis: "Curve Finance is a cornerstone of DeFi...", totalReturn:"0.00%", totalReturnsLeaderboard: "0.00%", status: "Pending", likes: 6, commentsCount: 0, shares: 0, marketCap: "$500M", volume: "$310.30M", performance: "0.00%", exitDate: "N/A", isLiked: false, comments: [] },
    { id: 10, title: "FARTCOIN Gem", description: "This is the one!", author: "IotaInfluencer", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("IotaInfluencer")}`, date: "May 10, 2025", symbol: "FARTCOIN", network: "BSC", position: "Long", thesis: "FARTCOIN has revolutionary tokenomics...", totalReturn:"+100%", totalReturnsLeaderboard: "+1.040%", status: "Active", likes: 22, commentsCount: 0, shares: 0, marketCap: "$1M", volume: "$250.20M", performance: "+20%", exitDate: "N/A", isLiked: false, comments: [] }
  ]);

  // --- GETTERS (Computed properties) ---
  const getIdeaById = computed(() => {
    return (ideaId) => ideas.value.find(idea => idea.id === ideaId)
  });

  const latestIdeasV1 = computed(() => {
    // Sort by ID descending to get latest first, then take top 10
    // .slice() is important to create a shallow copy before sorting, to not mutate original state
    return [...ideas.value].sort((a, b) => b.id - a.id).slice(0, 10);
  });

  const rankedIdeas = computed(() => {
    const rankMap = new Map();
    [...ideas.value] // Create a new array for sorting to not mutate original
      .sort((a, b) => {
        const valA = parseFloat(String(a.totalReturnsLeaderboard)?.replace(/[+%]/g, '')) || 0;
        const valB = parseFloat(String(b.totalReturnsLeaderboard)?.replace(/[+%]/g, '')) || 0;
        return valB - valA; // Sort descending
      })
      .forEach((idea, index) => {
        rankMap.set(idea.id, index + 1);
      });

    return ideas.value.map(idea => ({
      ...idea,
      performanceRank: rankMap.get(idea.id) || Infinity 
    }));
  }); // <--- Make sure this closing parenthesis and semicolon are present

  // --- ACTIONS ---
  function addIdea(newIdeaData) {
    const currentAuthorName = "YouNotAnil#23"; // This could come from an auth store later
    const newIdea = {
      id: Date.now(),
      title: `${newIdeaData.position} ${newIdeaData.symbol.toUpperCase()}`,
      description: newIdeaData.thesis.substring(0, 100) + (newIdeaData.thesis.length > 100 ? '...' : ''),
      author: currentAuthorName,
      authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent(currentAuthorName + Date.now())}`, // Unique avatar
      date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
      symbol: newIdeaData.symbol.toUpperCase(),
      network: newIdeaData.network,
      position: newIdeaData.position,
      thesis: newIdeaData.thesis,
      contractAddress: newIdeaData.contractAddress,
      totalReturn: "0.00%",
      totalReturnsLeaderboard: "0.00%",
      status: "Pending", // Or "Active" depending on your logic
      likes: 0,
      commentsCount: 0,
      shares: 0, // Assuming shares was a placeholder
      isLiked: false,
      marketCap: "N/A", // These would typically be fetched or calculated
      volume: "N/A",
      performance: "0.00%",
      exitDate: "TBD",
      comments: []
    };
    ideas.value.unshift(newIdea); // Add to the beginning of the array
  }

  function toggleLike(ideaId) {
    const idea = ideas.value.find(i => i.id === ideaId);
    if (idea) {
      idea.isLiked = !idea.isLiked;
      idea.likes = idea.isLiked ? (idea.likes || 0) + 1 : Math.max(0, (idea.likes || 0) - 1);
    }
  }

  function addCommentToIdea(ideaId, commentText) {
    const idea = ideas.value.find(i => i.id === ideaId);
    if (idea) {
        const currentUser = "CurrentUser"; // Placeholder, this would come from auth
        const newComment = {
            userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent(currentUser + Date.now())}`,
            author: currentUser,
            username: `@${currentUser}`,
            time: "Just now", // Or generate a more precise timestamp
            text: commentText,
        };
        if (!idea.comments) {
          idea.comments = []; // Initialize if it doesn't exist
        }
        idea.comments.push(newComment);
        idea.commentsCount = (idea.commentsCount || 0) + 1;
    }
  }

    // --- EXPORT ---
    return {
      // State
      ideas,
      // Getters
      getIdeaById,
      latestIdeasV1,
      rankedIdeas, // Added this, ensure comma if not last
      // Actions
      addIdea,
      toggleLike,
      addCommentToIdea,
      // Utilities
      formatPercentage,
      getPerformanceClass // This is the last item, so no comma after it
    }
}) // This is the closing parenthesis and brace for defineStore

const ideasWithPerformanceRank = computed(() => {
  const sortedByPerf = [...ideas.value].sort((a, b) => {
    const perfA = parseFloat(String(a.totalReturnsLeaderboard)?.replace(/[+%]/g, '')) || 0;
    const perfB = parseFloat(String(b.totalReturnsLeaderboard)?.replace(/[+%]/g, '')) || 0;
    return perfB - perfA; // Descending
  });
  return sortedByPerf.map((idea, index) => ({ ...idea, performanceRank: index + 1 }));
});
// Then expose ideasWithPerformanceRank and use it in LeaderboardTable.vue
// LeaderboardTable.vue would then display idea.performanceRank
// And when sorting by the "RANK" column, it would sort by idea.performanceRank (ascending).
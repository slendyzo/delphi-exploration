document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const submitIdeaBtnPage = document.getElementById('submitIdeaBtnPage');
    const submitIdeaSidebar = document.getElementById('submitIdeaSidebar');
    const closeSubmitSidebarBtn = document.getElementById('closeSubmitSidebarBtn');
    const submitIdeaForm = document.getElementById('submitIdeaForm');
    const ideasContainer = document.getElementById('ideasContainer');
    const overlay = document.getElementById('overlay');

    const viewIdeaSidebar = document.getElementById('viewIdeaSidebar');
    const closeViewSidebarBtn = document.getElementById('closeViewSidebarBtn');

    const leaderboardContainer = document.getElementById('leaderboardContainer');
    const leaderboardBody = document.getElementById('leaderboardBody');
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const filtersBtn = document.getElementById('filtersBtn');
    const filterPanel = document.getElementById('filterPanel');

    const positionButtons = document.querySelectorAll('#submitIdeaForm .position-btn');
    const hiddenPositionInput = document.getElementById('position');

    // --- Initial Data (Expanded Sample Ideas for Leaderboard) ---
    let ideas = [
        // Data now includes fields for both idea cards and leaderboard
        // Rank will be determined by sorting 'totalReturnsLeaderboard'
        {
            id: 1, title: "Buy TIA", description: "The future of HyperLiquid looks promising...", author: "Username", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("Username")}`, date: "May 19, 2025", symbol: "HYPE", network: "Ethereum", position: "Long", thesis: "The future of HyperLiquid is very bright due to its strong fundamentals and growing community adoption. We anticipate significant upside.", contractAddress: "0x2948...21238", totalReturn: "--", totalReturnsLeaderboard: "+33.000%", status: "Active", likes: 15, commentsCount: 3, shares: 5, marketCap: "$2.3B", volume: "$232.12M", performance: "+24%", exitDate: "July 24, 2025",
            comments: [
                { userAvatar: `https://i.pravatar.cc/30?u=Commenter1`, author: "CommenterOne", username: "@One", time: "2hr ago", text: "Solid thesis, I'm in!" },
                { userAvatar: `https://i.pravatar.cc/30?u=SkepticSal`, author: "SkepticSal", username: "@Sal", time: "1hr ago", text: "Hmm, seems a bit overhyped. What are the risks?" },
                { userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("Username")}`, author: "Username", username: "@Username", time: "30m ago", text: "Valid point Sal, main risk is regulatory uncertainty, but the tech is solid." }
            ]
        },
        {
            id: 2, title: "Short BTC", description: "Bitcoin facing headwinds...", author: "AlphaUser", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("AlphaUser")}`, date: "May 18, 2025", symbol: "BTC", network: "Bitcoin", position: "Short", thesis: "Bitcoin is overbought and due for a significant correction based on on-chain metrics and macroeconomic factors.", contractAddress: "N/A", totalReturn: "+180%", totalReturnsLeaderboard: "+27.500%", status: "Closed", likes: 10, commentsCount: 2, shares: 3, marketCap: "$1.2T", volume: "$180.45M", performance: "+19%", exitDate: "Aug 10, 2025",
            comments: [
                { userAvatar: `https://i.pravatar.cc/30?u=BullishBob`, author: "BullishBob", username: "@Bob", time: "5hr ago", text: "Shorting BTC? Brave soul!" },
                { userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("AlphaUser")}`, author: "AlphaUser", username: "@Alpha", time: "4hr ago", text: "It's a calculated risk. The indicators are there." }
            ]
        },
        {
            id: 3, title: "Long TIA again", description: "Celestia's modular approach is key...", author: "BetaTester", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("BetaTester")}`, date: "May 17, 2025", symbol: "TIA", network: "Celestia", position: "Long", thesis: "Celestia's modular design for blockchains is groundbreaking and will unlock new possibilities for developers. Long-term bullish.", contractAddress: "N/A", totalReturn: "+50%", totalReturnsLeaderboard: "+10.323%", status: "Active", likes: 5, commentsCount: 1, shares: 1, marketCap: "$2.5B", volume: "$300.75M", performance: "-53%", exitDate: "Sep 01, 2025",
            comments: [
                { userAvatar: `https://i.pravatar.cc/30?u=TechGuru`, author: "TechGuru", username: "@Guru", time: "1d ago", text: "Agreed, the modularity is a game changer." }
            ]
        },
        {
            id: 4, title: "KTA All In", description: "Kadena's multi-chain scalability.", author: "GammaGuest", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("GammaGuest")}`, date: "May 16, 2025", symbol: "KTA", network: "Kadena", position: "Long", thesis: "Kadena's unique chainweb architecture offers unparalleled scalability and security. Expecting exponential growth.", totalReturn:"--", totalReturnsLeaderboard: "+23.200%", status: "Active", likes: 2, commentsCount: 0, shares: 0, marketCap: "$100M", volume: "$150.60M", performance: "+24%", exitDate: "N/A", comments: []
        },
        {
            id: 5, title: "Bitcoin Dip Buy", description: "Accumulating BTC on this dip.", author: "DeltaDude", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("DeltaDude")}`, date: "May 15, 2025", symbol: "BTC", network: "Bitcoin", position: "Long", thesis: "This dip is a prime buying opportunity for Bitcoin before the next leg up. Strong support levels holding.", totalReturn:"--", totalReturnsLeaderboard: "+22.120%", status: "Pending", likes: 7, commentsCount: 0, shares: 0, marketCap: "$1.2T", volume: "$275.10M", performance: "-11%", exitDate: "N/A", comments: []
        },
        {
            id: 6, title: "POPCAT Mania", description: "Popcat to the moon!", author: "EpsilonExpert", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("EpsilonExpert")}`, date: "May 14, 2025", symbol: "POPCAT", network: "Solana", position: "Long", thesis: "POPCAT has the meme potential and community backing to see massive gains. Still early days.", totalReturn:"--", totalReturnsLeaderboard: "+12.430%", status: "Active", likes: 15, commentsCount: 0, shares: 0, marketCap: "$50M", volume: "$290.00M", performance: "+21%", exitDate: "N/A", comments: []
        },
        {
            id: 7, title: "WIF Next Wave", description: "Dogwifhat still has room.", author: "ZetaZone", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("ZetaZone")}`, date: "May 13, 2025", symbol: "WIF", network: "Solana", position: "Long", thesis: "While WIF has had a good run, the narrative is still strong and further upside is expected.", totalReturn:"--", totalReturnsLeaderboard: "+7.560%", status: "Closed", likes: 9, commentsCount: 0, shares: 0, marketCap: "$300M", volume: "$160.90M", performance: "+23%", exitDate: "N/A", comments: []
        },
        {
            id: 8, title: "Short INIT", description: "INIT protocol looks overvalued.", author: "EtaUser", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("EtaUser")}`, date: "May 12, 2025", symbol: "INIT", network: "Ethereum", position: "Short", thesis: "INIT's current valuation doesn't match its utility or user adoption. A correction is imminent.", totalReturn:"--", totalReturnsLeaderboard: "+3.450%", status: "Active", likes: 3, commentsCount: 0, shares: 0, marketCap: "$80M", volume: "$120.45M", performance: "+170%", exitDate: "N/A", comments: []
        },
        {
            id: 9, title: "CRV Bounce", description: "Curve Finance recovery.", author: "ThetaTester", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("ThetaTester")}`, date: "May 11, 2025", symbol: "CRV", network: "Ethereum", position: "Long", thesis: "Curve Finance is a cornerstone of DeFi and is poised for a strong recovery as market conditions improve.", totalReturn:"--", totalReturnsLeaderboard: "+2.310%", status: "Pending", likes: 6, commentsCount: 0, shares: 0, marketCap: "$500M", volume: "$310.30M", performance: "-25%", exitDate: "N/A", comments: []
        },
        {
            id: 10, title: "FARTCOIN Gem", description: "This is the one!", author: "IotaInfluencer", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("IotaInfluencer")}`, date: "May 10, 2025", symbol: "FARTCOIN", network: "BSC", position: "Long", thesis: "FARTCOIN has revolutionary tokenomics and a dedicated community. Next 100x easily. (Not financial advice).", totalReturn:"--", totalReturnsLeaderboard: "+1.040%", status: "Active", likes: 22, commentsCount: 0, shares: 0, marketCap: "$1M", volume: "$250.20M", performance: "+20%", exitDate: "N/A", comments: []
        }
    ];

    // --- Functions ---
    function toggleSidebar(sidebar, open) {
        if (!sidebar) { console.error('[toggleSidebar] Sidebar element is null or undefined.'); return; }
        if (open) { sidebar.classList.add('open'); if (overlay) overlay.classList.add('active'); }
        else { sidebar.classList.remove('open'); if (overlay) overlay.classList.remove('active'); }
    }

    function renderIdeas() {
        if (!ideasContainer) return;
        ideasContainer.innerHTML = '';
        // For "Ideas" tab, perhaps show all or a limited number, e.g., most recent
        const ideasToDisplay = ideas.slice().sort((a, b) => b.id - a.id).slice(0, 4); // Show latest 4
        ideasToDisplay.forEach(idea => {
            const ideaCard = createIdeaCard(idea);
            if (ideaCard) ideasContainer.appendChild(ideaCard);
        });
    }

    function createIdeaCard(idea) {
        // ... (createIdeaCard function remains the same as your last working version) ...
        // Ensure it correctly creates card HTML from an 'idea' object
        if (!idea) { console.error("[createIdeaCard] Idea object is undefined."); return null; }
        const card = document.createElement('div');
        card.classList.add('idea-card');
        card.dataset.ideaId = idea.id;

        let networkIconHtml = '';
        if (idea.network) {
            const networkLower = idea.network.toLowerCase();
            if (networkLower === 'ethereum' || networkLower === 'bsc') networkIconHtml = `<i class="fab fa-ethereum"></i>`;
            else if (networkLower === 'solana') networkIconHtml = `<i class="fa-brands fa-solana"></i>`; // Make sure you have this icon
            else if (networkLower === 'bitcoin') networkIconHtml = `<i class="fab fa-btc"></i>`;
            // Add other icons as needed: Kadena, Celestia etc.
            // else if (networkLower === 'celestia') networkIconHtml = `<span>CE</span>`; // Placeholder
            // else if (networkLower === 'kadena') networkIconHtml = `<span>KD</span>`; // Placeholder
        }

        try {
            card.innerHTML = `
                <div class="idea-card-top-section">
                    <div class="idea-card-main-info">
                        <h3>${idea.title || 'Untitled Idea'}</h3>
                        <p class="idea-card-description">${idea.description || 'No description.'}</p>
                    </div>
                    <div class="idea-card-meta-island">
                        <span class="idea-card-date">${idea.date || ''}</span>
                        <div class="idea-card-island">
                            <div class="island-left-content">
                                <div class="island-position-asset">
                                    <span class="tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}">${idea.position || ''}</span>
                                    ${networkIconHtml}
                                    <span class="tag-asset">${idea.symbol || ''}</span>
                                </div>
                                <div class="island-total-return">
                                    Total Return <span>${idea.totalReturn || '--'}</span>
                                </div>
                            </div>
                            <div class="island-status">${idea.status || ''}</div>
                        </div>
                    </div>
                </div>
                <div class="idea-card-bottom-section">
                    <span class="idea-card-author">
                        <img src="${idea.authorAvatar || `https://i.pravatar.cc/20?u=${encodeURIComponent(idea.author || 'anon')}`}" alt="${idea.author || 'anon'}">
                        ${idea.author || 'Anonymous'}
                    </span>
                    <div class="idea-card-actions">
                        <button title="Like"><i class="far fa-heart"></i> ${idea.likes || 0}</button>
                        <button title="Comment"><i class="far fa-comment"></i> ${idea.commentsCount || 0}</button>
                        <button title="Bookmark"><i class="far fa-bookmark"></i></button>
                    </div>
                </div>`;
        } catch (error) {
            console.error(`[createIdeaCard] Error setting innerHTML for ${idea.title || `ID: ${idea.id}`}:`, error, idea);
            return card;
        }

        card.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            populateViewSidebar(idea.id);
            toggleSidebar(viewIdeaSidebar, true);
        });
        return card;
    }


    if (submitIdeaForm) {
        submitIdeaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            const currentAuthorName = "YouNotAnil#23"; // Example logged-in user
            const newIdea = {
                id: Date.now(),
                title: `${formData.get('position')} ${formData.get('symbol').toUpperCase()}`,
                description: formData.get('thesis').substring(0, 100) + (formData.get('thesis').length > 100 ? '...' : ''),
                author: currentAuthorName,
                authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent(currentAuthorName + Date.now())}`,
                date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                symbol: formData.get('symbol').toUpperCase(),
                network: formData.get('network'),
                position: formData.get('position'),
                thesis: formData.get('thesis'),
                contractAddress: formData.get('contractAddress'),
                totalReturn: "--", // For idea card
                totalReturnsLeaderboard: "0.000%", // For leaderboard
                status: "Pending",
                likes: 0,
                commentsCount: 0,
                shares: 0, // Or bookmark count
                marketCap: "N/A",
                volume: "N/A", // 24h volume
                performance: "N/A", // 24h performance
                exitDate: "TBD",
                comments: []
            };
            ideas.unshift(newIdea); // Add to the beginning
            renderIdeas(); // Re-render ideas tab content
            const activeSubNav = document.querySelector('.sub-nav-link.active');
            if (activeSubNav && activeSubNav.dataset.tab === 'leaderboard') {
                renderLeaderboard(); // Also re-render leaderboard if it's active
            }
            toggleSidebar(submitIdeaSidebar, false);
            this.reset();
            if (positionButtons.length > 0) {
                positionButtons.forEach(btn => btn.classList.remove('active'));
                positionButtons[0].classList.add('active');
                if (hiddenPositionInput) hiddenPositionInput.value = positionButtons[0].dataset.value;
            }
        });
    }

    function populateViewSidebar(ideaId) {
        // ... (populateViewSidebar function remains the same) ...
        try {
            const idea = ideas.find(i => i.id == ideaId);
            if (!idea) { console.error(`[populateViewSidebar] Idea not found for ID: ${ideaId}`); return; }
            if (!viewIdeaSidebar) { console.error("View idea sidebar not found"); return; }

            viewIdeaSidebar.querySelector('#viewIdeaTitle').textContent = idea.title;
            viewIdeaSidebar.querySelector('#viewIdeaUserDate').textContent = `${idea.author || 'Anonymous'} • ${idea.date}`;
            const posTag = viewIdeaSidebar.querySelector('#viewIdeaPosition');
            posTag.textContent = idea.position || 'N/A';
            posTag.className = `tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}`;
            viewIdeaSidebar.querySelector('#viewIdeaSymbolDisplay').textContent = idea.symbol;
            viewIdeaSidebar.querySelector('#viewIdeaTotalReturn').innerHTML = idea.totalReturn || '--'; // This is the card's total return
            viewIdeaSidebar.querySelector('#viewIdeaStatus').textContent = idea.status;
            viewIdeaSidebar.querySelector('#viewIdeaLikes').textContent = idea.likes || 0;
            viewIdeaSidebar.querySelector('#viewIdeaCommentsCount').textContent = idea.commentsCount || 0;
            viewIdeaSidebar.querySelector('#viewIdeaShares').textContent = idea.shares || 0; // Or bookmark count

            // INFO section
            viewIdeaSidebar.querySelector('#viewInfoSymbol').textContent = idea.symbol;
            viewIdeaSidebar.querySelector('#viewInfoNetwork').textContent = idea.network || "N/A";
            viewIdeaSidebar.querySelector('#viewInfoMarketCap').textContent = idea.marketCap || "N/A";
            viewIdeaSidebar.querySelector('#viewInfoVolume').textContent = idea.volume || "N/A"; // This is 24h volume
            viewIdeaSidebar.querySelector('#viewInfoContract').textContent = idea.contractAddress || "N/A";
            const perfEl = viewIdeaSidebar.querySelector('#viewInfoPerformance');
            perfEl.textContent = idea.performance || "N/A"; // This is 24h performance
            perfEl.classList.remove('positive-perf', 'negative-perf');
            if (idea.performance && idea.performance.startsWith('+')) perfEl.classList.add('positive-perf');
            if (idea.performance && idea.performance.startsWith('-')) perfEl.classList.add('negative-perf');

            viewIdeaSidebar.querySelector('#viewIdeaThesisText').textContent = idea.thesis || '';
            viewIdeaSidebar.querySelector('#viewIdeaExitDate').textContent = idea.exitDate || "N/A";

            const commentSection = viewIdeaSidebar.querySelector('.comments-section');
            if (commentSection) commentSection.dataset.currentIdeaId = idea.id;
            renderComments(idea.id);
        } catch (error) { console.error(`[populateViewSidebar] Error for ID ${ideaId}:`, error); }
    }

    function renderComments(ideaId) {
        // ... (renderComments function remains the same) ...
        const idea = ideas.find(i => i.id == ideaId);
        const commentList = document.getElementById('commentList');
        if (!commentList) return;
        commentList.innerHTML = '';
        if (idea && idea.comments) {
            idea.comments.forEach(comment => {
                const commentDiv = document.createElement('div');
                commentDiv.classList.add('comment');
                const avatarSrc = comment.userAvatar || `https://i.pravatar.cc/30?u=${encodeURIComponent(comment.author || 'anon')}`;
                commentDiv.innerHTML = `
                    <img src="${avatarSrc}" alt="User Avatar" class="user-avatar-comment">
                    <div class="comment-content">
                        <div class="comment-author">${comment.author || ''} <span class="comment-username">${comment.username || ''}</span> <span class="comment-time">${comment.time || ''}</span></div>
                        <div class="comment-text">${comment.text || ''}</div>
                    </div>`;
                commentList.appendChild(commentDiv);
            });
        }
        const countEl = document.getElementById('viewIdeaCommentsCount');
        if (countEl) countEl.textContent = idea && idea.comments ? idea.comments.length : 0;
        updateCardCommentCount(ideaId, idea && idea.comments ? idea.comments.length : 0);
    }

    function updateCardCommentCount(ideaId, count) {
        // ... (updateCardCommentCount function remains the same) ...
        if (!ideasContainer) return;
        const card = ideasContainer.querySelector(`.idea-card[data-idea-id='${ideaId}']`);
        if (card) {
            const commentCountElement = card.querySelector('.fa-comment');
            if (commentCountElement && commentCountElement.nextSibling) {
                 commentCountElement.nextSibling.textContent = ` ${count}`;
            }
            const ideaInArray = ideas.find(i => i.id == ideaId);
            if(ideaInArray) ideaInArray.commentsCount = count;
        }
    }


    const sendCommentBtn = document.getElementById('sendCommentBtn');
    const newCommentText = document.getElementById('newCommentText');
    if (sendCommentBtn && newCommentText) {
        sendCommentBtn.addEventListener('click', () => {
            // ... (sendCommentBtn listener remains the same) ...
            const commentTextVal = newCommentText.value.trim();
            if (!commentTextVal) return;
            const commentSection = document.querySelector('#viewIdeaSidebar .comments-section');
            if (!commentSection) return;
            const currentIdeaId = commentSection.dataset.currentIdeaId;
            const idea = ideas.find(i => i.id == currentIdeaId);
            if (idea) {
                const newComment = {
                    userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("CurrentUser" + Date.now())}`,
                    author: "CurrentUser", username: "@current", time: "Just now", text: commentTextVal
                };
                if (!idea.comments) idea.comments = [];
                idea.comments.push(newComment);
                idea.commentsCount = idea.comments.length;
                renderComments(currentIdeaId);
                newCommentText.value = '';
            }
        });
    }

    // --- Event Listeners (Setup) ---

// --- Mobile Navigation Toggle ---
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const mainNav = document.querySelector('.main-nav');
// const pageOverlay = document.getElementById('overlay'); // Already have this as 'overlay'

if (mobileNavToggle && mainNav) {
    mobileNavToggle.addEventListener('click', () => {
        const isNavOpen = mainNav.classList.contains('active');
        mobileNavToggle.setAttribute('aria-expanded', !isNavOpen);
        mainNav.classList.toggle('active');
        if (overlay) { // Check if overlay exists
             overlay.classList.toggle('mobile-nav-active'); // Use a specific class for nav overlay
        }
        // Optional: Prevent body scroll when nav is open
        // document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
    });

    // Close mobile nav if overlay is clicked
    if (overlay) {
        overlay.addEventListener('click', () => {
            if (mainNav.classList.contains('active')) {
                mainNav.classList.remove('active');
                mobileNavToggle.setAttribute('aria-expanded', 'false');
                overlay.classList.remove('mobile-nav-active');
                // document.body.style.overflow = '';
            }
        });
    }
}

// (Optional) Mobile Search Toggle - basic alert for now
const mobileSearchToggle = document.querySelector('.search-toggle-mobile');
if (mobileSearchToggle) {
    mobileSearchToggle.addEventListener('click', () => {
        alert('Mobile search to be implemented! Could show a full screen search input.');
        // Here you would typically show a full-screen search overlay or input field
    });
}

    if (submitIdeaBtnPage) submitIdeaBtnPage.addEventListener('click', () => toggleSidebar(submitIdeaSidebar, true));
    if (closeSubmitSidebarBtn) closeSubmitSidebarBtn.addEventListener('click', () => toggleSidebar(submitIdeaSidebar, false));
    if (closeViewSidebarBtn) closeViewSidebarBtn.addEventListener('click', () => toggleSidebar(viewIdeaSidebar, false));
    if (overlay) overlay.addEventListener('click', () => {
        toggleSidebar(submitIdeaSidebar, false);
        toggleSidebar(viewIdeaSidebar, false);
    });
    if (positionButtons.length > 0) {
        positionButtons.forEach(button => {
            button.addEventListener('click', () => {
                positionButtons.forEach(btn => btn.classList.remove('active'));
                button.classList.add('active');
                if (hiddenPositionInput) hiddenPositionInput.value = button.dataset.value;
            });
        });
    }

    // --- Leaderboard Tab & Filter Logic ---
    function renderLeaderboard() {
        if (!leaderboardBody) { console.error("Leaderboard body (tbody) not found!"); return; }
        leaderboardBody.innerHTML = ''; // Clear existing rows
    
        const sortedIdeas = [...ideas];
        sortedIdeas.sort((a, b) => {
            const returnA = parseFloat(a.totalReturnsLeaderboard?.replace(/[+%]/g, '')) || 0; // Remove % and +
            const returnB = parseFloat(b.totalReturnsLeaderboard?.replace(/[+%]/g, '')) || 0; // Remove % and +
            return returnB - returnA; // Descending order
        });
    
        sortedIdeas.forEach((idea, index) => {
            const rank = index + 1;
            const row = document.createElement('tr');
            row.dataset.ideaId = idea.id;
    
            let symbolIconHtml = '';
            if (idea.network) {
                const networkLower = idea.network.toLowerCase();
                if (networkLower === 'ethereum' || networkLower === 'bsc') symbolIconHtml = `<i class="fab fa-ethereum leaderboard-symbol-icon"></i>`;
                else if (networkLower === 'solana') symbolIconHtml = `<i class="fa-brands fa-solana leaderboard-symbol-icon"></i>`;
                else if (networkLower === 'bitcoin') symbolIconHtml = `<i class="fab fa-btc leaderboard-symbol-icon"></i>`;
                // For symbols like KTA, POPCAT, WIF, INIT, CRV, FARTCOIN, if no direct FA icon,
                // we could use a generic one or a placeholder, or leave it blank.
                // For now, if no specific icon, it will be blank.
                // else symbolIconHtml = `<i class="fas fa-circle-question leaderboard-symbol-icon"></i>`; // Generic
            }
             // Ensure the idea object has the symbol property.
            const symbolText = idea.symbol || 'N/A';
    
    
            // Performance and Status cell classes
            const performanceRaw = parseFloat(idea.performance?.replace(/[+%]/g, ''));
            const performanceClass = isNaN(performanceRaw) ? '' : (performanceRaw >= 0 ? 'positive' : 'negative');
            const statusClass = idea.status ? idea.status.toLowerCase() : '';
    
            row.innerHTML = `
                <td class="rank-cell">${rank}</td>
                <td class="user-symbol-cell">
                    <div class="user-info">
                        <img src="${idea.authorAvatar || `https://i.pravatar.cc/24?u=${encodeURIComponent(idea.author || 'anon')}`}" alt="${idea.author || 'anon'}" class="leaderboard-user-avatar">
                        <span class="leaderboard-username">${idea.author || 'Anonymous'}</span>
                    </div>
                    <div class="symbol-info">
                        ${symbolIconHtml}
                        <span class="leaderboard-symbol-text">${symbolText}</span>
                    </div>
                </td>
                <td class="total-returns-cell">${idea.totalReturnsLeaderboard || 'N/A'}</td>
                <td class="position-cell">
                    <span class="tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}">${idea.position || 'N/A'}</span>
                </td>
                <td class="performance-cell ${performanceClass}">
                    ${idea.performance || 'N/A'}
                </td>
                <td class="volume-cell">${idea.volume || 'N/A'}</td>
                <td class="status-cell ${statusClass}">${idea.status || 'N/A'}</td>
            `;
    
            row.addEventListener('click', () => {
                populateViewSidebar(idea.id);
                toggleSidebar(viewIdeaSidebar, true);
            });
            leaderboardBody.appendChild(row);
        });
    }
    
    function setActiveTab(targetTab) {
        if (!subNavLinks || subNavLinks.length === 0) return;
        subNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.tab === targetTab) link.classList.add('active');
        });

        const pageTitleElement = document.querySelector('.feature-header h1');

        if (targetTab === 'ideas') {
            if (ideasContainer) ideasContainer.style.display = 'flex';
            if (leaderboardContainer) leaderboardContainer.style.display = 'none';
            if (filtersBtn) filtersBtn.style.display = 'none';
            if (filterPanel) filterPanel.style.display = 'none';
            if (pageTitleElement) pageTitleElement.textContent = 'Untitled Shill Feature';
            renderIdeas();
        } else if (targetTab === 'leaderboard') {
            if (ideasContainer) ideasContainer.style.display = 'none';
            if (leaderboardContainer) leaderboardContainer.style.display = 'block';
            if (filtersBtn) filtersBtn.style.display = 'inline-flex';
            if (pageTitleElement) pageTitleElement.textContent = 'Untitled Shill Feature'; // Or 'Leaderboard'
            renderLeaderboard();
        }
    }

    if (subNavLinks.length > 0) {
        subNavLinks.forEach(link => {
            link.addEventListener('click', (event) => {
                event.preventDefault();
                const targetTab = event.target.dataset.tab;
                setActiveTab(targetTab);
            });
        });
    }

    if (filtersBtn) {
        filtersBtn.addEventListener('click', () => {
            if (filterPanel) {
                filterPanel.style.display = (filterPanel.style.display === 'none' || filterPanel.style.display === '') ? 'block' : 'none';
            }
        });
    }

    // --- Initial Page Load ---
    setActiveTab('ideas'); // Default to 'ideas' tab
});
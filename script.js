document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const submitIdeaBtnPage = document.getElementById('submitIdeaBtnPage');
    const submitIdeaSidebar = document.getElementById('submitIdeaSidebar');
    const closeSubmitSidebarBtn = document.getElementById('closeSubmitSidebarBtn');
    const submitIdeaForm = document.getElementById('submitIdeaForm'); // Ensured it's declared
    const ideasContainerV1 = document.getElementById('ideasContainerV1');
    const ideasContainerV2 = document.getElementById('ideasContainerV2');
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
    const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const mainNav = document.querySelector('.main-nav');
    const mobileSearchToggle = document.querySelector('.search-toggle-mobile');

    // --- Initial Data (Sample Ideas) ---
    let ideas = [
        { id: 1, title: "Buy TIA", description: "The future of HyperLiquid looks promising...", author: "Username", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("Username")}`, date: "May 19, 2025", symbol: "HYPE", network: "Ethereum", position: "Long", thesis: "The future of HyperLiquid is very bright...", contractAddress: "0x2948...21238", totalReturn: "--", totalReturnsLeaderboard: "+33.000%", status: "Active", likes: 15, commentsCount: 3, shares: 5, marketCap: "$2.3B", volume: "$232.12M", performance: "+24%", exitDate: "July 24, 2025", isLiked: false, comments: [ { userAvatar: `https://i.pravatar.cc/30?u=Commenter1`, author: "CommenterOne", username: "@One", time: "2hr ago", text: "Solid thesis, I'm in!" }, { userAvatar: `https://i.pravatar.cc/30?u=SkepticSal`, author: "SkepticSal", username: "@Sal", time: "1hr ago", text: "Hmm, seems a bit overhyped. What are the risks?" }, { userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("Username")}`, author: "Username", username: "@Username", time: "30m ago", text: "Valid point Sal, main risk is regulatory uncertainty, but the tech is solid." } ] },
        { id: 2, title: "Short BTC", description: "Bitcoin facing headwinds...", author: "AlphaUser", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("AlphaUser")}`, date: "May 18, 2025", symbol: "BTC", network: "Bitcoin", position: "Short", thesis: "Bitcoin is overbought and due for a significant correction...", contractAddress: "N/A", totalReturn: "+180%", totalReturnsLeaderboard: "+27.500%", status: "Closed", likes: 10, commentsCount: 2, shares: 3, marketCap: "$1.2T", volume: "$180.45M", performance: "+19%", exitDate: "Aug 10, 2025", isLiked: false, comments: [ { userAvatar: `https://i.pravatar.cc/30?u=BullishBob`, author: "BullishBob", username: "@Bob", time: "5hr ago", text: "Shorting BTC? Brave soul!" }, { userAvatar: `https://i.pravatar.cc/30?u=${encodeURIComponent("AlphaUser")}`, author: "AlphaUser", username: "@Alpha", time: "4hr ago", text: "It's a calculated risk. The indicators are there." } ] },
        { id: 3, title: "Long TIA again", description: "Celestia's modular approach is key...", author: "BetaTester", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("BetaTester")}`, date: "May 17, 2025", symbol: "TIA", network: "Celestia", position: "Long", thesis: "Celestia's modular design for blockchains is groundbreaking...", contractAddress: "N/A", totalReturn: "+50%", totalReturnsLeaderboard: "+10.323%", status: "Active", likes: 5, commentsCount: 1, shares: 1, marketCap: "$2.5B", volume: "$300.75M", performance: "-53%", exitDate: "Sep 01, 2025", isLiked: false, comments: [ { userAvatar: `https://i.pravatar.cc/30?u=TechGuru`, author: "TechGuru", username: "@Guru", time: "1d ago", text: "Agreed, the modularity is a game changer." } ] },
        { id: 4, title: "KTA All In", description: "Kadena's multi-chain scalability.", author: "GammaGuest", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("GammaGuest")}`, date: "May 16, 2025", symbol: "KTA", network: "Kadena", position: "Long", thesis: "Kadena's unique chainweb architecture...", totalReturn:"--", totalReturnsLeaderboard: "+23.200%", status: "Active", likes: 2, commentsCount: 0, shares: 0, marketCap: "$100M", volume: "$150.60M", performance: "+24%", exitDate: "N/A", isLiked: false, comments: [] },
        { id: 5, title: "Bitcoin Dip Buy", description: "Accumulating BTC on this dip.", author: "DeltaDude", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("DeltaDude")}`, date: "May 15, 2025", symbol: "BTC", network: "Bitcoin", position: "Long", thesis: "This dip is a prime buying opportunity...", totalReturn:"--", totalReturnsLeaderboard: "+22.120%", status: "Pending", likes: 7, commentsCount: 0, shares: 0, marketCap: "$1.2T", volume: "$275.10M", performance: "-11%", exitDate: "N/A", isLiked: false, comments: [] },
        { id: 6, title: "POPCAT Mania", description: "Popcat to the moon!", author: "EpsilonExpert", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("EpsilonExpert")}`, date: "May 14, 2025", symbol: "POPCAT", network: "Solana", position: "Long", thesis: "POPCAT has the meme potential...", totalReturn:"--", totalReturnsLeaderboard: "+12.430%", status: "Active", likes: 15, commentsCount: 0, shares: 0, marketCap: "$50M", volume: "$290.00M", performance: "+21%", exitDate: "N/A", isLiked: false, comments: [] },
        { id: 7, title: "WIF Next Wave", description: "Dogwifhat still has room.", author: "ZetaZone", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("ZetaZone")}`, date: "May 13, 2025", symbol: "WIF", network: "Solana", position: "Long", thesis: "While WIF has had a good run...", totalReturn:"--", totalReturnsLeaderboard: "+7.560%", status: "Closed", likes: 9, commentsCount: 0, shares: 0, marketCap: "$300M", volume: "$160.90M", performance: "+23%", exitDate: "N/A", isLiked: false, comments: [] },
        { id: 8, title: "Short INIT", description: "INIT protocol looks overvalued.", author: "EtaUser", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("EtaUser")}`, date: "May 12, 2025", symbol: "INIT", network: "Ethereum", position: "Short", thesis: "INIT's current valuation doesn't match...", totalReturn:"--", totalReturnsLeaderboard: "+3.450%", status: "Active", likes: 3, commentsCount: 0, shares: 0, marketCap: "$80M", volume: "$120.45M", performance: "+170%", exitDate: "N/A", isLiked: false, comments: [] },
        { id: 9, title: "CRV Bounce", description: "Curve Finance recovery.", author: "ThetaTester", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("ThetaTester")}`, date: "May 11, 2025", symbol: "CRV", network: "Ethereum", position: "Long", thesis: "Curve Finance is a cornerstone of DeFi...", totalReturn:"--", totalReturnsLeaderboard: "+2.310%", status: "Pending", likes: 6, commentsCount: 0, shares: 0, marketCap: "$500M", volume: "$310.30M", performance: "-25%", exitDate: "N/A", isLiked: false, comments: [] },
        { id: 10, title: "FARTCOIN Gem", description: "This is the one!", author: "IotaInfluencer", authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent("IotaInfluencer")}`, date: "May 10, 2025", symbol: "FARTCOIN", network: "BSC", position: "Long", thesis: "FARTCOIN has revolutionary tokenomics...", totalReturn:"--", totalReturnsLeaderboard: "+1.040%", status: "Active", likes: 22, commentsCount: 0, shares: 0, marketCap: "$1M", volume: "$250.20M", performance: "+20%", exitDate: "N/A", isLiked: false, comments: [] }
    ];

    // --- Functions ---
    function toggleSidebar(sidebar, open) {
        if (!sidebar) { console.error('[toggleSidebar] Sidebar element is null or undefined.'); return; }
        const mobileNavToggleButton = document.querySelector('.mobile-nav-toggle');
        if (open) {
            sidebar.classList.add('open');
            if (overlay) overlay.classList.add('active');
            if (mobileNavToggleButton && window.innerWidth <= 768) mobileNavToggleButton.style.display = 'none';
        } else {
            sidebar.classList.remove('open');
            if (overlay) overlay.classList.remove('active');
            if (mobileNavToggleButton && window.innerWidth <= 768 && mainNav && !mainNav.classList.contains('active')) {
                mobileNavToggleButton.style.display = 'flex';
            }
        }
    }

    function renderIdeasV1() {
        if (!ideasContainerV1) { console.error("ideasContainerV1 not found"); return; }
        ideasContainerV1.innerHTML = '';
        const ideasToDisplay = ideas.slice().sort((a, b) => b.id - a.id).slice(0, 10);
        ideasToDisplay.forEach(idea => {
            const ideaCard = createIdeaCard(idea); // Uses original card style
            if (ideaCard) ideasContainerV1.appendChild(ideaCard);
        });
    }

    function createIdeaCard(idea) { // This is for V1 ideas
        if (!idea) { console.error("[createIdeaCard] Idea object is undefined."); return null; }
        const card = document.createElement('div');
        card.classList.add('idea-card');
        card.dataset.ideaId = idea.id;
        let networkIconHtml = '';
        if (idea.network) {
            const networkLower = idea.network.toLowerCase();
            if (networkLower === 'ethereum' || networkLower === 'bsc') networkIconHtml = `<i class="fab fa-ethereum"></i>`;
            else if (networkLower === 'solana') networkIconHtml = `<i class="fa-brands fa-solana"></i>`;
            else if (networkLower === 'bitcoin') networkIconHtml = `<i class="fab fa-btc"></i>`;
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
                                <div class="island-total-return">Total Return <span>${idea.totalReturn || '--'}</span></div>
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
        } catch (error) { console.error(`[createIdeaCard] Error for ${idea.title || `ID: ${idea.id}`}:`, error, idea); return card; }
        card.addEventListener('click', (e) => { if (e.target.closest('button')) return; populateViewSidebar(idea.id); toggleSidebar(viewIdeaSidebar, true); });
        return card;
    }

    function renderIdeasV2() {
        if (!ideasContainerV2) { console.error("ideasContainerV2 not found"); return; }
        ideasContainerV2.innerHTML = '';
        ideas.forEach(idea => {
            const ideaCardV2 = createIdeaCardV2(idea);
            if (ideaCardV2) ideasContainerV2.appendChild(ideaCardV2);
        });
    }

    function createIdeaCardV2(idea) {
        if (!idea) { console.error("[createIdeaCardV2] Idea object is undefined."); return null; }
        const card = document.createElement('div');
        card.classList.add('idea-card-v2');
        card.dataset.ideaId = idea.id;
        let symbolIconHtml = '';
        if (idea.network) {
            const networkLower = idea.network.toLowerCase();
            if (networkLower === 'ethereum' || networkLower === 'bsc') symbolIconHtml = `<i class="fab fa-ethereum"></i>`;
            else if (networkLower === 'solana') symbolIconHtml = `<i class="fa-brands fa-solana"></i>`;
            else if (networkLower === 'bitcoin') symbolIconHtml = `<i class="fab fa-btc"></i>`;
        }
        const returnOrPerf = idea.totalReturnsLeaderboard || idea.performance || '--';
        const returnClass = (returnOrPerf.startsWith('+') || parseFloat(returnOrPerf.replace(/[+%]/g,'')) > 0) ? 'positive' : (returnOrPerf.startsWith('-') || parseFloat(returnOrPerf.replace(/[+%]/g,'')) < 0) ? 'negative' : '';
        const isLiked = idea.isLiked || false;

        card.innerHTML = `
            <div class="idea-card-v2-header">
                <h3 class="idea-card-v2-title">${idea.title || 'Untitled Idea'}</h3>
                <span class="idea-card-v2-date">${idea.date || ''}</span>
            </div>
            <p class="idea-card-v2-description">${idea.description ? idea.description.substring(0,120) + (idea.description.length > 120 ? '...' : '') : 'No description.'}</p>
            <div class="idea-card-v2-main-content">
                <div class="idea-card-v2-details-island">
                    <span class="tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}">${idea.position || ''}</span>
                    ${symbolIconHtml}
                    <span class="idea-card-v2-symbol">${idea.symbol || ''}</span>
                    <span class="idea-card-v2-return ${returnClass}">${returnOrPerf}</span>
                </div>
                <span class="idea-card-v2-status ${idea.status ? idea.status.toLowerCase() : ''}">${idea.status || ''}</span>
            </div>
            <div class="idea-card-v2-footer">
                <div class="idea-card-v2-author">
                    <img src="${idea.authorAvatar || `https://i.pravatar.cc/20?u=${encodeURIComponent(idea.author || 'anon')}`}" alt="${idea.author || 'anon'}">
                    <span>${idea.author || 'Anonymous'}</span>
                </div>
                <div class="idea-card-v2-actions">
                    <button class="like-btn-v2 ${isLiked ? 'liked' : ''}" data-idea-id="${idea.id}" title="Like">
                        <i class="${isLiked ? 'fas' : 'far'} fa-heart"></i> <span class="like-count">${idea.likes || 0}</span>
                    </button>
                    <button title="Comment"><i class="far fa-comment"></i> ${idea.commentsCount || 0}</button>
                    <button title="Bookmark"><i class="far fa-bookmark"></i></button>
                </div>
            </div>`;
        const likeButton = card.querySelector('.like-btn-v2');
        if (likeButton) {
            likeButton.addEventListener('click', function(event) {
                event.stopPropagation();
                const clickedIdeaId = this.dataset.ideaId;
                const ideaToUpdate = ideas.find(i => i.id == clickedIdeaId);
                if (ideaToUpdate) {
                    ideaToUpdate.isLiked = !ideaToUpdate.isLiked;
                    if (ideaToUpdate.isLiked) ideaToUpdate.likes = (ideaToUpdate.likes || 0) + 1;
                    else ideaToUpdate.likes = Math.max(0, (ideaToUpdate.likes || 0) - 1);
                    this.classList.toggle('liked', ideaToUpdate.isLiked);
                    this.querySelector('.like-count').textContent = ideaToUpdate.likes;
                    const heartIcon = this.querySelector('i');
                    if (heartIcon) { heartIcon.classList.toggle('far', !ideaToUpdate.isLiked); heartIcon.classList.toggle('fas', ideaToUpdate.isLiked); }
                    const viewSidebarEl = document.getElementById('viewIdeaSidebar'); // Renamed to avoid conflict
                    if (viewSidebarEl.classList.contains('open')) {
                        const currentSidebarIdeaId = viewSidebarEl.querySelector('.comments-section')?.dataset.currentIdeaId;
                        if (currentSidebarIdeaId == clickedIdeaId) {
                            const likesSpan = viewSidebarEl.querySelector('#viewIdeaLikes');
                            if (likesSpan) likesSpan.textContent = ideaToUpdate.likes;
                        }
                    }
                }
            });
        }
        card.addEventListener('click', (e) => {
            if (e.target.closest('button.like-btn-v2') || e.target.closest('button[title="Comment"]') || e.target.closest('button[title="Bookmark"]')) return;
            populateViewSidebar(idea.id); toggleSidebar(viewIdeaSidebar, true);
        });
        return card;
    }
    
    if (submitIdeaForm) {
        submitIdeaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            const formData = new FormData(this);
            const currentAuthorName = "YouNotAnil#23";
            const newIdea = {
                id: Date.now(), title: `${formData.get('position')} ${formData.get('symbol').toUpperCase()}`,
                description: formData.get('thesis').substring(0, 100) + (formData.get('thesis').length > 100 ? '...' : ''),
                author: currentAuthorName, authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent(currentAuthorName + Date.now())}`,
                date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                symbol: formData.get('symbol').toUpperCase(), network: formData.get('network'), position: formData.get('position'),
                thesis: formData.get('thesis'), contractAddress: formData.get('contractAddress'), totalReturn: "--",
                totalReturnsLeaderboard: "0.000%", status: "Pending", likes: 0, commentsCount: 0, shares: 0, isLiked: false,
                marketCap: "N/A", volume: "N/A", performance: "N/A", exitDate: "TBD", comments: []
            };
            ideas.unshift(newIdea);
            const activeSubNav = document.querySelector('.sub-nav-link.active');
            if (activeSubNav) {
                const currentTab = activeSubNav.dataset.tab;
                if (currentTab === 'ideas-v1') renderIdeasV1();
                else if (currentTab === 'ideas-v2') renderIdeasV2();
                else if (currentTab === 'leaderboard') renderLeaderboard();
            } else { renderIdeasV1(); }
            toggleSidebar(submitIdeaSidebar, false);
            this.reset();
            if (positionButtons.length > 0) {
                positionButtons.forEach(btn => btn.classList.remove('active'));
                positionButtons[0].classList.add('active');
                if (hiddenPositionInput) hiddenPositionInput.value = positionButtons[0].dataset.value;
            }
        });
    } else { console.error("Submit Idea Form (#submitIdeaForm) not found!"); }

    function populateViewSidebar(ideaId) {
        // ... (This function remains largely the same, ensure it uses the correct IDs from HTML) ...
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
            viewIdeaSidebar.querySelector('#viewIdeaTotalReturn').innerHTML = idea.totalReturn || '--';
            viewIdeaSidebar.querySelector('#viewIdeaStatus').textContent = idea.status;
            viewIdeaSidebar.querySelector('#viewIdeaLikes').textContent = idea.likes || 0;
            viewIdeaSidebar.querySelector('#viewIdeaCommentsCount').textContent = idea.commentsCount || 0;
            viewIdeaSidebar.querySelector('#viewIdeaShares').textContent = idea.shares || 0;
            viewIdeaSidebar.querySelector('#viewInfoSymbol').textContent = idea.symbol;
            viewIdeaSidebar.querySelector('#viewInfoNetwork').textContent = idea.network || "N/A";
            viewIdeaSidebar.querySelector('#viewInfoMarketCap').textContent = idea.marketCap || "N/A";
            viewIdeaSidebar.querySelector('#viewInfoVolume').textContent = idea.volume || "N/A";
            viewIdeaSidebar.querySelector('#viewInfoContract').textContent = idea.contractAddress || "N/A";
            const perfEl = viewIdeaSidebar.querySelector('#viewInfoPerformance');
            perfEl.textContent = idea.performance || "N/A";
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
        // ... (This function remains largely the same) ...
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
        // This function needs to know which container (v1 or v2) is active or check both.
        // For now, assuming it updates V1 card if found.
        if (ideasContainerV1) {
            const cardV1 = ideasContainerV1.querySelector(`.idea-card[data-idea-id='${ideaId}']`);
            if (cardV1) {
                const commentCountElement = cardV1.querySelector('.fa-comment');
                if (commentCountElement && commentCountElement.nextSibling) {
                    commentCountElement.nextSibling.textContent = ` ${count}`;
                }
            }
        }
        // Add similar logic for V2 cards if their structure for comment count display is different
        if (ideasContainerV2) {
             const cardV2 = ideasContainerV2.querySelector(`.idea-card-v2[data-idea-id='${ideaId}']`);
             if (cardV2) {
                const commentCountElement = cardV2.querySelector('button[title="Comment"]'); // Assuming structure
                if (commentCountElement) {
                    // Example: Update text like "<i>...</i> N"
                    const icon = commentCountElement.querySelector('i');
                    commentCountElement.innerHTML = (icon ? icon.outerHTML : '') + ` ${count}`;
                }
             }
        }
        const ideaInArray = ideas.find(i => i.id == ideaId);
        if(ideaInArray) ideaInArray.commentsCount = count;
    }

    const sendCommentBtn = document.getElementById('sendCommentBtn');
    const newCommentText = document.getElementById('newCommentText');
    if (sendCommentBtn && newCommentText) {
        sendCommentBtn.addEventListener('click', () => {
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

    if (submitIdeaBtnPage) submitIdeaBtnPage.addEventListener('click', () => toggleSidebar(submitIdeaSidebar, true));
    if (closeSubmitSidebarBtn) closeSubmitSidebarBtn.addEventListener('click', () => toggleSidebar(submitIdeaSidebar, false));
    if (closeViewSidebarBtn) closeViewSidebarBtn.addEventListener('click', () => toggleSidebar(viewIdeaSidebar, false));
    if (overlay) overlay.addEventListener('click', () => {
        toggleSidebar(submitIdeaSidebar, false);
        toggleSidebar(viewIdeaSidebar, false);
        if (mainNav && mainNav.classList.contains('active')) {
            mainNav.classList.remove('active');
            if (mobileNavToggle) mobileNavToggle.setAttribute('aria-expanded', 'false');
            overlay.classList.remove('mobile-nav-active');
        }
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

    function renderLeaderboard() {
        // ... (renderLeaderboard code remains the same as last working version) ...
        if (!leaderboardBody) { console.error("Leaderboard body (tbody) not found!"); return; }
        leaderboardBody.innerHTML = '';
        const sortedIdeas = [...ideas];
        sortedIdeas.sort((a, b) => {
            const returnA = parseFloat(a.totalReturnsLeaderboard?.replace(/[+%]/g, '')) || 0;
            const returnB = parseFloat(b.totalReturnsLeaderboard?.replace(/[+%]/g, '')) || 0;
            return returnB - returnA;
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
            }
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
                    <div class="symbol-info">${symbolIconHtml}<span class="leaderboard-symbol-text">${idea.symbol || 'N/A'}</span></div>
                </td>
                <td class="total-returns-cell">${idea.totalReturnsLeaderboard || 'N/A'}</td>
                <td class="position-cell"><span class="tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}">${idea.position || 'N/A'}</span></td>
                <td class="performance-cell ${performanceClass}">${idea.performance || 'N/A'}</td>
                <td class="volume-cell">${idea.volume || 'N/A'}</td>
                <td class="status-cell ${statusClass}">${idea.status || 'N/A'}</td>
            `;
            row.addEventListener('click', () => { populateViewSidebar(idea.id); toggleSidebar(viewIdeaSidebar, true); });
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
        if (ideasContainerV1) ideasContainerV1.style.display = 'none';
        if (ideasContainerV2) ideasContainerV2.style.display = 'none';
        if (leaderboardContainer) leaderboardContainer.style.display = 'none';
        if (filtersBtn) filtersBtn.style.display = 'none';

        if (targetTab === 'ideas-v1') {
            if (ideasContainerV1) ideasContainerV1.style.display = 'flex';
            if (pageTitleElement) pageTitleElement.textContent = 'Untitled Shill Feature (v1)';
            renderIdeasV1();
        } else if (targetTab === 'ideas-v2') {
            if (ideasContainerV2) ideasContainerV2.style.display = 'grid';
            if (pageTitleElement) pageTitleElement.textContent = 'Untitled Shill Feature (v2)';
            renderIdeasV2();
        } else if (targetTab === 'leaderboard') {
            if (leaderboardContainer) leaderboardContainer.style.display = 'block';
            if (filtersBtn) filtersBtn.style.display = 'inline-flex';
            if (pageTitleElement) pageTitleElement.textContent = 'Leaderboard';
            renderLeaderboard();
        }
        if (filterPanel && targetTab !== 'leaderboard') { filterPanel.style.display = 'none'; }
    }

    if (subNavLinks.length > 0) {
        subNavLinks.forEach(link => {
            link.addEventListener('click', (event) => { event.preventDefault(); setActiveTab(event.target.dataset.tab); });
        });
    }
    if (filtersBtn) {
        filtersBtn.addEventListener('click', () => {
            if (filterPanel) filterPanel.style.display = (filterPanel.style.display === 'none' || filterPanel.style.display === '') ? 'block' : 'none';
        });
    }
    if (mobileNavToggle && mainNav) {
        mobileNavToggle.addEventListener('click', () => {
            const isNavOpen = mainNav.classList.toggle('active');
            mobileNavToggle.setAttribute('aria-expanded', isNavOpen);
            if (overlay) overlay.classList.toggle('mobile-nav-active', isNavOpen);
            if (isNavOpen) { 
                toggleSidebar(submitIdeaSidebar, false);
                toggleSidebar(viewIdeaSidebar, false);
            }
        });
    }
    if (mobileSearchToggle) {
        mobileSearchToggle.addEventListener('click', () => { alert('Mobile search to be implemented!'); });
    }

    setActiveTab('ideas-v1');
});
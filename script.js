// Using your input_file_1.js as the base
document.addEventListener('DOMContentLoaded', () => {
    console.log("Script loaded. DOM Elements selected.");
    // --- DOM Element Selections ---
    const submitIdeaBtnPage = document.getElementById('submitIdeaBtnPage');
    const submitIdeaSidebar = document.getElementById('submitIdeaSidebar');
    const closeSubmitSidebarBtn = document.getElementById('closeSubmitSidebarBtn');
    const submitIdeaForm = document.getElementById('submitIdeaForm');
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
    const mainContentElement = document.querySelector('.main-content');
    const pageTitleElement = document.getElementById('pageTitle'); 
    const ideasViewToggleContainer = document.getElementById('ideasViewToggle'); 
    const viewToggleButtons = document.querySelectorAll('.ideas-view-toggle .view-toggle-btn');


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

    let currentIdealsView = 'v1'; 
    let currentSortKey = 'totalReturnsLeaderboard'; 
    let currentSortOrder = 'desc'; 

    function updateSortArrows() {
        console.log("[updateSortArrows] Updating arrows. Key:", currentSortKey, "Order:", currentSortOrder);
        const headers = document.querySelectorAll('.leaderboard-container th.sortable');
        if (!headers || headers.length === 0) {
            console.warn("[updateSortArrows] No sortable headers found.");
            return;
        }
        headers.forEach(th => {
            th.classList.remove('sort-asc', 'sort-desc');
            if (th.dataset.sortKey === currentSortKey) {
                th.classList.add(currentSortOrder === 'asc' ? 'sort-asc' : 'sort-desc');
            }
        });
    }

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
        console.log("[renderIdeasV1] Rendering V1 ideas. Number of ideas:", ideas.length);
        if (!ideasContainerV1) { console.error("ideasContainerV1 not found"); return; }
        ideasContainerV1.innerHTML = '';
        if (ideas.length === 0) { console.warn("[renderIdeasV1] 'ideas' array is empty."); return; }
        const ideasToDisplay = ideas.slice().sort((a, b) => b.id - a.id).slice(0, 10);
        ideasToDisplay.forEach(idea => { const ideaCard = createIdeaCard(idea); if (ideaCard) ideasContainerV1.appendChild(ideaCard); });
    }

    function createIdeaCard(idea) { 
        if (!idea) { console.error("[createIdeaCard] Idea object is undefined."); return null; }
        const card = document.createElement('div'); card.classList.add('idea-card'); card.dataset.ideaId = idea.id;
        let networkIconHtml = '';
        if (idea.network) { const n = idea.network.toLowerCase(); if (n==='ethereum'||n==='bsc') networkIconHtml=`<i class="fab fa-ethereum"></i>`; else if (n==='solana') networkIconHtml=`<i class="fa-brands fa-solana"></i>`; else if (n==='bitcoin') networkIconHtml=`<i class="fab fa-btc"></i>`;}
        const isLiked = idea.isLiked || false;
        card.innerHTML = `
            <div class="idea-card-top-section"><div class="idea-card-main-info"><h3>${idea.title||'Idea'}</h3><p class="idea-card-description">${idea.description||''}</p></div><div class="idea-card-meta-island"><span class="idea-card-date">${idea.date||''}</span><div class="idea-card-island"><div class="island-left-content"><div class="island-position-asset"><span class="tag ${idea.position?(idea.position.toLowerCase()==='long'?'tag-long':'tag-short'):''}">${idea.position||''}</span>${networkIconHtml}<span class="tag-asset">${idea.symbol||''}</span></div><div class="island-total-return">Total Return <span>${idea.totalReturn||'--'}</span></div></div><div class="island-status">${idea.status||''}</div></div></div></div>
            <div class="idea-card-bottom-section"><span class="idea-card-author"><img src="${idea.authorAvatar||`https://i.pravatar.cc/20?u=${encodeURIComponent(idea.author||'anon')}`}" alt="${idea.author||'anon'}"> ${idea.author||'Anon'}</span><div class="idea-card-actions"><button class="like-btn-v1 ${isLiked?'liked':''}" data-idea-id="${idea.id}" title="Like"><i class="${isLiked?'fas':'far'} fa-heart"></i> <span class="like-count">${idea.likes||0}</span></button><button title="Comment"><i class="far fa-comment"></i> ${idea.commentsCount||0}</button><button title="Bookmark"><i class="far fa-bookmark"></i></button></div></div>`;
        const lb1 = card.querySelector('.like-btn-v1'); if (lb1) lb1.addEventListener('click', function(e){ e.stopPropagation(); handleLikeButtonClick(this, idea.id); });
        card.addEventListener('click', (e) => { if (e.target.closest('.idea-card-actions button')) return; populateViewSidebar(idea.id); toggleSidebar(viewIdeaSidebar, true); });
        return card;
    }

    function renderIdeasV2() {
        console.log("[renderIdeasV2] Rendering V2 ideas. Number of ideas:", ideas.length);
        if (!ideasContainerV2) { console.error("ideasContainerV2 not found"); return; }
        ideasContainerV2.innerHTML = '';
        if (ideas.length === 0) { console.warn("[renderIdeasV2] 'ideas' array is empty."); return; }
        ideas.forEach(idea => { const cardV2 = createIdeaCardV2(idea); if (cardV2) ideasContainerV2.appendChild(cardV2); });
    }

    function createIdeaCardV2(idea) {
        if (!idea) { console.error("[createIdeaCardV2] Idea object is undefined."); return null; }
        const card = document.createElement('div'); card.classList.add('idea-card-v2'); card.dataset.ideaId = idea.id;
        let symbolIconHtml = '';
        if (idea.network) { const n = idea.network.toLowerCase(); if (n==='ethereum'||n==='bsc') symbolIconHtml=`<i class="fab fa-ethereum"></i>`; else if (n==='solana') symbolIconHtml=`<i class="fa-brands fa-solana"></i>`; else if (n==='bitcoin') symbolIconHtml=`<i class="fab fa-btc"></i>`;}
        const returnOrPerf = idea.totalReturnsLeaderboard || idea.performance || '--';
        const returnClass = (returnOrPerf.startsWith('+') || parseFloat(returnOrPerf.replace(/[+%]/g,'')) > 0) ? 'positive' : (returnOrPerf.startsWith('-') || parseFloat(returnOrPerf.replace(/[+%]/g,'')) < 0) ? 'negative' : '';
        const isLiked = idea.isLiked || false;
        card.innerHTML = `
            <div class="idea-card-v2-header"><h3 class="idea-card-v2-title">${idea.title||'Idea'}</h3><span class="idea-card-v2-date">${idea.date||''}</span></div>
            <p class="idea-card-v2-description">${idea.description?idea.description.substring(0,120)+(idea.description.length>120?'...':''):'No desc.'}</p>
            <div class="idea-card-v2-main-content"><div class="idea-card-v2-details-island"><span class="tag ${idea.position?(idea.position.toLowerCase()==='long'?'tag-long':'tag-short'):''}">${idea.position||''}</span>${symbolIconHtml}<span class="idea-card-v2-symbol">${idea.symbol||''}</span><span class="idea-card-v2-return ${returnClass}">${returnOrPerf}</span></div><span class="idea-card-v2-status ${idea.status?idea.status.toLowerCase():''}">${idea.status||''}</span></div>
            <div class="idea-card-v2-footer"><div class="idea-card-v2-author"><img src="${idea.authorAvatar||`https://i.pravatar.cc/20?u=${encodeURIComponent(idea.author||'anon')}`}" alt="${idea.author||'anon'}"><span>${idea.author||'Anon'}</span></div><div class="idea-card-v2-actions"><button class="like-btn-v2 ${isLiked?'liked':''}" data-idea-id="${idea.id}" title="Like"><i class="${isLiked ? 'fas' : 'far'} fa-heart"></i> <span class="like-count">${idea.likes||0}</span></button><button title="Comment"><i class="far fa-comment"></i> ${idea.commentsCount||0}</button><button title="Bookmark"><i class="far fa-bookmark"></i></button></div></div>`;
        const lb2 = card.querySelector('.like-btn-v2'); if (lb2) lb2.addEventListener('click', function(e){ e.stopPropagation(); handleLikeButtonClick(this, idea.id); });
        card.addEventListener('click', (e) => { if (e.target.closest('.idea-card-v2-actions button')) return; populateViewSidebar(idea.id); toggleSidebar(viewIdeaSidebar, true); });
        return card;
    }
    
    function handleLikeButtonClick(buttonElement, ideaId) { 
        const ideaToUpdate = ideas.find(i => i.id == ideaId);
        if (ideaToUpdate) {
            ideaToUpdate.isLiked = !ideaToUpdate.isLiked;
            ideaToUpdate.likes = ideaToUpdate.isLiked ? (ideaToUpdate.likes || 0) + 1 : Math.max(0, (ideaToUpdate.likes || 0) - 1);
            buttonElement.classList.toggle('liked', ideaToUpdate.isLiked);
            const countSpan = buttonElement.querySelector('.like-count'); if (countSpan) countSpan.textContent = ideaToUpdate.likes;
            const icon = buttonElement.querySelector('i'); if (icon) { icon.classList.toggle('far', !ideaToUpdate.isLiked); icon.classList.toggle('fas', ideaToUpdate.isLiked); }
            // Sync other card type
            if (buttonElement.classList.contains('like-btn-v1') && ideasContainerV2 && ideasContainerV2.style.display !== 'none') {
                const otherCardButton = ideasContainerV2.querySelector(`.like-btn-v2[data-idea-id="${ideaId}"]`);
                if (otherCardButton) { otherCardButton.classList.toggle('liked', ideaToUpdate.isLiked); otherCardButton.querySelector('.like-count').textContent = ideaToUpdate.likes; const i = otherCardButton.querySelector('i'); if(i) {i.classList.toggle('far',!ideaToUpdate.isLiked);i.classList.toggle('fas',ideaToUpdate.isLiked);}}
            } else if (buttonElement.classList.contains('like-btn-v2') && ideasContainerV1 && ideasContainerV1.style.display !== 'none') {
                const otherCardButton = ideasContainerV1.querySelector(`.like-btn-v1[data-idea-id="${ideaId}"]`);
                if (otherCardButton) { otherCardButton.classList.toggle('liked', ideaToUpdate.isLiked); otherCardButton.querySelector('.like-count').textContent = ideaToUpdate.likes; const i = otherCardButton.querySelector('i'); if(i) {i.classList.toggle('far',!ideaToUpdate.isLiked);i.classList.toggle('fas',ideaToUpdate.isLiked);}}
            }
            if (viewIdeaSidebar && viewIdeaSidebar.classList.contains('open') && viewIdeaSidebar.querySelector('.comments-section')?.dataset.currentIdeaId == ideaId) {
                const sbLikes = viewIdeaSidebar.querySelector('#viewIdeaLikes'); if (sbLikes) sbLikes.textContent = ideaToUpdate.likes;
                const sbIcon = viewIdeaSidebar.querySelector('.like-btn-sidebar i.fa-heart'); if (sbIcon) { sbIcon.classList.toggle('far',!ideaToUpdate.isLiked); sbIcon.classList.toggle('fas',ideaToUpdate.isLiked); sbIcon.style.color = ideaToUpdate.isLiked ? '#007bff' : ''; }
                const sbBtn = viewIdeaSidebar.querySelector('.like-btn-sidebar'); if (sbBtn) sbBtn.classList.toggle('liked', ideaToUpdate.isLiked);
            }
        } else { console.error(`[handleLikeButton] Idea not found for ID: ${ideaId}`);}
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
                totalReturnsLeaderboard: "0.00%", status: "Pending", likes: 0, commentsCount: 0, shares: 0, isLiked: false,
                marketCap: "N/A", volume: "N/A", performance: "N/A", exitDate: "TBD", comments: []
            };
            ideas.unshift(newIdea);
            const activeSubNav = document.querySelector('.sub-nav-link.active');
            if (activeSubNav) {
                const currentTab = activeSubNav.dataset.tab;
                if (currentTab === 'ideas') setIdeasView(currentIdealsView);
                else if (currentTab === 'leaderboard') renderLeaderboard();
            } else { setIdeasView(currentIdealsView); } 
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
        console.log(`[populateViewSidebar] Populating for idea ID: ${ideaId}`);
        try {
            const idea = ideas.find(i => i.id == ideaId);
            if (!idea) { console.error(`Idea not found for ID: ${ideaId}`); return; }
            if (!viewIdeaSidebar) { console.error("View idea sidebar element not found"); return; }
            viewIdeaSidebar.querySelector('#viewIdeaTitle').textContent = idea.title;
            viewIdeaSidebar.querySelector('#viewIdeaUserDate').textContent = `${idea.author||'Anon'} • ${idea.date}`;
            const posTag = viewIdeaSidebar.querySelector('#viewIdeaPosition'); posTag.textContent = idea.position||'N/A'; posTag.className = `tag ${idea.position?(idea.position.toLowerCase()==='long'?'tag-long':'tag-short'):''}`;
            viewIdeaSidebar.querySelector('#viewIdeaSymbolDisplay').textContent = idea.symbol;
            viewIdeaSidebar.querySelector('#viewIdeaTotalReturn').innerHTML = idea.totalReturn||'--';
            viewIdeaSidebar.querySelector('#viewIdeaStatus').textContent = idea.status;
            viewIdeaSidebar.querySelector('#viewIdeaLikes').textContent = idea.likes||0;
            viewIdeaSidebar.querySelector('#viewIdeaCommentsCount').textContent = idea.commentsCount||0;
            viewIdeaSidebar.querySelector('#viewIdeaShares').textContent = idea.shares||0;
            viewIdeaSidebar.querySelector('#viewInfoSymbol').textContent = idea.symbol;
            viewIdeaSidebar.querySelector('#viewInfoNetwork').textContent = idea.network||"N/A";
            viewIdeaSidebar.querySelector('#viewInfoMarketCap').textContent = idea.marketCap||"N/A";
            viewIdeaSidebar.querySelector('#viewInfoVolume').textContent = idea.volume||"N/A";
            viewIdeaSidebar.querySelector('#viewInfoContract').textContent = idea.contractAddress||"N/A";
            const perfEl = viewIdeaSidebar.querySelector('#viewInfoPerformance'); perfEl.textContent = formatPercentage(idea.performance)||"N/A"; // Format here
            perfEl.classList.remove('positive-perf','negative-perf'); if(idea.performance&&idea.performance.startsWith('+'))perfEl.classList.add('positive-perf');if(idea.performance&&idea.performance.startsWith('-'))perfEl.classList.add('negative-perf');
            viewIdeaSidebar.querySelector('#viewIdeaThesisText').textContent = idea.thesis||'';
            viewIdeaSidebar.querySelector('#viewIdeaExitDate').textContent = idea.exitDate||"N/A";
            const commentSection = viewIdeaSidebar.querySelector('.comments-section'); if(commentSection)commentSection.dataset.currentIdeaId = idea.id;
            const sidebarLikeButton = viewIdeaSidebar.querySelector('.like-btn-sidebar');
            if (sidebarLikeButton) {
                sidebarLikeButton.dataset.ideaId = idea.id; 
                const sidebarHeartIcon = sidebarLikeButton.querySelector('i.fa-heart');
                if (sidebarHeartIcon) { sidebarHeartIcon.classList.toggle('far',!idea.isLiked); sidebarHeartIcon.classList.toggle('fas',idea.isLiked); sidebarHeartIcon.style.color = idea.isLiked?'#007bff':'';}
                sidebarLikeButton.classList.toggle('liked', idea.isLiked); 
                if (sidebarLikeButton.handleLikeClick) sidebarLikeButton.removeEventListener('click', sidebarLikeButton.handleLikeClick);
                sidebarLikeButton.handleLikeClick = function(e){ e.stopPropagation(); handleLikeButtonClick(this, idea.id); };
                sidebarLikeButton.addEventListener('click', sidebarLikeButton.handleLikeClick);
            }
            renderComments(idea.id);
        } catch (error) { console.error(`[populateViewSidebar] Error for ID ${ideaId}:`, error); }
    }

    function renderComments(ideaId) { /* ... same as before ... */ }
    function updateCardCommentCount(ideaId, count) { /* ... same as before ... */ }
    
    function formatPercentage(valueStr) { // Formats to two decimal places
        if (!valueStr || valueStr === '--' || valueStr === 'N/A') return valueStr;
        const num = parseFloat(String(valueStr).replace(/[+%]/g, ''));
        if (isNaN(num)) return valueStr;
        const sign = num > 0 ? '+' : num < 0 ? '-' : ''; 
        return sign + Math.abs(num).toFixed(2) + '%';
    }

    const sendCommentBtn = document.getElementById('sendCommentBtn');
    const newCommentText = document.getElementById('newCommentText');
    if (sendCommentBtn && newCommentText) { /* ... sendCommentBtn listener ... */ }

    if (submitIdeaBtnPage) submitIdeaBtnPage.addEventListener('click', () => toggleSidebar(submitIdeaSidebar, true));
    if (closeSubmitSidebarBtn) closeSubmitSidebarBtn.addEventListener('click', () => toggleSidebar(submitIdeaSidebar, false));
    if (closeViewSidebarBtn) closeViewSidebarBtn.addEventListener('click', () => toggleSidebar(viewIdeaSidebar, false));
    if (overlay) overlay.addEventListener('click', () => { /* ... overlay listener ... */ });
    if (positionButtons.length > 0) { /* ... positionButtons listener ... */ }

    function renderLeaderboard() {
        console.log("[renderLeaderboard] Called. Key:", currentSortKey, "Order:", currentSortOrder, "Num ideas:", ideas.length);
        if (!leaderboardBody) { console.error("Leaderboard body (tbody) not found!"); return; }
        leaderboardBody.innerHTML = ''; 
        if (ideas.length === 0) { console.warn("[renderLeaderboard] 'ideas' array is empty."); updateSortArrows(); return; }
        
        const sortedIdeas = [...ideas]; 
        sortedIdeas.sort((a, b) => {
            let valA = a[currentSortKey]; let valB = b[currentSortKey];
            if (['totalReturnsLeaderboard', 'performance', 'volume'].includes(currentSortKey)) {
                 valA = parseFloat(String(valA)?.replace(/[+%M$]/g, '')) || 0; 
                 valB = parseFloat(String(valB)?.replace(/[+%M$]/g, '')) || 0;
            } else if (currentSortKey === 'rank') { 
                 valA = parseFloat(a.totalReturnsLeaderboard?.replace(/[+%]/g, '')) || 0;
                 valB = parseFloat(b.totalReturnsLeaderboard?.replace(/[+%]/g, '')) || 0;
            } else { valA = String(valA)?.toLowerCase() || ''; valB = String(valB)?.toLowerCase() || ''; }
            if (currentSortOrder === 'asc') { return valA < valB ? -1 : valA > valB ? 1 : 0; } 
            else { return valA > valB ? -1 : valA < valB ? 1 : 0; } 
        });
        console.log("[renderLeaderboard] Sorted ideas count:", sortedIdeas.length);

        sortedIdeas.forEach((idea, index) => {
            const rank = index + 1; 
            const row = document.createElement('tr'); row.dataset.ideaId = idea.id;
            const genericSymbolIconHtml = `<i class="fas fa-coins leaderboard-symbol-icon default-symbol-icon"></i>`; 
            const performanceRaw = parseFloat(idea.performance?.replace(/[+%]/g, ''));
            const performanceClass = isNaN(performanceRaw) ? '' : (performanceRaw >= 0 ? 'positive' : 'negative');
            const totalReturnsRaw = parseFloat(idea.totalReturnsLeaderboard?.replace(/[+%]/g, ''));
            const totalReturnsClass = isNaN(totalReturnsRaw) ? '' : (totalReturnsRaw >= 0 ? 'positive' : 'negative');
            let rankCellClass = "rank-cell";
            if (currentSortKey === 'totalReturnsLeaderboard' && currentSortOrder === 'desc' && rank <= 3) {
                rankCellClass += " top-rank";
            }
            row.innerHTML = `
                <td class="${rankCellClass}"><span>${rank}</span></td>
                <td class="user-cell"><img src="${idea.authorAvatar || `https://i.pravatar.cc/24?u=${encodeURIComponent(idea.author || 'anon')}`}" alt="${idea.author || 'anon'}" class="leaderboard-user-avatar"><span class="leaderboard-username">${idea.author || 'Anonymous'}</span></td>
                <td class="symbol-cell-v2"><div class="symbol-chip">${genericSymbolIconHtml}<span class="leaderboard-symbol-text">${idea.symbol || 'N/A'}</span></div></td>
                <td class="total-returns-cell ${totalReturnsClass}">${formatPercentage(idea.totalReturnsLeaderboard)}</td>
                <td class="position-cell"><span class="tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}">${idea.position || 'N/A'}</span></td>
                <td class="performance-cell ${performanceClass}">${formatPercentage(idea.performance)}</td>
                <td class="volume-cell">${idea.volume || 'N/A'}</td>
                <td class="status-cell">${idea.status || 'N/A'}</td>`;
            row.addEventListener('click', () => { populateViewSidebar(idea.id); toggleSidebar(viewIdeaSidebar, true); });
            leaderboardBody.appendChild(row);
        });
        updateSortArrows();
        console.log("[renderLeaderboard] Finished rendering.");
    }

    function setActiveTab(targetTab) {
        console.log(`[setActiveTab] Called for: ${targetTab}`);
        if (!subNavLinks || subNavLinks.length === 0) { console.error("Sub-nav links not found."); return; }
        subNavLinks.forEach(link => link.classList.remove('active'));
        const activeLink = document.querySelector(`.sub-nav-link[data-tab="${targetTab}"]`);
        if (activeLink) activeLink.classList.add('active'); else console.warn(`No sub-nav link found for tab: ${targetTab}`);
        
        if (mainContentElement) mainContentElement.classList.remove('ideas-view-v2-active');
        if (ideasContainerV1) ideasContainerV1.style.display = 'none';
        if (ideasContainerV2) ideasContainerV2.style.display = 'none';
        if (leaderboardContainer) leaderboardContainer.style.display = 'none';
        
        if (ideasViewToggleContainer) ideasViewToggleContainer.style.display = 'none';
        if (filtersBtn) filtersBtn.style.display = 'none';

        if (targetTab === 'ideas') {
            if (pageTitleElement) pageTitleElement.textContent = `Untitled Shill Feature`;
            if (ideasViewToggleContainer) ideasViewToggleContainer.style.display = 'flex';
            setIdeasView(currentIdealsView); 
        } else if (targetTab === 'leaderboard') {
            if (leaderboardContainer) leaderboardContainer.style.display = 'block';
            if (filtersBtn) filtersBtn.style.display = 'inline-flex';
            if (pageTitleElement) pageTitleElement.textContent = 'Leaderboard';
            currentSortKey = 'totalReturnsLeaderboard'; 
            currentSortOrder = 'desc';
            renderLeaderboard();
        }
        if (filterPanel && targetTab !== 'leaderboard') { filterPanel.style.display = 'none'; }
    }

    function setIdeasView(viewType) {
        console.log(`[setIdeasView] Setting to: ${viewType}`);
        currentIdealsView = viewType;
        if(viewToggleButtons) {
            viewToggleButtons.forEach(btn => btn.classList.toggle('active', btn.dataset.view === viewType));
        }
        if (pageTitleElement && document.querySelector('.sub-nav-link.active')?.dataset.tab === 'ideas') {
             pageTitleElement.textContent = `Untitled Shill Feature`; 
        }
        if (viewType === 'v1') {
            if (ideasContainerV1) ideasContainerV1.style.display = 'flex'; else console.error("ideasContainerV1 is null in setIdeasView v1");
            if (ideasContainerV2) ideasContainerV2.style.display = 'none';
            if (mainContentElement) mainContentElement.classList.remove('ideas-view-v2-active');
            renderIdeasV1();
        } else { // v2
            if (ideasContainerV1) ideasContainerV1.style.display = 'none';
            if (ideasContainerV2) ideasContainerV2.style.display = 'grid';  else console.error("ideasContainerV2 is null in setIdeasView v2");
            if (mainContentElement) mainContentElement.classList.add('ideas-view-v2-active');
            renderIdeasV2();
        }
    }

    if (subNavLinks.length > 0) {
        subNavLinks.forEach(link => {
            link.addEventListener('click', (event) => { event.preventDefault(); setActiveTab(event.target.dataset.tab); });
        });
    }
    if(viewToggleButtons && viewToggleButtons.length > 0) {
        viewToggleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const viewType = button.dataset.view;
                setIdeasView(viewType);
            });
        });
    }
    const sortableTableHeaders = document.querySelectorAll('.leaderboard-container th.sortable');
    if (sortableTableHeaders.length > 0) {
        sortableTableHeaders.forEach(header => {
            header.addEventListener('click', () => {
                const sortKey = header.dataset.sortKey;
                if (!sortKey) return; 
                if (currentSortKey === sortKey) {
                    if (currentSortOrder === 'desc') currentSortOrder = 'asc';
                    else if (currentSortOrder === 'asc') { 
                        currentSortKey = 'totalReturnsLeaderboard'; 
                        currentSortOrder = 'desc'; 
                    }
                } else {
                    currentSortKey = sortKey;
                    currentSortOrder = (['author', 'symbol', 'position', 'status'].includes(sortKey)) ? 'asc' : 'desc';
                }
                renderLeaderboard();
            });
        });
    }

    if (filtersBtn) { 
        filtersBtn.addEventListener('click', () => {
            console.log("Filters button clicked");
            if (filterPanel) {
                filterPanel.style.display = (filterPanel.style.display === 'none' || filterPanel.style.display === '') ? 'block' : 'none';
                console.log("Filter panel display toggled to:", filterPanel.style.display);
            } else {
                console.error("Filter panel not found!");
            }
        });
    }
    if (mobileNavToggle && mainNav) { /* ... mobileNavToggle listener ... */ }
    if (mobileSearchToggle) { /* ... mobileSearchToggle listener ... */ }

    setActiveTab('ideas'); 
});
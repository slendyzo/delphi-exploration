document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Element Selections ---
    const submitIdeaBtnPage = document.getElementById('submitIdeaBtnPage');
    const submitIdeaSidebar = document.getElementById('submitIdeaSidebar');
    // ... (other existing selections) ...
    const ideasContainerV1 = document.getElementById('ideasContainerV1'); // Updated ID
    const ideasContainerV2 = document.getElementById('ideasContainerV2'); // New container for V2
    const leaderboardContainer = document.getElementById('leaderboardContainer');
    // ... (other existing selections) ...
    const subNavLinks = document.querySelectorAll('.sub-nav-link');
    const viewIdeaSidebar = document.getElementById('viewIdeaSidebar');


    // --- Initial Data (Sample Ideas - keep as is or expand if v2 needs different fields initially) ---
    let ideas = [ /* ... Your existing ideas array ... */ ];

    // --- Functions ---

    // ... (toggleSidebar, createIdeaCard (for V1), populateViewSidebar, renderComments, etc. remain mostly the same) ...

    // RENDER IDEAS V1 (Formerly renderIdeas)
    function renderIdeasV1() {
        if (!ideasContainerV1) return;
        ideasContainerV1.innerHTML = '';
        const ideasToDisplay = ideas.slice().sort((a, b) => b.id - a.id).slice(0, 10); // Show latest 10 for v1
        ideasToDisplay.forEach(idea => {
            const ideaCard = createIdeaCard(idea); // Uses existing createIdeaCard
            if (ideaCard) ideasContainerV1.appendChild(ideaCard);
        });
    }

    // Function to create an idea card for V1 (existing function, ensure it's named createIdeaCard)
    function createIdeaCard(idea) {
        // ... This is your existing function that creates the V1 card style ...
        // It should attach click listener to open viewIdeaSidebar
        if (!idea) { console.error("[createIdeaCard] Idea object is undefined."); return null; }
        const card = document.createElement('div');
        card.classList.add('idea-card'); // Existing V1 card class
        card.dataset.ideaId = idea.id;
        // ... (rest of your existing V1 card HTML generation) ...
        
        // Ensure it has the click listener to open the shared sidebar
        card.addEventListener('click', (e) => {
            if (e.target.closest('button')) return;
            populateViewSidebar(idea.id);
            toggleSidebar(viewIdeaSidebar, true);
        });
        return card;
    }


    // PLACEHOLDER/NEW: RENDER IDEAS V2
    function renderIdeasV2() {
        if (!ideasContainerV2) return;
        ideasContainerV2.innerHTML = '';
        // For now, let's render all ideas with a new card style
        ideas.forEach(idea => {
            const ideaCardV2 = createIdeaCardV2(idea); // New function for V2 cards
            if (ideaCardV2) ideasContainerV2.appendChild(ideaCardV2);
        });
    }

    // PLACEHOLDER/NEW: CREATE IDEA CARD V2
    function createIdeaCardV2(idea) {
        if (!idea) { console.error("[createIdeaCardV2] Idea object is undefined."); return null; }
        const card = document.createElement('div');
        card.classList.add('idea-card-v2'); // New class for V2 cards
        card.dataset.ideaId = idea.id;

        // Based on input_file_0.png for V2 card structure
        // This will be more detailed when we add CSS
        let symbolIconHtml = '';
         if (idea.network) {
            const networkLower = idea.network.toLowerCase();
            if (networkLower === 'ethereum' || networkLower === 'bsc') symbolIconHtml = `<i class="fab fa-ethereum"></i>`;
            else if (networkLower === 'solana') symbolIconHtml = `<i class="fa-brands fa-solana"></i>`;
            else if (networkLower === 'bitcoin') symbolIconHtml = `<i class="fab fa-btc"></i>`;
        }

        card.innerHTML = `
            <div class="idea-card-v2-header">
                <h3 class="idea-card-v2-title">${idea.title || 'Untitled Idea'}</h3>
                <span class="idea-card-v2-date">${idea.date || ''}</span>
            </div>
            <p class="idea-card-v2-description">${idea.description ? idea.description.substring(0,100) + (idea.description.length > 100 ? '...' : '') : 'No description.'}</p>
            <div class="idea-card-v2-main-content">
                <div class="idea-card-v2-details-island">
                    <span class="tag ${idea.position ? (idea.position.toLowerCase() === 'long' ? 'tag-long' : 'tag-short') : ''}">${idea.position || ''}</span>
                    ${symbolIconHtml}
                    <span class="idea-card-v2-symbol">${idea.symbol || ''}</span>
                    <span class="idea-card-v2-return">${idea.totalReturnsLeaderboard || idea.performance || '--'}</span> {/* Using leaderboard return or performance */}
                </div>
                <span class="idea-card-v2-status ${idea.status ? idea.status.toLowerCase() : ''}">${idea.status || ''}</span>
            </div>
            <div class="idea-card-v2-footer">
                <div class="idea-card-v2-author">
                    <img src="${idea.authorAvatar || `https://i.pravatar.cc/20?u=${encodeURIComponent(idea.author || 'anon')}`}" alt="${idea.author || 'anon'}">
                    <span>${idea.author || 'Anonymous'}</span>
                </div>
                <div class="idea-card-v2-actions">
                    <button><i class="far fa-heart"></i> ${idea.likes || 0}</button>
                    <button><i class="far fa-comment"></i> ${idea.commentsCount || 0}</button>
                    <button><i class="far fa-bookmark"></i></button>
                </div>
            </div>
        `;

        // Add click listener to open the same viewIdeaSidebar
        card.addEventListener('click', (e) => {
            if (e.target.closest('button')) return; // Ignore clicks on action buttons within card
            populateViewSidebar(idea.id); // Reuses the existing sidebar population logic
            toggleSidebar(viewIdeaSidebar, true);
        });
        return card;
    }

    // ... (renderLeaderboard and other functions remain the same) ...
    function renderLeaderboard() { /* ... Your existing leaderboard rendering code ... */ }

    // UPDATE setActiveTab
    function setActiveTab(targetTab) {
        if (!subNavLinks || subNavLinks.length === 0) return;
        subNavLinks.forEach(link => {
            link.classList.remove('active');
            if (link.dataset.tab === targetTab) link.classList.add('active');
        });

        const pageTitleElement = document.querySelector('.feature-header h1');

        // Hide all content containers first
        if (ideasContainerV1) ideasContainerV1.style.display = 'none';
        if (ideasContainerV2) ideasContainerV2.style.display = 'none';
        if (leaderboardContainer) leaderboardContainer.style.display = 'none';
        if (filtersBtn) filtersBtn.style.display = 'none'; // Hide filters button by default

        if (targetTab === 'ideas-v1') {
            if (ideasContainerV1) ideasContainerV1.style.display = 'flex'; // Or 'block' based on its CSS
            if (pageTitleElement) pageTitleElement.textContent = 'Untitled Shill Feature (v1)';
            renderIdeasV1();
        } else if (targetTab === 'ideas-v2') {
            if (ideasContainerV2) ideasContainerV2.style.display = 'grid'; // For grid layout of V2 cards
            if (pageTitleElement) pageTitleElement.textContent = 'Untitled Shill Feature (v2)';
            renderIdeasV2();
        } else if (targetTab === 'leaderboard') {
            if (leaderboardContainer) leaderboardContainer.style.display = 'block';
            if (filtersBtn) filtersBtn.style.display = 'inline-flex'; // Show filters button for leaderboard
            if (pageTitleElement) pageTitleElement.textContent = 'Leaderboard'; // Or 'Untitled Shill Feature'
            renderLeaderboard();
        }
         // Hide filter panel when switching tabs (except potentially if staying on leaderboard)
        if (filterPanel && targetTab !== 'leaderboard') {
            filterPanel.style.display = 'none';
        }
    }

    // --- Initial Page Load ---
    // Rename renderIdeas to renderIdeasV1 if you haven't already
    // Ensure createIdeaCard is the V1 card creation function.
    if (submitIdeaForm) { /* ... your existing submitIdeaForm listener ... */
        // When submitting a new idea, you might want to refresh both v1 and v2 if they are active
        // or just the currently active one.
        // For simplicity, the existing logic in submitIdeaForm that calls renderIdeas()
        // should be updated to call renderIdeasV1() if that's the new name.
        // And if ideasContainerV2 is active, call renderIdeasV2().
    }
    
    // Update the submit handler to refresh the correct view
    if (submitIdeaForm) {
        submitIdeaForm.addEventListener('submit', function (event) {
            event.preventDefault();
            // ... (your existing code to create newIdea object) ...
            const formData = new FormData(this);
            const currentAuthorName = "YouNotAnil#23";
            const newIdea = {
                id: Date.now(), title: `${formData.get('position')} ${formData.get('symbol').toUpperCase()}`,
                description: formData.get('thesis').substring(0, 100) + (formData.get('thesis').length > 100 ? '...' : ''),
                author: currentAuthorName, authorAvatar: `https://i.pravatar.cc/20?u=${encodeURIComponent(currentAuthorName + Date.now())}`,
                date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
                symbol: formData.get('symbol').toUpperCase(), network: formData.get('network'), position: formData.get('position'),
                thesis: formData.get('thesis'), contractAddress: formData.get('contractAddress'), totalReturn: "--",
                totalReturnsLeaderboard: "0.000%", status: "Pending", likes: 0, commentsCount: 0, shares: 0,
                marketCap: "N/A", volume: "N/A", performance: "N/A", exitDate: "TBD", comments: []
            };
            ideas.unshift(newIdea);

            // Refresh the currently active ideas tab or leaderboard
            const activeSubNav = document.querySelector('.sub-nav-link.active');
            if (activeSubNav) {
                const currentTab = activeSubNav.dataset.tab;
                if (currentTab === 'ideas-v1') renderIdeasV1();
                else if (currentTab === 'ideas-v2') renderIdeasV2();
                else if (currentTab === 'leaderboard') renderLeaderboard();
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


    setActiveTab('ideas-v1'); // Default to 'Ideas v1' tab
});
document.addEventListener('DOMContentLoaded', async function() {
    const container = document.getElementById('posts-container');
    let loading = false;
    let page = 1; // Track the current page number
    const postsPerPage = 1; // Specify the number of posts to load per interaction
        async function loadPosts() {
        if (loading) return;
        loading = true;
        
        try {
            const response = await fetch('posts/posts.json');
            posts = await response.json();
            posts.reverse();
            displayPosts();
            loading = false;
        } catch (err) {
            console.error('Failed to load posts:', err);
            loading = false;
        }
    }
    
    async function displayPosts() {
        const start = (page - 1) * postsPerPage;
        const end = start + postsPerPage;
        const visiblePosts = posts.slice(start, end);
    
        for (const postFileName of visiblePosts) {
            try {
                const response = await fetch(`posts/${postFileName}`);
                const postContent = await response.text();
                
                const postContainer = document.createElement('div');
                postContainer.className = 'post';
                postContainer.innerHTML = postContent;
                container.appendChild(postContainer);
            } catch (err) {
                console.error('Failed to load post content:', err);
            }
        }
        // Remove any existing cursors
        const existingCursors = document.querySelectorAll('.cursor');
        existingCursors.forEach(cursor => cursor.remove());
        
        // Find the last visible terminal paragraph
        const terminalParagraphs = document.querySelectorAll('.terminal');
        const lastVisibleTerminal = terminalParagraphs[terminalParagraphs.length - 1];
        
        // Add cursor to the last visible terminal paragraph
        const cursor = document.createElement('span');
        cursor.classList.add('cursor');
        cursor.textContent = '|';
        lastVisibleTerminal.appendChild(cursor);
    }
    // Function to handle swipe gestures
    function handleSwipe(event) {
        const touchStartY = event.touches[0].clientY;
        let touchEndY;

        function onTouchMove(e) {
            touchEndY = e.touches[0].clientY;
        }

        function onTouchEnd() {
            if (touchEndY < touchStartY) { // Swipe down (next page)
                page++;
                displayPosts();
            }
            // Remove event listeners
            document.removeEventListener('touchmove', onTouchMove);
            document.removeEventListener('touchend', onTouchEnd);
        }

        document.addEventListener('touchmove', onTouchMove);
        document.addEventListener('touchend', onTouchEnd);
    }
    
    // Function to handle scroll gestures
    function handleScroll(event) {
        if (event.deltaY > 0) {
            // Scroll down (next page)
            page++;
            displayPosts();
        }
    }

    // Initial load
    await loadPosts();

    // Add scroll gesture event listener
    window.addEventListener('wheel', handleScroll);
    
    // Add swipe gesture event listener
    document.addEventListener('touchstart', handleSwipe);

    // Start the random flickering effect
    randomFlicker();

    function randomFlicker() {
        let flickerDuration = Math.random() * 3000 + 1000; // Random duration between 1000ms and 4000ms
        preElement.style.animationDuration = `${flickerDuration}ms`;
        setTimeout(randomFlicker, flickerDuration);
    }

});

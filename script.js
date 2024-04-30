document.addEventListener('DOMContentLoaded', function() {
    const container = document.getElementById('posts-container');
    let loading = false;
    let page = 1; // Track the current page number
    
    function loadMorePosts() {
        if (loading) return;
        loading = true;
        
        fetch(`posts/posts-${page}.json`)
            .then(response => response.json())
            .then(posts => {
                if (posts.length > 0) {
                    posts.forEach(post => {
                        const postContainer = document.createElement('div');
                        postContainer.className = 'post';
                        postContainer.innerHTML = post.htmlContent;
                        container.appendChild(postContainer);
                    });
                    page++; // Increment page number for the next load
                }
                loading = false;
            })
            .catch(err => {
                console.error('Failed to load more posts:', err);
                loading = false;
            });
    }
    
    // Detect scroll event
    window.addEventListener('scroll', function() {
        // Check if user has scrolled to the bottom of the page
        if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 500) {
            loadMorePosts();
        }
    });
    
    // Initial load
    loadMorePosts();
});
